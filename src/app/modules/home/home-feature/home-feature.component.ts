import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FoilCardComponent, FoilTheme } from '../foil-card/foil-card.component';
import {
  FeatureGalleryComponent,
  FeatureImage,
} from '../feature-gallery/feature-gallery.component';

export type FeatureColor = 'red' | 'blue' | 'pink';

/** Default card colors per section; override one card with the `theme` input. */
export const FEATURE_THEMES: Record<FeatureColor, FoilTheme> = {
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
    NgOptimizedImage,
    RouterLink,
    FoilCardComponent,
    FeatureGalleryComponent,
  ],
  templateUrl: './home-feature.component.html',
  standalone: true,
  styleUrl: './home-feature.component.scss',
})
export class HomeFeatureComponent {
  @Input() header = '';
  @Input() images: FeatureImage[] = [];
  @Input() color: FeatureColor = 'blue';
  @Input() theme?: FoilTheme;
  @Input() isAlternate = false;
  @Input() route = '';
  @Input() stack: featuredStackItem[] = [];

  protected readonly themes = FEATURE_THEMES;
}

export interface featuredStackItem {
  img: string;
  alt: string;
  link?: string;
}
