import type { ImageVariant } from './media.model';

/** An uploaded image as a gallery stores it: the thumbnail and full rungs live in `variants`. */
export interface GalleryImage {
  url: string;
  width?: number;
  height?: number;
  variants?: ImageVariant[];
}

export type GalleryItem =
  | { type: 'image'; caption: string; image: GalleryImage }
  | { type: 'video'; caption: string; videoId: string };

/** The smallest rendition, for the grid. Falls back to the image's own url. */
export function thumbnailOf(image: GalleryImage): { url: string; width?: number; height?: number } {
  const smallest = [...(image.variants ?? [])].sort((a, b) => a.width - b.width)[0];
  if (!smallest) return image;
  return {
    url: smallest.url,
    width: smallest.width,
    // Same aspect ratio as the source, so the height follows from the width.
    ...(image.width && image.height
      ? { height: Math.round((smallest.width * image.height) / image.width) }
      : {}),
  };
}

/** The largest rendition, for the lightbox. Never larger than the source. */
export function fullSizeOf(image: GalleryImage): string {
  const largest = [...(image.variants ?? [])].sort((a, b) => b.width - a.width)[0];
  return largest?.url ?? image.url;
}
