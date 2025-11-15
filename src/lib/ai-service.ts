/**
 * AI Service for generating personalized math explanations and chat responses
 * Primarily uses Ollama offline LLM server for privacy and local processing
 */

import { AIExplanation } from './types';

/**
 * Local LLM configuration for Ollama server
 * Point to http://localhost:11434 for Ollama (default)
 */
const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434';
const MODEL_NAME = 'llama3.1:8b'; // Official model name as pulled

/**
 * Check if Ollama is available (avoid network errors)
 */
async function isOllamaAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/version`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000) // 2 second timeout
    });
    return response.ok;
  } catch (error) {
    // Silently handle connection failures
    return false;
  }
}

/**
 * Try to call local Llama LLM server
 * Silently handles connection failures
 */
async function callLocalLLM(prompt: string, isDiscovery: boolean = false): Promise<string | null> {
  try {
    // Quick check if Ollama is available first
    if (!(await isOllamaAvailable())) {
      return null; // Silently return null, no network errors
    }

    const maxTokens = isDiscovery ? 200 : 500;

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: maxTokens,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Local LLM server error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || null;
  } catch (error) {
    // Silently handle all network failures - no console spam
    return null;
  }
}

/**
 * Parse AI response in structured format and convert to AIExplanation
 */
function parseAIFStructuredResponse(response: string, topicName: string): AIExplanation {
  try {
    // Split response into sections
    const sections = response.split(/\n{2,}/);

    let explanation = '';
    let keyPoints: string[] = [];
    let examples: string[] = [];

    let currentSection = '';

    for (const section of sections) {
      const trimmed = section.trim();
      if (trimmed.startsWith('EXPLANATION:')) {
        currentSection = 'explanation';
        explanation = trimmed.replace('EXPLANATION:', '').trim();
      } else if (trimmed.startsWith('KEY POINTS:')) {
        currentSection = 'keypoints';
        const pointsText = trimmed.replace('KEY POINTS:', '').trim();
        keyPoints = pointsText.split('•').map(p => p.trim()).filter(p => p.length > 0);
      } else if (trimmed.startsWith('EXAMPLES:')) {
        currentSection = 'examples';
        const examplesText = trimmed.replace('EXAMPLES:', '').trim();
        examples = examplesText.split('•').map(e => e.trim()).filter(e => e.length > 0);
      } else if (currentSection === 'explanation') {
        explanation += '\n\n' + trimmed;
      } else if (currentSection === 'keypoints' && keyPoints.length === 0) {
        keyPoints = trimmed.split('•').map(p => p.trim()).filter(p => p.length > 0);
      } else if (currentSection === 'examples' && examples.length === 0) {
        examples = trimmed.split('•').map(e => e.trim()).filter(e => e.length > 0);
      }
    }

    // Fallback if parsing fails
    if (!explanation || keyPoints.length === 0 || examples.length === 0) {
      console.warn('Failed to parse structured response, using fallback');
      return getSimulatedExplanation(topicName);
    }

    return {
      topic: topicName,
      explanation: explanation,
      keyPoints: keyPoints,
      examples: examples,
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return getSimulatedExplanation(topicName);
  }
}

/**
 * Generate an AI explanation for a math topic
 * Uses Ollama offline LLM server for privacy and local processing
 *
 * @param topicName - The name of the topic to explain
 * @param topicDescription - Brief description of the topic
 * @param userQuery - Optional user question or context (e.g., "I didn't understand it well")
 * @returns Promise with AI-generated explanation
 */
export async function generateExplanation(
  topicName: string,
  topicDescription: string,
  userQuery?: string
): Promise<AIExplanation> {
  try {
    const prompt = `You are a friendly math tutor explaining mathematical concepts to students. Explain "${topicName}" (${topicDescription}) in a clear, engaging way. ${
      userQuery ? `The student has a question: "${userQuery}" - address this in your explanation.` : ''
    }

Structure your response in this exact format:
EXPLANATION:
[Write 2-3 paragraphs explaining the concept clearly and intuitively]

KEY POINTS:
• [Key point 1]
• [Key point 2]
• [Key point 3]
• [Key point 4]

EXAMPLES:
• [Concrete example 1]
• [Concrete example 2]
• [Concrete example 3]

