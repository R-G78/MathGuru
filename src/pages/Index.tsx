/**
 * Math Guru - Main Application
 * 
 * An explorative math learning app with galaxy-themed territory capture
 * 
 * Features:
 * - Interactive galaxy map showing math topics as celestial bodies
 * - AI-powered personalized explanations
 * - Interactive mathematical visualizations (Wolfram + Desmos)
 * - Mini quizzes for mastery verification
 * - Territory capture system encourreaging exploration
 * 
 * Tech Stack:
 * - React + TypeScript
 * - Shadcn-ui + Tailwind CSS
 * - Framer Motion (animations)
 * - Wolfram Alpha API (computational graphs)
 * - Desmos API (interactive graphs)
 * - OpenAI API (AI explanations)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GalaxyMap from '@/components/GalaxyMap';
import LearningSession from '@/components/LearningSession';
import { QUADRATICS_CLUSTER, getTopicById, shouldUnlockTopic } from '@/lib/topics';
import { Topic } from '@/lib/types';
import {
  loadProgress, saveProgress, getDefaultProgress, updateProgress, recordQuizResult,
  clearProgress
} from '@/lib/progress-service';
import { Sparkles, Trophy, BookOpen, MessageSquare, Bot, RefreshCw } from 'lucide-react';
import { generateChatResponse } from '@/lib/ai-service';
import { getTopicsFromQuery } from '@/lib/topics';

// AI Response interface
interface AIResponse {
  query: string;
  response: string;
  timestamp: number;
  unlockedTopics?: string[];
}

export default function Index() {
  // Application state
  const [topics, setTopics] = useState<Topic[]>(QUADRATICS_CLUSTER);
  const [capturedTopics, setCapturedTopics] = useState<string[]>([]);
  const [unlockedTopics, setUnlockedTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  /**
   * Load saved progress on component mount
   */
  useEffect(() => {
    const savedProgress = loadProgress();
    if (savedProgress) {
      setCapturedTopics(savedProgress.capturedTopics);
      setUnlockedTopics(savedProgress.unlockedTopics);
    } else {
      // First time user - set default state
      setUnlockedTopics(['quadratic-equations']); // Quadratic equations unlocked by default
    }
  }, []);

  /**
   * Save progress whenever it changes
   */
  useEffect(() => {
    updateProgress({
      capturedTopics,
      unlockedTopics
    });
  }, [capturedTopics, unlockedTopics]);

  /**
   * Update topic unlock status based on captured territories and saved unlocked topics
   */
  useEffect(() => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({
        ...topic,
        unlocked: shouldUnlockTopic(topic.id, capturedTopics) || unlockedTopics.includes(topic.id),
        captured: capturedTopics.includes(topic.id),
      }))
    );
  }, [capturedTopics, unlockedTopics]);

  /**
   * Handle topic selection from galaxy map
   */
  const handleTopicClick = (topic: Topic) => {
    setCurrentTopic(topic);
  };

  /**
   * Handle learning session completion
   */
  const handleLearningComplete = (topicId: string, score: number) => {
    // Capture territory if passed (score >= 60%)
    if (score >= 60 && !capturedTopics.includes(topicId)) {
      setCapturedTopics((prev) => [...prev, topicId]);
    }
  };

  /**
   * Handle user query submission - discovers and unlocks topics based on questions
   */
  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery.trim();
    setIsLoadingAI(true);

    try {
      // Analyze query for math keywords to unlock matching topics
      const topicIds = getTopicsFromQuery(query);
      const newlyUnlockedTopics: string[] = [];

      console.log('🔍 Search Query:', query);
      console.log('🎯 Found Topics:', topicIds);
      console.log('🔒 Currently Unlocked:', unlockedTopics);

      // Unlock topics that match the query
      if (topicIds.length > 0) {
        // First, collect which topics will be newly unlocked
        const newlyUnlockable = topicIds.filter(topicId =>
          !unlockedTopics.includes(topicId) && !capturedTopics.includes(topicId)
        );

        console.log('✨ Newly Unlockable Topics:', newlyUnlockable);

        if (newlyUnlockable.length > 0) {
          newlyUnlockedTopics.push(...newlyUnlockable);
          setUnlockedTopics(prev => [...new Set([...prev, ...newlyUnlockable])]); // Save to persistence
          // The useEffect will handle updating the topics state based on unlockedTopics changes
          console.log('🚀 Unlocked Topics Now:', [...unlockedTopics, ...newlyUnlockable]);
        } else {
          console.log('🚫 No topics unlocked - already unlocked or captured');
        }
      } else {
        console.log('❌ No topics found for this query');
      }

      // Get AI snippet response for the question
      const response = await generateChatResponse(query, true); // isDiscovery=true for shorter snippets

      // Set AI response state and show modal
      setAiResponse({
        query,
        response,
        timestamp: Date.now(),
        unlockedTopics: newlyUnlockedTopics
      });
      setUserQuery('');
      setShowAiModal(true);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback - show error in modal
      setAiResponse({
        query,
        response: "I'm sorry, I couldn't process your question right now. Please try again later.",
        timestamp: Date.now()
      });
      setUserQuery('');
      setShowAiModal(true);
    } finally {
      setIsLoadingAI(false);
    }
  };

  /**
   * Calculate learning statistics
   */
  const stats = {
    totalTopics: topics.length,
    capturedTopics: capturedTopics.length,
    unlockedTopics: topics.filter((t) => t.unlocked).length,
    completionPercentage: Math.round((capturedTopics.length / topics.length) * 100),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Welcome modal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
            >
              <div className="text-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  🌌
                </motion.div>

                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to Math Guru
                </h1>

                <p className="text-lg text-muted-foreground mb-8">
                  Explore the galaxy of mathematics! Each star represents a math concept waiting to be discovered.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Learn</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered explanations tailored to your level
                    </p>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
                    <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Explore</h3>
                    <p className="text-sm text-muted-foreground">
                      Interactive visualizations you can manipulate
                    </p>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
                    <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Capture</h3>
                    <p className="text-sm text-muted-foreground">
                      Master topics and unlock new territories
                    </p>
                  </Card>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    How It Works
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">1.</span>
                      <span>Ask questions about math topics to discover and unlock them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">2.</span>
                      <span>Get quick AI explanations and see unlocked topics in the galaxy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">3.</span>
                      <span>Click on glowing stars to dive deep with full lessons, quizzes, and visualizations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">4.</span>
                      <span>Pass quizzes to capture territories and unlock connected topics!</span>
                    </li>
                  </ul>
                </div>

                <Button onClick={() => setShowWelcome(false)} size="lg" className="w-full">
                  Start Exploring the Galaxy 🚀
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main application */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="text-5xl">🌌</span>
                Math Guru
              </h1>
              <p className="text-blue-200">Explore the galaxy of quadratics and beyond</p>
            </div>

            <Button variant="outline" onClick={() => setShowWelcome(true)} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Sparkles className="w-4 h-4 mr-2" />
              How It Works
            </Button>
          </div>

          {/* Stats bar */}
          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
              <div>
                <div className="text-2xl font-bold">{stats.capturedTopics}</div>
                <div className="text-sm text-blue-200">Territories Captured</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.unlockedTopics}</div>
                <div className="text-sm text-blue-200">Topics Unlocked</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalTopics}</div>
                <div className="text-sm text-blue-200">Total Topics</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.completionPercentage}%</div>
                <div className="text-sm text-blue-200">Completion</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Query input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <form onSubmit={handleQuerySubmit} className="flex gap-3">
              <Input
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask questions to discover and unlock math topics... e.g., 'What is the Pythagorean theorem?'"
                className="flex-1 bg-white/90 text-slate-900 placeholder:text-slate-500"
              />
              <Button type="submit" size="lg" disabled={isLoadingAI}>
                {isLoadingAI ? (
                  <span className="animate-spin mr-2">⏳</span>
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isLoadingAI ? 'Thinking...' : 'Ask & Discover'}
              </Button>
            </form>
            <p className="text-xs text-blue-200 mt-2">
              💡 Ask about any math topic to unlock it: "What are quadratic equations?", "Explain derivatives", "How do matrices work?"
            </p>
          </Card>
        </motion.div>

        {/* Galaxy map */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GalaxyMap
            topics={topics}
            onTopicClick={handleTopicClick}
            capturedTopics={capturedTopics}
          />
        </motion.div>
      </div>

      {/* Learning session modal */}
      <AnimatePresence>
        {currentTopic && (
          <LearningSession
            topic={currentTopic}
            onComplete={handleLearningComplete}
            onClose={() => setCurrentTopic(null)}
          />
        )}
      </AnimatePresence>

      {/* AI Response Modal */}
      <AnimatePresence>
        {showAiModal && aiResponse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">AI Math Tutor</h2>
                      <p className="text-sm text-slate-600">
                        {new Date(aiResponse.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAiModal(false)}
                  >
                    ✕
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* User Query */}
                <Card className="p-4 bg-slate-50 border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">You</span>
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium">Your Question</p>
                      <p className="text-slate-700 mt-1">{aiResponse.query}</p>
                    </div>
                  </div>
                </Card>

                {/* Unlocked Topics Notification */}
                {aiResponse.unlockedTopics && aiResponse.unlockedTopics.length > 0 && (
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-medium text-green-800">🎉 Topics Unlocked!</p>
                        <p className="text-slate-700 mt-1">
                          Based on your question, I've unlocked the following math topics for you to explore:
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {aiResponse.unlockedTopics.map(topicId => {
                            const topic = getTopicById(topicId);
                            return topic ? (
                              <Button
                                key={topicId}
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                style={{ borderColor: topic.color, color: topic.color }}
                                onClick={() => {
                                  setCurrentTopic(topic);
                                  setShowAiModal(false);
                                }}
                              >
                                ⭐ {topic.name}
                              </Button>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* AI Response */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">AI Quick Explanation</p>
                      <div className="text-slate-700 mt-1 prose prose-sm max-w-none">
                        {aiResponse.response.split('\n').map((line, index) => (
                          <p key={index} className="mb-3 last:mb-0 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                        <p className="text-sm text-blue-800">
                          💡 This is a quick overview. Click on an unlocked topic above to dive deep with interactive explanations, visualizations, and quizzes!
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Footer */}
              <div className="p-6 border-t bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Bot className="w-4 h-4" />
                  Powered by AI • Ask another question!
                </div>
                <Button onClick={() => setShowAiModal(false)}>
                  Ask Another Question
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
