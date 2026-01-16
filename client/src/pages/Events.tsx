import { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar, MapPin } from "lucide-react";
import EventDialog, { EventData } from "@/components/EventDialog";

const events: EventData[] = [
  {
    title: "Stay tuned for more events!",
    date: "Early January",
    location: "DC or RCH",
    type: "TBD",
    description: "We'll be back after the break.",
  },
];

const archivedEvents: EventData[] = [
    {
    title: "Citadel Securities Trading Challenge",
    date: "Jan 14, 2026 @ 6-8pm",
    location: "DC 1350",
    type: "Sponsor Event",
    description:
      "Learn about trading, put your market-making skills to the test, and connect with full-time Citadel traders. Sign up through our Instagram.",
    galleryImages: [
      { type: "image", src: "/events/citadel-trading-challenge/citadel1.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel2.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel3.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel4.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel5.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel6.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel7.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel8.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel9.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel10.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel11.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel12.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel13.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel14.jpg", alt: "" },
      { type: "image", src: "/events/citadel-trading-challenge/citadel15.jpg", alt: "" },
    ],
    posterImage: "/events/citadel_event.png",
    link: "https://waterloocitadelquantclub.splashthat.com/",
    linktext: "Sign up now"
  },
  {
    title: "Capital Markets",
    date: "Nov 26, 2025 @ 6:00PM",
    location: "RCH 302",
    type: "Workshop",
    description:
      "An overview of Capital Markets theory (CapM) — understanding and exploring the relationship between risk and expected return.",
    galleryImages: [],
    slideDeckUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vSSsqndHYJE7lZ57iMBTlmHZUYduD6Umil6eSrN0zCPGcfGWGqFQUtfU8S1jtdPLw/pub?start=true&loop=true&delayms=3000",
  },
  {
    title: "Fall 2025 Trading Competition",
    date: "Nov 22, 2025 @ 10AM—5PM",
    location: "DC 1351",
    type: "Competition",
    description: "Our inaugural trading competition — test your skills and compete for prizes!",
  },
  {
    title: "Options 101",
    date: "Nov 19, 2025 @ 6:00PM",
    location: "RCH 302",
    type: "Workshop",
    description: "An introduction to options trading — calls, puts, volatility and all the greeks.",
    posterImage: "/events/options-poster.png",
    galleryImages: [
      {
        type: "video",
        src: "https://drive.google.com/file/d/1NFJazeJYsZhhUMyDxCWRxBFEugrVk6TE/preview",
        alt: "Options 101 Recording",
      },
    ],
    slideDeckUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vTNgHHSZist8YCaOyQC-K4o4Tfatl_mSsLC5wOLD53CuYTZwlgLGbA6sZQhyYkiTw/pub?start=true&loop=true&delayms=3000",
  },
  {
    title: "Asset Class Deep Dive",
    date: "Nov 12, 2025 @ 6:00PM",
    location: "RCH 302",
    type: "Workshop",
    description: "A survey of all other asset classes — exploring fixed income, equities, commodities, and more.",
    posterImage: "/events/assetsdive/asset-poster.png",
    galleryImages: [
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
        src: "/events/assetsdive/asset3.jpg",
        alt: "Straddle slide",
      },
    ],
    slideDeckUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vQ7GpETs4fUtfHzZbjVFOGptAzHMG7eEj7R8GsTZavWIEHOw9mDiRp6alIid1n9sQ/pub?start=true&loop=true&delayms=3000",
  },
  {
    title: "Intro to Trading",
    date: "Oct 29, 2025 @ 6:00PM",
    location: "RCH 302",
    type: "Workshop",
    description:
      "An introductory workshop on trading and market structure — covering market making terminology, order book mechanics, and real trade examples.",
    posterImage: "/events/intrototradingposter.png",
    galleryImages: [
      {
        type: "video",
        src: "https://drive.google.com/file/d/1Z1Gn93rwBu6VWECMNu7DQImiHSFk1PbW/preview",
        alt: "Intro to Trading Workshop Recording",
      },
    ],
    slideDeckUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vRnTRrNVTQMUFj-O4AZfgDedyvpwU4vtPN127ogpsayu4JB19xMl6C-9_Yr3_B2XQ/pub?start=false&loop=false&delayms=3000",
  },
  {
    title: "Intro to Quant Panel",
    posterImage: "/events/introtoquantpanelposter.png",
    date: "Oct 8, 2025 @ 7:30PM",
    location: "RCH 302",
    type: "Panel",
    description:
      "We kicked off the term with our Intro to Quant Panel! Students who've worked at companies such as Jane Street, SIG, HRT, and Point72 shared their experiences, gave insight into the industry, and answered questions live.",
    galleryImages: [
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
    ],
    slideDeckUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vS7seVvgi7gQe6Hi9w4Hn2Zcz0Bn_DhC_uyaCH_R-Ag72rlg4SgWQegLVj1m5OX4g/pub?start=false&loop=false&delayms=3000",
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">Events</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">Upcoming Events</h1>
          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <p className="mb-8">Fill out the general member form to attend any of our events.</p>
          </div>

          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                onClick={() => handleEventClick(event)}
                className="group p-6 border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground bg-secondary px-2 py-1 w-fit">
                    {event.type}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm">{event.description}</p>
              </div>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12 mt-16">Events Archive</h1>

          <div className="space-y-6">
            {archivedEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => handleEventClick(event)}
                className="group p-6 border border-border hover:border-muted-foreground transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground bg-secondary px-2 py-1 w-fit">
                    {event.type}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">{event.title}</h3>
                <p className="text-muted-foreground text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventDialog event={selectedEvent} open={dialogOpen} onOpenChange={setDialogOpen} />
    </Layout>
  );
};

export default Events;
