/**
 * An uploaded image, as the API's media routes describe it.
 *
 * `path` is the stable identity (`/media/2026/08/<hash>.webp`); `url` is that path
 * resolved against the API origin, and is what goes into a block and an <img>.
 */
export interface MediaItem {
  _id: string;
  path: string;
  url: string;
  mimeType: string;
  bytes: number;
  width?: number;
  height?: number;
  /** The responsive set generated at upload. Absent on images uploaded before processing existed. */
  variants?: ImageVariant[];
  animated?: boolean;
  originalName: string;
  alt: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

/** One re-encoded rendition of an image, as referenced from `srcset`. */
export interface ImageVariant {
  format: 'avif' | 'webp';
  /** Intrinsic width in pixels — the `w` descriptor. */
  width: number;
  url: string;
}

export interface MediaPage {
  data: MediaItem[];
  meta: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
  };
}

/** The upload endpoint's response, shaped to Editor.js' image-tool contract. */
export interface UploadResponse {
  success: 0 | 1;
  error?: string;
  file?: {
    url: string;
    path: string;
    width?: number;
    height?: number;
    variants?: ImageVariant[];
    size: number;
    mimeType: string;
    id?: string;
  };
}
