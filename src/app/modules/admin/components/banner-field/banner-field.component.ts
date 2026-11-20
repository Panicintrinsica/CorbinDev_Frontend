import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MediaService } from '../../../../services/media.service';
import type { ArticleBanner } from '../../../../models/article.model';
import { ResponsiveImageComponent } from '../../../blog/components/responsive-image/responsive-image.component';

/** The narrowest image the API accepts for a banner; keep in step with `content/banner.ts`. */
export const MIN_BANNER_WIDTH = 800;

/**
 * Picks an article's optional banner image. The API makes a 400px and an 800px
 * rendition and refuses anything narrower than 800px, with a message this shows.
 * Emits the new banner (or null to remove it); the article editor owns saving.
 */
@Component({
  selector: 'app-banner-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, ResponsiveImageComponent],
  template: `
    <h2 class="heading">Banner image <span class="optional">(optional)</span></h2>

    @if (banner(); as current) {
      <div class="preview">
        <app-responsive-image
          [src]="current.url"
          [variants]="current.variants"
          [width]="current.width"
          [height]="current.height"
          [alt]="current.alt"
          sizes="min(100vw, 30rem)"
        />
      </div>
      <input
        type="text"
        class="alt"
        [value]="current.alt"
        (input)="setAlt($any($event.target).value)"
        placeholder="Describe the image (alt text)"
        maxlength="300"
        aria-label="Banner alt text"
      />
    }

    <div class="actions">
      <input #file type="file" hidden accept="image/png,image/jpeg,image/gif,image/webp,image/avif" (change)="upload($event)" />
      <button type="button" mat-stroked-button (click)="file.click()" [disabled]="uploading()">
        {{ uploading() ? 'Uploading…' : banner() ? 'Replace banner' : 'Add banner' }}
      </button>
      @if (banner()) {
        <button type="button" mat-button (click)="changed.emit(null)">Remove</button>
      }
      <span class="hint">At least {{ min }}px wide.</span>
    </div>

    @if (problem(); as message) {
      <p class="problem" role="alert">{{ message }}</p>
    }
  `,
  styles: `
    :host { display: block; margin: 1.5rem 0; }
    .heading { font-size: 1.1rem; margin: 0 0 0.75rem; }
    .optional { font-size: 0.8rem; font-weight: normal; opacity: 0.6; }
    .preview { max-width: 30rem; margin-bottom: 0.5rem; }
    .preview ::ng-deep img { display: block; width: 100%; height: auto; border-radius: 4px; }
    .alt { width: 100%; max-width: 30rem; box-sizing: border-box; margin-bottom: 0.5rem; padding: 0.45rem 0.6rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.25); background: transparent; color: inherit; font: inherit; }
    .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
    .hint { font-size: 0.8rem; opacity: 0.6; }
    .problem { margin: 0.75rem 0 0; color: hsl(10, 90%, 80%); font-size: 0.85rem; }
  `,
})
export class BannerFieldComponent {
  private media = inject(MediaService);

  banner = input<ArticleBanner | null>(null);
  /** Tags the upload for this article so a replaced banner's file is cleaned up. */
  articleId = input<string | null>(null);
  changed = output<ArticleBanner | null>();

  protected min = MIN_BANNER_WIDTH;
  protected uploading = signal(false);
  protected problem = signal<string | null>(null);

  protected setAlt(alt: string): void {
    const current = this.banner();
    if (current) this.changed.emit({ ...current, alt });
  }

  protected async upload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    this.uploading.set(true);
    this.problem.set(null);
    try {
      const id = this.articleId();
      const uploaded = await this.media.upload(
        file,
        id ? { ownerKind: 'article', ownerId: id, slot: 'banner' } : undefined,
        'article/banner',
      );
      this.changed.emit({
        url: uploaded.url,
        width: uploaded.width,
        height: uploaded.height,
        variants: uploaded.variants,
        alt: this.banner()?.alt ?? '',
      });
    } catch (error: unknown) {
      this.problem.set(
        (error as { error?: { error?: string } })?.error?.error ?? 'Banner upload failed',
      );
    } finally {
      this.uploading.set(false);
    }
  }
}
