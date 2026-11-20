const ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * The 11-character video id from whatever a person pastes: a watch, share, embed
 * or shorts link, or the bare id. Null when it is not recognisably YouTube.
 */
export function parseYouTubeId(input: string): string | null {
  const text = input.trim();
  if (ID.test(text)) return text;

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www|m)\./, '');
  let candidate: string | null | undefined = null;

  if (host === 'youtu.be') {
    candidate = url.pathname.split('/')[1];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const [, first, second] = url.pathname.split('/');
    candidate = first === 'watch' ? url.searchParams.get('v') : ['embed', 'shorts', 'live', 'v'].includes(first ?? '') ? second : null;
  }

  return candidate && ID.test(candidate) ? candidate : null;
}

/** A true 16:9 still (no letterbox bars, unlike `hqdefault`). */
export const youTubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

/** Privacy-enhanced embed: sets no cookies until the visitor plays it. */
export const youTubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
