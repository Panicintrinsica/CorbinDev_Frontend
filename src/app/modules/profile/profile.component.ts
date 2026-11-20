import {
  Component,
  computed,
  Inject,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ContentService } from '../../services/content.service';
import { MarkdownComponent } from 'ngx-markdown';
import { isPlatformBrowser, NgClass, NgOptimizedImage } from '@angular/common';
import { getContentBody } from '../../utilities';
import { MatButton } from '@angular/material/button';
import { Meta, Title } from '@angular/platform-browser';
import { ProfileService } from '../../services/profile.service';
import { fullSizeOf } from '../../models/gallery.model';
import { resolveMediaUrl } from '../../services/media.service';
import {
  assetPath,
  DEFAULT_BIRTH_DATE,
  DEFAULT_FACTS,
  DEFAULT_NAME,
  DEFAULT_PRONOUNS,
  DEFAULT_SECTIONS,
  ProfileContent,
} from '../../models/profile.model';

/** A topic section as rendered: its own markdown, or a built-in file until one is saved. */
interface SectionView {
  id: string;
  title: string;
  body?: string;
  asset?: string;
}

/**
 * The public Profile page. Everything on it is edited in the admin Profile page and
 * served by `GET /profile`; until a profile has been saved, the content the page
 * always had (the content block, static markdown, the built-in facts) is shown.
 */
@Component({
  selector: 'app-profile',
  imports: [MarkdownComponent, MatButton, NgClass, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
})
export class ProfileComponent implements OnInit, OnDestroy {
  contentService = inject(ContentService);
  private profileService = inject(ProfileService);
  content = this.contentService.content;

  /** What was saved, or null when nothing has been (or it could not be loaded). */
  private saved = signal<ProfileContent | null>(null);

  name = computed(() => this.saved()?.displayName || DEFAULT_NAME);
  pronouns = computed(() => this.saved()?.pronouns ?? DEFAULT_PRONOUNS);
  birthDate = computed(() => this.saved()?.birthDate ?? DEFAULT_BIRTH_DATE);
  intro = computed(() => this.saved()?.intro ?? getContentBody(this.content(), 'main'));

  avatarUrl = computed(() => {
    const avatar = this.saved()?.avatar;
    return avatar ? resolveMediaUrl(fullSizeOf(avatar)) : null;
  });

  age = signal(0);
  facts = computed(() => {
    const facts = this.saved()?.facts ?? DEFAULT_FACTS;
    const age = `${this.age()}`;
    return facts.map((fact) => ({ title: fact.title, value: fact.value.replaceAll('{age}', age) }));
  });

  sections = computed<SectionView[]>(
    () =>
      this.saved()?.sections ??
      DEFAULT_SECTIONS.map(({ id, title, asset }) => ({ id, title, asset: assetPath(asset) })),
  );

  selection = signal('');
  private intervalId?: number;

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.title.setTitle('Corbin.dev | Profile');
    this.meta.addTags([
      {
        name: 'description',
        content: 'A short personal profile of Emrys Corbin',
      },
    ]);

    this.contentService.fetchContent('biography');
    this.profileService.page().subscribe({
      next: (profile) => this.saved.set(profile),
      error: () => this.saved.set(null),
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.calculateAge();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  makeSelection(id: string) {
    this.selection.set(id);
  }

  /** Ticks the live age counter, from whatever birth date is saved. An empty one stops it. */
  calculateAge() {
    this.intervalId = window.setInterval(() => {
      const born = Date.parse(this.birthDate());
      this.age.set(Number.isNaN(born) ? 0 : Date.now() - born);
    }, 1);
  }
}
