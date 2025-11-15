/**
 * GalaxyMap Component
 * 
 * Interactive space-themed visualization of math topics as celestial bodies
 * Features:
 * - Animated star/planet nodes representing topics
 * - Connection lines between related topics
 * - Smooth capture animations with scale, glow, and color transitions
 * - Click to start learning a topic
 * - Visual progress tracking
 */

import { motion } from 'framer-motion';
import { Topic } from '@/lib/types';
import { Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalaxyMapProps {
  topics: Topic[];
  onTopicClick: (topic: Topic) => void;
  capturedTopics: string[];
}

export default function GalaxyMap({ topics, onTopicClick, capturedTopics }: GalaxyMapProps) {
  /**
   * Calculate connection lines between related topics
   * Returns array of line coordinates for SVG rendering
   */
  const getConnectionLines = () => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number; active: boolean }> = [];
    const processed = new Set<string>();

    topics.forEach((topic) => {
      topic.connectedTopics.forEach((connectedId) => {
        const lineKey = [topic.id, connectedId].sort().join('-');
        if (processed.has(lineKey)) return;
        processed.add(lineKey);

        const connectedTopic = topics.find((t) => t.id === connectedId);
        if (!connectedTopic) return;

        // Line is active if either topic is captured
        const isActive = capturedTopics.includes(topic.id) || capturedTopics.includes(connectedId);

        lines.push({
          x1: topic.position.x,
          y1: topic.position.y,
          x2: connectedTopic.position.x,
          y2: connectedTopic.position.y,
          active: isActive,
        });
      });
    });

    return lines;
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-xl overflow-hidden">
      {/* Animated star background */}
      <div className="absolute inset-0 opacity-50">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* SVG for connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <g transform="translate(50%, 50%)">
          {getConnectionLines().map((line, index) => {
            const scale = 0.375; // Same scaling as topic positions
            return (
              <motion.line
                key={index}
                x1={line.x1 * scale}
                y1={line.y1 * scale}
                x2={line.x2 * scale}
                y2={line.y2 * scale}
                stroke={line.active ? '#3b82f6' : '#334155'}
                strokeWidth={line.active ? 1.2 : 0.6}
                strokeDasharray={line.active ? '0' : '3,3'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: line.active ? 0.5 : 0.25 }}
                transition={{ duration: 1, delay: index * 0.08 }}
              />
            );
          })}
        </g>
      </svg>

      {/* Topic nodes container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl max-h-[600px]">
          {topics.map((topic) => {
            const isCaptured = capturedTopics.includes(topic.id);
            const isUnlocked = topic.unlocked || capturedTopics.some((id) =>
              topics.find((t) => t.id === id)?.connectedTopics.includes(topic.id)
            );

            return (
              <TopicNode
                key={topic.id}
                topic={topic}
                isCaptured={isCaptured}
                isUnlocked={isUnlocked}
                onClick={() => isUnlocked && onTopicClick(topic)}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>Captured Territory</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Available to Learn</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-500" />
          <span>Locked (capture connected topics first)</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Individual topic node component
 * Represents a celestial body in the galaxy map
 */
interface TopicNodeProps {
  topic: Topic;
  isCaptured: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

function TopicNode({ topic, isCaptured, isUnlocked, onClick }: TopicNodeProps) {
  // Scale topic positions to fit and spread across galaxy view (pos range ~500 → ~281)
  const scale = 0.5625; // 56.25% scale = 150% of previous distance (187.5 × 1.5 = 281px)
  const scaledX = topic.position.x * scale;
  const scaledY = topic.position.y * scale;

  const style = {
    left: `calc(50% + ${scaledX}px)`,
    top: `calc(50% + ${scaledY}px)`,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={style}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      whileHover={isUnlocked ? { scale: 1.1 } : {}}
      onClick={onClick}
    >
      {/* Glow effect for captured topics */}
      {isCaptured && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: topic.color }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}

      {/* Main node circle - SMALL SIZE as requested */}
      <motion.div
        className={cn(
          'relative w-12 h-12 rounded-full flex items-center justify-center',
          'border transition-all duration-300',
          isCaptured && 'border-white shadow-lg',
          isUnlocked && !isCaptured && 'border-blue-400',
          !isUnlocked && 'border-slate-600 opacity-50'
        )}
        style={{
          backgroundColor: isCaptured ? topic.color : isUnlocked ? `${topic.color}40` : '#1e293b',
        }}
        animate={
          isCaptured
            ? {
                boxShadow: [
                  `0 0 20px ${topic.color}`,
                  `0 0 40px ${topic.color}`,
                  `0 0 20px ${topic.color}`,
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Icon based on status - PROPER SIZE FOR SMALL STARS */}
        {isCaptured ? (
          <CheckCircle2 className="w-6 h-6 text-white" />
        ) : isUnlocked ? (
          <Sparkles className="w-6 h-6 text-blue-300" />
        ) : (
          <Lock className="w-6 h-6 text-slate-500" />
        )}

        {/* Pulsing ring for unlocked topics */}
        {isUnlocked && !isCaptured && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>

      {/* Topic name tooltip */}
      <motion.div
        className={cn(
          'absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap',
          'bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm',
          'opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
          'border border-slate-700'
        )}
      >
        <div className="font-semibold">{topic.name}</div>
        <div className="text-xs text-slate-400">{topic.difficulty}</div>
      </motion.div>
    </motion.div>
  );
}
