# Math Guru 🌌 - Interactive Mathematics Learning Platform

Math Guru is a galaxy-themed, interactive mathematics learning application built with React, TypeScript, and AI-powered tutoring. Explore 40+ interconnected math topics through gamified territory capture, receive AI explanations, and master mathematics with interactive visualizations.

## ⭐ Features

- **🌌 Galaxy Exploration**: 40 interconnected math topics arranged as celestial territories
- **🤖 AI Tutoring**: Offline Llama 3.1 8B AI for instant math explanations (no API costs!)
- **🎯 Territory Capture**: Master topics through quizzes and unlock related areas
- **📊 Interactive Visualizations**: Live mathematical graphs and scenario simulations
- **💾 Progress Persistence**: Your learning journey saves automatically across sessions
- **🔄 Quiz Retries**: Retry failed quizzes to improve your score

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- Modern web browser with localStorage support

### Installation

```bash
# Clone the repository
git clone https://github.com/R-G78/MathGuru.git
cd MathGuru

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Setup Offline AI Tutoring (Llama 3.1 8B)

#### Option 1: Using Ollama (Recommended)

1. **Install Ollama** for macOS:
   ```bash
   # Download and extract Ollama
   curl -L https://ollama.ai/download/Ollama-darwin.zip -o ollama.zip
   unzip ollama.zip
   sudo mv ollama /usr/local/bin/
   chmod +x /usr/local/bin/ollama
   ```

2. **Pull Llama 3.1 8B model**:
   ```bash
   ollama pull llama3.1:8b
   ```

3. **Start Ollama server** (keep this running):
   ```bash
   ollama serve
   ```
   This runs on `http://localhost:11434`

4. Run the Math Guru app:
   ```bash
   npm run dev
   ```

#### Option 2: Alternative Local LLM Runners
- **LM Studio** - Point API to `localhost:11434`
- **oobabooga/text-generation-webui** - Enable OpenAI compatibility
- Other OpenAI-compatible servers

### Configuration

The app automatically tries the local LLM first (`http://localhost:11434`), falling back to OpenAI GPT if:
- Local server isn't running
- Model unavailable
- API key not configured

**Free with Ollama**: No usage costs, runs entirely offline after initial model download.

## 🧮 Mathematics Topics Covered

### Algebra (6 topics)
- Introduction to Algebra
- Linear Equations & Systems
- Polynomials & Rational Functions
- Matrices & Vectors

### Quadratics Cluster (9 topics)
- Quadratic Equations (Starting Point)
- Quadratic Formula & Discriminant
- Parabola Graphs & Vertex Form
- Completion of the Square & Factorization
- Real-World Applications & Complex Roots

### Geometry (6 topics)
- Geometry Foundations
- Triangles & Trigonometry
- Quadrilaterals, Circles, Area & Volume
- Coordinate Geometry

### Trigonometry (4 topics)
- Trigonometric Functions & Identities
- Trigonometric Equations & Inverse Functions

### Calculus (7 topics)
- Limits & Continuity, Functions Analysis
- Derivatives, Integrals & Applications

### Statistics (5 topics)
- Descriptive Statistics & Probability
- Data Analysis, Regression & Inference

## 🎮 Game Mechanics

- **Territory Capture**: Pass quizzes (60%+ score) to conquer topics
- **Intelligent Unlocking**: Completing one topic unlocks related territories
- **Progressive Learning**: Easy beginner topics lead to advanced concepts
- **AI Guidance**: Ask questions anytime for instant explanations

## 🛠 Technical Stack

- **Frontend**: React 18 with TypeScript
- **UI Library**: Shadcn/UI + Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React hooks with localStorage persistence
- **AI Integration**: Ollama/Llama 3.1 8B with OpenAI fallback
- **Visualization**: Custom SVG math graphs with interactive controls
- **Build Tool**: Vite

## 📂 File Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Shadcn/UI)
│   ├── GalaxyMap.tsx   # Main exploration map
│   ├── LearningSession.tsx # Topic learning interface
│   ├── Quiz.tsx        # Interactive quiz system
│   └── MathVisualization.tsx # Mathematical visualizations
├── lib/                # Business logic & services
│   ├── topics.ts       # Topic definitions & lessons
│   ├── ai-service.ts   # AI tutoring integration
│   ├── progress-service.ts # User progress management
│   └── utils.ts        # Utility functions
├── pages/              # Page components
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile detection hook
│   └── use-toasts.ts   # Toast notification hook
└── App.tsx             # Main application component
```

## 🎨 Styling

- **CSS Framework**: Tailwind CSS for utility-first styling
- **Component Library**: Shadcn/UI for consistent, accessible UI
- **Animations**: Framer Motion for smooth transitions
- **Themes**: Gradient backgrounds with galaxy aesthetic
- **Responsive**: Mobile-first design with adaptive layouts

## Components

- All Shadcn/UI components are pre-downloaded under `@/components/ui`
- Custom math visualizations with SVG-based interactive graphs
- Galaxy map with constellation-style topic connections
- AI chat interface with conversation persistence
- Progress tracking with mastery indicators

## Development

- Import components from `@/components/ui` in React components
- Customize themes by modifying `tailwind.config.ts`
- Add global styles to `src/index.css`
- Path alias `@/` points to the `src/` directory

## 🤖 AI Configuration

The app uses Llama 3.1 8B running locally via Ollama for free, private AI tutoring. If no local LLM is available, it falls back to OpenAI GPT (requires API key in `.env`).

**Environment Variables**:
```bash
VITE_OPENAI_API_KEY=your-openai-api-key-here  # Fallback only
VITE_LOCAL_LLM_URL=http://localhost:11434    # Ollama server
```

## 🚀 Building for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## 📄 License

This project is open source under the MIT License.

## Note

- Don't re-export types that you're already importing
- All Shadcn/UI components are available as pre-installed dependencies
- The app gracefully degrades when AI services are unavailable
- Progress persists automatically using browser localStorage

**Zero API costs when using Ollama with Llama 3.1 8B! 🎉**
