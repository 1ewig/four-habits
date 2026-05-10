import { useMemo } from 'react';
import { NEURAL_WEB } from '../lib/constants';

interface DayData {
  date: string;
  status: 'perfect' | 'partial' | 'rest';
}

type Pattern = 'sunflower' | 'tree' | 'lotus';

interface Node {
  id: number;
  x: number;
  y: number;
  curve: number;
  parentId: number;
  status: 'perfect' | 'partial' | 'rest';
}

export function useNodePositions(allDays: DayData[], pattern: Pattern): Node[] {
  return useMemo(() => {
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

      return { id: i, x, y, curve, parentId, status: day.status };
    });
  }, [allDays, pattern]);
}