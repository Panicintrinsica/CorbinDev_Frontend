import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { animate, JSAnimation, onScroll } from 'animejs';

export type RevealPreset = 'fade-up' | 'fade-in' | 'zoom-in-up';

/**
 * Plays an entrance animation the first time the element scrolls into view.
 * Replaces the old AOS `data-aos` attributes.
 *
 * <div appReveal="fade-up" [revealDuration]="1500" [revealDelay]="0">
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {
  preset = input<RevealPreset | ''>('fade-up', { alias: 'appReveal' });
  duration = input(1000, { alias: 'revealDuration' });
  delay = input(0, { alias: 'revealDelay' });

  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private animation?: JSAnimation;

  constructor() {
    // afterNextRender only runs in the browser, so SSR is safe.
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const preset = this.preset() || 'fade-up';
      const props: Record<string, unknown> = { opacity: [0, 1] };
      if (preset === 'fade-up') props['translateY'] = [100, 0];
      if (preset === 'zoom-in-up') {
        props['translateY'] = [100, 0];
        props['scale'] = [0.6, 1];
      }

      this.animation = animate(this.el, {
        ...props,
        duration: this.duration(),
        delay: this.delay(),
        ease: 'outQuad',
        autoplay: onScroll({
          target: this.el,
          enter: 'bottom-=50 top',
          repeat: false,
        }),
      });
    });
  }

  ngOnDestroy() {
    this.animation?.revert();
  }
}
