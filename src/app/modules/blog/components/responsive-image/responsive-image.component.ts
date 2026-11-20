import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { ImageVariant } from '../../../../models/media.model';
import { resolveMediaUrl } from '../../../../services/media.service';

/** The article reading column (see `blocks.scss`), as a `sizes` value for a non-stretched image. */
export const READING_COLUMN_SIZES = 'min(100vw, 46rem)';

/**
 * A responsive article image.
 *
 * The API re-encodes every upload as AVIF (animations as WebP) at several widths. This
 * component hands the browser that menu through `srcset` and lets
 * it pick the smallest file that suits its format support, viewport and pixel
 * density — nothing is decided in JavaScript, so it renders identically on the
 * server and needs no hydration work.
 *
 * `NgOptimizedImage` is deliberately not used. Its job is to generate resized
 * URLs through an image-CDN loader; here the renditions already exist, and it
 * cannot express an AVIF `<source>` ahead of a WebP fallback.
 *
 * An image uploaded before processing existed has no variants and renders as a
 * plain `<img>` of its single `src`, so old articles keep working untouched.
 *
 * `width` and `height` are the intrinsic size. They are what lets the browser
 * reserve the correct box before any bytes arrive (the stylesheet scales the
 * image to its column), which is what keeps the page from shifting as images load.
 */
@Component({
  selector: 'app-responsive-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // The wrapper adds no box of its own, so `.block-image img` styles apply as if
  // the <img> were a direct child of the figure.
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <picture>
      @if (avifSrcset(); as srcset) {
        <source type="image/avif" [attr.srcset]="srcset" [attr.sizes]="sizes()" />
      }
      <img
        [src]="resolvedSrc()"
        [attr.srcset]="webpSrcset()"
        [attr.sizes]="webpSrcset() ? sizes() : null"
        [attr.width]="width() ?? null"
        [attr.height]="height() ?? null"
        [alt]="alt()"
        loading="lazy"
        decoding="async"
      />
    </picture>
  `,
})
export class ResponsiveImageComponent {
  /** The plain fallback URL — absolute, or site-relative against the API origin. */
  src = input.required<string>();
  variants = input<ImageVariant[] | undefined>();
  width = input<number | undefined>();
  height = input<number | undefined>();
  alt = input('');
  /** How wide the image renders, so the browser can choose a rendition before layout. */
  sizes = input(READING_COLUMN_SIZES);

  protected resolvedSrc = computed(() => resolveMediaUrl(this.src()));
  protected avifSrcset = computed(() => this.srcsetFor('avif'));
  protected webpSrcset = computed(() => this.srcsetFor('webp'));

  private srcsetFor(format: ImageVariant['format']): string | null {
    const entries = (this.variants() ?? [])
      .filter((variant) => variant.format === format)
      .sort((a, b) => a.width - b.width)
      .map((variant) => `${resolveMediaUrl(variant.url)} ${variant.width}w`);

    return entries.length > 0 ? entries.join(', ') : null;
  }
}
