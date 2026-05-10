export const HABITS_COUNT = 4;

export const WEEKLY_DAYS = 7;
export const MONTHLY_DAYS = 28;

export const MOOD_EMOJIS = ['😞', '😐', '🤩'] as const;

export const DEMO_HISTORY_DAYS = 30;
export const PERFECT_DAY_PERCENTAGE = 0.4;

export const HABIT_CHAR_LIMIT = 30;
export const WHY_CHAR_LIMIT = 50;
export const NAME_CHAR_LIMIT = 30;
export const BIO_CHAR_LIMIT = 50;

export const HAPTIC_PATTERNS = {
  normal: 10,
  perfect: [40, 30, 80],
} as const;

export const ANIMATION_SPRING = {
  type: 'spring' as const,
  bounce: 0.2,
  duration: 0.6,
};

export const NEURAL_WEB = {
  centerX: 200,
  centerY: 200,
  goldenAngle: 2.39996323,
  radiusMultiplier: 28,
  restBoost: 8,
  sunflower: {
    curve: 0.3,
    parentOffset: 13,
  },
  tree: {
    curve: 0.2,
    depthRadius: 45,
    yOffset: 60,
  },
  lotus: {
    curve: 0.35,
    radiusMultiplier: 24,
    sineAmplitude: 32,
    sineFrequency: 0.3,
    parentOffset: 1,
  },
} as const;

export const BAR_CHART_HEIGHTS = {
  perfect: '100%',
  partial: '40%',
  rest: '15%',
} as const;