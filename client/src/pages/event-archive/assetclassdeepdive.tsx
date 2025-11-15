// TO-DO: Update with AssetClassDeepDive video/photos/slides

import EventArchivePage from "../../components/event-archive-page";

function AssetClassDeepDive() {
  return (
    <EventArchivePage
      title="Asset Class Deep Dive"
      dateTime="Nov 12, 2025 @ 6:00PM"
      location="RCH 302"
      posterImage="/events/introtoquantpanelposter.png"
      description="A survey of all other asset classes — exploring fixed income, equities, commodities, and more."
      galleryImages={[
        {
          type: "image",
          src: "/events/introtoquantpanel/qanda.jpg",
          alt: "Q&A Session",
        },
        {
          type: "image",
          src: "/events/introtoquantpanel/crowd.jpg",
          alt: "Event Crowd",
        },
        {
          type: "image",
          src: "/events/introtoquantpanel/harry.jpg",
          alt: "Harry Jiang: QT @ Jane Street",
        },
        {
          type: "image",
          src: "/events/introtoquantpanel/wpanel.jpg",
          alt: "Waterloo Quant Club Execs",
        },
        {
          type: "image",
          src: "/events/introtoquantpanel/john.jpg",
          alt: "John Huang: QR at Cubist",
        },
        {
          type: "image",
          src: "/events/introtoquantpanel/daniel.jpg",
          alt: "Daniel Shen: QT @ SIG",
        },
        {
          type: "image",
          src: "/events/introtoquantpanel/ian.jpg",
          alt: "Ian Zhao: SWE @ HRT",
        },
      ]}
      slideDeckUrl="https://docs.google.com/presentation/d/e/2PACX-1vS7seVvgi7gQe6Hi9w4Hn2Zcz0Bn_DhC_uyaCH_R-Ag72rlg4SgWQegLVj1m5OX4g/pub?start=false&loop=false&delayms=3000"
    />
  );
}

export default AssetClassDeepDive;

{/* <EventCard
  eventName="Asset Class Deep Dive"
  dateTime="Nov 12, 2025 @ 6:00PM"
  location="RCH 302"
  description="A survey of all other asset classes — exploring fixed income, equities, commodities, and more."
  imageUrl="/events/assetclassdeepdive.png"
/>; */}
