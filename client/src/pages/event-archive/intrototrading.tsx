import EventArchivePage from "../../components/event-archive-page";

function IntroToTrading() {
  return (
    <EventArchivePage
      title="Intro to Trading"
      dateTime="Oct 29, 2025 @ 6:00PM"
      location="RCH 302"
      posterImage="/events/intrototradingposter.png"
      description="An introductory workshop on trading and market structure — covering market making terminology, order book mechanics, and real trade examples."
      galleryImages={[
        {
          type: "video",
          src: "https://drive.google.com/file/d/1Z1Gn93rwBu6VWECMNu7DQImiHSFk1PbW/preview",
          alt: "Intro to Trading Workshop Recording",
        },
      ]}
      slideDeckUrl="https://docs.google.com/presentation/d/e/2PACX-1vRnTRrNVTQMUFj-O4AZfgDedyvpwU4vtPN127ogpsayu4JB19xMl6C-9_Yr3_B2XQ/pub?start=false&loop=false&delayms=3000"
    />
  );
}

export default IntroToTrading;
