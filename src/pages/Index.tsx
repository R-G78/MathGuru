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
 * - Territory capture system encouraging exploration
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
import { Sparkles, Trophy, BookOpen, MessageSquare } from 'lucide-react';

export default function Index() {
  // Application state
  const [topics, setTopics] = useState<Topic[]>(QUADRATICS_CLUSTER);
  const [capturedTopics, setCapturedTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userQuery, setUserQuery] = useState('');

  /**
   * Update topic unlock status based on captured territories
   */
  useEffect(() => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({
        ...topic,
        unlocked: shouldUnlockTopic(topic.id, capturedTopics) || topic.unlocked,
        captured: capturedTopics.includes(topic.id),
      }))
    );
  }, [capturedTopics]);

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
   * Handle user query submission (natural language topic request)
   */
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    // Simple keyword matching to find relevant topic
    // In production, this would use NLP/AI to understand the query
    const query = userQuery.toLowerCase();
    let matchedTopic: Topic | null = null;

    // Check for topic keywords
    if (query.includes('quadratic formula') || query.includes('formula')) {
      matchedTopic = getTopicById('quadratic-formula') || null;
    } else if (query.includes('graph') || query.includes('parabola')) {
      matchedTopic = getTopicById('parabola-graphs') || null;
    } else if (query.includes('vertex')) {
      matchedTopic = getTopicById('vertex-form') || null;
    } else if (query.includes('completing') || query.includes('square')) {
      matchedTopic = getTopicById('completing-square') || null;
    } else if (query.includes('discriminant')) {
      matchedTopic = getTopicById('discriminant') || null;
    } else if (query.includes('factor')) {
      matchedTopic = getTopicById('factorization') || null;
    } else if (query.includes('application') || query.includes('real world')) {
      matchedTopic = getTopicById('real-world-applications') || null;
    } else if (query.includes('complex') || query.includes('imaginary')) {
      matchedTopic = getTopicById('complex-roots') || null;
    } else {
      // Default to quadratic equations
      matchedTopic = getTopicById('quadratic-equations') || null;
    }

    if (matchedTopic) {
      setCurrentTopic(matchedTopic);
      setUserQuery('');
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
                      <span>Click on an unlocked topic (glowing stars) or ask a question below</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">2.</span>
                      <span>Learn with AI explanations and interactive visualizations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">3.</span>
                      <span>Complete a mini quiz to capture the territory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">4.</span>
                      <span>Unlock connected topics and continue exploring!</span>
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
                placeholder="Ask me anything... e.g., 'Teach me the quadratic formula' or 'I didn't understand parabola graphs'"
                className="flex-1 bg-white/90 text-slate-900 placeholder:text-slate-500"
              />
              <Button type="submit" size="lg">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask
              </Button>
            </form>
            <p className="text-xs text-blue-200 mt-2">
              💡 Try: "teach me quadratic formula", "explain vertex form", "what are complex roots"
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
    </div>
  );
}