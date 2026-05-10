export interface ThemeData {
  emoji: string;
  name: string;
}

export const THEMES: Record<string, ThemeData> = {
  carbon: { emoji: '⚫', name: 'Carbon' },
  void: { emoji: '⚫', name: 'Void' },
  ghost: { emoji: '⚪', name: 'Ghost' },
  moss: { emoji: '🟢', name: 'Moss' },
  copper: { emoji: '🟤', name: 'Copper' },
  sand: { emoji: '🟡', name: 'Sand' },
  silver: { emoji: '⚪', name: 'Silver' },
  tide: { emoji: '🔵', name: 'Tide' },
  ember: { emoji: '🟠', name: 'Ember' },
  emerald: { emoji: '🟢', name: 'Emerald' },
  dusk: { emoji: '🟣', name: 'Dusk' },
  slate: { emoji: '⚫', name: 'Slate' },
  ruby: { emoji: '🔴', name: 'Ruby' },
  birch: { emoji: '⚪', name: 'Birch' },
  amethyst: { emoji: '🟣', name: 'Amethyst' },
  frost: { emoji: '🔵', name: 'Frost' },
  obsidian: { emoji: '⚫', name: 'Obsidian' },
  solar: { emoji: '🟡', name: 'Solar' },
  bone: { emoji: '⚪', name: 'Bone' },
  supernova: { emoji: '🟡', name: 'Supernova' },
  sakura: { emoji: '🌸', name: 'Sakura' },
  arctic: { emoji: '❄️', name: 'Arctic' },
};

export const THEME_LIST = Object.entries(THEMES).map(([key, value]) => ({
  id: key,
  ...value,
}));

export function getThemeEmoji(theme: string): string {
  return THEMES[theme]?.emoji || '⚫';
}

export function getThemeName(theme: string): string {
  return THEMES[theme]?.name || theme;
}