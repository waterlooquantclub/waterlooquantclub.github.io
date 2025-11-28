import EventArchivePage from "../../components/event-archive-page";

function Options101() {
  return (
    <EventArchivePage
      title="Options 101"
      dateTime="Nov 19, 2025 @ 6:00PM"
      location="RCH 302"
      posterImage="/events/options-poster.png"
      description="An introduction to options trading — calls, puts, volatility and all the greeks."
      galleryImages={[
        {
          type: "video",
          src: "https://drive.google.com/file/d/1NFJazeJYsZhhUMyDxCWRxBFEugrVk6TE/preview",
          alt: "Options 101 Recording",
        },
      ]}
      slideDeckUrl="https://docs.google.com/presentation/d/e/2PACX-1vTNgHHSZist8YCaOyQC-K4o4Tfatl_mSsLC5wOLD53CuYTZwlgLGbA6sZQhyYkiTw/pub?start=true&loop=true&delayms=3000"
    />
  );
}

export default Options101;
