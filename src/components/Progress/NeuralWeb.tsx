import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { NEURAL_WEB } from '../../lib/constants';
import { SegmentedControl } from '../ui/SegmentedControl';

interface DayData {
  date: string;
  status: 'perfect' | 'partial' | 'rest';
}

interface NeuralWebProps {
  allDays: DayData[];
}

type Pattern = 'sunflower' | 'tree' | 'lotus';

export function NeuralWeb({ allDays }: NeuralWebProps) {
  const [pattern, setPattern] = useState<Pattern>('sunflower');

  const nodes = useMemo(() => {
    if (allDays.length === 0) return [];

    const { centerX, centerY, goldenAngle, radiusMultiplier, restBoost, sunflower: sf, tree: tr, lotus: ls } = NEURAL_WEB;

    return allDays.map((day, i) => {
      let x = centerX;
      let y = centerY;
      let curve = 0;
      let parentId = 0;
      const boost = day.status === 'rest' ? restBoost : 0;

      if (pattern === 'sunflower') {
        const angle = i * goldenAngle;
        const radius = Math.sqrt(i) * radiusMultiplier + boost;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        curve = sf.curve;
        parentId = Math.max(0, i - sf.parentOffset);
      } else if (pattern === 'tree') {
        const depth = Math.floor(Math.log2(i + 1));
        const posInLevel = i - (Math.pow(2, depth) - 1);
        const totalInLevel = Math.pow(2, depth);
        const angle = ((posInLevel + 0.5) / totalInLevel) * Math.PI - (Math.PI / 2);
        const radius = depth * tr.depthRadius + boost;
        x = centerX + Math.sin(angle) * radius;
        y = centerY - Math.cos(angle) * radius + tr.yOffset;
        curve = tr.curve;
        parentId = i < 1 ? 0 : Math.floor((i - 1) / 2);
      } else {
        const angle = i * 0.38;
        const radius = Math.sqrt(i) * ls.radiusMultiplier + Math.abs(Math.sin(i * ls.sineFrequency)) * ls.sineAmplitude + boost;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        curve = ls.curve;
        parentId = Math.max(0, i - ls.parentOffset);
      }

      return { ...day, x, y, curve, parentId, id: i };
    });
  }, [allDays, pattern]);

  const paths = useMemo(() => {
    const p = [];
    for (let i = 1; i < nodes.length; i++) {
      const curr = nodes[i];
      const prev = nodes[curr.parentId];
      if (!prev) continue;

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
        <SegmentedControl
          options={['sunflower', 'tree', 'lotus'] as const}
          active={pattern}
          onChange={setPattern}
        />
      </div>

      <div className="flex-grow relative flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px] max-h-[400px]">
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