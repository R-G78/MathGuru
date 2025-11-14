/**
 * Type definitions for Math Guru application
 * Defines the structure for topics, learning sessions, and user progress
 */

/**
 * Represents a mathematical topic node in the galaxy map
 */
export interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  // Position in the galaxy map (x, y coordinates)
  position: { x: number; y: number };
  // IDs of topics that are connected/related
  connectedTopics: string[];
  // Whether the user has captured this territory
  captured: boolean;
  // Whether this topic is currently unlocked for learning
  unlocked: boolean;
  // Color theme for the topic node
  color: string;
}

/**
 * Represents the user's learning progress
 */
export interface UserProgress {
  capturedTopics: string[];
  currentTopic: string | null;
  totalScore: number;
}

/**
 * Represents a quiz question for a topic
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

/**
 * Represents an AI-generated explanation for a topic
 */
export interface AIExplanation {
  topic: string;
  explanation: string;
  keyPoints: string[];
  examples: string[];
}

/**
 * Represents a learning session state
 */
export interface LearningSession {
  topicId: string;
  stage: 'explanation' | 'visualization' | 'quiz' | 'complete';
  explanation?: AIExplanation;
  quizQuestions?: QuizQuestion[];
  score?: number;
}

/**
 * Wolfram Alpha API response type
 */
export interface WolframResponse {
  queryresult: {
    success: boolean;
    pods?: Array<{
      title: string;
      subpods: Array<{
        img: {
          src: string;
          alt: string;
        };
      }>;
    }>;
  };
}