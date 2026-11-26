import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FoilCardComponent, FoilTheme } from '../foil-card/foil-card.component';
import {
  FeatureGalleryComponent,
  FeatureImage,
} from '../feature-gallery/feature-gallery.component';
import { MatDialog } from '@angular/material/dialog';
import { SkillDialogComponent } from '../../skills/skill-dialog/skill-dialog.component';
import type { HomeColor, HomeTheme } from '../../../models/home.model';

export interface FeatureLogo {
  skillId: string;
  name: string;
  /** Null shows the name instead of a picture. */
  src: string | null;
}

export interface FeatureCard {
  title: string;
  body: string;
  color: HomeColor;
  /** Used when `color` is `custom`. */
  theme?: HomeTheme;
  isAlternate: boolean;
  route: string;
  images: FeatureImage[];
  logos: FeatureLogo[];
}

/** The named card colors; `custom` cards bring their own. */
export const FEATURE_THEMES: Record<Exclude<HomeColor, 'custom'>, FoilTheme> = {
  red: {
    foil: ['#5c2a1c', '#c8704a', '#ffd9c2'],
    tint: 'var(--violent-red)',
    shine: '#ffe9dd',
  },
  blue: {
    foil: ['#26324f', '#7288bd', '#dbe6ff'],
    tint: 'var(--corbin-blue)',
    shine: '#e4eeff',
  },
  pink: {
    foil: ['#4d2448', '#b86aa6', '#ffd8f3'],
    tint: 'var(--angry-pink)',
    shine: '#ffe6f7',
  },
};

@Component({
  selector: 'app-home-feature',
  imports: [
    RouterLink,
    FoilCardComponent,
    FeatureGalleryComponent,
  ],
  templateUrl: './home-feature.component.html',
  standalone: true,
  styleUrl: './home-feature.component.scss',
})
export class HomeFeatureComponent {
  card = input.required<FeatureCard>();

  private dialog = inject(MatDialog);

  protected theme(): FoilTheme {
    const { color, theme } = this.card();
    return color === 'custom' ? (theme ?? FEATURE_THEMES.blue) : FEATURE_THEMES[color];
  }

  /** Logos stay blurred until their own row is on screen, not just the card. */
  protected readonly dissolved = signal(false);
  private logos = viewChild.required<ElementRef<HTMLElement>>('logos');

  protected viewSkill(id: string) {
    this.dialog.open(SkillDialogComponent, {
      data: id,
      autoFocus: false,
      width: '100%',
      maxWidth: '600px',
    });
  }

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.6) this.dissolved.set(false);
          // Re-arm below the screen: late-loading text can push a seen row back down.
          else if (entry.boundingClientRect.top >= window.innerHeight) this.dissolved.set(true);
        },
        { threshold: [0, 0.6] },
      );
      observer.observe(this.logos().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
