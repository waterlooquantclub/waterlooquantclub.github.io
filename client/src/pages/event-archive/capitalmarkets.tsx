import EventArchivePage from "../../components/event-archive-page";

function CapitalMarkets() {
  return (
    <EventArchivePage
      title="Capital Markets"
      dateTime="Nov 26, 2025 @ 6:00PM"
      location="RCH 302"
      posterImage="/events/options-poster.png"
      description="An overview of Capital Markets theory (CapM) — understanding and exploring the relationship between risk and expected return."
      galleryImages={[
        // {
        //   type: "video",
        //   src: "https://drive.google.com/drive/folders/1evPByq1Y6n1FE_DOhwvbCKoq8YrMxEB2/preview",
        //   alt: "Capital Markets Recording",
        // },
      ]}
      slideDeckUrl="https://docs.google.com/presentation/d/e/2PACX-1vSSsqndHYJE7lZ57iMBTlmHZUYduD6Umil6eSrN0zCPGcfGWGqFQUtfU8S1jtdPLw/pub?start=true&loop=true&delayms=3000"
    />
  );
}

export default CapitalMarkets;

// Gallery video not loaded yet