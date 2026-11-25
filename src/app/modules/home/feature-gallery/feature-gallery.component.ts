import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

export interface FeatureImage {
  src: string;
  alt: string;
}

/** Fades in on first view, then cross-fades through its images. */
@Component({
  selector: 'app-feature-gallery',
  templateUrl: './feature-gallery.component.html',
  styleUrl: './feature-gallery.component.scss',
  host: {
    '[class.waiting]': 'waiting()',
    '(mouseenter)': 'hovered = true',
    '(mouseleave)': 'hovered = false',
  },
})
export class FeatureGalleryComponent {
  images = input.required<FeatureImage[]>();
  interval = input(5000);

  protected readonly index = signal(0);
  protected readonly paused = signal(false);
  protected readonly waiting = signal(false);
  protected hovered = false;

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // No automatic movement; the button can still start the rotation.
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.paused.set(still);
      this.waiting.set(!still);

      let visible = false;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) this.waiting.set(false);
        },
        { threshold: 0.25 },
      );
      observer.observe(el);

      const timer = setInterval(() => {
        const count = this.images().length;
        if (count < 2 || !visible || this.hovered || this.paused()) return;
        this.index.update((i) => (i + 1) % count);
      }, this.interval());

      destroyRef.onDestroy(() => {
        observer.disconnect();
        clearInterval(timer);
      });
    });
  }
}
