import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { resolveMediaUrl } from '../../../../services/media.service';
import { GalleryItem, fullSizeOf } from '../../../../models/gallery.model';
import { youTubeEmbed } from '../../../../util/youtube';

export interface LightboxData {
  items: GalleryItem[];
  index: number;
}

/**
 * One gallery item, large, over a dimmed page. The dialog supplies the dimming,
 * focus trap, Escape and click-outside to close; this adds previous/next.
 *
 * Images are shown at their own size at most: `max-width` is the intrinsic width,
 * so a small screenshot is never stretched past what it really is.
 */
@Component({
  selector: 'app-gallery-lightbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure>
      @switch (item().type) {
        @case ('video') {
          <div class="video">
            <iframe
              [src]="embed()"
              [title]="item().caption"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        }
        @default {
          <img
            [src]="imageUrl()"
            [alt]="item().caption"
            [attr.width]="width() ?? null"
            [attr.height]="height() ?? null"
            [style.max-width]="width() ? width() + 'px' : null"
          />
        }
      }
      <figcaption>{{ item().caption }}</figcaption>
    </figure>

    <button type="button" class="close" (click)="close()" aria-label="Close">✕</button>
    @if (data.items.length > 1) {
      <button type="button" class="nav prev" (click)="step(-1)" aria-label="Previous">‹</button>
      <button type="button" class="nav next" (click)="step(1)" aria-label="Next">›</button>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      padding: 3rem 3.5rem 1.5rem;
      color: #fff;
      outline: none;
    }
    figure {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      margin: 0;
    }
    img {
      display: block;
      width: auto;
      height: auto;
      max-height: calc(100vh - 10rem);
      max-width: 100%;
      border-radius: 4px;
    }
    .video {
      width: min(90vw, 62rem, calc((100vh - 10rem) * 16 / 9));
      aspect-ratio: 16 / 9;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 4px;
      background: #000;
    }
    figcaption {
      max-width: 42rem;
      text-align: center;
      font-size: 0.95rem;
      line-height: 1.4;
    }
    button {
      position: absolute;
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border: 0;
      border-radius: 50%;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.12);
    }
    button:hover,
    button:focus-visible {
      background: rgba(255, 255, 255, 0.28);
    }
    .close {
      top: 0.5rem;
      right: 0.5rem;
      font-size: 1rem;
    }
    .nav {
      top: 50%;
      transform: translateY(-50%);
    }
    .prev {
      left: 0.5rem;
    }
    .next {
      right: 0.5rem;
    }
    @media (max-width: 600px) {
      :host {
        padding: 3rem 0.75rem 1rem;
      }
      .nav {
        top: auto;
        bottom: 0.5rem;
        transform: none;
      }
    }
  `,
})
export class GalleryLightboxComponent {
  protected data = inject<LightboxData>(MAT_DIALOG_DATA);
  private ref = inject(MatDialogRef<GalleryLightboxComponent>);
  private sanitizer = inject(DomSanitizer);

  private index = signal(this.data.index);

  protected item = computed(() => this.data.items[this.index()]!);
  protected imageUrl = computed(() => {
    const item = this.item();
    return item.type === 'image' ? resolveMediaUrl(fullSizeOf(item.image)) : '';
  });
  protected width = computed(() => {
    const item = this.item();
    return item.type === 'image' ? item.image.width : undefined;
  });
  protected height = computed(() => {
    const item = this.item();
    return item.type === 'image' ? item.image.height : undefined;
  });
  /** The id was validated as 11 safe characters by the API, so building the URL from it is safe. */
  protected embed = computed(() => {
    const item = this.item();
    return item.type === 'video'
      ? this.sanitizer.bypassSecurityTrustResourceUrl(youTubeEmbed(item.videoId))
      : '';
  });

  protected step(direction: 1 | -1): void {
    const count = this.data.items.length;
    this.index.update((current) => (current + direction + count) % count);
  }

  protected close(): void {
    this.ref.close();
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') this.step(-1);
    if (event.key === 'ArrowRight') this.step(1);
  }
}