Use simple language, build intuition before introducing formulas, and make it engaging and encouraging.`;

    // Try Ollama first
    const ollamaResponse = await callLocalLLM(prompt);

    if (ollamaResponse) {
      // Parse the structured response from Ollama
      return parseAIFStructuredResponse(ollamaResponse, topicName);
    }

    // Fallback to simulated explanations if Ollama fails
    console.warn('Ollama call failed, using simulated response');
    return getSimulatedExplanation(topicName);
  } catch (error) {
    console.error('Error generating explanation:', error);
    // Fallback to simulated explanations
    return getSimulatedExplanation(topicName);
  }
}

/**
 * Simulated AI explanations for demo purposes
 * In production, these would be generated dynamically by OpenAI
 */
function getSimulatedExplanation(topicName: string): AIExplanation {
  const explanationBank: Record<string, AIExplanation> = {
    'Quadratic Equations': {
      topic: 'Quadratic Equations',
      explanation: `A quadratic equation is like a mathematical story about curves! Imagine throwing a ball in the air - its path forms a curve called a parabola. Quadratic equations help us describe and understand these curves mathematically.

The standard form is ax² + bx + c = 0, where 'a', 'b', and 'c' are numbers, and 'x' is what we're trying to find. The key feature is that x² term - it's what makes the equation "quadratic" (quad means square!).

These equations appear everywhere: in physics (projectile motion), engineering (bridge design), economics (profit calculations), and even in video games (character jump trajectories). Understanding quadratics opens doors to modeling real-world phenomena!`,
      keyPoints: [
        'Standard form: ax² + bx + c = 0, where a ≠ 0',
        'The x² term is what makes it quadratic',
        'Solutions represent where the parabola crosses the x-axis',
        'Can have 0, 1, or 2 real solutions',
      ],
      examples: [
        'x² - 5x + 6 = 0 (simple quadratic)',
        '2x² + 3x - 2 = 0 (with coefficient)',
        'x² = 16 (missing linear term)',
      ],
    },
    'Quadratic Formula': {
      topic: 'Quadratic Formula',
      explanation: `The quadratic formula is like a magic key that unlocks ANY quadratic equation! Even when factoring seems impossible, this formula always works. It's one of the most powerful tools in algebra.

