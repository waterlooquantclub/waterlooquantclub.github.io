import { ExternalLink } from "lucide-react";

/** Every portal resource stays accessible, including original recording links. */
const EventLinks = ({ links }: { links: { label: string; url: string }[] }) => {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-3" aria-label="Event resources">
      {links.map((link, index) => (
        <a key={`${link.url}-${index}`} href={link.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 hover:border-[#FAFAFA]/40 transition">
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default EventLinks;
