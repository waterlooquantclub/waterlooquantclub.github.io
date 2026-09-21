/**
 * Event photo galleries, resolved at build time.
 *
 * Photos live in `src/assets/events/<slug>/` where `<slug>` is the event's
 * slug in the member portal. Vite globs the folder tree at build time, so
 * adding photos to an event is just dropping files into its folder: nothing
 * is listed by hand and the portal never sees the files.
 *
 * Optional `captions.json` in a folder maps filename -> caption.
 */
import type { GalleryItem } from "@/components/EventDialog";

const imageModules = import.meta.glob<string>(
  "../assets/events/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
);

const captionModules = import.meta.glob<Record<string, string>>(
  "../assets/events/*/captions.json",
  { eager: true, import: "default" },
);

const FOLDER_RE = /^\.\.\/assets\/events\/([^/]+)\/([^/]+)$/;

const galleries = new Map<string, GalleryItem[]>();

// Build once at module load; the glob result is static for the whole build.
{
  const captionsBySlug = new Map<string, Record<string, string>>();
  for (const [path, captions] of Object.entries(captionModules)) {
    const match = FOLDER_RE.exec(path);
    if (match) captionsBySlug.set(match[1], captions);
  }

  const filesBySlug = new Map<string, { file: string; url: string }[]>();
  for (const [path, url] of Object.entries(imageModules)) {
    const match = FOLDER_RE.exec(path);
    if (!match) continue;
    const [, slug, file] = match;
    const list = filesBySlug.get(slug) ?? [];
    list.push({ file, url });
    filesBySlug.set(slug, list);
  }

  const byName = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
  for (const [slug, files] of filesBySlug) {
    files.sort((a, b) => byName.compare(a.file, b.file));
    const captions = captionsBySlug.get(slug) ?? {};
    galleries.set(
      slug,
      files.map(({ file, url }) => ({ type: "image", src: url, alt: captions[file] ?? "" })),
    );
  }
}

/** Photos for an event, or an empty list when the site has none for that slug. */
export function galleryFor(slug: string | null | undefined): GalleryItem[] {
  if (!slug) return [];
  return galleries.get(slug) ?? [];
}

/** Slugs that have a photo folder on this site. */
export function gallerySlugs(): string[] {
  return Array.from(galleries.keys());
}

/**
 * Dev-only sanity check: a folder whose name matches no portal slug is almost
 * always a typo on one side, and would otherwise fail silently as "no photos".
 */
export function warnUnmatchedGalleries(portalSlugs: Iterable<string | null>): void {
  if (!import.meta.env.DEV) return;
  const known = new Set(Array.from(portalSlugs).filter(Boolean) as string[]);
  const orphaned = gallerySlugs().filter((slug) => !known.has(slug));
  if (orphaned.length > 0) {
    console.warn(
      `[events] photo folders with no matching portal event slug: ${orphaned.join(", ")}`,
    );
  }
}
