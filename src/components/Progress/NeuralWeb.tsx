import { useState } from 'react';
import { motion } from 'motion/react';
import { SegmentedControl } from '../ui/SegmentedControl';
import { useNodePositions } from '../../hooks/useNodePositions';
import { usePaths } from '../../hooks/usePaths';
import { useProgressData } from '../../hooks/useProgressData';

type Pattern = 'sunflower' | 'tree' | 'lotus';

export function NeuralWeb() {
  const { allDays } = useProgressData();
  const [pattern, setPattern] = useState<Pattern>('sunflower');
  const nodes = useNodePositions(allDays, pattern);
  const paths = usePaths(nodes);

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