/**
 * LearningSession Component
 * 
 * Complete learning flow for a topic:
 * 1. AI-generated explanation
 * 2. Interactive visualization
 * 3. Mini quiz
 * 4. Territory capture celebration
 * 
 * Manages the progression through learning stages
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Topic, AIExplanation } from '@/lib/types';
import { generateExplanation } from '@/lib/ai-service';
import { getQuizQuestions } from '@/lib/topics';
import MathVisualization from './MathVisualization';
import Quiz from './Quiz';
import { Loader2, BookOpen, LineChart, Brain, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningSessionProps {
  topic: Topic;
  onComplete: (topicId: string, score: number) => void;
  onClose: () => void;
}

type Stage = 'explanation' | 'visualization' | 'quiz' | 'celebration';

export default function LearningSession({ topic, onComplete, onClose }: LearningSessionProps) {
  const [stage, setStage] = useState<Stage>('explanation');
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizScore, setQuizScore] = useState(0);

  // Load AI explanation on mount
  useEffect(() => {
    loadExplanation();
  }, [topic.id]);

  /**
   * Load AI-generated explanation for the topic
   */
  const loadExplanation = async () => {
    setLoading(true);
    try {
      const result = await generateExplanation(topic.name, topic.description);
      setExplanation(result);
    } catch (error) {
      console.error('Failed to load explanation:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle quiz completion
   */
  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setStage('celebration');
    
    // Notify parent component after a delay
    setTimeout(() => {
      onComplete(topic.id, score);
    }, 3000);
  };

  /**
   * Calculate overall progress through learning stages
   */
  const getProgress = () => {
    const stages: Stage[] = ['explanation', 'visualization', 'quiz', 'celebration'];
    const currentIndex = stages.indexOf(stage);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{topic.name}</h2>
              <p className="text-sm text-muted-foreground">{topic.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Learning Progress</span>
              <span className="text-muted-foreground">{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>

          {/* Stage indicators */}
          <div className="flex items-center justify-between mt-4 gap-2">
            {[
              { id: 'explanation', label: 'Learn', icon: BookOpen },
              { id: 'visualization', label: 'Explore', icon: LineChart },
              { id: 'quiz', label: 'Practice', icon: Brain },
              { id: 'celebration', label: 'Capture', icon: Trophy },
            ].map((s, index) => {
              const Icon = s.icon;
              const isActive = stage === s.id;
              const isPast = ['explanation', 'visualization', 'quiz', 'celebration'].indexOf(stage) >
                ['explanation', 'visualization', 'quiz', 'celebration'].indexOf(s.id as Stage);

              return (
                <div key={s.id} className="flex-1 flex items-center gap-2">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      isActive && 'bg-blue-500 text-white scale-110',
                      isPast && 'bg-green-500 text-white',
                      !isActive && !isPast && 'bg-slate-200 text-slate-500'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn('text-xs font-medium', isActive && 'text-blue-600')}>
                    {s.label}
                  </span>
                  {index < 3 && <div className="flex-1 h-0.5 bg-slate-200" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {loading && stage === 'explanation' ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64"
              >
                <div className="text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">Generating personalized explanation...</p>
                </div>
              </motion.div>
            ) : (
              <>
                {stage === 'explanation' && explanation && (
                  <ExplanationView explanation={explanation} onNext={() => setStage('visualization')} />
                )}
                {stage === 'visualization' && (
                  <VisualizationView topic={topic} onNext={() => setStage('quiz')} />
                )}
                {stage === 'quiz' && (
                  <QuizView topic={topic} onComplete={handleQuizComplete} />
                )}
                {stage === 'celebration' && (
                  <CelebrationView topic={topic} score={quizScore} onClose={onClose} />
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Explanation stage view
 */
function ExplanationView({ explanation, onNext }: { explanation: AIExplanation; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="prose prose-sm max-w-none">
          {explanation.explanation.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Key Points to Remember
        </h3>
        <ul className="space-y-3">
          {explanation.keyPoints.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <span className="text-slate-700">{point}</span>
            </motion.li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">📝 Examples</h3>
        <div className="space-y-2">
          {explanation.examples.map((example, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-lg font-mono text-sm">
              {example}
            </div>
          ))}
        </div>
      </Card>

      <Button onClick={onNext} size="lg" className="w-full">
        Continue to Interactive Visualization →
      </Button>
    </motion.div>
  );
}

/**
 * Visualization stage view
 */
function VisualizationView({ topic, onNext }: { topic: Topic; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <MathVisualization topicId={topic.id} topicName={topic.name} />
      
      <Button onClick={onNext} size="lg" className="w-full">
        Ready for Quiz →
      </Button>
    </motion.div>
  );
}

/**
 * Quiz stage view
 */
function QuizView({ topic, onComplete }: { topic: Topic; onComplete: (score: number) => void }) {
  const questions = getQuizQuestions(topic.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Quiz questions={questions} onComplete={onComplete} />
    </motion.div>
  );
}

/**
 * Celebration stage view
 */
function CelebrationView({ topic, score, onClose }: { topic: Topic; score: number; onClose: () => void }) {
  const passed = score >= 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1, 1.1, 1],
        }}
        transition={{ duration: 0.5, repeat: 3 }}
        className="text-8xl mb-6"
      >
        {passed ? '🎉' : '💪'}
      </motion.div>

      <h2 className="text-3xl font-bold mb-4">
        {passed ? 'Territory Captured!' : 'Keep Practicing!'}
      </h2>

      <p className="text-xl text-muted-foreground mb-8">
        {passed
          ? `You've mastered ${topic.name} with a score of ${score}%!`
          : `You scored ${score}%. Try again to capture this territory!`}
      </p>

      <div className="max-w-md mx-auto mb-8">
        <Card className="p-6" style={{ backgroundColor: `${topic.color}20`, borderColor: topic.color }}>
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
          <p className="text-sm text-muted-foreground">{topic.description}</p>
        </Card>
      </div>

      {passed && (
        <p className="text-lg mb-8">
          New territories have been unlocked! Continue exploring the galaxy of mathematics.
        </p>
      )}

      <Button onClick={onClose} size="lg">
        Return to Galaxy Map
      </Button>
    </motion.div>
  );
}