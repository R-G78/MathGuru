/**
 * AI Service for generating personalized math explanations
 * Integrates with OpenAI API to create adaptive learning content
 */

import { AIExplanation } from './types';

/**
 * Generate an AI explanation for a math topic
 * Uses OpenAI API to create personalized, grade-appropriate explanations
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
    // In production, this would call OpenAI API
    // For now, we'll simulate with structured content
    
    const prompt = `You are a friendly math tutor. Explain "${topicName}" (${topicDescription}) in a clear, engaging way. ${
      userQuery ? `The student said: "${userQuery}"` : ''
    }
    
    Provide:
    1. A clear explanation (2-3 paragraphs)
    2. 3-4 key points to remember
    3. 2-3 concrete examples
    
    Use simple language and build intuition before formulas.`;

    // Simulated AI response (in production, replace with actual API call)
    const explanations = getSimulatedExplanation(topicName);
    
    return explanations;
  } catch (error) {
    console.error('Error generating explanation:', error);
    throw new Error('Failed to generate explanation');
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