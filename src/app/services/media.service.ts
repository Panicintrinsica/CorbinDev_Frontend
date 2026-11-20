import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { MediaItem, MediaPage, UploadResponse } from '../models/media.model';

/**
 * Turns whatever a block recorded as an image URL into one a browser can load.
 *
 * Uploads normally store an absolute URL, so this is usually a pass-through. It
 * exists for the case that URL is site-relative — content written against a
 * differently-configured API, or a MEDIA_BASE_URL that was blank at the time —
 * because a `/media/...` path would otherwise resolve against the site's own
 * origin, where nothing is serving it.
 */
export function resolveMediaUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url;
  return `${environment.API}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** What an upload is for. `slot` must be one the API recognises for that owner kind. */
export interface UploadClaim {
  ownerKind: 'article' | 'skill' | 'project';
  ownerId: string;
  slot: 'logo' | 'thumbnail' | 'body' | 'gallery' | 'banner';
}

/** Selects how the API processes the image; icons are produced at one small fixed size. */
export type UploadPurpose = 'skill/logo' | 'project/gallery' | 'article/banner' | 'account/avatar';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private http = inject(HttpClient);
  private API = environment.API;

  /**
   * Uploads one image and returns the stored file.
   *
   * Promise-based rather than an Observable because Editor.js' image tool expects
   * a promise from its uploader, and this is the only caller that matters.
   */
  async upload(
    file: File,
    claim?: UploadClaim,
    purpose?: UploadPurpose,
  ): Promise<NonNullable<UploadResponse['file']>> {
    const form = new FormData();
    form.append('image', file);
    // Says what the image is for. The API uses it to replace a single-image slot
    // (a skill's logo) rather than pile up one file per attempt, and to clean up if
    // the owner is deleted. Optional: an article body image has no id until saved.
    if (claim) {
      form.append('ownerKind', claim.ownerKind);
      form.append('ownerId', claim.ownerId);
      form.append('slot', claim.slot);
    }

    if (purpose) form.append('purpose', purpose);

    const response = await firstValueFrom(
      this.http.post<UploadResponse>(`${this.API}/media/admin`, form),
    );

    if (response.success !== 1 || !response.file) {
      throw new Error(response.error ?? 'Upload failed');
    }
    return response.file;
  }

  /** The media library, newest first. */
  list(page = 1, size = 40) {
    return this.http.get<MediaPage>(`${this.API}/media/admin`, {
      params: { page, size },
    });
  }

  /** Deletes an upload. Rejected with 409 when an article still references it. */
  delete(item: MediaItem, force = false) {
    return this.http.delete<{ deleted: string; references: number }>(
      `${this.API}/media/admin/${item._id}`,
      { params: force ? { force: 'true' } : {} },
    );
  }
}
