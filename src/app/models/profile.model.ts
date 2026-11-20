import type { GalleryImage } from './gallery.model';

/** A profile picture: a 256px full version and a 48px avatar, both square. */
export type Avatar = GalleryImage;

export interface ProfileFact {
  title: string;
  /** `{age}` is replaced with the live age counter. */
  value: string;
}

export interface ProfileSection {
  /** URL-safe and unique on the page. */
  id: string;
  title: string;
  /** Markdown. */
  body: string;
}

/** What the API stores for the Profile page. A field never saved is null. */
export interface ProfileContent {
  avatar: Avatar | null;
  displayName: string | null;
  pronouns: string | null;
  birthDate: string | null;
  /** Markdown. */
  intro: string | null;
  facts: ProfileFact[] | null;
  sections: ProfileSection[] | null;
}

/** Fields the editor can save; any subset. */
export type ProfilePatch = Partial<{
  [K in keyof ProfileContent]: ProfileContent[K];
}>;

// --- Built-in content ----------------------------------------------------------------
// Shown until a profile is first saved, so the page is never blank. The section
// bodies and intro live in static markdown / the old content block and are loaded
// from there; the admin editor pre-fills from the same sources.

export const DEFAULT_NAME = 'Emrys Corbin';
export const DEFAULT_PRONOUNS = 'He/They';
export const DEFAULT_BIRTH_DATE = '1990-10-18T12:00:00Z';

export const DEFAULT_FACTS: ProfileFact[] = [
  { title: 'Height', value: '182cm' },
  { title: 'Age', value: '{age}ms' },
  { title: 'Build', value: 'Average' },
  { title: 'Hair Color', value: 'Variable' },
  { title: 'Eye Color', value: 'Static' },
  { title: 'Blood', value: 'Fluid' },
  { title: 'Alcohol', value: 'Yes' },
  { title: 'Tobacco', value: 'No' },
  { title: 'Coffee', value: 'Single Origin' },
  { title: 'Sign', value: 'Stop' },
  { title: 'Animals', value: 'Cats' },
];

export const DEFAULT_SECTIONS: Array<{ id: string; title: string; asset: string }> = [
  { id: 'books', title: 'Books', asset: 'books.md' },
  { id: 'engineer', title: 'Engineering', asset: 'engineering.md' },
  { id: 'fashion', title: 'Style', asset: 'style.md' },
  { id: 'food', title: 'Food', asset: 'food.md' },
  { id: 'games', title: 'Games', asset: 'games.md' },
  { id: 'music', title: 'Music', asset: 'music.md' },
];

export const assetPath = (file: string) => `../assets/biography/${file}`;
