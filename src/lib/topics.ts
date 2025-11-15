/**
 * Topic cluster data for Quadratics and related mathematical concepts
 * Defines the galaxy map structure with interconnected topics
 */

import { Topic, QuizQuestion, TopicLesson } from './types';

/**
 * Complete galaxy map with multiple topic clusters
 * Each cluster represents a major area of mathematics with interconnected subtopics
 */
export const GALAXY_TOPICS: Topic[] = [
  // === ALGEBRA CLUSTER (Top-Left) ===
  {
    id: 'algebra-overview',
    name: 'Introduction to Algebra',
    description: 'Foundation of algebraic thinking and operations',
    difficulty: 'beginner',
    position: { x: -400, y: -300 },
    connectedTopics: ['linear-equations', 'systems-of-equations', 'polynomials'],
    captured: false,
    unlocked: false,
    color: '#3b82f6', // Blue
  },
  {
    id: 'linear-equations',
    name: 'Linear Equations',
    description: 'Mastering ax + b = c equations',
    difficulty: 'beginner',
    position: { x: -500, y: -200 },
    connectedTopics: ['algebra-overview', 'systems-of-equations'],
    captured: false,
    unlocked: false,
    color: '#60a5fa',
  },
  {
    id: 'systems-of-equations',
    name: 'Systems of Equations',
    description: 'Solving multiple equations simultaneously',
    difficulty: 'intermediate',
    position: { x: -400, y: -150 },
    connectedTopics: ['linear-equations', 'algebra-overview', 'matrices'],
    captured: false,
    unlocked: false,
    color: '#93c5fd',
  },
  {
    id: 'polynomials',
    name: 'Polynomials',
    description: 'Operations with polynomial expressions',
    difficulty: 'intermediate',
    position: { x: -300, y: -250 },
    connectedTopics: ['algebra-overview', 'rational-functions'],
    captured: false,
    unlocked: false,
    color: '#dbeafe',
  },
  {
    id: 'matrices',
    name: 'Matrices & Vectors',
    description: 'Matrix operations and vector spaces',
    difficulty: 'advanced',
    position: { x: -350, y: -100 },
    connectedTopics: ['systems-of-equations'],
    captured: false,
    unlocked: false,
    color: '#1e40af',
  },
  {
    id: 'rational-functions',
    name: 'Rational Functions',
    description: 'Functions with polynomials in numerator and denominator',
    difficulty: 'advanced',
    position: { x: -250, y: -200 },
    connectedTopics: ['polynomials'],
    captured: false,
    unlocked: false,
    color: '#1d4ed8',
  },

  // === QUADRATICS CLUSTER (Center) ===
  {
    id: 'quadratic-equations',
    name: 'Quadratic Equations',
    description: 'Understanding equations of the form ax² + bx + c = 0',
    difficulty: 'beginner',
    position: { x: 0, y: 0 }, // Center of the galaxy - starting point
    connectedTopics: ['quadratic-formula', 'parabola-graphs', 'factorization', 'algebra-overview'],
    captured: false,
    unlocked: true, // Starting point
    color: '#8b5cf6', // Purple
  },
  {
    id: 'quadratic-formula',
    name: 'Quadratic Formula',
    description: 'Solving quadratics using x = (-b ± √(b²-4ac)) / 2a',
    difficulty: 'beginner',
    position: { x: 120, y: -80 },
    connectedTopics: ['quadratic-equations', 'discriminant', 'complex-roots'],
    captured: false,
    unlocked: false,
    color: '#a78bfa',
  },
  {
    id: 'parabola-graphs',
    name: 'Parabola Graphs',
    description: 'Visual representation of quadratic functions',
    difficulty: 'beginner',
    position: { x: -120, y: -80 },
    connectedTopics: ['quadratic-equations', 'vertex-form', 'real-world-applications'],
    captured: false,
    unlocked: false,
    color: '#c4b5fd',
  },
  {
    id: 'vertex-form',
    name: 'Vertex Form',
    description: 'Expressing quadratics as a(x-h)² + k',
    difficulty: 'intermediate',
    position: { x: -160, y: 40 },
    connectedTopics: ['parabola-graphs', 'completing-square'],
    captured: false,
    unlocked: false,
    color: '#ddd6fe',
  },
  {
    id: 'completing-square',
    name: 'Completing the Square',
    description: 'Algebraic technique to convert to vertex form',
    difficulty: 'intermediate',
    position: { x: -80, y: 120 },
    connectedTopics: ['vertex-form', 'quadratic-formula', 'quadratic-equations'],
    captured: false,
    unlocked: false,
    color: '#f0e5ff',
  },
  {
    id: 'discriminant',
    name: 'Discriminant',
    description: 'Understanding b² - 4ac and nature of roots',
    difficulty: 'intermediate',
    position: { x: 160, y: 40 },
    connectedTopics: ['quadratic-formula', 'complex-roots'],
    captured: false,
    unlocked: false,
    color: '#9c6ade',
  },
  {
    id: 'factorization',
    name: 'Factorization',
    description: 'Breaking down quadratics into (x-p)(x-q) form',
    difficulty: 'beginner',
    position: { x: 80, y: 120 },
    connectedTopics: ['quadratic-equations', 'quadratic-formula'],
    captured: false,
    unlocked: false,
    color: '#b794f6',
  },
  {
    id: 'real-world-applications',
    name: 'Real-World Applications',
    description: 'Using quadratics in physics, engineering, and economics',
    difficulty: 'advanced',
    position: { x: -200, y: -160 },
    connectedTopics: ['parabola-graphs', 'vertex-form'],
    captured: false,
    unlocked: false,
    color: '#6b21a8',
  },
  {
    id: 'complex-roots',
    name: 'Complex Roots',
    description: 'Understanding solutions when discriminant is negative',
    difficulty: 'advanced',
    position: { x: 200, y: -160 },
    connectedTopics: ['discriminant', 'quadratic-formula'],
    captured: false,
    unlocked: false,
    color: '#7c2d92',
  },

  // === GEOMETRY CLUSTER (Top-Right) ===
  {
    id: 'geometry-basics',
    name: 'Geometry Foundations',
    description: 'Points, lines, polygons, and basic shapes',
    difficulty: 'beginner',
    position: { x: 400, y: -300 },
    connectedTopics: ['triangles', 'quadrilaterals', 'circles', 'area-volume'],
    captured: false,
    unlocked: false,
    color: '#10b981', // Emerald
  },
  {
    id: 'triangles',
    name: 'Triangles & Trigonometry',
    description: 'Triangle properties and trigonometric functions',
    difficulty: 'beginner',
    position: { x: 500, y: -200 },
    connectedTopics: ['geometry-basics', 'trigonometric-functions'],
    captured: false,
    unlocked: false,
    color: '#34d399',
  },
  {
    id: 'quadrilaterals',
    name: 'Quadrilaterals',
    description: 'Properties of four-sided polygons',
    difficulty: 'beginner',
    position: { x: 300, y: -250 },
    connectedTopics: ['geometry-basics'],
    captured: false,
    unlocked: false,
    color: '#6ee7b7',
  },
  {
    id: 'circles',
    name: 'Circles & Arcs',
    description: 'Circle theorems and circle geometry',
    difficulty: 'intermediate',
    position: { x: 400, y: -150 },
    connectedTopics: ['geometry-basics', 'area-volume'],
    captured: false,
    unlocked: false,
    color: '#4ade80',
  },
  {
    id: 'area-volume',
    name: 'Area & Volume',
    description: 'Surface areas and volumes of 2D/3D shapes',
    difficulty: 'intermediate',
    position: { x: 350, y: -100 },
    connectedTopics: ['geometry-basics', 'circles', 'coordinate-geometry'],
    captured: false,
    unlocked: false,
    color: '#16a34a',
  },
  {
    id: 'coordinate-geometry',
    name: 'Coordinate Geometry',
    description: 'Geometry using coordinate planes and formulas',
    difficulty: 'advanced',
    position: { x: 280, y: -50 },
    connectedTopics: ['area-volume'],
    captured: false,
    unlocked: false,
    color: '#15803d',
  },

  // === TRIGONOMETRY CLUSTER (Right) ===
  {
    id: 'trigonometric-functions',
    name: 'Trig Functions',
    description: 'Sin, cos, tan and their properties',
    difficulty: 'intermediate',
    position: { x: 350, y: 0 },
    connectedTopics: ['triangles', 'trig-identities', 'trig-equations', 'inverse-trig'],
    captured: false,
    unlocked: false,
    color: '#f59e0b', // Amber
  },
  {
    id: 'trig-identities',
    name: 'Trig Identities',
    description: 'Fundamental relationships between trigonometric functions',
    difficulty: 'intermediate',
    position: { x: 280, y: 50 },
    connectedTopics: ['trigonometric-functions', 'trig-equations'],
    captured: false,
    unlocked: false,
    color: '#fbbf24',
  },
  {
    id: 'trig-equations',
    name: 'Trig Equations',
    description: 'Solving equations involving trigonometric functions',
    difficulty: 'advanced',
    position: { x: 320, y: 80 },
    connectedTopics: ['trig-identities', 'trigonometric-functions'],
    captured: false,
    unlocked: false,
    color: '#f59e0b',
  },
  {
    id: 'inverse-trig',
    name: 'Inverse Trig Functions',
    description: 'Arcsin, arccos, arctan and their applications',
    difficulty: 'advanced',
    position: { x: 400, y: 50 },
    connectedTopics: ['trigonometric-functions'],
    captured: false,
    unlocked: false,
    color: '#d97706',
  },

  // === CALCULUS CLUSTER (Bottom-Right) ===
  {
    id: 'limits',
    name: 'Limits & Continuity',
    description: 'Understanding limits and continuous functions',
    difficulty: 'intermediate',
    position: { x: 400, y: 300 },
    connectedTopics: ['derivatives', 'calculus-overview', 'functions-analysis'],
    captured: false,
    unlocked: false,
    color: '#ef4444', // Red
  },
  {
    id: 'functions-analysis',
    name: 'Functions Analysis',
    description: 'Analyzing functions before calculus concepts',
    difficulty: 'beginner',
    position: { x: 300, y: 250 },
    connectedTopics: ['limits', 'series-sequences'],
    captured: false,
    unlocked: false,
    color: '#f87171',
  },
  {
    id: 'derivatives',
    name: 'Derivatives',
    description: 'Rates of change, slopes, and tangent lines',
    difficulty: 'intermediate',
    position: { x: 450, y: 200 },
    connectedTopics: ['limits', 'integrals', 'applications-derivatives'],
    captured: false,
    unlocked: false,
    color: '#dc2626',
  },
  {
    id: 'integrals',
    name: 'Integrals',
    description: 'Anti-derivatives, definite integrals, and areas',
    difficulty: 'advanced',
    position: { x: 350, y: 150 },
    connectedTopics: ['derivatives', 'applications-integrals'],
    captured: false,
    unlocked: false,
    color: '#b91c1c',
  },
  {
    id: 'applications-derivatives',
    name: 'Applications of Derivatives',
    description: 'Optimization, rates, and related rates problems',
    difficulty: 'advanced',
    position: { x: 500, y: 250 },
    connectedTopics: ['derivatives'],
    captured: false,
    unlocked: false,
    color: '#991b1b',
  },
  {
    id: 'applications-integrals',
    name: 'Applications of Integrals',
    description: 'Areas, volumes, and other integration applications',
    difficulty: 'advanced',
    position: { x: 450, y: 120 },
    connectedTopics: ['integrals'],
    captured: false,
    unlocked: false,
    color: '#7f1a1a',
  },

  // === STATISTICS CLUSTER (Bottom-Left) ===
  {
    id: 'basic-statistics',
    name: 'Descriptive Statistics',
    description: 'Mean, median, mode, standard deviation, and data visualization',
    difficulty: 'beginner',
    position: { x: -400, y: 300 },
    connectedTopics: ['probability', 'data-analysis', 'regression'],
    captured: false,
    unlocked: false,
    color: '#0ea5e9', // Sky
  },
  {
    id: 'probability',
    name: 'Probability',
    description: 'Basic probability concepts and calculations',
    difficulty: 'beginner',
    position: { x: -500, y: 200 },
    connectedTopics: ['basic-statistics', 'statistics-inference'],
    captured: false,
    unlocked: false,
    color: '#0284c7',
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Analyzing and interpreting statistical data',
    difficulty: 'intermediate',
    position: { x: -300, y: 250 },
    connectedTopics: ['basic-statistics', 'regression'],
    captured: false,
    unlocked: false,
    color: '#0369a1',
  },
  {
    id: 'regression',
    name: 'Regression Analysis',
    description: 'Understanding relationships between variables',
    difficulty: 'intermediate',
    position: { x: -350, y: 200 },
    connectedTopics: ['data-analysis', 'basic-statistics'],
    captured: false,
    unlocked: false,
    color: '#075985',
  },
  {
    id: 'statistics-inference',
    name: 'Statistical Inference',
    description: 'Hypothesis testing and confidence intervals',
    difficulty: 'advanced',
    position: { x: -450, y: 150 },
    connectedTopics: ['probability'],
    captured: false,
    unlocked: false,
    color: '#1e3a8a',
  },

  // === FUTURE EXPANSION CLUSTERS - UNDER CONSTRUCTION ===

  // Upper-Left Expansion Cluster
  {
    id: 'future-topic-1',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -600, y: -400 },
    connectedTopics: ['algebra-overview'],
    captured: false,
    unlocked: false,
    color: '#6b7280', // Gray
  },
  {
    id: 'future-topic-2',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -700, y: -250 },
    connectedTopics: ['linear-equations'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-3',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -550, y: -150 },
    connectedTopics: ['systems-of-equations'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-4',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -650, y: 0 },
    connectedTopics: ['matrices'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Lower-Right Expansion Cluster
  {
    id: 'future-topic-5',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 700, y: 400 },
    connectedTopics: ['limits'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-6',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 600, y: 550 },
    connectedTopics: ['derivatives'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-7',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: 750, y: 300 },
    connectedTopics: ['integrals'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Lower-Left Expansion Cluster
  {
    id: 'future-topic-8',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -600, y: 400 },
    connectedTopics: ['basic-statistics'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-9',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -700, y: 550 },
    connectedTopics: ['probability'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-10',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -800, y: 300 },
    connectedTopics: ['regression'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Outer Rings - Remote Systems
  {
    id: 'future-topic-11',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: -800, y: -500 },
    connectedTopics: ['future-topic-1'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-12',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 800, y: 650 },
    connectedTopics: ['future-topic-6'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-13',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -850, y: 650 },
    connectedTopics: ['future-topic-9'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-14',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: 850, y: -400 },
    connectedTopics: ['trigonometric-functions'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-15',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: 400, y: -500 },
    connectedTopics: ['parabola-graphs'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // === MASSIVE GALAXY EXPANSION - DEEP SPACE SYSTEMS ===

  // Ultra-Remote Systems (Far Upper Left)
  {
    id: 'future-topic-16',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: -1000, y: -800 },
    connectedTopics: ['future-topic-11'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-17',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -900, y: -900 },
    connectedTopics: ['future-topic-1'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-18',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -1100, y: -600 },
    connectedTopics: ['future-topic-3'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-19',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: -1200, y: -400 },
    connectedTopics: ['future-topic-4'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-20',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -950, y: -300 },
    connectedTopics: ['future-topic-1'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Ultra-Remote Systems (Far Upper Right)
  {
    id: 'future-topic-21',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 1200, y: -600 },
    connectedTopics: ['future-topic-14'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-22',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: 1000, y: -800 },
    connectedTopics: ['future-topic-15'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-23',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: 1100, y: -300 },
    connectedTopics: ['trigonometric-functions'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-24',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 950, y: -500 },
    connectedTopics: ['future-topic-14'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Ultra-Remote Systems (Far Lower Right)
  {
    id: 'future-topic-25',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: 1000, y: 800 },
    connectedTopics: ['future-topic-12'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-26',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: 900, y: 950 },
    connectedTopics: ['future-topic-5'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-27',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 1200, y: 700 },
    connectedTopics: ['future-topic-7'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Ultra-Remote Systems (Far Lower Left)
  {
    id: 'future-topic-28',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -1000, y: 900 },
    connectedTopics: ['future-topic-13'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-29',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: -1200, y: 600 },
    connectedTopics: ['future-topic-10'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-30',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -950, y: 750 },
    connectedTopics: ['future-topic-8'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // === ULTRA-DEEP COSMIC EXPANSION - NEXT GENERATION SYSTEMS ===

  // Hyper-Remote Systems (Extremely Far Upper Left)
  {
    id: 'future-topic-31',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: -1300, y: -1000 },
    connectedTopics: ['future-topic-16'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-32',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -1200, y: -1100 },
    connectedTopics: ['future-topic-17'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-33',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: -1400, y: -800 },
    connectedTopics: ['future-topic-18'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-34',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -1150, y: -1200 },
    connectedTopics: ['future-topic-19'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-35',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -1050, y: -950 },
    connectedTopics: ['future-topic-20'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Hyper-Remote Systems (Extremely Far Upper Right)
  {
    id: 'future-topic-36',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 1400, y: -800 },
    connectedTopics: ['future-topic-21'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-37',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: 1300, y: -1000 },
    connectedTopics: ['future-topic-22'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-38',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: 1500, y: -500 },
    connectedTopics: ['future-topic-23'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-39',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 1250, y: -600 },
    connectedTopics: ['future-topic-24'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Hyper-Remote Systems (Extremely Far Lower Right)
  {
    id: 'future-topic-40',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: 1300, y: 1000 },
    connectedTopics: ['future-topic-25'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-41',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: 1150, y: 1100 },
    connectedTopics: ['future-topic-26'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-42',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: 1500, y: 900 },
    connectedTopics: ['future-topic-27'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },

  // Hyper-Remote Systems (Extremely Far Lower Left)
  {
    id: 'future-topic-43',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'intermediate',
    position: { x: -1300, y: 1100 },
    connectedTopics: ['future-topic-28'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-44',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'advanced',
    position: { x: -1500, y: 800 },
    connectedTopics: ['future-topic-29'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
  {
    id: 'future-topic-45',
    name: 'Under Construction',
    description: 'Future mathematical topic coming soon!',
    difficulty: 'beginner',
    position: { x: -1150, y: 950 },
    connectedTopics: ['future-topic-30'],
    captured: false,
    unlocked: false,
    color: '#6b7280',
  },
];

/**
 * Get a topic by its ID (backward compatible with QUADRATICS_CLUSTER)
 */
export const getTopicById = (id: string): Topic | undefined => {
  return GALAXY_TOPICS.find((topic) => topic.id === id);
};

/**
 * Get all topics connected to a given topic
 */
export const getConnectedTopics = (topicId: string): Topic[] => {
  const topic = getTopicById(topicId);
  if (!topic) return [];

  return topic.connectedTopics
    .map((id) => getTopicById(id))
    .filter((t): t is Topic => t !== undefined);
};

/**
 * Check if a topic should be unlocked based on captured topics
 * A topic is unlocked if at least one of its connected topics is captured
 */
export const shouldUnlockTopic = (topicId: string, capturedTopics: string[]): boolean => {
  const topic = getTopicById(topicId);
  if (!topic) return false;

  // Already unlocked topics stay unlocked
  if (topic.unlocked) return true;

  // Check if any connected topic is captured
  return topic.connectedTopics.some((connectedId) => capturedTopics.includes(connectedId));
};

// Backward compatibility
export const QUADRATICS_CLUSTER = GALAXY_TOPICS;

/**
 * Keyword-to-topic mapping for intelligent topic unlocking
 * Maps common keywords/phrases to corresponding topic IDs
 */
export const KEYWORD_TOPIC_MAP: Record<string, string[]> = {
  // Algebra keywords
  'algebra': ['algebra-overview'],
  'linear equation': ['linear-equations'],
  'system of equations': ['systems-of-equations', 'matrices'],
  'matrix': ['matrices', 'systems-of-equations'],
  'polynomial': ['polynomials', 'rational-functions'],
  'rational function': ['rational-functions'],
  'vector': ['matrices'],

  // Quadratic keywords
  'quadratic': ['quadratic-equations'],
  'quadratic formula': ['quadratic-formula', 'quadratic-equations'],
  'quadratic equation': ['quadratic-equations'],
  'parabola': ['parabola-graphs', 'quadratic-equations'],
  'vertex form': ['vertex-form', 'parabola-graphs'],
  'vertex': ['vertex-form', 'parabola-graphs'],
  'completing square': ['completing-square', 'vertex-form'],
  'completing the square': ['completing-square', 'vertex-form'],
  'discriminant': ['discriminant', 'quadratic-formula'],
  'factorization': ['factorization', 'quadratic-equations'],
  'factoring': ['factorization', 'quadratic-equations'],
  'complex root': ['complex-roots', 'discriminant'],
  'imaginary root': ['complex-roots', 'discriminant'],
  'real world': ['real-world-applications', 'parabola-graphs'],

  // Geometry keywords
  'geometry': ['geometry-basics'],
  'triangle': ['triangles', 'geometry-basics'],
  'pythagorean': ['triangles', 'geometry-basics'],
  'pythagorean theorem': ['triangles', 'geometry-basics'],
  'quadrilateral': ['quadrilaterals', 'geometry-basics'],
  'circle': ['circles', 'area-volume'],
  'area': ['area-volume', 'geometry-basics'],
  'volume': ['area-volume', 'geometry-basics'],
  'coordinate geometry': ['coordinate-geometry', 'area-volume'],


  'trigonometry': ['trigonometric-functions', 'triangles'],
  'trig': ['trigonometric-functions', 'triangles'],
  'sine': ['trigonometric-functions', 'triangles'],
  'cosine': ['trigonometric-functions', 'triangles'],
  'tangent': ['trigonometric-functions', 'triangles'],
  'sin': ['trigonometric-functions', 'triangles'],
  'cos': ['trigonometric-functions', 'triangles'],
  'tan': ['trigonometric-functions', 'triangles'],
  'trig identity': ['trig-identities', 'trigonometric-functions'],
  'trig equation': ['trig-equations', 'trig-identities'],
  'inverse trig': ['inverse-trig', 'trigonometric-functions'],

  // Calculus keywords
  'calculus': ['limits', 'functions-analysis'],
  'limit': ['limits', 'functions-analysis'],
  'continuity': ['limits', 'functions-analysis'],
  'derivative': ['derivatives', 'limits'],
  'integral': ['integrals', 'derivatives'],
  'integration': ['integrals', 'derivatives'],
  'differentiation': ['derivatives', 'limits'],
  'fundamental theorem': ['integrals', 'derivatives'],
  'optimization': ['applications-derivatives'],
  'related rates': ['applications-derivatives'],
  'maxima': ['applications-derivatives'],
  'minima': ['applications-derivatives'],
  'area integration': ['applications-integrals'],
  'volume integration': ['applications-integrals'],

  // Statistics keywords
  'statistics': ['basic-statistics'],
  'probability': ['probability', 'basic-statistics'],
  'mean': ['basic-statistics'],
  'median': ['basic-statistics'],
  'mode': ['basic-statistics'],
  'average': ['basic-statistics'],
  'standard deviation': ['basic-statistics'],
  'data analysis': ['data-analysis', 'basic-statistics'],
  'regression': ['regression', 'data-analysis'],
  'statistical inference': ['statistics-inference', 'probability'],
  'hypothesis testing': ['statistics-inference'],
  'confidence interval': ['statistics-inference'],
};

/**
 * Extract topic IDs that match keywords from user query
 */
export const getTopicsFromQuery = (query: string): string[] => {
  const queryWords = query.toLowerCase().trim();
  const matchedTopicIds = new Set<string>();

  // Check each keyword in the map
  Object.entries(KEYWORD_TOPIC_MAP).forEach(([keyword, topicIds]) => {
    if (queryWords.includes(keyword)) {
      topicIds.forEach(topicId => matchedTopicIds.add(topicId));
    }
  });

  // If no matches, try partial matching
  if (matchedTopicIds.size === 0) {
    const partialMatches = queryWords.split(/\s+/).filter(word => word.length > 3);
    Object.entries(KEYWORD_TOPIC_MAP).forEach(([keyword, topicIds]) => {
      partialMatches.forEach(word => {
        if (keyword.includes(word) || word.includes(keyword.split(' ')[0])) {
          topicIds.forEach(topicId => matchedTopicIds.add(topicId));
        }
      });
    });
  }

  return Array.from(matchedTopicIds);
};

/**
 * Get content lessons for a specific topic
 * Including theory, visualizations, and interactive elements
 */
export const getTopicLessons = (topicId: string): TopicLesson => {
  const lessonBank: Record<string, TopicLesson> = {
    'quadratic-equations': {
      topicId: 'quadratic-equations',
      title: 'Quadratic Equations',
      introduction: 'Quadratic equations are like the "curvy" equations of algebra. Just as a ball thrown in the air follows a curved path, quadratic equations describe parabolic curves and are fundamental to understanding motion, physics, and many real-world phenomena.',
      sections: [
        {
          title: 'What Makes an Equation Quadratic?',
          content: `A quadratic equation is any equation that can be written in the form:

ax² + bx + c = 0

Where:
• **a, b, c** are coefficients (numbers)
• **x** is the variable we're solving for
• **a ≠ 0** (if a = 0, it becomes linear)

The "quadratic" comes from "quad" meaning square - it involves x², a squared term.`,
          visualType: 'interactive-graph',
          visualData: {
            type: 'quadratic-form',
            expression: 'y = a*x*x + b*x + c',
            parameters: [
              { name: 'a', min: -3, max: 3, default: 1, label: 'Coefficient a' },
              { name: 'b', min: -5, max: 5, default: 0, label: 'Coefficient b' },
              { name: 'c', min: -5, max: 5, default: 0, label: 'Coefficient c' }
            ],
            hint: 'Adjust the sliders to see how each coefficient transforms the parabolic curve!'
          }
        },
        {
          title: 'Real-World Projectile Motion',
          content: `Quadratic equations perfectly describe how objects move through the air under gravity:

🎯 **Basketball Trajectory**: h(t) = -16t² + 32t + 6
🏈 **Football Throw**: h(t) = -16t² + 45t + 8
🎾 **Tennis Serve**: h(t) = -16t² + 55t + 7

The negative coefficient of t² creates the downward pull of gravity, while the linear term controls the initial launch speed and angle.`,
          visualType: 'scenario-visualization',
          visualData: {
            scenario: 'basketball-shot',
            initialData: { height: 10, angle: 45, speed: 15, time: 0 },
            controls: [
              { name: 'angle', min: 30, max: 60, default: 45, label: 'Launch Angle', unit: '°' },
              { name: 'speed', min: 10, max: 25, default: 15, label: 'Launch Speed', unit: 'm/s' }
            ],
            display: 'Ball position at 2 seconds: x={horizontal}m, h={vertical}m',
            animation: true
          }
        }
      ],
      keyTakeaways: [
        'Standard form: ax² + bx + c = 0 where a ≠ 0',
        'Describes parabolic curves and projectile motion',
        'Solutions represent where parabola touches x-axis',
        'Used everywhere from sports to engineering!'
      ]
    },



    'quadratic-formula': {
      topicId: 'quadratic-formula',
      title: 'The Quadratic Formula',
      introduction: 'Like a master key that unlocks any quadratic equation, the quadratic formula works every time to find solutions. Understanding it is like learning the ultimate algebraic technique!',
      sections: [
        {
          title: 'The Master Formula',
          content: `For any quadratic equation ax² + bx + c = 0:

**x = [-b ± √(b²-4ac)] / (2a)**

This formula:
• Works for EVERY quadratic equation
• Gives two solutions (the ± symbol)
• Comes from completing the square for general case

**Key term**: The discriminant Δ = b²-4ac
• If Δ > 0: Two real solutions
• If Δ = 0: One real solution
• If Δ < 0: Two complex solutions`,
          visualType: 'interactive-graph',
          visualData: {
            calculator: 'quadratic-solver',
            inputs: [
              { name: 'a', default: 1, label: 'a' },
              { name: 'b', default: -5, label: 'b' },
              { name: 'c', default: 6, label: 'c' }
            ],
            display: 'Solutions: x₁ = {solution1}, x₂ = {solution2}',
            explanation: 'Watch how changing coefficients affects the solutions!'
          }
        },
        {
          title: 'Why It Works: Completing the Square',
          content: `The quadratic formula derives from completing the square:

For ax² + bx + c = 0, divide by a:
x² + (b/a)x + c/a = 0

Complete the square:
x² + (b/a)x = -(c/a)
x² + (b/a)x + (b/2a)² = -(c/a) + (b/2a)²

This becomes: [x + (b/2a)]² = discriminant/4a²
Then take square roots and solve!

Thus we get the formula: x = [-b ± √(b²-4ac)]/(2a)`,
          visualType: 'step-by-step-visualization',
          visualData: {
            steps: [
              { equation: 'x² + (b/a)x + c/a = 0', highlight: 'x² + px' },
              { equation: '(x + b/2a)² - (b/2a)² = -c/a', highlight: 'complete square' },
              { equation: '(x + b/2a)² = (b²-4ac)/(4a²)', highlight: 'move terms' },
              { equation: 'x + b/2a = ±√[(b²-4ac)/(4a²)]', highlight: 'square root both sides' },
              { equation: 'x = [-b ± √(b²-4ac)]/(2a)', highlight: 'solve and simplify!' }
            ]
          }
        }
      ],
      keyTakeaways: [
        'x = [-b ± √(b²-4ac)]/(2a) works for all quadratics',
        'Discriminant reveals number of solutions',
        'Practice solving equations using the formula',
        'Remember: watch for complex number solutions'
      ]
    },

    'parabola-graphs': {
      topicId: 'parabola-graphs',
      title: 'Graphing Quadratic Functions',
      introduction: 'Parabolas are the beautiful U-shaped curves that quadratic functions create. Understanding their shape reveals how quadratics behave and why they appear everywhere in nature and technology.',
      sections: [
        {
          title: 'What is a Parabola?',
          content: `A parabola is the set of all points equidistant from a point (focus) and a line (directrix).

For quadratic functions y = ax² + bx + c:
• **Vertex**: Highest/lowest point of the curve
• **Axis of symmetry**: Vertical line through vertex
• **Direction**: Opens up (a > 0) or down (a < 0)

The coefficient 'a' controls the parabola's width and direction - larger |a| means narrower curve.`,
          visualType: 'interactive-graph',
          visualData: {
            type: 'parabola-explorer',
            expression: 'y = a*x*x + b*x + c',
            parameters: [
              { name: 'a', min: -3, max: 3, default: 1, label: 'Width/Direction (a)' },
              { name: 'b', min: -5, max: 5, default: 0, label: 'Horizontal Shift' },
              { name: 'c', min: -5, max: 5, default: 0, label: 'Vertical Shift' }
            ],
            markers: ['vertex', 'axis-of-symmetry', 'x-intercepts']
          }
        },
        {
          title: 'Real World: Satellite Dish',
          content: `Satellite dishes use parabolic shapes to focus signals:

📡 **Signal collection**: Parallel incoming waves reflect to focal point
🏞️ **Symmetry**: Perfect mirror-image reflection
🎯 **Focus point**: Where maximum signal strength is concentrated

The parabola ensures EVERY parallel ray reflects to the exact same focal point, gathering weak signals from space into a strong signal at the receiver.`,
          visualType: 'image-interactive',
          visualData: {
            imageUrl: '/visuals/satellite-dish.svg',
            annotationPoints: [
              { x: 20, y: 20, label: 'Vertex (bottom of dish)', color: 'red' },
              { x: 35, y: 25, label: 'Focus (receiver location)', color: 'blue' },
              { x: 50, y: 30, label: 'Class II satellite', color: 'green' },
              { x: 70, y: 35, label: 'Parabolic surface', color: 'orange' }
            ],
            interactiveElements: [
              { type: 'ray-tracer', start: [0, 0], direction: 'parallel', color: 'yellow' }
            ]
          }
        }
      ],
      keyTakeaways: [
        'Parabolas are U-shaped curves symmetric through vertex',
        'Opens up (a > 0) or down (a < 0) depending on a',
        'Vertex at (h,k) where h=-b/(2a), k = 4ac-b²/(4a)',
        'x-intercepts are the equation solutions (when y=0)'
      ]
    },

    'vertex-form': {
      topicId: 'vertex-form',
      title: 'Vertex Form of Quadratic Equations',
      introduction: 'Vertex form reveals the secrets of parabolas! Unlike standard form, vertex form immediately shows us the vertex (highest/lowest point) and makes graphing quadratics intuitive and quick.',
      sections: [
        {
          title: 'What is Vertex Form?',
          content: `Vertex form: y = a(x - h)² + k

**The Vertex is at point (h, k)!**

Where:
• **a** controls width and direction (same as standard form)
• **h** = x-coordinate of vertex
• **k** = y-coordinate of vertex

**Example**: y = 2(x - 3)² + 5 has vertex at (3, 5)

This form comes from standard form ax² + bx + c by completing the square!`,
          visualType: 'interactive-graph',
          visualData: {
            type: 'vertex-manipulator',
            expression: 'y = a*(x - h)*(x - h) + k',
            parameters: [
              { name: 'a', min: -2, max: 2, default: 1, label: 'Width factor' },
              { name: 'h', min: -5, max: 5, default: 0, label: 'Vertex x (h)' },
              { name: 'k', min: -5, max: 5, default: 0, label: 'Vertex y (k)' }
            ],
            highlightPoints: [{ x: 'h', y: 'k', label: 'Vertex', color: 'red' }]
          }
        },
        {
          title: 'From Standard to Vertex Form',
          content: `Converting is just completing the square:

**Start**: y = x² + 6x - 2

**Complete square**: y = (x² + 6x + 9) - 9 - 2
                  = (x + 3)² - 11

**Vertex form**: y = (x - (-3))² + (-11)

This reveals the vertex at (-3, -11)!

**Pattern**: x² + bx = (x + b/2)² - (b/2)²
Coefficient becomes h = -b/(2a), k = c - b²/(4a)`,
          visualType: 'conversion-steps',
          visualData: {
            standardForm: 'y = x² + 6x - 2',
            steps: [
              { description: 'Identify a, b, c', equation: 'a=1, b=6, c=-2' },
              { description: 'h = -b/(2a)', calculation: 'h = -6/(2*1) = -3' },
              { description: 'k = c - b²/(4a)', calculation: 'k = -2 - 36/(4*1) = -2 - 9 = -11' },
              { description: 'Vertex form', equation: 'y = (x - (-3))² + (-11)' }
            ]
          }
        },
        {
          title: 'Applications in Optimization',
          content: `Vertex form helps find maximum/minimum values:

📈 **Profit Maximization**: Find peak profit point
📈 **Cost Optimization**: Minimize production costs
🚀 **Physics**: Find maximum projectile height

For y = -0.5(x - 10)² + 100, the vertex (10, 100) shows the projectile reaches maximum 100 units high at x = 10 time units.`,
          visualType: 'scenario-visualization',
          visualData: {
            scenario: 'profit-optimization',
            equation: 'y = -0.1*x*x + 10*x',
            interpretation: 'Maximum profit of $50 occurs at production level x=50',
            controls: [
              { name: 'fixedCosts', min: 0, max: 100, default: 20, label: 'Fixed Costs' },
              { name: 'pricePerUnit', min: 5, max: 25, default: 10, label: 'Price per Unit' }
            ],
            graph: 'profit-curve'
          }
        }
      ],
      keyTakeaways: [
        'Vertex form: y = a(x - h)² + k',
        'Vertex located at coordinate (h, k)',
        'h and k immediately visible (no calculation needed)',
        'Perfect for sketching parabolas quickly',
        'Used in optimization problems requiring max/min values'
      ]
    },

    'completing-square': {
      topicId: 'completing-square',
      title: 'Completing the Square',
      introduction: 'Completing the square is an algebraic magic trick that transforms quadratic expressions into perfect squares. This technique unlocks vertex form and is the key to deriving the quadratic formula!',
      sections: [
        {
          title: 'What is Completing the Square?',
          content: `For expression x² + bx, we add/subtract to form (x + n)²:

**Goal**: Create a perfect square trinomial
**Method**: Add (b/2)² inside the parentheses

**Example**: x² + 6x
Add (6/2)² = 9: x² + 6x + 9
Subtract 9: (x + 3)² - 9

Original expression = x² + 6x
Completed square = (x + 3)² - 9

The -9 compensates for the +9 we added!`,
          visualType: 'interactive-algebra-tile',
          visualData: {
            tiles: [
              { type: 'x-squared', count: 1 },
              { type: 'x', count: 6 },
              { type: 'constant', count: 0 }
            ],
            target: 'perfect-square',
            hint: 'Add tiles to form a perfect square!',
            reveal: 'Must add 9 x-terms and 9 constants, then remove 9 constants'
          }
        },
        {
          title: 'Step-by-Step Process',
          content: `Solve x² + 8x + 3 = 0 by completing square:

**Step 1**: Move constant to right: x² + 8x = -3

**Step 2**: Take half of x coefficient, square it:
8/2 = 4, 4² = 16

**Step 3**: Add 16 to both sides:
x² + 8x + 16 = -3 + 16
x² + 8x + 16 = 13

**Step 4**: Factor left side:
(x + 4)² = 13

**Step 5**: Square root both sides:
x + 4 = ±√13

**Step 6**: Solve: x = -4 ± √13`,
          visualType: 'step-by-step-equation-solver',
          visualData: {
            equation: 'x² + 8x + 3 = 0',
            steps: [
              { action: 'Move constant', result: 'x² + 8x = -3' },
              { action: 'Half coeff, square', result: 'Half = 4, 4² = 16' },
              { action: 'Add to both sides', result: '(x² + 8x + 16) = -3 + 16' },
              { action: 'Factor', result: '(x + 4)² = 13' },
              { action: 'Square root', result: 'x + 4 = ±√13' },
              { action: 'Solve', result: 'x = -4 ± √13' }
            ],
            highlight: 'current-step'
          }
        },
        {
          title: 'Visual Understanding',
          content: `Geometrically, completing the square shows how a quadratic relates to a perfect square shifted by a constant:

**Original**: x² + 8x + 3 looks like a parabola
**After completing**: (x + 4)² - 13 look like same parabola shifted left by 4 and down by 13

This transformation reveals the vertex (minimum point) and makes solving equations much easier!

In the coordinate plane, it's like moving the origin of the parabola.`,
          visualType: 'transformation-animations',
          visualData: {
            original: 'y = x² + 8x + 3',
            completed: 'y = (x + 4)² - 13',
            transformations: [
              'x-coordinate shift: -4 units',
              'y-coordinate shift: -13 units'
            ],
            interactive: 'hover-to-see-transformations'
          }
        }
      ],
      keyTakeaways: [
        'Completing square: x² + bx → (x + b/2)² - (b/2)²',
        'Used to find vertex form and solve quadratics',
        'Derives the quadratic formula',
        'Transforms quadratics into shifted perfect squares',
        'Takes the "x" term and makes it a perfect square'
      ]
    },

    'geometry-basics': {
      topicId: 'geometry-basics',
      title: 'Geometry Fundamentals',
      introduction: 'Geometry studies shapes, sizes, properties of space. From ancient Greek philosophers measuring the Earth to modern architects designing skyscrapers, geometry is the mathematics of shape and form.',
      sections: [
        {
          title: 'Points, Lines, and Planes',
          content: `Geometry starts with fundamental building blocks:

**Point**: Zero-dimensional location (just a spot)
• Represented by dot •
• No size, only position

**Line**: One-dimensional, infinite in both directions
• Straight path extending forever
• Has direction and length but no width

**Plane**: Two-dimensional flat surface
• Extends infinitely in all directions
• Contains lines and points

**Angle**: Figure formed by two rays sharing endpoint
• Measured in degrees (°) or radians`,
          visualType: 'geometry-construction',
          visualData: {
            tools: ['point-tool', 'line-tool', 'ray-tool', 'angle-measure'],
            interactive: true,
            snapToGrid: true,
            showLabels: true
          }
        },
        {
          title: 'Polygons and Their Families',
          content: `Polygons are closed shapes formed by line segments:

**Triangles** (3 sides): Scalene, Isosceles, Equilateral
**Quadrilaterals** (4 sides): Squares, Rectangles, Parallelograms, Trapezoids
**Pentagons** (5 sides): Regular or irregular
**Hexagons** (6 sides): Honeycomb patterns, stop signs

**Special properties**:
• **Regular**: All sides equal, all angles equal
• **Convex**: All interior angles < 180°
• **Concave**: Has at least one interior angle > 180°`,
          visualType: 'shape-gallery',
          visualData: {
            categories: [
              { name: 'Triangles', shapes: ['scalene', 'isosceles', 'equilateral', 'right'] },
              { name: 'Quadrilaterals', shapes: ['square', 'rectangle', 'parallelogram', 'rhombus', 'trapezoid'] },
              { name: 'Pentagons', shapes: ['regular-pentagon', 'sailing', 'irregular'] },
              { name: 'Hexagons', shapes: ['regular-hexagon', 'honeycomb'] }
            ],
            interactive: 'hover-to-see-properties',
            showAngles: true
          }
        },
        {
          title: 'Ancient Greek Contributions',
          content: `Greek philosophers revolutionized mathematics:

🔺 **Thales**: First mathematical principles (600 BCE)
• Water levels prove equal对应的 angles

🔺 **Pythagoras**: Famous theorem (500 BCE)
• a² + b² = c² for right triangles

🔺 **Euclid**: "Elements" foundation (300 BCE)
• 23-plane geometry volumes
• First formal mathematical proof

🔺 **Archimedes**: Advanced techniques (200 BCE)
• Pi calculation, infinite series
• Buoyant principle discovery`,
          visualType: 'timeline-visualization',
          visualData: {
            periods: [
              { name: 'Thales (620-546 BCE)', contribution: 'Angle relationships' },
              { name: 'Pythagoras (570-495 BCE)', contribution: 'a² + b² = c²' },
              { name: 'Euclid (325-265 BCE)', contribution: 'Elements textbook' },
              { name: 'Archimedes (287-212 BCE)', contribution: 'Pi, Buoyancy' }
            ],
            highlights: ['Firstly proven theorems', 'systematic deductive approach']
          }
        }
      ],
      keyTakeaways: [
        'Points, lines, planes are geometry foundations',
        'Angles measured in degrees between 0°-360°',
        'Polygons classified by side count and properties',
        'Regular polygons have congruent sides and angles',
        'Ancient Greeks laid geometry foundations'
      ]
    },

    'triangles': {
      topicId: 'triangles',
      title: 'Triangles & Trigonometry',
      introduction: 'Triangles are the most stable shapes in nature. From suspension bridges to pyramids, triangles provide strength and reveal fundamental relationships between angles and sides through trigonometry.',
      sections: [
        {
          title: 'Triangle Classification',
          content: `Triangles categorized by sides and angles:

**By Sides**:
• **Equilateral**: All sides equal (all angles 60°)
• **Isosceles**: Two sides equal (two angles equal)
• **Scalene**: All sides different (all angles different)

**By Angles**:
• **Acute**: All angles < 90°
• **Right**: One angle = 90°
• **Obtuse**: One angle > 90°

The sum of interior angles in any triangle = 180°!`,
          visualType: 'triangle-classifier',
          visualData: {
            editableTriangle: true,
            showAngleMeasurements: true,
            highlightType: true,
            construction: 'drag-vertices'
          }
        },
        {
          title: 'Pythagorean Theorem',
          content: `For any right triangle with legs a, b, and hypotenuse c:

**a² + b² = c²**

**Applications**:
• **Distance formula**: Distance between (x₁,y₁), (x₂,y₂):
  √[(x₂-x₁)² + (y₂-y₁)²]

• **Diagonals**: Rectangle diagonal = √(l² + w²)

• **3-4-5 triangles**: Perfect right triangles (3²+4²=5², 6²+8²=10², etc.)

Sadly Pythagoras was tortured for his numerical discoveries...`,
          visualType: 'pythagorean-explorer',
          visualData: {
            triangle: 'editable-right-triangle',
            showSquares: ['area-a', 'area-b', 'area-c'],
            equality: 'highlight-that-a²+b²=c²',
            presets: ['3-4-5 triangle', '5-12-13 triangle', '8-15-17 triangle']
          }
        },
        {
          title: 'Trigonometric Functions',
          content: `In right triangles, trig ratios relate angles to sides:

**SOH CAH TOA**:
• **Sin θ** = Opposite / Hypotenuse
• **Cos θ** = Adjacent / Hypotenuse  
• **Tan θ** = Opposite / Adjacent

**Example**: In a right triangle:
• If angle B is 30° and hypotenuse is 12
• Sin 30° = (1/2) = oppositeOverview / 12
• So opposite = 6, adjacent = √(12²-6²) = √108 ≈ 10.39`,
          visualType: 'trig-calculator',
          visualData: {
            triangle: 'right-triangle-with-angle-slider',
            input: ['angle', 'one-side'],
            output: ['all-trig-ratios', 'missing-sides'],
            sohcahtoa: 'highlight-applicable-ratio',
            unitCircle: 'show-connection'
          }
        },
        {
          title: 'Real World Architecture',
          content: `Triangles in building design:

🏗️ **Bridges**: Truss designs use triangles for strength
🗼 **Skyscrapers**: Triangular bracing prevents swaying
🏢 **Roofs**: Triangular framing distributes weight
🏞️ **Dams**: Triangular cross-sections for stability

**Why triangles**? They cannot be deformed without changing side lengths - geometrical stability produces structural strength.

**Quadrilaterals** collapse easily, but **triangles** maintain rigidity!`,
          visualType: 'architecture-showcase',
          visualData: {
            structures: [
              { name: 'Bridge Trusses', image: 'bridge.svg', explanation: 'Triangles distribute weight evenly' },
              { name: 'Roof Framing', image: 'roof.svg', explanation: 'Triangular rafters support loads' },
              { name: 'Dam Cross-Section', image: 'dam.svg', explanation: 'Triangular shapes resist water pressure' },
              { name: 'Space Truss', image: 'space-truss.svg', explanation: '3D triangular frameworks' }
            ]
          }
        }
      ],
      keyTakeaways: [
        'Triangle angles sum to 180°',
        'Pythagorean theorem: a² + b² = c² for right triangles',
        'Trigonometric ratios: sin, cos, tan relate angles to sides',
        'Triangles provide structural stability in architecture',
        'Used extensively in surveying, navigation, and physics'
      ]
    },

    'derivatives': {
      topicId: 'derivatives',
      title: 'Derivatives: Rates of Change',
      introduction: 'Derivatives measure how things change. They reveal velocities, accelerations, slopes, and help us understand the "instantaneous" behavior of functions through their tangent lines at any point.',
      sections: [
        {
          title: 'What is a Derivative?',
          content: `The derivative measures instantaneous rate of change - like velocity is the "rate of change" of position over time.

**Geometric meaning**: Slope of the tangent line to the curve at a point.

**Notation**:
• f'(x) - prime notation
• d/dx[f(x)] - Leibniz notation
• df/dx - Leibniz (differential form)

For f(x) = x², the derivative f'(x) = 2x gives the slope at each point.

The tangent line touches the curve at exactly one point and has the same slope.`,
          visualType: 'tangent-line-explorer',
          visualData: {
            function: 'f(x) = x²',
            interactivePoint: true,
            showTangent: true,
            showSlope: true,
            zoom: 'adjustable',
            hint: 'Move the point to see how tangent slope changes'
          }
        },
        {
          title: 'Power Rule and Basic Rules',
          content: `Essential derivative rules:

**Power Rule**: d/dx[x^n] = n * x^(n-1)
Example: d/dx[x³] = 3x²

**Constant Multiple**: d/dx[c * f(x)] = c * f'(x)
Example: d/dx[5x³] = 5 * 3x² = 15x²

**Sum Rule**: d/dx[f(x) + g(x)] = f'(x) + g'(x)
Example: d/dx[x² + x + 1] = 2x + 1 + 0 = 2x + 1

**Special cases**:
• d/dx[constant] = 0 (horizontal line)
• d/dx[x] = 1 (diagonal line)`,
          visualType: 'rule-demonstrator',
          visualData: {
            examples: [
              { function: 'x²', derivative: '2x', explanation: 'Power rule: n=2' },
              { function: 'x³', derivative: '3x²', explanation: 'Power rule: n=3' },
              { function: '√x', derivative: '1/(2√x)', explanation: 'Power rule with fraction' },
              { function: '5', derivative: '0', explanation: 'Constant derivatives are zero' }
            ],
            interactive: 'practice-with-examples'
          }
        },
        {
          title: 'Physics Applications',
          content: `Derivatives describe motion:

**Velocity = distance'** = dx/dt
**Acceleration = velocity'** = dv/dt = d²x/dt²

Example: If position s(t) = 16t² - 3t + 10:
• Velocity v(t) = 32t - 3 ft/sec
• Acceleration a(t) = 32 ft/sec²

This shows an object thrown upward (negative acceleration due to gravity) with initial upward velocity of 3 ft/sec.`,
          visualType: 'physics-simulator',
          visualData: {
            scenario: 'thrown-ball',
            equation: 's(t) = -16t² + vt + h',
            showPosition: true,
            showVelocity: true,
            showAcceleration: true,
            interactive: ['initial-velocity', 'height', 'launch-angle'],
            graph: 'position-over-time'
          }
        },
        {
          title: 'Rates of Change Problems',
          content: `Real-world rate problems:

💰 **Business**: Profit maximization
For P(x) = -x² + 100x - 400:
P'(x) = -2x + 100 = 0 when x=50 (produce 50 items)
P''(x) = -2 < 0, so maximum profit!

🏃 **Sports**: Velocity analysis
Runner speed v(t) = -0.1t² + 8t mph.
At t=40 hours: v(40) = -0.1*1600 + 8*40 = -160 + 320 = 160 mph maximum!`,
          visualType: 'optimization-explorer',
          visualData: {
            problems: [
              {
                type: 'profit-maximization',
                equation: 'P(x) = -2x² + 100x - 500',
                solution: 'x=25 maximizes profit at $1,750'
              },
              {
                type: 'velocity-analysis',
                equation: 'v(t) = t² - 4t + 5',
                solution: 'Peak velocity 5 m/s at t=2 seconds'
              }
            ],
            showCriticalPoints: true
          }
        }
      ],
      keyTakeaways: [
        'Derivative measures instantaneous rate of change',
        'Power rule: d/dx[x^n] = n*x^(n-1)',
        'Constant rule: derivative of constant is zero',
        'Used extensively in physics (velocity, acceleration) and optimization',
        'Geometric meaning: slope of tangent line at a point'
      ]
    },

    'linear-equations': {
      topicId: 'linear-equations',
      title: 'Linear Equations',
      introduction: 'Linear equations describe straight lines and constant rates of change. They model situations where quantities increase or decrease at steady rates, like driving at constant speed or cooling a drink over time.',
      sections: [
        {
          title: 'The Family of Linear Equations',
          content: `Linear equations create straight-line relationships between variables. The basic forms are:

**Slope-Intercept**: y = mx + b
• m = slope (rate of change, steepness)
• b = y-intercept (starting point)

**Standard Form**: Ax + By = C
• A, B, C are coefficients
• Used for elimination and substitution methods

**Point-Slope**: y - y₁ = m(x - x₁)
• Passes through point (x₁, y₁)
• Slope m is given directly`,
          visualType: 'interactive-graph',
          visualData: {
            type: 'line-family',
            expression: 'y = m*x + b',
            parameters: [
              { name: 'm', min: -5, max: 5, default: 2, label: 'Slope (m)' },
              { name: 'b', min: -10, max: 10, default: 3, label: 'Y-intercept (b)' }
            ],
            hint: 'Different slope values create different line families!',
            highlight: 'intercept-and-steepness'
          }
        },
        {
          title: 'Solving Linear Equations',
          content: `Linear equations can have:

**One Solution**: Standard solvable equation
2x + 5 = 19
2x = 14       (subtract 5)
x = 7         (divide by 2)

**Infinite Solutions**: Identity equations
x + 3 = x + 3  (true for all numbers)

**No Solution**: Contradiction equations
x + 2 = x - 1  (never true for any number)

The goal: Isolate the variable using inverse operations.`,
          visualType: 'equation-solver-animation',
          visualData: {
            equations: [
              { original: '2x + 5 = 19', steps: ['2x = 14', 'x = 7'], result: 'One solution: x = 7' },
              { original: 'x + 3 = x + 3', steps: ['3 = 3'], result: 'Infinite solutions (identity)' },
              { original: 'x + 2 = x - 1', steps: ['2 = -1'], result: 'No solution (contradiction)' }
            ],
            interactive: 'step-through-solutions'
          }
        },
        {
          title: 'Real World Applications',
          content: `Linear equations model constant rate situations:

💰 **Salary Calculation**
Salary = hourly_rate × hours_worked + base_pay
S = r × h + b

🏊 **Swimming Pool Filling**
Pool fills at 5 gallons/minute
Volume = rate × time + starting_amount
V = 5t + V₀

📈 **Business Profits**
Profit = price_per_item × sales_volume - fixed_costs
P = p × v - c

These model scenarios where changes happen at constant rates.`,
          visualType: 'scenario-visualizer',
          visualData: {
            scenarios: [
              {
                name: 'Salary Over Time',
                equation: 'y = 25x + 200',
                interpretation: '$25/hour + $200 base pay',
                controls: ['hours-worked']
              },
              {
                name: 'Pool Filling',
                equation: 'y = 5x + 50',
                interpretation: 'Fills 5 gal/min, starts with 50 gal',
                controls: ['minutes-passed']
              }
            ]
          }
        }
      ],
      keyTakeaways: [
        'Linear equations create straight lines',
        'Solutions can be one solution, infinite, or none',
        'Inverse operations isolate the variable',
        'Model constant rate problems in real life'
      ]
    },

    'geometry-basics': {
      topicId: 'geometry-basics',
      title: 'Geometry Fundamentals',
      introduction: 'Geometry studies shapes, sizes, properties of space, and spatial relationships. From ancient Greek philosophers measuring Earth to modern architects designing skyscrapers, geometry reveals the mathematics of form and structure.',
      sections: [
        {
          title: 'Geometric Building Blocks',
          content: `All geometry starts with these basic elements:

**Point** (dimension 0): Exact location, no size
• Represented by dot •
• Position only, zero area

**Line** (dimension 1): Infinite straight path
• Extends forever in both directions
• Has direction and slope, no thickness

**Plane** (dimension 2): Flat infinite surface
• Contains lines and points
• Like sheet of paper extending forever

**Intersection** creates polygon vertices and angles.`,
          visualType: 'geometry-primitive-builder',
          visualData: {
            tools: ['point-drawer', 'line-connector', 'plane-indicator'],
            displayMode: '3d-space',
            interactive: 'drag-to-create',
            labeling: 'automatic'
          }
        },
        {
          title: 'Angle Fundamentals',
          content: `Angles measure rotation between two rays sharing a vertex:

**Acute** (< 90°): Sharp angle
• Door opening slightly

**Right** (= 90°): Perfect L-shape
• Corner of paper, text orientation

**Obtuse** (> 90°): Blunt angle
• Triangle wider than right triangle

**Straight** (180°): Straight line

Angle pairs: Adjacent, complementary, supplementary, vertical.

**Measuring**: Clockwise vs counterclockwise, positive vs negative.`,
          visualType: 'angle-theater',
          visualData: {
            examples: [
              { degrees: 30, label: 'Acute', color: 'green' },
              { degrees: 90, label: 'Right', color: 'blue' },
              { degrees: 150, label: 'Obtuse', color: 'red' },
              { degrees: 180, label: 'Straight', color: 'purple' }
            ],
            interactive: 'angle-slider',
            showTypes: true,
            measurementDisplay: 'show-degrees-radians'
          }
        },
        {
          title: 'Ancient Roots of Geometry',
          content: `Geometry as practiced by ancient civilizations:

🇪🇬 **Egyptian Surveying (3000 BCE)**
• Reland surveys after Nile floods
• Practical measurements needed

🇬🇷 **Greek Revolution (600-300 BCE)**
• **Thales**: First mathematical theorems
• **Pythagoras**: Famous right triangle theorem
• **Euclid**: "Elements" - geometry foundation

🏛️ **Islamic Golden Age**: Geometry of art, architecture, astronomy

⚡ **Modern Applications**: GPS systems, computer graphics, nanotechnology

Egyptians needed geometry to retake boundaries when floods washed away landmarks.`,
          visualType: 'historical-gallery',
          visualData: {
            civilizations: [
              {
                name: 'Egyptian',
                time: '3000 BCE',
                achievement: 'Land surveying after floods',
                image: 'egyptian-survey.svg'
              },
              {
                name: 'Greek',
                time: '300 BCE',
                achievement: 'Euclid\'s Elements',
                image: 'greek-geometry.svg'
              },
              {
                name: 'Islamic',
                time: '1000 CE',
                achievement: 'Geometric Islamic art',
                image: 'islamic-art.svg'
              }
            ]
          }
        }
      ],
      keyTakeaways: [
        'Points, lines, planes are geometry primitives',
        'Angles range from 0° to 360°',
        'Acute (<90°), right (=90°), obtuse (>90°)',
        'Ancient civilization solved practical geometry problems',
        'Modern geometry powers technology from GPS to computers'
      ]
    },

    'triangles': {
      topicId: 'triangles',
      title: 'Triangles & Trigonometry',
      introduction: 'Triangles are the strongest geometric shapes, providing structural stability in bridges and buildings. Their side-angle relationships led to trigonometry - the measurement of triangles and the foundation of right triangle mathematics.',
      sections: [
        {
          title: 'Triangle Classification System',
          content: `Triangles classified by properties:

**By Sides:**
• **Equilateral**: All sides equal, all angles 60°
Perfect symmetry, strongest structure

• **Isosceles**: Two sides equal, two angles equal
Letter A top, mirror symmetry

• **Scalene**: All sides different, all angles different
No symmetry, most common

**By Angles:**
• **Acute**: All angles < 90°
• **Right**: One angle exactly 90°
• **Obtuse**: One angle > 90°`,
          visualType: 'triangle-classifier-interactive',
          visualData: {
            triangles: [
              { type: 'equilateral', sides: [5, 5, 5], angles: [60, 60, 60] },
              { type: 'isosceles', sides: [6, 4, 6], angles: [60, 60, 60] },
              { type: 'scalene', sides: [3, 4, 5], angles: [36.87, 53.13, 90] }
            ],
            interactive: 'drag-vertices',
            showMeasurements: true,
            highlightProperties: true
          }
        },
        {
          title: 'The Pythagorean Theorem',
          content: `For any right triangle with legs a, b and hypotenuse c:

**a² + b² = c²**

**Historical Background:**
• Discovered by Pythagoras of Samos (570-495 BCE)
• Knew for 3-4-5 triangle: 3² + 4² = 9 + 16 = 25 = 5²
• Proof by unknown Greek mathematicians

**Modern Applications:**
• Distance formula: √[(x₂-x₁)² + (y₂-y₁)²]
• Diagonal of rectangle = √(l² + w²)
• Triangular roof support calculations

Triangles with integer side lengths are called Pythagorean triples.`,
          visualType: 'pythagorean-theorem-visualizer',
          visualData: {
            triangle: { a: 3, b: 4, c: 5 },
            showSquares: [{ side: 'a', area: 9, color: 'blue' }, { side: 'b', area: 16, color: 'red' }, { side: 'c', area: 25, color: 'green' }],
            equality: 'a² + b² = c² (9 + 16 = 25)',
            interactive: 'adjust-triangle-sides',
            history: 'show-ancient-discovery'
          }
        },
        {
          title: 'Trigonometric Functions',
          content: `In right triangles, trig functions relate angles to sides:

**SOH CAH TOA**: Memory device

• **Sin θ** = Opposite/Hypotenuse
• **Cos θ** = Adjacent/Hypotenuse
• **Tan θ** = Opposite/Adjacent = Sin θ/Cos θ

**Example**: In right triangle with angle 30°:
Sin 30° = (√3/2) ÷ 1 = √3/2 = Opposite/Hypotenuse
Cos 30° = (3/2) ÷ 1 = √3/2 ÷ 2 = Adjacent/Hypotenuse
Tan 30° = (√3/2) ÷ (3/2) = 1/√3 = Opposite/Adjacent`,
          visualType: 'trig-function-demonstrator',
          visualData: {
            triangle: { hypotenuse: 10, angle: 30, opposite: 5, adjacent: '8.66' },
            functions: [
              { name: 'sin', ratio: '5/10 = 0.5', description: 'Opposite over hypotenuse' },
              { name: 'cos', ratio: '8.66/10 ≈ 0.866', description: 'Adjacent over hypotenuse' },
              { name: 'tan', ratio: '5/8.66 ≈ 0.577', description: 'Opposite over adjacent' }
            ],
            interactive: 'change-angle',
            unitCircle: 'show-connection'
          }
        },
        {
          title: 'Engineering Applications',
          content: `Triangles provide structural strength:

🔨 **Truss Bridges**: Triangle webs distribute weight
No collapsing when loaded - geometrically stable

🏗️ **Roof Support**: Rafter triangles transfer roof weight
To attic, to load-bearing walls, to foundation

🏔️ **Navigation**: Triangulation locates unknown points
GPS uses triangle distance measurements

🔭 **Surveying**: Theodolites measure triangle properties
Map creation and land division

Any 4+ sided shape can be decomposed into triangles for analysis.`,
          visualType: 'structural-analysis',
          visualData: {
            structures: [
              {
                type: 'bridge-truss',
                breakdown: '21 triangles support 100 tons',
                analysis: 'Load distributed evenly through triangles'
              },
              {
                type: 'house-rafters',
                breakdown: 'Multiple triangles support roof',
                analysis: '45° pitch creates equal load distribution'
              }
            ],
            physics: 'show-force-vectors',
            comparison: 'show-vs-quadrilaterals'
          }
        }
      ],
      keyTakeaways: [
        'Triangle angles sum to 180°',
        'Types: equilateral, isosceles, scalene by sides',
        'Pythagorean theorem: a² + b² = c² for right triangles',
        'Trig functions: sin, cos, tan relate angles to sides',
        'Strongest geometric shape for structural support'
      ]
    },

    'derivatives': {
      topicId: 'derivatives',
      title: 'Derivatives: Rates of Change',
      introduction: 'Derivatives measure how things change over time or space. They reveal velocities, accelerations, slopes - answering "how fast?" and "how much steeper?" questions through the mathematics of instantaneous change.',
      sections: [
        {
          title: 'What is Instantaneous Change?',
          content: `Derivatives answer: "How fast is this changing RIGHT NOW?"

**Average rate**: Change in distance ÷ change in time
Average speed = mileage ÷ hours

**Instantaneous rate**: Speedometer reading
Same time period shrinks to zero

**Derivative**: Mathematical limit as time interval approaches zero
f'(x) = lim (h→0) [(f(x+h) - f(x))/h]

Geometrically: Slope of tangent line at a point.

For f(x) = x² at x=2:
• Tangent slope = f'(2) = 2×2 = 4
• Function increases 4 units for every unit right.`,
          visualType: 'tangent-comparison',
          visualData: {
            function: 'f(x) = x²',
            comparison: [
              { type: 'secant', points: [1, 3], slope: 2, color: 'blue', label: 'Average rate' },
              { type: 'secant', points: [2, 2.5], slope: 3, color: 'blue', label: 'Closer point' },
              { type: 'secant', points: [2, 2.1], slope: 3.1, color: 'blue', label: 'Even closer' },
              { type: 'tangent', point: 2, slope: 4, color: 'red', label: 'Instantaneous rate' }
            ],
            interactive: 'limit-zoom'
          }
        },
        {
          title: 'Power Rule & Basic Rules',
          content: `Derivative rules give us computation power:

**Power Rule**: d/dx[x^n] = n * x^(n-1)
• d/dx[x²] = 2x (parabola steepens with x)
• d/dx[x³] = 3x² (cubic grows faster)
• d/dx[x⁴] = 4x³ (quartic growth rates)

**Constant Multiple**: d/dx[c * f(x)] = c * f'(x)
• d/dx[5x³] = 5 * 3x² = 15x²
• Coefficient just multiplies derivative

**Sum Rule**: d/dx[f(x) + g(x)] = f'(x) + g'(x)
• d/dx[x² + x] = 2x + 1
• Add individual derivatives`,
          visualType: 'rule-application',
          visualData: {
            rules: [
              {
                rule: 'Power Rule',
                example: 'd/dx[x³] = 3x²',
                application: 'Polynomial derivatives increase exponent'
              },
              {
                rule: 'Constant Multiple',
                example: 'd/dx[5x²] = 5⋅2x = 10x',
                application: 'Just multiply by constant'
              },
              {
                rule: 'Sum Rule',
                example: 'd/dx[x² + x + 1] = 2x + 1 + 0',
                application: 'Derivative of sum = sum of derivatives'
              }
            ],
            interactive: 'practice-examples'
          }
        },
        {
          title: 'Velocity & Acceleration',
          content: `Derivatives describe motion:

**Position**: s(t) - where you are
• Like a car's odometer

**Velocity**: v(t) = s'(t) - how fast you're going
• Speedometer reading
• Positive: moving right, negative: moving left

**Acceleration**: a(t) = v'(t) - how speed changes
• Gas pedal vs brakes
• Positive: speeding up, negative: slowing down

Example: Thrown baseball
s(t) = -16t² + 75t + 4 (height in feet, t in seconds)
v(t) = -32t + 75 (velocity: -32 ft/sec²)
a(t) = -32 (constant gravity acceleration)
Maximum height when v(t) = 0: t = 75/32 ≈ 2.34 seconds`,
          visualType: 'motion-analyzer',
          visualData: {
            motion: {
              type: 'thrown-object',
              equation: 's(t) = -16t² + 75t + 4',
              derivatives: [
                { name: 'Velocity', equation: 'v(t) = -32t + 75', meaning: 'Speed and direction' },
                { name: 'Acceleration', equation: 'a(t) = -32', meaning: 'Gravity\'s constant pull' }
              ]
            },
            interactive: 'change-initial-speed',
            criticalPoint: 'at t=75/32 ≈2.34s, velocity=0',
            path: 'parabolic-trajectory'
          }
        },
        {
          title: 'Applications: Optimization',
          content: `Derivatives find maximum/minimum values (critical points):

**Business Example: Optimal Price**
Profit P(x) = -x² + 100x - 500 (x items sold)
P'(x) = -2x + 100 = 0 when x = 50
At x=50: P(50) = -2500 + 5000 - 500 = $2000 maximum

**Physics Example: Ballistic Trajectory**
Height h(t) = -16t² + vt + h₀
Max height when h'(t) = -32t + v = 0, so t = v/32
Peak height = h(t) where t = v/32

**Engineering Example: Optimal Design**
Cost C(x) = fixed + variable/x
C'(x) = 0 gives minimum manufacturing cost`,
          visualType: 'optimization-explorer',
          visualData: {
            scenarios: [
              {
                name: 'Profit Maximization',
                function: 'P(x) = -x² + 100x - 500',
                criticalPoint: 'x=50 items',
                result: 'Maximum profit: $2,000'
              },
              {
                name: 'Cost Minimization',
                function: 'C(x) = 500 + 10000/x',
                criticalPoint: 'x=141.4 units',
                result: 'Minimum cost: $1,000'
              }
            ],
            showCriticalPoints: true,
            derivative: 'zero-when-max/min'
          }
        }
      ],
      keyTakeaways: [
        'Derivative measures instantaneous rate of change',
        'Geometrically: slope of tangent line at a point',
        'Power rule: d/dx[x^n] = n*x^(n-1)',
        'Used for: velocity (position derivative), optimization (find max/min)',
        'Higher derivatives: acceleration (velocity derivative), jerk (acceleration derivative)'
      ]
    },

    'basic-statistics': {
      topicId: 'basic-statistics',
      title: 'Descriptive Statistics',
      introduction: 'Descriptive statistics summarize and describe data sets. Mean, median, and mode tell us "typical" values. Range, variance, and standard deviation measure spread. Visual displays help us understand patterns in data.',
      sections: [
        {
          title: 'Central Tendency: Where is the Middle?',
          content: `Where does data cluster? Three measures of center:

**Mean (Average)**: Sum of all values ÷ number of values
• Formula: Σxᵢ / n
• Affected by extreme values
• Used when data is symmetric

**Median**: Middle value when sorted
• Not affected by extreme values
• Used when data has outliers
• Position (n+1)/2 in ordered list

**Mode**: Most frequent value(s)
• Data can have 1 mode, multiple modes, or none
• Only measure that works with categorical data

**Outlier Effect**: Mean gets pulled by extremes, median stays centered`,
          visualType: 'distribution-comparison',
          visualData: {
            datasets: [
              { name: 'Housing Prices', values: [200, 250, 275, 300, 2000], mean: 605, median: 275, mode: 200 },
              { name: 'Test Scores', values: [85, 90, 95, 100, 95], mean: 93, median: 95, mode: 95 }
            ],
            comparisons: ['median-resists-outliers', 'mode-shows-popularity', 'mean-affected-by-extremes'],
            interactive: 'adjust-outliers'
          }
        },
        {
          title: 'Spread: How Much Variation?',
          content: `Central tendency tells location. Variation tells dispersion:

**Range**: High - Low values
• Simple but ignores distribution shape
• Affected by extremes

**Interquartile Range (IQR)**: Q3 - Q1
• Middle 50% of data
• Not affected by outliers
• 1.5 × IQR above Q3 is outlier

**Variance (σ²)**: Average squared deviation from mean
• Formula: Σ(xᵢ - μ)² / n
• In squared units - hard to interpret
• Important for many statistical calculations

**Standard Deviation (σ)**: Square root of variance
• Formula: √[Σ(xᵢ - μ)² / n]
• In same units as original data
• "Typical deviation" from mean`,
          visualType: 'spread-visualizer',
          visualData: {
            measures: [
              { name: 'Range', value: 8, description: 'Score span 85-93', visual: 'full-width' },
              { name: 'IQR', value: 4, description: 'Middle 50%', visual: 'middle-box' },
              { name: 'Standard Deviation', value: 2.7, description: 'Typical distance from mean', visual: 'most-points-within' }
            ],
            dataset: [85, 87, 89, 89, 90, 91, 91, 91, 91, 93],
            quantileMarks: [86, 91], // Q1 and Q3
            showGaussianFit: true
          }
        },
        {
          title: 'Data Visualization',
          content: `Visual displays make patterns visible:

**Dot Plot**: Simple, shows all values
• Good for small datasets
• Shows gaps and clusters

**Histogram**: Groups data into bins
• Shows frequency distributions
• Bar heights = count per range
• Shape reveals skewness

**Box Plot**: Shows quartiles and outliers
• Median line in box (Q1 to Q3 - 50% of data)
• Whiskers extend to range
• Dots show outliers (1.5 × IQR beyond whiskers)

**Pie Chart**: Shows parts of whole
• Good for proportions of categorical data
• Angles proportional to values`,
          visualType: 'visualization-gallery',
          visualData: {
            displays: [
              {
                type: 'histogram',
                data: [2,3,2,5,8,6,7,3,2,8,5,4,7,6,5],
                bins: '0-2: 1, 3-5: 4, 6-8: 5',
                shape: 'slightly-right-skewed'
              },
              {
                type: 'box-plot',
                quartiles: { q1: 4, median: 6, q3: 7, min: 2, max: 10, outliers: [13] },
                analysis: 'Median 6, IQR 3, possible outlier at 13'
              },
              {
                type: 'scatter-plot',
                points: [[1,2],[2,3],[3,5],[4,4],[5,6],[6,7],[7,3],[8,5],[9,9],[10,6]],
                trend: 'positive-correlation'
              }
            ]
          }
        },
        {
          title: 'Normal Distribution',
          content: `Bell-curve distribution appears everywhere in nature:

**Properties**:
• Mean, median, mode all equal
• Symmetrically distributed around mean
• 68% of data within 1σ of mean
• 95% within 2σ of mean
• 99.7% within 3σ of mean

**Real Examples**:
• Human height/weight distributions
• IQ scores (mean 100, SD 15)
• Measurement errors in science
• Student grades in large classes

**Central Limit Theorem**: Sums of random variables tend toward normal distribution.`,
          visualType: 'normal-distribution-explorer',
          visualData: {
            curve: 'bell-curve',
            percentages: [
              { standardDeviations: 1, percent: 68.3, description: 'Expected range for single trait' },
              { standardDeviations: 2, percent: 95.4, description: 'Very likely range' },
              { standardDeviations: 3, percent: 99.7, description: 'Practically certain range' }
            ],
            interactive: 'change-mean-sd',
            showPercentiles: true,
            highlightStandardDeviations: true
          }
        }
      ],
      keyTakeaways: [
        'Mean: sum ÷ count, median: middle value, mode: most common',
        'Standard deviation measures typical spread from mean',
        'IQR resists outliers better than range',
        'Normal distribution: 68-95-99.7 rule',
        'Choose visualization based on what you want to show'
      ]
    }
  };

  return lessonBank[topicId] || {
    topicId,
    title: 'Topic Lesson',
    introduction: 'This topic explores important mathematical concepts.',
    sections: [],
    keyTakeaways: []
  };
};

/**
 * Get quiz questions for a specific topic
 * In production, these would be generated by AI or fetched from a database
 */
export const getQuizQuestions = (topicId: string): QuizQuestion[] => {
  const quizBank: Record<string, QuizQuestion[]> = {
    'quadratic-equations': [
      {
        id: 'qe-1',
        question: 'What is the standard form of a quadratic equation?',
        options: ['ax + b = 0', 'ax² + bx + c = 0', 'ax³ + bx² + c = 0', 'ax² = 0'],
        correctAnswer: 1,
        explanation: 'The standard form is ax² + bx + c = 0, where a ≠ 0.',
      },
      {
        id: 'qe-2',
        question: 'In the equation 3x² - 5x + 2 = 0, what is the value of coefficient "a"?',
        options: ['2', '-5', '3', '0'],
        correctAnswer: 2,
        explanation: 'The coefficient "a" is the number multiplying x², which is 3.',
      },
      {
        id: 'qe-3',
        question: 'Which of these is NOT a quadratic equation?',
        options: ['x² + 5x = 0', '2x² - 3 = 0', 'x + 7 = 0', 'x² = 16'],
        correctAnswer: 2,
        explanation: 'x + 7 = 0 is a linear equation because it has no x² term.',
      },
      {
        id: 'qe-4',
        question: 'How many solutions can a quadratic equation have?',
        options: ['0', '1', '2', 'infinite'],
        correctAnswer: 3,
        explanation: 'A quadratic equation can have 0, 1, or 2 real solutions, depending on the discriminant.',
      }
    ],
    'linear-equations': [
      {
        id: 'le-1',
        question: 'What does the slope (m) represent in y = mx + b?',
        options: ['Y-intercept', 'Rate of change', 'X-coordinate', 'B constant'],
        correctAnswer: 1,
        explanation: 'The slope m represents the rate of change, or steepness, of the line.',
      },
      {
        id: 'le-2',
        question: 'If a line has slope m = -2, what direction does it go?',
        options: ['Horizontal', 'Vertical', 'Up and to the right', 'Down and to the right'],
        correctAnswer: 3,
        explanation: 'A negative slope means the line goes down as x increases (left to right).',
      },
      {
        id: 'le-3',
        question: 'Solve for x: 2x + 6 = 14',
        options: ['x = 4', 'x = 8', 'x = 28', 'x = 4.5'],
        correctAnswer: 0,
        explanation: 'Subtract 6 from both sides: 2x = 8. Then divide by 2: x = 4.',
      }
    ]
  };

  return quizBank[topicId] || [];
};
