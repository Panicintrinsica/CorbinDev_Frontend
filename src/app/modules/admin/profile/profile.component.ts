import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AvatarCropperComponent } from '../components/avatar-cropper/avatar-cropper.component';
import { catchError, firstValueFrom, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MediaService, resolveMediaUrl } from '../../../services/media.service';
import { MIN_AVATAR_SIDE, ProfileService } from '../../../services/profile.service';
import { fullSizeOf, thumbnailOf } from '../../../models/gallery.model';
import {
  Avatar,
  assetPath,
  DEFAULT_BIRTH_DATE,
  DEFAULT_FACTS,
  DEFAULT_NAME,
  DEFAULT_PRONOUNS,
  DEFAULT_SECTIONS,
  ProfileContent,
  ProfileFact,
  ProfileSection,
} from '../../../models/profile.model';
import type { ContentBlock } from '../../../models/content.model';

/**
 * Edits everything on the public Profile page, tied to the signed-in Hades account:
 * picture, name, pronouns, birth date, the intro, the facts table and the topic
 * sections (all markdown). The picture saves as soon as it is uploaded; the rest
 * saves together with the Save button.
 *
 * Until a profile has been saved once, the fields are pre-filled from the content
 * the page has always shown (static markdown and the old content block), so the
 * first save keeps it rather than starting from blank.
 */
