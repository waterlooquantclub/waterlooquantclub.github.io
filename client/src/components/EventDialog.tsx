import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, MapPin, ExternalLink, Link } from "lucide-react";

export interface GalleryItem {
  type: "video" | "image";
  src: string;
  alt: string;
}

export interface EventData {
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
  posterImage?: string;
  galleryImages?: GalleryItem[];
  slideDeckUrl?: string;
  link?: string;
  linktext?: string;
}

interface EventDialogProps {
  event: EventData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDialog = ({ event, open, onOpenChange }: EventDialogProps) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs tracking-widest uppercase text-muted-foreground bg-secondary px-2 py-1">
              {event.type}
            </span>
          </div>
          <DialogTitle className="text-2xl font-medium">
            {event.title}
          </DialogTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {event.date}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <p className="text-muted-foreground">{event.description}</p>

          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground text-sm pt-2 hover:underline inline-flex items-center gap-1"
            >
              <Link className="w-4 h-4" />
              <span>{event.linktext? event.linktext : "Link"}</span>
            </a>
          )}

          {event.posterImage && (
            <div className="border border-border overflow-hidden">
              <img
                src={event.posterImage}
                alt={`${event.title} poster`}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {event.galleryImages && event.galleryImages.filter(item => item.type === "video").length > 0 && (
            <div className="space-y-4">
              {event.galleryImages.filter(item => item.type === "video").map((item, index) => (
                <div
                  key={index}
                  className="border border-border overflow-hidden"
                >
                  <iframe
                    src={item.src}
                    title={item.alt}
                    className="w-full aspect-video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                  {item.alt && (
                    <p className="text-xs text-muted-foreground p-2">
                      {item.alt}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {event.slideDeckUrl && (
            <div className="flex justify-center">
              <a
                href={event.slideDeckUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background hover:bg-muted-foreground transition-colors px-5 py-3 rounded-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View Slide Deck
              </a>
            </div>
          )}

          {event.galleryImages && event.galleryImages.filter(item => item.type === "image").length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.galleryImages.filter(item => item.type === "image").map((item, index) => (
                  <div
                    key={index}
                    className="border border-border overflow-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-48 object-cover"
                    />
                    {item.alt && (
                      <p className="text-xs text-muted-foreground p-2">
                        {item.alt}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
