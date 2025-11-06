import { Text } from "./text";
import { Button } from "./button";
import { ROUTES } from "../util/constants";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export interface EventArchivePageProps {
  title: string;
  dateTime: string;
  location: string;
  posterImage: string;
  description: string;
  galleryImages: Array<
    | { type: "image"; src: string; alt: string }
    | { type: "video"; src: string; alt: string }
  >;
  slideDeckUrl?: string;
}

function EventArchivePage({
  title,
  dateTime,
  location,
  posterImage,
  description,
  galleryImages,
  slideDeckUrl,
}: EventArchivePageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  const memoizedGalleryImages = useMemo(() => galleryImages, [galleryImages]);

  const imageOnlySlides = useMemo(
    () =>
      memoizedGalleryImages
        .filter((item) => item.type === "image")
        .map((item) => ({ src: item.src, alt: item.alt })),
    [memoizedGalleryImages]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && lightboxOpen) {
      const { body } = document;
      const previousOverflow = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = previousOverflow;
      };
    }
  }, [isMobile, lightboxOpen]);

  const handleOpen = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageOnlySlides.length - 1 : prev - 1
    );
  }, [imageOnlySlides.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === imageOnlySlides.length - 1 ? 0 : prev + 1
    );
  }, [imageOnlySlides.length]);

  const renderGalleryItem = (
    item: EventArchivePageProps["galleryImages"][number],
    className: string
  ) => {
    if (item.type === "video") {
      return (
        <iframe
          src={item.src}
          title={item.alt}
          className={className}
          allow="autoplay"
          loading="lazy"
        />
      );
    }
    return (
      <img
        src={item.src}
        alt={item.alt}
        className={className}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-black via-[#2a1a3d] to-[#1a0f2e]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Back button */}
        <div className="mb-8">
          <Button as={Link} to={ROUTES.EVENTS_ARCHIVE}>
            ← Back to Archive
          </Button>
        </div>

        {/* Event title and info */}
        <div className="text-center mb-12">
          <Text font="krona" className="text-3xl sm:text-4xl font-bold mb-4">
            {title}
          </Text>
          <Text className="text-lg sm:text-xl mb-2">
            {dateTime} | {location}
          </Text>
        </div>

        {/* Event poster/image */}
        <div className="flex justify-center mb-12">
          <div className="max-w-md w-full">
            <img
              src={posterImage}
              alt={title}
              className="w-full border border-[#EECFEF] shadow-[0_0_8px_4px_#EECFEF]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Event description */}
        <div className="mb-12">
          <Text className="text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
            {description}
          </Text>
        </div>

        {/* Gallery section */}
        {memoizedGalleryImages.length > 0 && (
          <div className="mb-12">
            <Text
              font="krona"
              className="text-2xl sm:text-3xl font-bold text-center mb-8"
            >
              Gallery
            </Text>

            {/* Large image */}
            <div className="mb-4">
              {memoizedGalleryImages[0].type === "video" ? (
                <div className="w-full aspect-video">
                  {renderGalleryItem(
                    memoizedGalleryImages[0],
                    "w-full h-full border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF]"
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpen(0)}
                  className="w-full"
                  aria-label={`Open lightbox: ${memoizedGalleryImages[0].alt}`}
                >
                  {renderGalleryItem(
                    memoizedGalleryImages[0],
                    "w-full h-64 sm:h-96 object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
                  )}
                </button>
              )}
            </div>

            {/* Grid of smaller images */}
            {memoizedGalleryImages.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {memoizedGalleryImages.slice(1, 4).map((item, index) => (
                  <div key={item.src} className="w-full">
                    {item.type === "video" ? (
                      <div className="w-full aspect-video">
                        {renderGalleryItem(
                          item,
                          "w-full h-full border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF]"
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpen(index + 1)}
                        className="w-full"
                        aria-label={`Open lightbox: ${item.alt}`}
                      >
                        {renderGalleryItem(
                          item,
                          "aspect-square w-full object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {memoizedGalleryImages.length > 4 && (
              <div className="grid grid-cols-3 gap-4">
                {memoizedGalleryImages.slice(4).map((item, index) => (
                  <div key={item.src} className="w-full">
                    {item.type === "video" ? (
                      <div className="w-full aspect-video">
                        {renderGalleryItem(
                          item,
                          "w-full h-full border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF]"
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpen(index + 4)}
                        className="w-full"
                        aria-label={`Open lightbox: ${item.alt}`}
                      >
                        {renderGalleryItem(
                          item,
                          "aspect-square w-full object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lightbox */}
        {!isMobile ? (
          <Lightbox
            plugins={[Thumbnails]}
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={currentImageIndex}
            slides={imageOnlySlides}
            carousel={{ preload: 1 }}
            controller={{ closeOnBackdropClick: true, closeOnPullDown: false }}
            thumbnails={{
              position: "bottom",
              width: 96,
              height: 64,
              gap: 12,
              border: 1,
            }}
            render={{
              slide: ({ slide, rect }) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading="eager"
                    decoding="async"
                    style={{
                      maxWidth: rect.width,
                      maxHeight: rect.height,
                      objectFit: "contain",
                    }}
                  />
                </div>
              ),
            }}
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
            }}
          />
        ) : (
          lightboxOpen && (
            <div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-5 right-5 text-white hover:text-[#BB68C5] transition-colors"
                aria-label="Close lightbox"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-3 text-white hover:text-[#BB68C5] transition-colors"
                aria-label="Previous image"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div
                className="w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={imageOnlySlides[currentImageIndex].src}
                  alt={imageOnlySlides[currentImageIndex].alt}
                  className="w-full max-h-[60vh] object-contain"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
                <Text className="text-center mt-4 text-gray-300 text-sm">
                  {imageOnlySlides[currentImageIndex].alt}
                </Text>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-3 text-white hover:text-[#BB68C5] transition-colors"
                aria-label="Next image"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )
        )}

        {/* Event Resources */}
        {slideDeckUrl && (
          <div className="mb-12 text-center">
            <Text font="krona" className="text-2xl sm:text-3xl font-bold mb-6">
              Event Resources
            </Text>
            <a
              href={slideDeckUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[#BB68C5] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <Text className="text-base sm:text-lg">Slide Deck</Text>
            </a>
          </div>
        )}

        {/* Upcoming Events section */}
        <div className="text-center">
          <Text font="krona" className="text-2xl sm:text-3xl font-bold mb-4">
            Upcoming Events
          </Text>
          <Text className="text-base sm:text-lg mb-8">
            Want to know our next event?
          </Text>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              as="a"
              href="https://discord.gg/QwmucS8qBv"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Discord
            </Button>
            <Button as={Link} to="/#events">
              View Upcoming Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventArchivePage;