The formula is: x = (-b ± √(b²-4ac)) / 2a. It might look intimidating, but it's actually quite friendly once you get to know it. The ± symbol means you'll get two answers (or sometimes just one if they're the same).

Think of it as a recipe: identify your a, b, and c values from ax² + bx + c = 0, plug them into the formula, and calculate. The square root part (√(b²-4ac)) is called the discriminant - it tells you important information about your solutions!`,
      keyPoints: [
        'Works for ANY quadratic equation',
        'Formula: x = (-b ± √(b²-4ac)) / 2a',
        'The ± gives you two solutions',
        'The discriminant (b²-4ac) determines the nature of solutions',
      ],
      examples: [
        'For x² - 5x + 6 = 0: a=1, b=-5, c=6',
        'For 2x² + 3x - 2 = 0: a=2, b=3, c=-2',
        'Plug values into formula and simplify',
      ],
    },
    'Parabola Graphs': {
      topic: 'Parabola Graphs',
      explanation: `A parabola is the beautiful U-shaped curve you get when you graph a quadratic function. Imagine a basketball's arc, a fountain's water stream, or a satellite dish - they're all parabolas!

The graph of y = ax² + bx + c creates this curve. If 'a' is positive, the parabola smiles (opens upward). If 'a' is negative, it frowns (opens downward). The highest or lowest point is called the vertex - it's the parabola's turning point.

Understanding parabola graphs helps you visualize solutions. Where the parabola crosses the x-axis? Those are your equation's solutions! The vertex tells you the maximum or minimum value. The axis of symmetry (vertical line through the vertex) shows the parabola's perfect mirror symmetry.`,
      keyPoints: [
        'Parabolas are U-shaped curves',
        'a > 0: opens upward, a < 0: opens downward',
        'Vertex is the highest/lowest point',
        'x-intercepts are the solutions to the equation',
      ],
      examples: [
        'y = x² (simplest parabola, vertex at origin)',
        'y = -x² + 4 (opens downward, vertex at (0,4))',
        'y = (x-2)² + 1 (shifted right 2, up 1)',
      ],
    },
    'Vertex Form': {
      topic: 'Vertex Form',
      explanation: `Vertex form is like giving GPS coordinates for a parabola! Instead of the standard form, we write it as y = a(x-h)² + k, where (h, k) is the vertex - the parabola's turning point.

This form is incredibly useful because you can immediately see where the vertex is located. No calculations needed! The 'a' value still tells you if it opens up or down and how wide or narrow it is.

Converting between standard form and vertex form is like translating between languages - same parabola, different way of describing it. Vertex form is especially handy when you need to quickly sketch a graph or find the maximum/minimum value.`,
      keyPoints: [
        'Form: y = a(x-h)² + k',
        'Vertex is at point (h, k)',
        'a determines direction and width',
        'Easy to graph from this form',
      ],
      examples: [
        'y = (x-3)² + 2 has vertex at (3, 2)',
        'y = -2(x+1)² - 4 has vertex at (-1, -4)',
        'y = ½(x-0)² + 5 has vertex at (0, 5)',
      ],
    },
    'Completing the Square': {
      topic: 'Completing the Square',
      explanation: `Completing the square is an algebraic technique that transforms a quadratic into vertex form. It's like solving a puzzle - you're rearranging pieces to reveal the perfect square pattern!

The goal is to create a perfect square trinomial (something like (x+p)²) from your quadratic. This technique is not just busywork - it's actually how the quadratic formula was originally derived! It's also essential for understanding conic sections and calculus later.

The process involves: 1) Make sure a=1 (factor it out if needed), 2) Take half of the b coefficient and square it, 3) Add and subtract this value, 4) Factor the perfect square. With practice, it becomes second nature!`,
      keyPoints: [
        'Converts standard form to vertex form',
        'Creates a perfect square trinomial',
        'Used to derive the quadratic formula',
        'Steps: isolate x terms, complete square, factor',
      ],
      examples: [
        'x² + 6x + 5 → (x+3)² - 4',
        'x² - 8x + 10 → (x-4)² - 6',
        '2x² + 12x + 14 → 2(x+3)² - 4',
      ],
    },
    'Discriminant': {
      topic: 'Discriminant',
      explanation: `The discriminant is like a fortune teller for quadratic equations! It's the expression b² - 4ac from inside the quadratic formula's square root, and it tells you everything about the nature of your solutions before you even solve.

