import type { ImageVariant } from './media.model';

export type HomeColor = 'red' | 'blue' | 'pink' | 'custom';
export type HomeSide = 'auto' | 'left' | 'right';

export interface HomeTheme {
  /** Foil edge: dark, mid, light. */
  foil: [string, string, string];
  tint: string;
  shine: string;
}

export interface HomeImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  variants?: ImageVariant[];
}

/** A card as it is edited and saved. */
export interface HomeCard {
  title: string;
  body: string;
  color: HomeColor;
  theme?: HomeTheme;
  side: HomeSide;
  /** A path on this site for the "More" button; empty hides it. */
  route: string;
  images: HomeImage[];
  /** Skill ids, in display order. */
  skills: string[];
}

export interface HomeSkill {
  _id: string;
  name: string;
  logo?: string;
}

/** A card as the public endpoint returns it, with its skills filled in. */
export type PublicHomeCard = Omit<HomeCard, 'skills'> & { skills: HomeSkill[] };

/** Starting colors for a custom card. */
export const DEFAULT_CUSTOM_THEME: HomeTheme = {
  foil: ['#4a4d55', '#9ca1ad', '#eef0f5'],
  tint: '#7d8597',
  shine: '#ffffff',
};

/** Skill `logo` values whose file in assets/brands is named differently. */
const BRAND_FILES: Record<string, string> = {
  javascript: 'js',
  nodejs: 'node-js',
  csharp: 'c-sharp',
  postgres: 'PostgreSQL',
  springboot: 'spring',
};

const BRANDS = new Set(
  (
    'android angular aws azure bun c-sharp confluence cpp css docker dotnet dragonfly electron ' +
    'gcloud html java jira js kotlin mongodb mysql next-js node-js playwright PostgreSQL python ' +
    'react redis rust spring tauri typescript unreal vue xata yourtrack'
  ).split(' '),
);

/**
 * Where a skill's logo lives: an uploaded image's own url, or a bundled brand
 * file. Null when there is neither, and the card then shows the skill's name.
 */
export function brandLogo(logo: string | undefined): string | null {
  if (!logo) return null;
  if (logo.includes('/')) return logo;
  const file = BRAND_FILES[logo] ?? logo;
  return BRANDS.has(file) ? `assets/brands/${file}.svg` : null;
}

/**
 * What the home page shows until a configuration has been saved. Body text comes
 * from the `home` content block named by `content`; `skills` are skill `logo`
 * values, and only those with a published skill appear.
 */
export const DEFAULT_HOME_CARDS: Array<{
  title: string;
  content: string;
  color: HomeColor;
  skills: string[];
}> = [
  {
    title: 'Front-End Development',
    content: 'frontend',
    color: 'red',
    skills: ['javascript', 'typescript', 'angular', 'react', 'electron'],
  },
  {
    title: 'Back-End Development',
    content: 'backend',
    color: 'blue',
    skills: ['gcloud', 'nodejs', 'mongodb', 'mysql', 'redis'],
  },
  {
    title: 'Everything Development',
    content: 'general',
    color: 'pink',
    skills: ['java', 'kotlin', 'rust', 'cpp', 'android'],
  },
];