@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [RouterLink, MatButton],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class AdminProfileComponent implements OnInit {
  private profile = inject(ProfileService);
  private media = inject(MediaService);
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  protected min = MIN_AVATAR_SIDE;
  protected loading = signal(true);
  protected saving = signal(false);
  protected dirty = signal(false);
  protected savedAt = signal<Date | null>(null);
  protected error = signal<string | null>(null);

  protected avatar = signal<Avatar | null>(null);
  protected avatarBusy = signal(false);
  protected avatarMessage = signal<string | null>(null);

  protected displayName = signal('');
  protected pronouns = signal('');
  protected birthDate = signal('');
  protected intro = signal('');
  protected facts = signal<ProfileFact[]>([]);
  protected sections = signal<ProfileSection[]>([]);

  async ngOnInit(): Promise<void> {
    try {
      const saved = await firstValueFrom(this.profile.me());
      this.avatar.set(saved?.avatar ?? null);
      this.displayName.set(saved?.displayName ?? DEFAULT_NAME);
      this.pronouns.set(saved?.pronouns ?? DEFAULT_PRONOUNS);
      this.birthDate.set(saved?.birthDate ?? DEFAULT_BIRTH_DATE);
      this.facts.set(saved?.facts ?? DEFAULT_FACTS.map((fact) => ({ ...fact })));
      this.intro.set(saved?.intro ?? (await this.defaultIntro()));
      this.sections.set(saved?.sections ?? (await this.defaultSections()));
    } catch {
      this.error.set('Could not load your profile.');
    } finally {
      this.loading.set(false);
    }
  }

  // --- Defaults from the page's existing content ---------------------------------

  private async defaultIntro(): Promise<string> {
    const blocks = await firstValueFrom(
      this.http
        .get<ContentBlock[]>(`${environment.API}/content/biography`)
        .pipe(catchError(() => of([] as ContentBlock[]))),
    );
    return blocks.find((block) => block.uri === 'main')?.body ?? '';
  }

  private defaultSections(): Promise<ProfileSection[]> {
    return Promise.all(
      DEFAULT_SECTIONS.map(async ({ id, title, asset }) => ({
        id,
        title,
        body: await firstValueFrom(
          this.http
            .get(assetPath(asset), { responseType: 'text' })
            .pipe(catchError(() => of(''))),
        ),
      })),
    );
  }

  // --- Picture ---------------------------------------------------------------------

  protected full(avatar: Avatar): string {
    return resolveMediaUrl(fullSizeOf(avatar));
  }

  protected small(avatar: Avatar): string {
    return resolveMediaUrl(thumbnailOf(avatar).url);
  }

  protected async uploadAvatar(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const picked = input.files?.[0];
    input.value = '';
    if (!picked) return;

    // Crop to a square here, so only the chosen part is ever uploaded.
    const file = await firstValueFrom(
      this.dialog
        .open<AvatarCropperComponent, { file: File; minSide: number }, File>(AvatarCropperComponent, {
          data: { file: picked, minSide: this.min },
        })
        .afterClosed(),
    );
    if (!file) return;

    this.avatarBusy.set(true);
    this.avatarMessage.set(null);
    try {
      // The API refuses a picture under 256px here, with a message that says so.
      const uploaded = await this.media.upload(file, undefined, 'account/avatar');
      const saved = await firstValueFrom(
        this.profile.setAvatar({
          url: uploaded.url,
          width: uploaded.width,
          height: uploaded.height,
          variants: uploaded.variants,
        }),
      );
      this.avatar.set(saved.avatar);
    } catch (error: unknown) {
      this.avatarMessage.set(
        (error as { error?: { error?: string } })?.error?.error ??
          (error as Error)?.message ??
          'Could not set the picture.',
      );
    } finally {
      this.avatarBusy.set(false);
    }
  }

  protected async removeAvatar(): Promise<void> {
    this.avatarBusy.set(true);
    this.avatarMessage.set(null);
    try {
      await firstValueFrom(this.profile.setAvatar(null));
      this.avatar.set(null);
    } catch {
      this.avatarMessage.set('Could not remove the picture.');
    } finally {
      this.avatarBusy.set(false);
    }
  }

  // --- Content ----------------------------------------------------------------------

  protected set<T>(field: { set(value: T): void }, value: T): void {
    field.set(value);
    this.dirty.set(true);
  }

  protected setFact(index: number, key: keyof ProfileFact, value: string): void {
    this.set(
      this.facts,
      this.facts().map((fact, i) => (i === index ? { ...fact, [key]: value } : fact)),
    );
  }

  protected addFact(): void {
    this.set(this.facts, [...this.facts(), { title: '', value: '' }]);
  }

  protected setSection(index: number, key: 'title' | 'body', value: string): void {
    this.set(
      this.sections,
      this.sections().map((section, i) => (i === index ? { ...section, [key]: value } : section)),
    );
  }

  protected addSection(): void {
    this.set(this.sections, [...this.sections(), { id: '', title: '', body: '' }]);
  }

  protected move<T>(list: { (): T[]; set(value: T[]): void }, index: number, by: -1 | 1): void {
    const items = [...list()];
    const target = index + by;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target]!, items[index]!];
    this.set(list, items);
  }

  protected remove<T>(list: { (): T[]; set(value: T[]): void }, index: number): void {
    this.set(
      list,
      list().filter((_, i) => i !== index),
    );
  }

  protected async save(): Promise<void> {
    if (this.saving()) return;

    const sections = this.withIds(this.sections());
    if (sections.some((section) => !section.title.trim())) {
      this.error.set('Every section needs a title.');
      return;
    }
    // A row with neither a label nor a value is an unfilled one, not content.
    const facts = this.facts().filter((fact) => fact.title.trim() || fact.value.trim());
    if (facts.some((fact) => !fact.title.trim())) {
      this.error.set('Every fact needs a label.');
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    try {
      const saved = await firstValueFrom(
        this.profile.save({
          displayName: this.displayName(),
          pronouns: this.pronouns(),
          birthDate: this.birthDate(),
          intro: this.intro(),
          facts,
          sections,
        }),
      );
      this.facts.set(saved.facts ?? []);
      this.sections.set(saved.sections ?? []);
      this.dirty.set(false);
      this.savedAt.set(new Date());
    } catch (error: unknown) {
      this.error.set((error as { error?: { error?: string } })?.error?.error ?? 'Saving failed.');
    } finally {
      this.saving.set(false);
    }
  }

  /** Gives new sections a URL-safe id from their title, unique among the page's. */
  private withIds(sections: ProfileSection[]): ProfileSection[] {
    const taken = new Set(sections.map((section) => section.id).filter(Boolean));
    return sections.map((section) => {
      if (section.id) return section;
      const base =
        section.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 28) || 'section';
      let id = base;
      for (let n = 2; taken.has(id); n += 1) id = `${base}-${n}`;
      taken.add(id);
      return { ...section, id };
    });
  }
}

export type { ProfileContent };
