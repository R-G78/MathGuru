# Math Guru - Development TODO

## Project Overview
An explorative math learning app with galaxy-themed territory capture system for learning quadratics and related topics.

## Tech Stack
- **Frontend Framework**: React with TypeScript
- **UI Library**: Shadcn-ui + Tailwind CSS
- **Animations**: Framer Motion (galaxy animations, territory capture effects)
- **Math Visualizations**: 
  - Wolfram Alpha API (computational graphs)
  - Desmos API (interactive graphs)
  - React-JSXGraph (custom interactive visualizations)
- **AI Integration**: OpenAI API for personalized explanations
- **State Management**: React Context API
- **Graph Visualization**: React Flow (for topic connections)

## File Structure (Max 8 files)
1. **src/App.tsx** - Main app component with routing and state management
2. **src/components/GalaxyMap.tsx** - Interactive galaxy visualization with topic nodes
3. **src/components/LearningSession.tsx** - AI explanation + visualization + quiz flow
4. **src/components/MathVisualization.tsx** - Interactive math graphs (Wolfram + Desmos integration)
5. **src/components/Quiz.tsx** - Mini quiz component for topic mastery
6. **src/lib/topics.ts** - Quadratics topic cluster data structure and relationships
7. **src/lib/ai-service.ts** - LLM integration for generating explanations
8. **src/lib/types.ts** - TypeScript interfaces and types

## Quadratics Topic Cluster (8-9 topics)
1. **Quadratic Equations** (center) - What they are, standard form
2. **Quadratic Formula** - Solving using the formula
3. **Parabola Graphs** - Visual representation
4. **Vertex Form** - Alternative representation
5. **Completing the Square** - Algebraic technique
6. **Discriminant** - Nature of roots
7. **Factorization** - Breaking down quadratics
8. **Real-World Applications** - Physics, engineering uses
9. **Complex Roots** - When discriminant is negative

## Features Implementation
- Galaxy map with animated star/planet nodes
- Smooth capture animations (scale, glow, color transition)
- AI-generated explanations via LLM
- Interactive sliders and parameter manipulation
- Connection lines between related topics
- Progress tracking with visual feedback
- Exploration suggestions based on captured territories

## Development Priority
1. Set up template and dependencies
2. Create topic data structure
3. Build galaxy map visualization
4. Implement AI service integration
5. Create learning session flow
6. Add interactive visualizations
7. Implement quiz system
8. Polish animations and UX