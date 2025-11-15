/**
 * Progress Service - Handles persistence of user learning progress
 * Uses localStorage to save progress across browser sessions
 */

import { PersistedProgress } from './types';

const PROGRESS_STORAGE_KEY = 'math-guru-progress';

/**
 * Save user progress to localStorage
 */
export const saveProgress = (progress: PersistedProgress): void => {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({
      ...progress,
      lastActivity: Date.now()
    }));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

/**
 * Load user progress from localStorage
 */
export const loadProgress = (): PersistedProgress | null => {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

/**
 * Clear all saved progress
 */
export const clearProgress = (): void => {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
};

/**
 * Update specific progress fields
 */
export const updateProgress = (updates: Partial<PersistedProgress>): void => {
  const current = loadProgress() || getDefaultProgress();
  const updated = { ...current, ...updates };
  saveProgress(updated);
};

/**
 * Get default progress state
 */
export const getDefaultProgress = (): PersistedProgress => ({
  capturedTopics: [],
  unlockedTopics: ['quadratic-equations'], // Start with quadratic equations unlocked
  quizAttempts: {},
  quizScores: {},
  lastActivity: Date.now(),
  completionRate: 0
});

/**
 * Record a quiz attempt and score
 */
export const recordQuizResult = (topicId: string, score: number, passed: boolean): void => {
  const progress = loadProgress() || getDefaultProgress();

  // Increment attempt count
  const attempts = (progress.quizAttempts[topicId] || 0) + 1;

  // Update highest score if better
  const currentScore = progress.quizScores[topicId] || 0;
  const newScore = Math.max(currentScore, score);

  // Add to captured topics if passed and not already captured
  const capturedTopics = passed && !progress.capturedTopics.includes(topicId)
    ? [...progress.capturedTopics, topicId]
    : progress.capturedTopics;

  // Calculate completion rate
  const totalTopics = 40; // Total topics in system - should be dynamic but hardcoded for now
  const completionRate = (capturedTopics.length / totalTopics) * 100;

  updateProgress({
    capturedTopics,
    quizAttempts: { ...progress.quizAttempts, [topicId]: attempts },
    quizScores: { ...progress.quizScores, [topicId]: newScore },
    completionRate
  });
};
