import { useState, useMemo } from 'react';
import { motion } from 'motion/react';

interface DayData {
  date: string;
  status: 'perfect' | 'partial' | 'rest';
}

interface NeuralWebProps {
  allDays: DayData[];
}

export function NeuralWeb({ allDays }: NeuralWebProps) {
  const [pattern, setPattern] = useState<'sunflower' | 'tree' | 'lotus'>('sunflower');

  // Generate SVG nodes based on pattern
  const nodes = useMemo(() => {
    const total = allDays.length;
    if (total === 0) return [];

    const centerX = 200;
    const centerY = 200;

    return allDays.map((day, i) => {
      let x = centerX;
      let y = centerY;
      let curve = 0;
      let parentId = 0;
      const restBoost = day.status === 'rest' ? 8 : 0;

      if (pattern === 'sunflower') {
        const angle = i * 2.39996323; // Golden angle in radians
        const radius = Math.sqrt(i) * 28 + restBoost;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        curve = 0.3;
        parentId = Math.max(0, i - 13);
      } else if (pattern === 'tree') {
        const depth = Math.floor(Math.log2(i + 1));
        const posInLevel = i - (Math.pow(2, depth) - 1);
        const totalInLevel = Math.pow(2, depth);
        const angle = ((posInLevel + 0.5) / totalInLevel) * Math.PI - (Math.PI / 2);
        const radius = depth * 45 + restBoost;
        x = centerX + Math.sin(angle) * radius;
        y = centerY - Math.cos(angle) * radius + 60;
        curve = 0.2;
        parentId = i < 1 ? 0 : Math.floor((i - 1) / 2);
      } else if (pattern === 'lotus') {
        const angle = i * 0.38;
        const radius = Math.sqrt(i) * 24 + Math.abs(Math.sin(i * 0.3)) * 32 + restBoost;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        curve = 0.35;
        parentId = Math.max(0, i - 1);
      }

      return { ...day, x, y, curve, parentId, id: i };
    });
  }, [allDays, pattern]);

  // Generate paths between nodes
  const paths = useMemo(() => {
    const p = [];
    for (let i = 1; i < nodes.length; i++) {
      const curr = nodes[i];
      const prev = nodes[curr.parentId];
      if (!prev) continue;

      // Bezier curve control point
      const cx = (prev.x + curr.x) / 2 - (curr.y - prev.y) * curr.curve;
      const cy = (prev.y + curr.y) / 2 + (curr.x - prev.x) * curr.curve;
      
      p.push({
        d: `M ${prev.x} ${prev.y} Q ${cx} ${cy} ${curr.x} ${curr.y}`,
        isPerfect: curr.status === 'perfect' && prev.status === 'perfect'
      });
    }
    return p;
  }, [nodes]);

  return (
    <div style={{ flex: 7 }} className="min-h-0 bg-[var(--surface)] rounded-[var(--radius-xl)] p-4 flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center z-10 mb-2">
        <h2 className="text-[var(--text-dim)] text-sm font-medium tracking-wide">neural web</h2>
        <div className="flex gap-2">
          {['sunflower', 'tree', 'lotus'].map((p) => (
            <button
              key={p}
              onClick={() => setPattern(p as any)}
              className={`text-xs px-2 py-1 rounded-[var(--radius-full)] transition-colors ${
                pattern === p ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--surface-alt)] text-[var(--text-dim)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow relative flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px] max-h-[400px]">
          {/* Draw paths */}
          {paths.map((path, i) => (
            <motion.path
              key={`path-${i}`}
              d={path.d}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={path.isPerfect ? "2" : "1.2"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: path.isPerfect ? 0.8 : 0.25 
              }}
              transition={{ duration: 1, delay: i * 0.05 }}
            />
          ))}

          {/* Draw nodes */}
          {nodes.map((node, i) => (
            <motion.circle
              key={`node-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={4}
              fill={node.status === 'perfect' ? 'var(--accent)' : 'transparent'}
              stroke={
                node.status === 'perfect' 
                  ? 'none' 
                  : node.status === 'partial' 
                    ? 'var(--accent)' 
                    : 'var(--surface-alt)'
              }
              strokeWidth={node.status === 'perfect' ? 0 : 1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: node.status === 'rest' ? 0.6 : 1 
              }}
              transition={{ type: 'spring', bounce: 0.4, delay: i * 0.05 }}
              className={node.status === 'perfect' ? 'drop-shadow-[0_0_8px_var(--accent)]' : ''}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
