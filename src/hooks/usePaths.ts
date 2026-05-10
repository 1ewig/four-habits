import { useMemo } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  curve: number;
  parentId: number;
  status: 'perfect' | 'partial' | 'rest';
}

interface Path {
  d: string;
  isPerfect: boolean;
}

export function usePaths(nodes: Node[]): Path[] {
  return useMemo(() => {
    const p: Path[] = [];
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
}