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

##### macOS 🎯

**Option A: Official Installer (Easiest)**
1. Download the official installer: https://ollama.ai/download/Ollama-darwin.zip
2. Double-click the downloaded file and follow the installation wizard
3. Ollama is now installed and available in your Applications folder

**Option B: Manual Installation**
```bash
# Download Ollama archive
curl -L https://ollama.ai/download/Ollama-darwin.zip -o ollama.zip
unzip ollama.zip

# Extract and install
cp -r Ollama.app/Contents/Resources/ollama ~/.ollama/
chmod +x ~/.ollama/ollama
export PATH="$HOME/.ollama:$PATH"

# Add to shell profile (e.g., ~/.zshrc or ~/.bash_profile)
echo 'export PATH="$HOME/.ollama:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

##### Linux 🐧

**Automated Installation (Recommended)**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Manual Installation**
```bash
# Download latest release
curl -L https://ollama.ai/download/ollama-linux-amd64 -o ollama
chmod +x ollama
sudo mv ollama /usr/local/bin/

# For other architectures:
# ARM64: ollama-linux-arm64
# AMD64: ollama-linux-amd64
```

**Ubuntu/Debian Repository (Alternative)**
```bash
# Add Ollama repository
sudo apt update
sudo apt install -y ca-certificates curl
curl -fsSL https://ollama.ai/install.sh | sh

# Or using snap
sudo snap install ollama
```

##### Windows 🪟

**Option A: Official Windows Installer (Easiest)**
1. Download: https://ollama.ai/download/OllamaSetup.exe
2. Run the installer executable
3. Follow the installation wizard
4. Ollama will be added to your PATH automatically

**Option B: PowerShell Installation**
```powershell
# Download and run installer
irm https://ollama.ai/download/OllamaSetup.exe -OutFile OllamaSetup.exe
.\OllamaSetup.exe
```

**Option C: Windows Subsystem for Linux (WSL)**
```bash
# Inside WSL terminal
curl -fsSL https://ollama.ai/install.sh | sh
```

#### Setting up Llama 3.1 8B Model

1. **Pull the Llama 3.1 8B model** (first time download takes ~5-10 minutes):
   ```bash
   ollama pull llama3.1:8b
   ```

2. **Start the Ollama server** (keep this terminal window open):
   ```bash
   ollama serve
   ```
   - Server runs on `http://localhost:11434`
   - Math Guru will automatically connect to this address

3. **Verify installation**:
   ```bash
   # Check if server is running
   curl http://localhost:11434/api/version

   # Test a simple prompt
   curl -X POST http://localhost:11434/api/generate \
     -H "Content-Type: application/json" \
     -d '{"model": "llama3.1:8b", "prompt": "Hello!", "stream": false}'
   ```

4. **Run Math Guru**:
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 to start using AI-powered tutoring!

#### System Requirements

- **macOS**: macOS 11.0 or later, 8GB+ RAM recommended
- **Linux**: Most modern distributions, 8GB+ RAM recommended
- **Windows**: Windows 10 version 2004+ (21H2), 8GB+ RAM recommended

Llama 3.1 8B requires ~5GB disk space and ~8GB RAM. Apple Silicon Macs get accelerated performance.

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
