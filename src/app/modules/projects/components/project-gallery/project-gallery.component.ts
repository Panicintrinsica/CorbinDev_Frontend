import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { resolveMediaUrl } from '../../../../services/media.service';
import { GalleryItem, thumbnailOf } from '../../../../models/gallery.model';
import { youTubeThumbnail } from '../../../../util/youtube';
import { GalleryLightboxComponent } from './gallery-lightbox.component';

/**
 * A project's gallery: a row of thumbnails, each at its own aspect ratio. Choosing
 * one opens it large over a dimmed page (see `GalleryLightboxComponent`).
 *
 * The grid only ever loads the thumbnail rung; the full-size file is requested when
 * the lightbox opens, and a YouTube embed is not created at all until then, so a
 * gallery of videos costs a single small still per item.
 */
@Component({
  selector: 'app-project-gallery',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (items().length > 0) {
      <ul class="gallery" aria-label="Project gallery">
        @for (item of items(); track $index) {
          <li [style.--ratio]="ratio(item)">
            <button type="button" (click)="open($index)" [attr.aria-label]="'View: ' + item.caption">
              <img
                [src]="thumb(item).url"
                [attr.width]="thumb(item).width ?? null"
                [attr.height]="thumb(item).height ?? null"
                [alt]="item.caption"
                loading="lazy"
                decoding="async"
              />
              @if (item.type === 'video') {
                <span class="play" aria-hidden="true">▶</span>
              }
            </button>
            <p class="caption">{{ item.caption }}</p>
          </li>
        }
      </ul>
    }
  `,
  styles: `
    .gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    /* Justified rows: each item grows in proportion to its aspect ratio, so every
       thumbnail in a row ends up the same height without cropping or distortion. */
    li {
      flex: calc(var(--ratio) * 100) 1 calc(var(--ratio) * 9rem);
      max-width: calc(var(--ratio) * 16rem);
      min-width: 8rem;
    }
    button {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--ratio);
      padding: 0;
      border: 0;
      border-radius: 6px;
      overflow: hidden;
      cursor: zoom-in;
      background: rgba(255, 255, 255, 0.06);
    }
    button:focus-visible {
      outline: 2px solid var(--accent, currentColor);
      outline-offset: 2px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover; /* the box already has the image's own ratio: nothing is cropped */
      transition: transform 0.2s ease;
    }
    button:hover img {
      transform: scale(1.03);
    }
    .play {
      position: absolute;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      color: #fff;
      font-size: 1rem;
      padding-left: 0.15rem;
      background: rgba(0, 0, 0, 0.6);
      pointer-events: none;
    }
    .caption {
      margin: 0.35rem 0 0;
      font-size: 0.8rem;
      line-height: 1.3;
      opacity: 0.8;
    }
  `,
})
export class ProjectGalleryComponent {
  private dialog = inject(MatDialog);

  items = input<GalleryItem[]>([]);

  protected thumb(item: GalleryItem): { url: string; width?: number; height?: number } {
    if (item.type === 'video') return { url: youTubeThumbnail(item.videoId), width: 320, height: 180 };
    const thumb = thumbnailOf(item.image);
    return { ...thumb, url: resolveMediaUrl(thumb.url) };
  }

  /** width / height; an image without recorded dimensions is treated as 4:3. */
  protected ratio(item: GalleryItem): number {
    if (item.type === 'video') return 16 / 9;
    const { width, height } = item.image;
    return width && height ? width / height : 4 / 3;
  }

  protected open(index: number): void {
    this.dialog.open(GalleryLightboxComponent, {
      data: { items: this.items(), index },
      panelClass: 'gallery-lightbox-panel',
      backdropClass: 'gallery-lightbox-backdrop',
      maxWidth: '100vw',
      maxHeight: '100vh',
      autoFocus: 'dialog',
      restoreFocus: true,
    });
  }
}