If the discriminant is positive, you get two different real solutions (parabola crosses x-axis twice). If it's zero, you get exactly one solution (parabola just touches x-axis). If it's negative, you get complex solutions (parabola doesn't cross x-axis at all).

This is incredibly powerful! Just by calculating one value, you know what kind of solutions to expect. It's used in engineering to determine if a system has real solutions, in physics to check if a projectile reaches a target, and in many optimization problems.`,
      keyPoints: [
        'Discriminant: Δ = b² - 4ac',
        'Δ > 0: two distinct real solutions',
        'Δ = 0: one repeated real solution',
        'Δ < 0: two complex solutions',
      ],
      examples: [
        'x² - 5x + 6 = 0: Δ = 25-24 = 1 (two solutions)',
        'x² - 4x + 4 = 0: Δ = 16-16 = 0 (one solution)',
        'x² + 2x + 5 = 0: Δ = 4-20 = -16 (complex)',
      ],
    },
    'Factorization': {
      topic: 'Factorization',
      explanation: `Factorization is like reverse-engineering multiplication! You're breaking down a quadratic into two simpler expressions that multiply together. It's one of the most elegant ways to solve quadratics when it works.

The goal is to write ax² + bx + c as (px + q)(rx + s). When you can do this, solving becomes easy - just set each factor to zero! It's based on the zero product property: if A × B = 0, then either A = 0 or B = 0.

Not all quadratics factor nicely with integers, but when they do, it's the fastest method. Look for two numbers that multiply to give 'ac' and add to give 'b'. With practice, you'll develop an intuition for which quadratics factor easily.`,
      keyPoints: [
        'Breaks quadratic into product of two factors',
        'Form: (x + p)(x + q) = 0',
        'Solutions are x = -p and x = -q',
        'Only works when factors are rational',
      ],
      examples: [
        'x² + 5x + 6 = (x+2)(x+3)',
        'x² - 9 = (x+3)(x-3) (difference of squares)',
        '2x² + 7x + 3 = (2x+1)(x+3)',
      ],
    },
    'Real-World Applications': {
      topic: 'Real-World Applications',
      explanation: `Quadratics aren't just abstract math - they're everywhere in the real world! Any time something follows a curved path or has a maximum/minimum point, quadratics are probably involved.

In physics, projectile motion (throwing a ball, launching a rocket) follows a parabolic path. Engineers use quadratics to design bridges, arches, and satellite dishes. In business, profit functions are often quadratic - there's an optimal price point that maximizes revenue. Even in biology, population growth can follow quadratic patterns.

Understanding quadratics lets you model and predict real phenomena. Want to know when a ball hits the ground? Use quadratics. Want to maximize profit? Use quadratics. Want to design the perfect arch? You guessed it - quadratics!`,
      keyPoints: [
        'Projectile motion in physics',
        'Profit optimization in business',
        'Architectural design (arches, bridges)',
        'Area and perimeter problems',
      ],
      examples: [
        'Ball trajectory: h(t) = -16t² + 64t + 5',
        'Profit function: P(x) = -2x² + 100x - 500',
        'Bridge arch: y = -0.01x² + 50',
      ],
    },
    'Complex Roots': {
      topic: 'Complex Roots',
      explanation: `Complex roots might sound scary, but they're actually quite beautiful! When the discriminant is negative, we can't take the square root of a negative number in the real number system - so we extend to complex numbers using 'i', where i² = -1.

Complex roots always come in conjugate pairs: if a + bi is a solution, then a - bi is also a solution. This symmetry is elegant! Even though you can't plot them on a regular x-y graph, complex roots are incredibly important in engineering, physics, and signal processing.

Think of complex numbers as 2D numbers - they have a real part and an imaginary part. In electrical engineering, they describe alternating current. In quantum mechanics, they describe wave functions. Complex roots aren't just mathematical curiosities - they're essential tools in advanced applications!`,
      keyPoints: [
        'Occur when discriminant < 0',
        'Involve imaginary unit i where i² = -1',
        'Always come in conjugate pairs',
        'Form: x = a ± bi',
      ],
      examples: [
        'x² + 4 = 0 has solutions x = ±2i',
        'x² - 2x + 5 = 0 has solutions x = 1 ± 2i',
        'Used in electrical engineering and quantum physics',
      ],
    },
  };

  return (
    explanationBank[topicName] || {
      topic: topicName,
      explanation: 'This topic explores important mathematical concepts that build on your existing knowledge.',
      keyPoints: ['Understanding the fundamentals', 'Applying to problems', 'Connecting to other topics'],
      examples: ['Example 1', 'Example 2'],
    }
  );
}

/**
 * Generate a hint for a quiz question
 * Uses AI to provide contextual help without giving away the answer
 */
export async function generateHint(question: string, options: string[]): Promise<string> {
  // In production, this would call OpenAI API for dynamic hints
  // For now, return a generic helpful hint
  return "Think about the key concepts we just learned. Try eliminating options that don't make sense first.";
}

/**
 * Generate a conversational AI response to user's query
 * Uses Ollama offline LLM server for privacy and local processing
 *
 * @param userQuery - The user's question or message
 * @param isDiscovery - If true, returns short snippet for topic discovery
 * @returns Promise with AI's response as a string
 */
export async function generateChatResponse(userQuery: string, isDiscovery: boolean = false): Promise<string> {
  try {
    const systemPrompt = isDiscovery
      ? "You are a concise AI math tutor. Provide brief, clear explanations (1-2 sentences) that introduce mathematical concepts. Keep responses under 150 words. Focus on giving enough information to understand the concept without overwhelming."
      : "You are a friendly and knowledgeable AI math tutor. Help users understand mathematical concepts clearly and engagingly. Be conversational, encouraging, and use simple language. If the user asks about non-math topics, politely redirect back to math or explain how math relates to it.";

    const prompt = `${systemPrompt}\n\nUser: ${userQuery}`;
    const ollamaResponse = await callLocalLLM(prompt, isDiscovery);

    if (ollamaResponse) {
      return ollamaResponse;
    }

    // Fallback to simulated response if Ollama fails
    console.warn('Ollama call failed for chat, using simulated response');
    return simulateChatResponse(userQuery, isDiscovery);
  } catch (error) {
    console.error('Error generating chat response:', error);
    return simulateChatResponse(userQuery, isDiscovery);
  }
}

