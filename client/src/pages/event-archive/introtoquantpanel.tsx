import { Text } from "../../components/text";
import { Button } from "../../components/button";
import { ROUTES } from "../../util/constants";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function IntroToQuantPanel() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  const galleryImages = useMemo(
    () => [
      { src: "/events/introtoquantpanel/qanda.jpg", alt: "Q&A Session" },
      { src: "/events/introtoquantpanel/crowd.jpg", alt: "Event Crowd" },
      {
        src: "/events/introtoquantpanel/harry.jpg",
        alt: "Harry Jiang: QT @ Jane Street",
      },
      {
        src: "/events/introtoquantpanel/wpanel.jpg",
        alt: "Waterloo Quant Club Execs",
      },
      {
        src: "/events/introtoquantpanel/john.jpg",
        alt: "John Huang: QR at Cubist",
      },
      {
        src: "/events/introtoquantpanel/daniel.jpg",
        alt: "Daniel Shen: QT @ SIG",
      },
      { src: "/events/introtoquantpanel/ian.jpg", alt: "Ian Zhao: SWE @ HRT" },
    ],
    []
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
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, [galleryImages.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [galleryImages.length]);

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
            Intro to Quant Panel
          </Text>
          <Text className="text-lg sm:text-xl mb-2">
            Oct 8, 2025 @ 7:30PM | RCH 302
          </Text>
        </div>

        {/* Event poster/image */}
        <div className="flex justify-center mb-12">
          <div className="max-w-md w-full">
            <img
              src="/events/introtoquantpanelposter.png"
              alt="Intro to Quant Panel"
              className="w-full border border-[#EECFEF] shadow-[0_0_8px_4px_#EECFEF]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Event description */}
        <div className="mb-12">
          <Text className="text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto">
            We kicked off the term with our Intro to Quant Panel! Students
            who've worked at companies such as Jane Street, SIG, HRT, and
            Point72 shared their experiences, gave insight into the industry,
            and answered questions live, sharing what their jobs are really like
            as Quant Traders, Quant Researchers, and Software Engineers.
          </Text>
        </div>

        {/* Gallery section */}
        <div className="mb-12">
          <Text
            font="krona"
            className="text-2xl sm:text-3xl font-bold text-center mb-8"
          >
            Gallery
          </Text>

          {/* Large image */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => handleOpen(0)}
              className="w-full"
              aria-label={`Open lightbox: ${galleryImages[0].alt}`}
            >
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-64 sm:h-96 object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </button>
          </div>

          {/* Grid of smaller images */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {galleryImages.slice(1, 4).map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => handleOpen(index + 1)}
                className="w-full"
                aria-label={`Open lightbox: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-square w-full object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {galleryImages.slice(4).map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => handleOpen(index + 4)}
                className="w-full"
                aria-label={`Open lightbox: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-square w-full object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {!isMobile ? (
          <Lightbox
            plugins={[Thumbnails]}
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={currentImageIndex}
            slides={galleryImages}
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
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].alt}
                  className="w-full max-h-[60vh] object-contain"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
                <Text className="text-center mt-4 text-gray-300 text-sm">
                  {galleryImages[currentImageIndex].alt}
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
        <div className="mb-12 text-center">
          <Text font="krona" className="text-2xl sm:text-3xl font-bold mb-6">
            Event Resources
          </Text>
          <a
            href="https://docs.google.com/presentation/d/e/2PACX-1vS7seVvgi7gQe6Hi9w4Hn2Zcz0Bn_DhC_uyaCH_R-Ag72rlg4SgWQegLVj1m5OX4g/pub?start=false&loop=false&delayms=3000"
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
            <Button as={Link} to={ROUTES.HOME}>
              View Upcoming Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroToQuantPanel;
