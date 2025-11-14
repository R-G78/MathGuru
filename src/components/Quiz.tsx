/**
 * Quiz Component
 * 
 * Mini quiz system for topic mastery verification
 * Features:
 * - Multiple choice questions
 * - Immediate feedback
 * - Explanations for correct/incorrect answers
 * - Score tracking
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/lib/types';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  /**
   * Handle answer selection
   */
  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(index);
  };

  /**
   * Submit current answer and show feedback
   */
  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  /**
   * Move to next question or complete quiz
   */
  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score percentage
      const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / questions.length) * 100);
      onComplete(finalScore);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="font-semibold">
            Score: {score}/{currentQuestionIndex + (showFeedback && isCorrect ? 1 : 0)}
          </span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQuestion.correctAnswer;
                const showCorrect = showFeedback && isCorrectAnswer;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={cn(
                      'w-full p-4 rounded-lg border-2 text-left transition-all',
                      'hover:border-blue-400 hover:bg-blue-50',
                      isSelected && !showFeedback && 'border-blue-500 bg-blue-50',
                      showCorrect && 'border-green-500 bg-green-50',
                      showIncorrect && 'border-red-500 bg-red-50',
                      !isSelected && !showCorrect && 'border-slate-200',
                      showFeedback && 'cursor-default'
                    )}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-red-600 ml-2" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback section */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t"
                >
                  <div
                    className={cn(
                      'p-4 rounded-lg flex items-start gap-3',
                      isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    )}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn('font-semibold mb-2', isCorrect ? 'text-green-900' : 'text-red-900')}>
                        {isCorrect ? '🎉 Correct!' : '❌ Not quite right'}
                      </p>
                      <p className="text-sm text-slate-700">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="mt-6 flex gap-3">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="flex-1"
                  size="lg"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1" size="lg">
                  {isLastQuestion ? '🎯 Complete Quiz' : 'Next Question →'}
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Helpful tip */}
      {!showFeedback && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">💡 Tip</p>
              <p>Think about what you just learned. Try to eliminate obviously wrong answers first!</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}