/**
 * Fallback simulated responses for demo when OpenAI API is unavailable
 * Provides intelligent responses based on query analysis
 * @param userQuery - The user's question
 * @param isDiscovery - If true, returns short snippet responses
 */
function simulateChatResponse(userQuery: string, isDiscovery: boolean = false): string {
  const query = userQuery.toLowerCase().trim();

  // Greetings
  if (query.match(/\b(hello|hi|hey|greetings|welcome)\b/)) {
    return "Hello! 👋 I'm your AI math tutor, ready to help you explore the fascinating world of mathematics. What mathematical concept would you like to dive into today? You can ask about algebra, geometry, calculus, statistics, or any math topic! 🌟";
  }

  // Algebraic concepts
  if (query.includes('linear equation')) {
    return "A linear equation relates two variables with a straight-line graph. It has the form Ax + By = C, where solutions form an infinite line. To solve systems of linear equations, use substitution, elimination, or graphing methods. These appear in business for cost analysis and physics for motion! 📈";
  }

  if (query.includes('system') && query.includes('equation')) {
    return "Systems of equations involve multiple equations with shared variables. You can solve them using substitution (replace one variable), elimination (add/subtract equations), or matrices. Each method has its advantages depending on the system's complexity. Ready for an example? 🔢";
  }

  if (query.includes('matrix') || query.includes('matrices')) {
    return "Matrices are rectangular arrays of numbers, perfect for representing systems of equations, transformations, and data. You can add, multiply, and find determinants. Matrix multiplication AB ≠ BA (non-commutative). In computer graphics, they transform images and 3D models! 🎮";
  }

  if (query.includes('polynomial')) {
    return "Polynomials are algebraic expressions like 3x³ - 2x² + x - 7. Degree indicates the highest power. Operations include addition, subtraction, multiplication, and division. The factor and remainder theorems help with factoring and roots. Understanding polynomials is key to calculus! 🧮";
  }

  // Geometric concepts
  if (query.includes('triangle')) {
    return "Triangles are fundamental 2D shapes with three sides and three angles totaling 180°. Py Lecture theorems (Pythagorean), trigonometric ratios (SOHCAHTOA), and area formulas (½ base × height) are essential. They're everywhere: from building roofs to computer graphics rendering. 🔺";
  }

  if (query.includes('circle')) {
    return "A circle is all points equidistant from a center point with radius r. The equation x² + y² = r² represents the unit circle. Circumference = 2πr, area = πr². Circles appear in physics (circular motion), astronomy (orbits), and engineering (gears, wheels) 💫";
  }

  if (query.includes('volume') || query.includes('area')) {
    return "Area measures 2D space while volume measures 3D space. For a rectangle: area = length × width, volume = area × height. Spheres: area = 4πr², volume = (4/3)πr³. These calculations are crucial in architecture, farming, and manufacturing! 📐";
  }

  // Trigonometric concepts
  if (query.includes('trigonometry') || query.includes('trig')) {
    return "Trigonometry studies relationships between angles and sides in triangles and circles. Key functions: sin(θ), cos(θ), tan(θ) = sin(θ)/cos(θ). Right triangle ratios: SOHCAHTOA. Unit circle with period 0-360° repeats every 2π radians. Essential for physics, astronomy, and engineering! 📏";
  }

  if (query.includes('sin') || query.includes('cos') || query.includes('tan')) {
    return "Sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent for right triangles. On the unit circle: sin(θ) = y-coordinate, cos(θ) = x-coordinate. Identities like sin²(θ) + cos²(θ) = 1, sin(2θ) = 2sinθcosθ are fundamental. Applications in waves, oscillations, and navigation! 🌊";
  }

  // Quadratic concepts (maintain existing)
  if (query.includes('quadratic')) {
    return "Quadratic equations like ax² + bx + c = 0 have degree 2. Solutions are roots where y = 0 on the parabola graph. Solve using: 1) Factoring (easy when a=1), 2) Quadratic formula x = (-b ± √(b²-4ac))/(2a), or 3) Completing the square. The discriminant b²-4ac reveals root nature! 📈";
  }

  if (query.includes('parabola')) {
    return "Parabolas are U-shaped quadratic curves symmetrical through the vertex. Standard form y = ax² + bx + c, vertex form y = a(x-h)² + k. When a > 0 opens upward, when a < 0 opens downward. Vertex is the maximum/minimum point. Satellite dishes, fountains, and missile trajectories follow parabolic paths! 🚀";
  }

  if (query.includes('discriminant')) {
    return "The discriminant Δ = b² - 4ac in the quadratic formula determines root characteristics. If Δ > 0: two distinct real roots, Δ = 0: one repeated real root, Δ < 0: two complex conjugate roots. This helps predict without solving, useful in physics for projectile landing points! 🎯";
  }

  // Calculus concepts
  if (query.includes('derivative')) {
    return "The derivative represents instantaneous rate of change. For f(x), f'(x) is the slope of the tangent line. Basic rules: constant rule, power rule, product/quotient/sum rules. Chain rule for composite functions. Applications: velocity (position derivative), optimization, and curve sketching! 📈";
  }

  if (query.includes('integral') || query.includes('integration')) {
    return "Integration finds the total accumulated value, opposite of differentiation. Definite integrals ∫ f(x)dx from a to b represent areas. Fundamental theorem links differentiation and integration: d/dx[∫f(t)dt] = f(x). Applications in areas, volumes, and probability distributions! 📊";
  }

  if (query.includes('limit')) {
    return "Limits define function behavior as x approaches a value - not the function value itself. Used for continuity, derivatives, and infinity. One-sided limits (from left/right) help with discontinuities. Key for understanding calculus foundations and singularities! 🔍";
  }

  // Statistics concepts
  if (query.includes('probability')) {
    return "Probability measures event likelihood from 0 (impossible) to 1 (certain). P(A) for single events, P(A and B) for joint, P(A or B) for either. Conditional probability P(A|B) and Bayes' theorem help update beliefs. Essential for decision-making under uncertainty! 🎲";
  }

  if (query.includes('statistics') || query.includes('mean') || query.includes('average')) {
    return "Statistics summarizes data meaningfully. Measures of center: mean (average), median (middle value), mode (most frequent). Spread: standard deviation, range, variance. Normal distribution (bell curve) is fundamental with μ ± σ containing 68% of values. Z-scores standardize for comparison! 📊";
  }

  // Problem-solving hints
  if (query.includes('solve') || query.includes('solution') || query.includes('answer')) {
    return "When solving problems, break them into smaller steps. 1) Read carefully and identify given variables, 2) Determine what you're solving for, 3) Choose the appropriate method/algorithm, 4) Show all work step-by-step, 5) Verify your solution makes sense. Practice regularly builds mathematical intuition! 💡";
  }

  if (query.includes('prove') || query.includes('proof')) {
    return "Mathematical proofs require logical reasoning. Common methods: direct proof (assume and deduce), proof by contradiction (show opposite leads to contradiction), inductive proof (base case + inductive step). Always start with definitions and work from known facts. Elegant proofs are both convincing and beautiful! ✨";
  }

  // Gratitude/thanks
  if (query.includes('thank')) {
    return "You're very welcome! Mathematics is like a grand puzzle with infinite pieces to explore. Each concept builds connections to others, creating a beautiful web of understanding. What other mathematical mysteries would you like to unravel? 🌟";
  }

  // Generic fallback with suggestions based on question type
  if (query.includes('?')) {
    return "That's a thoughtful question! While I can help with many mathematical topics, could you be more specific? For example, you might ask about algebraic equations, geometric shapes, calculus concepts, probability, or any math topic. I'm here to help you understand! 🔭";
  }

  if (query.length > 50) {
    return "That's quite a detailed statement! If you're sharing a problem or concept, I can help break it down and explain the mathematical principles involved. You could also ask specific questions about algebra, geometry, calculus, statistics, or trigonometry. What would you like to explore? 🤔";
  }

  return "I'm here to help you with any mathematical questions! You can ask about algebra, geometry, calculus, statistics, trigonometry, or any math topic. Whether it's solving equations, understanding concepts, or applications in the real world, I'm ready to assist! What would you like to learn about? 🤓";
}
