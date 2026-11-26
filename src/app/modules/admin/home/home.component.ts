import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { catchError, firstValueFrom, of } from 'rxjs';
import { HomeService } from '../../../services/home.service';
import { ContentService } from '../../../services/content.service';
import { MediaService, resolveMediaUrl } from '../../../services/media.service';
import {
  DEFAULT_CUSTOM_THEME,
  DEFAULT_HOME_CARDS,
  HomeCard,
  HomeColor,
  HomeSide,
  HomeSkill,
  HomeTheme,
} from '../../../models/home.model';
import type { ContentBlock } from '../../../models/content.model';
import { getContentBody } from '../../../utilities';

/** An editor row: `key` keeps each card's inputs attached to it while reordering. */
type Draft = HomeCard & { key: number };

const MAX_IMAGES = 8;
const MAX_SKILLS = 20;

/**
 * Edits the home page's feature cards: text, colors, side, button, pictures and
 * skills. Nothing changes on the site until Save.
 *
 * Until a configuration has been saved once, the cards are pre-filled from what
 * the page has always shown.
 */
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class AdminHomeComponent implements OnInit {
  private home = inject(HomeService);
  private content = inject(ContentService);
  private media = inject(MediaService);

  protected readonly maxImages = MAX_IMAGES;
  protected readonly maxSkills = MAX_SKILLS;
  protected readonly resolve = resolveMediaUrl;

  protected loading = signal(true);
  protected loadFailed = signal(false);
  protected saving = signal(false);
  protected uploading = signal(false);
  protected dirty = signal(false);
  protected savedAt = signal<Date | null>(null);
  protected error = signal<string | null>(null);
  protected cards = signal<Draft[]>([]);
  protected skills = signal<HomeSkill[]>([]);

  private nextKey = 0;

  async ngOnInit(): Promise<void> {
    try {
      const [saved, skills] = await Promise.all([
        firstValueFrom(this.home.editable()),
        firstValueFrom(this.home.skills()),
      ]);
      this.skills.set([...skills].sort((a, b) => a.name.localeCompare(b.name)));
      const cards = saved ?? (await this.defaults(skills));
      this.cards.set(cards.map((card) => ({ ...card, key: this.nextKey++ })));
    } catch {
      // Saving over cards that failed to load would wipe them.
      this.loadFailed.set(true);
      this.error.set('Could not load the home page. Check the API is running, then reload.');
    } finally {
      this.loading.set(false);
    }
  }

  private async defaults(skills: HomeSkill[]): Promise<HomeCard[]> {
    const blocks = await firstValueFrom(
      this.content
        .getContentGroupByPage('home')
        .pipe(catchError(() => of([] as ContentBlock[]))),
    );
    return DEFAULT_HOME_CARDS.map((card): HomeCard => ({
      title: card.title,
      body: getContentBody(blocks, card.content),
      color: card.color,
      side: 'auto',
      route: '',
      images: [],
      skills: card.skills.flatMap(
        (logo) => skills.find((candidate) => candidate.logo === logo)?._id ?? [],
      ),
    }));
  }

  // --- Cards ------------------------------------------------------------------------

  private update(cards: Draft[]): void {
    this.cards.set(cards);
    this.dirty.set(true);
  }

  private patch(key: number, change: (card: Draft) => Partial<HomeCard>): void {
    this.update(
      this.cards().map((card) => (card.key === key ? { ...card, ...change(card) } : card)),
    );
  }

  protected set(key: number, field: 'title' | 'body' | 'route', value: string): void {
    this.patch(key, () => ({ [field]: value }));
  }

  protected setSide(key: number, side: string): void {
    this.patch(key, () => ({ side: side as HomeSide }));
  }

  protected setColor(key: number, color: string): void {
    this.patch(key, (card) => ({
      color: color as HomeColor,
      theme: color === 'custom' ? (card.theme ?? DEFAULT_CUSTOM_THEME) : card.theme,
    }));
  }

  protected setFoil(key: number, index: number, value: string): void {
    this.patch(key, (card) => {
      const theme = card.theme ?? DEFAULT_CUSTOM_THEME;
      const foil = [...theme.foil] as HomeTheme['foil'];
      foil[index] = value;
      return { theme: { ...theme, foil } };
    });
  }

  protected setThemeColor(key: number, field: 'tint' | 'shine', value: string): void {
    this.patch(key, (card) => ({ theme: { ...(card.theme ?? DEFAULT_CUSTOM_THEME), [field]: value } }));
  }

  protected addCard(): void {
    this.update([
      ...this.cards(),
      {
        key: this.nextKey++,
        title: '',
        body: '',
        color: 'blue',
        side: 'auto',
        route: '',
        images: [],
        skills: [],
      },
    ]);
  }

  protected moveCard(index: number, by: -1 | 1): void {
    this.update(moved(this.cards(), index, by));
  }

  protected removeCard(key: number): void {
    this.update(this.cards().filter((card) => card.key !== key));
  }

  // --- Skills -----------------------------------------------------------------------

  protected skillName(id: string): string {
    return this.skills().find((skill) => skill._id === id)?.name ?? 'Unpublished or deleted skill';
  }

  protected addSkill(key: number, select: HTMLSelectElement): void {
    const id = select.value;
    select.value = '';
    if (id) this.patch(key, (card) => ({ skills: [...card.skills, id] }));
  }

  protected moveSkill(key: number, index: number, by: -1 | 1): void {
    this.patch(key, (card) => ({ skills: moved(card.skills, index, by) }));
  }

  protected removeSkill(key: number, id: string): void {
    this.patch(key, (card) => ({ skills: card.skills.filter((skill) => skill !== id) }));
  }

  // --- Pictures ---------------------------------------------------------------------

  protected async upload(key: number, event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = [...(input.files ?? [])];
    input.value = '';
    const card = this.cards().find((candidate) => candidate.key === key);
    if (!card || files.length === 0) return;

    this.uploading.set(true);
    this.error.set(null);
    try {
      for (const file of files.slice(0, MAX_IMAGES - card.images.length)) {
        const { url, width, height, variants } = await this.media.upload(file);
        this.patch(key, (current) => ({
          images: [...current.images, { url, width, height, variants, alt: '' }],
        }));
      }
    } catch (error: unknown) {
      this.error.set(messageOf(error, 'Upload failed.'));
    } finally {
      this.uploading.set(false);
    }
  }

  protected setAlt(key: number, index: number, alt: string): void {
    this.patch(key, (card) => ({
      images: card.images.map((image, i) => (i === index ? { ...image, alt } : image)),
    }));
  }

  protected moveImage(key: number, index: number, by: -1 | 1): void {
    this.patch(key, (card) => ({ images: moved(card.images, index, by) }));
  }

  protected removeImage(key: number, index: number): void {
    this.patch(key, (card) => ({ images: card.images.filter((_, i) => i !== index) }));
  }

  // --- Saving -----------------------------------------------------------------------

  protected async save(): Promise<void> {
    if (this.saving() || this.loadFailed()) return;

    this.saving.set(true);
    this.error.set(null);
    const sent = this.cards();
    try {
      await firstValueFrom(this.home.save(sent.map(({ key: _key, ...card }) => card)));
      // Edits made while the request was in flight are still unsaved.
      if (this.cards() === sent) this.dirty.set(false);
      this.savedAt.set(new Date());
    } catch (error: unknown) {
      this.error.set(messageOf(error, 'Saving failed.'));
    } finally {
      this.saving.set(false);
    }
  }
}

function moved<T>(items: T[], index: number, by: -1 | 1): T[] {
  const next = [...items];
  const target = index + by;
  if (target < 0 || target >= next.length) return items;
  [next[index], next[target]] = [next[target]!, next[index]!];
  return next;
}

function messageOf(error: unknown, fallback: string): string {
  return (error as { error?: { error?: string } })?.error?.error ?? fallback;
}
