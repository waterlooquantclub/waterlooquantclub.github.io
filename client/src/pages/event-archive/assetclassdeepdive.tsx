// TO-DO: Update with AssetClassDeepDive video/photos/slides

import EventArchivePage from "../../components/event-archive-page";

function AssetClassDeepDive() {
  return (
    <EventArchivePage
      title="Asset Class Deep Dive"
      dateTime="Nov 12, 2025 @ 6:00PM"
      location="RCH 302"
      posterImage="/events/assetsdive/asset-poster.png"
      description="A survey of all other asset classes — exploring fixed income, equities, commodities, and more."
      galleryImages={[
        {
          type: "video",
          src: "https://drive.google.com/file/d/1e5W6W6SRfDCUJaWFJcLWQ_9WI56YcJ1M/preview",
          alt: "Assets Deep Dive Recording",
        },
        {
          type: "image",
          src: "/events/assetsdive/asset1.jpg",
          alt: "Put Option Payoff slide",
        },
        {
          type: "image",
          src: "/events/assetsdive/asset2.jpg",
          alt: "Call Option Payoff slide",
        },
        {
          type: "image",
          src: "/events/assetsdive/asset1.jpg",
          alt: "Straddle slide",
        },
      ]}
      slideDeckUrl="https://docs.google.com/presentation/d/e/2PACX-1vQ7GpETs4fUtfHzZbjVFOGptAzHMG7eEj7R8GsTZavWIEHOw9mDiRp6alIid1n9sQ/pub?start=true&loop=true&delayms=3000"
    />
  );
}

export default AssetClassDeepDive;
