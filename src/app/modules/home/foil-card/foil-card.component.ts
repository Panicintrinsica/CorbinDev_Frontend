import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { _IdGenerator } from '@angular/cdk/a11y';

/** Any CSS color works, including var(--token) and oklch(). */
export interface FoilTheme {
  /** Metal colors of the edge: dark, mid, light. */
  foil: [string, string, string];
  /** Wash the card settles into once fully in view. */
  tint: string;
  /** Highlight that rolls across as the card scrolls in. */
  shine: string;
}

export const SILVER_FOIL: FoilTheme = {
  foil: ['#4a4d55', '#9ca1ad', '#eef0f5'],
  tint: '#7d8597',
  shine: '#ffffff',
};

/** Share of the scroll-in after which `revealed` latches. */
const REVEAL_AT = 0.55;

/**
 * A satin black card with a foil edge, drawn in SVG behind its projected content.
 * Scroll position rolls a shine across it; fully in view, it takes on its tint.
 *
 * <app-foil-card [theme]="theme">...</app-foil-card>
 */
@Component({
  selector: 'app-foil-card',
  exportAs: 'foilCard',
  templateUrl: './foil-card.component.html',
  styleUrl: './foil-card.component.scss',
  host: {
    '[class.tinted]': 'progress() >= 0.995',
    '[class.drawn]': 'width() > 0',
  },
})
export class FoilCardComponent {
  theme = input<FoilTheme>(SILVER_FOIL);
  radius = input(18);

  /** 0 as the card's top enters the viewport, 1 once the card is fully in view. */
  readonly progress = signal(0);
  /** True only in a browser that allows motion, so content is never hidden without it. */
  readonly armed = signal(false);
  /** Latches as soon as the card starts to show. */
  readonly entered = signal(false);
  /** Latches once the card is far enough in; for one-time content entrances. */
  readonly revealed = signal(false);

  protected readonly width = signal(0);
  protected readonly height = signal(0);
  protected readonly id = inject(_IdGenerator).getId('foil-');

  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let frame = 0;

      const measure = () => {
        frame = 0;
        const rect = this.el.getBoundingClientRect();
        const viewport = window.innerHeight;
        // Cards taller than the viewport complete once they mostly fill it.
        const distance = Math.min(rect.height, viewport * 0.85) || 1;
        const next = Math.min(1, Math.max(0, (viewport - rect.top) / distance));
        this.progress.set(still ? 1 : next);
        if (next > 0.08) this.entered.set(true);
        if (next >= REVEAL_AT) this.revealed.set(true);
      };
      const schedule = () => {
        frame ||= requestAnimationFrame(measure);
      };

      const resize = new ResizeObserver(() => {
        this.width.set(this.el.offsetWidth);
        this.height.set(this.el.offsetHeight);
        schedule();
      });
      resize.observe(this.el);

      // Capture phase also catches scrolling inside containers, not just the window.
      const options = { capture: true, passive: true };
      document.addEventListener('scroll', schedule, options);
      window.addEventListener('resize', schedule);

      this.armed.set(!still);
      measure();

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        document.removeEventListener('scroll', schedule, options);
        window.removeEventListener('resize', schedule);
      });
    });
  }

  /** Horizontal center of the shine; starts and ends fully off the card. */
  protected shineX(): number {
    const reach = this.band();
    return -reach + this.progress() * (this.width() + reach * 2);
  }

  protected band(): number {
    return Math.max(160, this.width() * 0.35);
  }

  /** The top edge, including both corners. */
  protected topEdge(): string {
    const r = this.radius();
    const right = this.width() - 1.5;
    return `M1.5 ${r + 1.5} A${r} ${r} 0 0 1 ${r + 1.5} 1.5 H${right - r} A${r} ${r} 0 0 1 ${right} ${r + 1.5}`;
  }
}
