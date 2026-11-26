import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { HomeService } from '../../services/home.service';
import { resolveMediaUrl } from '../../services/media.service';
import {
  brandLogo,
  DEFAULT_HOME_CARDS,
  HomeSkill,
  PublicHomeCard,
} from '../../models/home.model';
import type { ContentBlock } from '../../models/content.model';
import { getContentBody } from '../../utilities';
import { HomeKeyartComponent } from './home-keyart/home-keyart.component';
import {
  FeatureCard,
  FeatureLogo,
  HomeFeatureComponent,
} from './home-feature/home-feature.component';

@Component({
  selector: 'app-home',
  imports: [HomeKeyartComponent, HomeFeatureComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private home = inject(HomeService);
  private content = inject(ContentService);

  /**
   * The saved configuration, or the built-in cards when there is none (or the API
   * cannot give one). Empty while loading, so defaults never flash before it.
   */
  cards = toSignal(
    this.home.cards().pipe(
      catchError(() => of(null)),
      switchMap((saved) =>
        saved ? of(saved.map((card, index) => this.fromConfig(card, index))) : this.defaults(),
      ),
    ),
    { initialValue: [] as FeatureCard[] },
  );

  constructor(meta: Meta, title: Title) {
    title.setTitle('Corbin.dev');

    meta.addTags([
      {
        name: 'description',
        content: 'Portfolio & Website of Emrys Corbin, Software Engineer.',
      },
      {
        name: 'keywords',
        content: 'emrys, corbin, corbin.dev, software engineer',
      },
    ]);
  }

  private fromConfig(card: PublicHomeCard, index: number): FeatureCard {
    return {
      title: card.title,
      body: card.body,
      color: card.color,
      theme: card.theme,
      // `auto` zigzags: left, right, left.
      isAlternate: card.side === 'auto' ? index % 2 === 1 : card.side === 'right',
      route: card.route,
      images: card.images.map((image) => ({ src: resolveMediaUrl(image.url), alt: image.alt })),
      logos: card.skills.map((skill) => this.logo(skill)),
    };
  }

  private logo({ _id, name, logo }: HomeSkill): FeatureLogo {
    const src = brandLogo(logo);
    return {
      skillId: _id,
      name,
      src: !src || src.startsWith('assets/') ? src : resolveMediaUrl(src),
    };
  }

  private defaults() {
    return forkJoin({
      blocks: this.content
        .getContentGroupByPage('home')
        .pipe(catchError(() => of([] as ContentBlock[]))),
      skills: this.home.skills().pipe(catchError(() => of([] as HomeSkill[]))),
    }).pipe(
      map(({ blocks, skills }) =>
        DEFAULT_HOME_CARDS.map((card, index): FeatureCard => ({
          title: card.title,
          body: getContentBody(blocks, card.content),
          color: card.color,
          isAlternate: index % 2 === 1,
          route: '',
          images: [],
          logos: card.skills.flatMap((logo) => {
            const skill = skills.find((candidate) => candidate.logo === logo);
            return skill ? [this.logo(skill)] : [];
          }),
        })),
      ),
    );
  }
}
