import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { resolveMediaUrl, MediaService } from '../../../../services/media.service';
import { GalleryItem, thumbnailOf } from '../../../../models/gallery.model';
import { parseYouTubeId, youTubeThumbnail } from '../../../../util/youtube';

/**
 * Edits a project's gallery: add images (several at once) or YouTube videos,
 * caption them, put them in order, remove them.
 *
 * Stateless about the list itself: it renders `items` and emits a new array on
 * every change, so the project editor stays the single owner of what gets saved.
 * Images are processed server-side into a thumbnail and a full-size rendition
 * (`purpose: project/gallery`); a removed item's files are deleted by the API when
 * the project is saved, if nothing else uses them.
 */
@Component({
  selector: 'app-gallery-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton],
  template: `
    <h2 class="heading">Gallery</h2>

    <ol class="items">
      @for (item of items(); track $index; let i = $index; let last = $last) {
        <li>
          <img class="thumb" [src]="preview(item)" alt="" />
          <div class="fields">
            <label class="kind">{{ item.type === 'video' ? 'YouTube video' : 'Image' }}</label>
            <input
              type="text"
              class="caption"
              [class.missing]="!item.caption.trim()"
              [value]="item.caption"
              (input)="setCaption(i, $any($event.target).value)"
              placeholder="Caption (required)"
              maxlength="300"
              [attr.aria-label]="'Caption for item ' + (i + 1)"
            />
          </div>
          <div class="actions">
            <button type="button" mat-button (click)="move(i, -1)" [disabled]="i === 0" aria-label="Move up">↑</button>
            <button type="button" mat-button (click)="move(i, 1)" [disabled]="last" aria-label="Move down">↓</button>
            <button type="button" mat-button (click)="remove(i)" aria-label="Remove">Remove</button>
          </div>
        </li>
      } @empty {
        <li class="empty">No gallery items yet.</li>
      }
    </ol>

    <div class="add">
      <input #files type="file" hidden multiple accept="image/png,image/jpeg,image/gif,image/webp,image/avif,image/svg+xml" (change)="upload($event)" />
      <button type="button" mat-stroked-button (click)="files.click()" [disabled]="uploading()">
        {{ uploading() ? 'Uploading…' : 'Add images' }}
      </button>

      <input
        #video
        type="text"
        class="video-url"
        placeholder="YouTube link"
        aria-label="YouTube link"
        (keydown.enter)="addVideo(video); $event.preventDefault()"
      />
      <button type="button" mat-stroked-button (click)="addVideo(video)">Add video</button>
    </div>

    @if (problem(); as message) {
      <p class="problem" role="alert">{{ message }}</p>
    }
  `,
  styles: `
    :host { display: block; margin: 1.5rem 0; }
    .heading { font-size: 1.1rem; margin: 0 0 0.75rem; }
    .items { list-style: none; margin: 0 0 1rem; padding: 0; display: grid; gap: 0.5rem; }
    li { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; }
    .empty { opacity: 0.5; border-style: dashed; }
    .thumb { width: 6rem; height: 4rem; object-fit: contain; border-radius: 4px; background: rgba(255,255,255,0.06); flex: none; }
    .fields { flex: 1; min-width: 0; display: grid; gap: 0.25rem; }
    .kind { font-size: 0.7rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em; }
    input[type='text'] { width: 100%; box-sizing: border-box; padding: 0.45rem 0.6rem; border-radius: 4px; border: 1px solid rgba(255,255,255,0.25); background: transparent; color: inherit; font: inherit; }
    input.missing { border-color: hsl(10, 90%, 65%); }
    .actions { display: flex; flex: none; }
    .add { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
    .video-url { flex: 1; min-width: 12rem; width: auto; }
    .problem { margin: 0.75rem 0 0; color: hsl(10, 90%, 80%); font-size: 0.85rem; white-space: pre-line; }
    @media (max-width: 600px) { li { flex-wrap: wrap; } }
  `,
})
export class GalleryEditorComponent {
  private media = inject(MediaService);

  items = input<GalleryItem[]>([]);
  /** Tags uploads for this project so replaced or abandoned ones are cleaned up. */
  projectId = input<string | null>(null);
  changed = output<GalleryItem[]>();

  protected uploading = signal(false);
  protected problem = signal<string | null>(null);

  protected preview(item: GalleryItem): string {
    return item.type === 'video'
      ? youTubeThumbnail(item.videoId)
      : resolveMediaUrl(thumbnailOf(item.image).url);
  }

  protected setCaption(index: number, caption: string): void {
    this.emit(this.items().map((item, i) => (i === index ? { ...item, caption } : item)));
  }

  protected move(index: number, by: -1 | 1): void {
    const list = [...this.items()];
    const target = index + by;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target]!, list[index]!];
    this.emit(list);
  }

  protected remove(index: number): void {
    this.emit(this.items().filter((_, i) => i !== index));
  }

  protected addVideo(input: HTMLInputElement): void {
    const videoId = parseYouTubeId(input.value);
    if (!videoId) {
      this.problem.set('That does not look like a YouTube link.');
      return;
    }
    this.problem.set(null);
    this.emit([...this.items(), { type: 'video', caption: '', videoId }]);
    input.value = '';
  }

  protected async upload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    if (files.length === 0) return;

    this.uploading.set(true);
    this.problem.set(null);
    const failures: string[] = [];
    const id = this.projectId();

    // One at a time: each is an AVIF encode on a small server, and the order the
    // author picked them in is the order they should appear.
    for (const file of files) {
      try {
        const uploaded = await this.media.upload(
          file,
          id ? { ownerKind: 'project', ownerId: id, slot: 'gallery' } : undefined,
          'project/gallery',
        );
        this.emit([
          ...this.items(),
          {
            type: 'image',
            caption: captionFrom(file.name),
            image: {
              url: uploaded.url,
              width: uploaded.width,
              height: uploaded.height,
              variants: uploaded.variants,
            },
          },
        ]);
      } catch (error: unknown) {
        const reason = (error as { error?: { error?: string } })?.error?.error ?? 'upload failed';
        failures.push(`${file.name}: ${reason}`);
      }
    }

    this.uploading.set(false);
    if (failures.length > 0) this.problem.set(failures.join('\n'));
  }

  private emit(items: GalleryItem[]): void {
    this.changed.emit(items);
  }
}

/** A starting caption from the file name, so a new item is never blank. Editable. */
function captionFrom(name: string): string {
  const text = name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Untitled';
}
