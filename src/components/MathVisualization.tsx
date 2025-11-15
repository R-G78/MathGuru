/**
 * MathVisualization Component
 *
 * Interactive mathematical visualizations with custom interactive controls
 * for parameter manipulation. Uses SVG for graph plotting with mathjs for evaluation.
 *
 * Allows learners to explore mathematical concepts by adjusting parameters
 * and seeing real-time visual feedback.
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import * as math from 'mathjs';

interface MathVisualizationProps {
  topicId: string;
  topicName: string;
}

interface VisualizationParameter {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  description: string;
}

interface VisualizationConfig {
  parameters: VisualizationParameter[];
  wolframQuery: (params: Record<string, number>) => string;
  desmosExpression: (params: Record<string, number>) => string;
  explorationTips: string[];
}

export default function MathVisualization({ topicId, topicName }: MathVisualizationProps) {
  const [loading, setLoading] = useState(true);
  const [parameters, setParameters] = useState<Record<string, number>>({});

  // Get visualization configuration based on topic
  const config = getVisualizationConfig(topicId);

  useEffect(() => {
    // Initialize parameters with default values
    const defaultParams: Record<string, number> = {};
    config.parameters.forEach((param) => {
      defaultParams[param.name] = param.default;
    });
    setParameters(defaultParams);

    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, [topicId]);

  /**
   * Generate mathematical expression string
   */
  const getExpression = () => {
    return config.desmosExpression(parameters);
  };

  /**
   * Reset parameters to default values
   */
  const handleReset = () => {
    const defaultParams: Record<string, number> = {};
    config.parameters.forEach((param) => {
      defaultParams[param.name] = param.default;
    });
    setParameters(defaultParams);
  };

  if (loading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Interactive controls */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Interactive Controls</h3>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          {config.parameters.map((param) => (
            <div key={param.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{param.label}</Label>
                <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                  {param.name} = {parameters[param.name]?.toFixed(1)}
                </span>
              </div>
              <Slider
                value={[parameters[param.name] || param.default]}
                onValueChange={([value]) =>
                  setParameters((prev) => ({ ...prev, [param.name]: value }))
                }
                min={param.min}
                max={param.max}
                step={param.step}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">{param.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Visualization display */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Visual Representation</h3>
        
        {/* Desmos-style graph */}
        <div className="bg-slate-50 rounded-lg p-6 mb-4">
          <div className="aspect-square max-w-md mx-auto bg-white rounded border-2 border-slate-200 relative overflow-hidden">
            {/* Simple coordinate system */}
            <svg className="w-full h-full" viewBox="-10 -10 20 20" width="100%" height="100%">
              {/* Grid */}
              <defs>
                <pattern id={`grid-${topicId}`} width="2" height="2" patternUnits="userSpaceOnUse">
                  <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#e2e8f0" strokeWidth="0.1" />
                </pattern>
              </defs>

              {/* Background */}
              <rect x="-10" y="-10" width="20" height="20" fill={`url(#grid-${topicId})`} />

              {/* Axes */}
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="0.15" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#94a3b8" strokeWidth="0.15" />

              {/* Function plot - wrapped in g element to prevent transform issues */}
              <g>
                <GraphPlot expression={getExpression()} parameters={parameters} />
              </g>
            </svg>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm font-mono bg-blue-50 text-blue-700 px-4 py-2 rounded inline-block">
              {getExpression()}
            </p>
          </div>
        </div>
      </Card>

      {/* Exploration tips */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold mb-2">💡 Try This!</h3>
        <ul className="space-y-2 text-sm">
          {config.explorationTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/**
 * Simple graph plotting component
 * Plots mathematical functions on SVG canvas
 */
function GraphPlot({
  expression,
  parameters,
}: {
  expression: string;
  parameters: Record<string, number>;
}) {
  // Generate points for the function
  const points: Array<{ x: number; y: number }> = [];

  // Parse expression and evaluate
  for (let x = -10; x <= 10; x += 0.1) {
    try {
      const y = evaluateExpression(expression, { ...parameters, x });
      if (isFinite(y) && Math.abs(y) < 10) {
        points.push({ x, y: -y }); // Flip y for SVG coordinates
      }
    } catch (e) {
      // Skip invalid points
    }
  }

  if (points.length === 0) return null;

  // Create SVG path
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');

  return (
    <path
      d={pathData}
      fill="none"
      stroke="#3b82f6"
      strokeWidth="0.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/**
 * Expression evaluator using mathjs
 * Parses mathematical expressions and evaluates with given parameters
 */
function evaluateExpression(expr: string, params: Record<string, number>): number {
  try {
    // Extract the right side of the equation (after 'y =')
    const equation = expr.replace(/^y\s*=\s*/, '').trim();

    // Replace ^ with ** for JavaScript compatibility
    const jsExpression = equation.replace(/\^/g, '**');

    // Create evaluation scope with parameters
    const scope: Record<string, any> = { ...params };

    // Evaluate using mathjs with safer parsing
    const node = math.parse(jsExpression);
    const result = node.evaluate(scope);

    return typeof result === 'number' ? result : NaN;
  } catch (error) {
    console.error('Math evaluation error:', error);
    return NaN;
  }
}

/**
 * Visualization configurations for different topics
 */
function getVisualizationConfig(topicId: string): VisualizationConfig {
  const configs: Record<string, VisualizationConfig> = {
    'quadratic-equations': {
      parameters: [
        { name: 'a', label: 'Coefficient a', min: -5, max: 5, step: 0.5, default: 1, description: 'Controls parabola direction and width' },
        { name: 'b', label: 'Coefficient b', min: -10, max: 10, step: 1, default: 0, description: 'Shifts parabola horizontally' },
        { name: 'c', label: 'Coefficient c', min: -10, max: 10, step: 1, default: 0, description: 'Shifts parabola vertically' },
      ],
      wolframQuery: (p: Record<string, number>) => `plot ${p.a}x^2 + ${p.b}x + ${p.c}`,
      desmosExpression: (p: Record<string, number>) => `y = ${p.a}*x*x + ${p.b}*x + ${p.c}`,
      explorationTips: [
        'Change coefficient "a" to see how the parabola opens wider or narrower',
        'Make "a" negative to flip the parabola upside down',
        'Adjust "c" to move the entire parabola up or down',
        'Try to make the parabola touch the x-axis at exactly one point',
      ],
    },
    'parabola-graphs': {
      parameters: [
        { name: 'a', label: 'Coefficient a', min: -3, max: 3, step: 0.5, default: 1, description: 'Parabola width and direction' },
        { name: 'h', label: 'Horizontal shift (h)', min: -5, max: 5, step: 0.5, default: 0, description: 'Moves vertex left/right' },
        { name: 'k', label: 'Vertical shift (k)', min: -5, max: 5, step: 0.5, default: 0, description: 'Moves vertex up/down' },
      ],
      wolframQuery: (p: Record<string, number>) => `plot ${p.a}(x-${p.h})^2 + ${p.k}`,
      desmosExpression: (p: Record<string, number>) => `y = ${p.a}*(x-${p.h})*(x-${p.h}) + ${p.k}`,
      explorationTips: [
        'The vertex is at point (h, k) - watch it move as you adjust sliders!',
        'When a > 0, the parabola smiles; when a < 0, it frowns',
        'Try making a very small (like 0.5) to see a wide parabola',
        'Can you position the vertex at the origin (0, 0)?',
      ],
    },
    'vertex-form': {
      parameters: [
        { name: 'a', label: 'Coefficient a', min: -3, max: 3, step: 0.5, default: 1, description: 'Parabola width and direction' },
        { name: 'h', label: 'h (vertex x)', min: -5, max: 5, step: 0.5, default: 0, description: 'Vertex x-coordinate' },
        { name: 'k', label: 'k (vertex y)', min: -5, max: 5, step: 0.5, default: 0, description: 'Vertex y-coordinate' },
      ],
      wolframQuery: (p: Record<string, number>) => `plot ${p.a}(x-${p.h})^2 + ${p.k}`,
      desmosExpression: (p: Record<string, number>) => `y = ${p.a}*(x-${p.h})*(x-${p.h}) + ${p.k}`,
      explorationTips: [
        'Vertex form makes it easy to see the vertex at (h, k)',
        'The axis of symmetry is the vertical line x = h',
        'Try different combinations to create parabolas with specific vertices',
        'Notice how changing "a" affects the width but not the vertex position',
      ],
    },
  };

  return (
    configs[topicId] || {
      parameters: [
        { name: 'a', label: 'Parameter a', min: -5, max: 5, step: 0.5, default: 1, description: 'Adjust this parameter' },
      ],
      wolframQuery: (p: Record<string, number>) => `plot x^2`,
      desmosExpression: (p: Record<string, number>) => `y = x*x`,
      explorationTips: ['Explore how changing parameters affects the graph'],
    }
  );
}
