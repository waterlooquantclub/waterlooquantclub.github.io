import EventArchivePage from "../../components/event-archive-page";

function IntroToQuantPanel() {
  return (
    <EventArchivePage
      title="Intro to Quant Panel"
      dateTime="Oct 8, 2025 @ 7:30PM"
      location="RCH 302"
      posterImage="/events/introtoquantpanelposter.png"
      description="We kicked off the term with our Intro to Quant Panel! Students who've worked at companies such as Jane Street, SIG, HRT, and Point72 shared their experiences, gave insight into the industry, and answered questions live, sharing what their jobs are really like as Quant Traders, Quant Researchers, and Software Engineers."
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

export default IntroToQuantPanel;
