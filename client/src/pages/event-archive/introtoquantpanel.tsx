import { Text } from "../../components/text";
import { Button } from "../../components/button";
import { ROUTES } from "../../util/constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function IntroToQuantPanel() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    { src: "/events/introtoquantpanel/qanda.jpg", alt: "Q&A Session" },
    { src: "/events/introtoquantpanel/crowd.jpg", alt: "Event Crowd" },
    { src: "/events/introtoquantpanel/harry.jpg", alt: "Harry Jiang: QT @ Jane Street" },
    { src: "/events/introtoquantpanel/wpanel.jpg", alt: "Waterloo Quant Club Execs" },
    { src: "/events/introtoquantpanel/john.jpg", alt: "John Huang: QR at Cubist" },
    { src: "/events/introtoquantpanel/daniel.jpg", alt: "Daniel Shen: QT @ SIG" },
    { src: "/events/introtoquantpanel/ian.jpg", alt: "Ian Zhao: SWE @ HRT" },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-black via-[#2a1a3d] to-[#1a0f2e]">
      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Back button */}
        <div className="mb-8">
          <Link to={ROUTES.EVENTS_ARCHIVE}>
            <Button as="button">← Back to Archive</Button>
          </Link>
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
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              onClick={() => openLightbox(0)}
              className="w-full h-64 sm:h-96 object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Grid of smaller images */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <img
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              onClick={() => openLightbox(1)}
              className="aspect-square object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
            />
            <img
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              onClick={() => openLightbox(2)}
              className="aspect-square object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
            />
            <img
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              onClick={() => openLightbox(3)}
              className="aspect-square object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <img
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
              onClick={() => openLightbox(4)}
              className="aspect-square object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
            />
            <img
              src={galleryImages[5].src}
              alt={galleryImages[5].alt}
              onClick={() => openLightbox(5)}
              className="aspect-square object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
            />
            <img
              src={galleryImages[6].src}
              alt={galleryImages[6].alt}
              onClick={() => openLightbox(6)}
              className="aspect-square object-cover border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentImageIndex}
          slides={galleryImages}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
          }}
        />

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
            <a
              href="https://discord.gg/QwmucS8qBv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button as="button">Join our Discord</Button>
            </a>
            <Link to={ROUTES.HOME}>
              <Button as="button">View Upcoming Events</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroToQuantPanel;
