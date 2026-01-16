import { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar, MapPin, Search, X } from "lucide-react";
import EventDialog, { EventData } from "@/components/EventDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const events: EventData[] = [
  {
    title: "Quant Panel Q&A",
    date: "January 21, 2026 @ 6-8pm",
    location: "DC 1350",
    type: "Panel",
    description: "Ever wondered what quants actually do? Join us for a panel with Waterloo students who have worked at companies such as Jane Street, SIG, HRT, and Point72.",
    posterImage: "/events/26panel.jpg",
  },
  {
    title: "Statistical and Human Biases",
    date: "January 28, 2026 @ 6:00PM",
    location: "DC 1350",
    type: "Workshop",
    description: "Learn about the statistical pitfalls and cognitive traps that lead smart people to make not-so-smart trades.",
  }
];

const archivedEvents: EventData[] = [
    {
    title: "Citadel Securities Trading Challenge",
    date: "Jan 14, 2026 @ 6-8pm",
    location: "DC 1350",
    type: "Sponsor Event",
    description:
      "Learn about trading, put your market-making skills to the test, and connect with full-time Citadel traders. Sign up through our Instagram.",
    tags: ["WINTER 26", "COMPETITION"],
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
  },
  {
    title: "Capital Markets",
    date: "Nov 26, 2025 @ 6:00PM",
    location: "RCH 302",
    type: "Workshop",
    description:
      "An overview of Capital Markets theory (CapM) — understanding and exploring the relationship between risk and expected return.",
    tags: ["FALL 25", "RECORDING"],
    galleryImages: [
      {
        type: "video",
        src: "https://www.youtube.com/embed/PpJN-D7hvbg",
        alt: "Capital Markets Workshop Recording",
      },
    ],
    slideDeckUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vSSsqndHYJE7lZ57iMBTlmHZUYduD6Umil6eSrN0zCPGcfGWGqFQUtfU8S1jtdPLw/pub?start=true&loop=true&delayms=3000",
  },
  {
    title: "Fall 2025 Trading Competition",
    date: "Nov 22, 2025 @ 10AM—5PM",
    location: "DC 1351",
    type: "Competition",
    description: "Our inaugural trading competition — test your skills and compete for prizes!",
    tags: ["FALL 25"],
    galleryImages: [
      { type: "image", src: "/events/f25tradingcomp/comp1.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp2.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp3.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp4.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp5.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp6.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp7.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp8.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp9.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp10.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp11.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp12.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp13.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp14.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp15.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp16.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp17.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp18.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp19.jpg", alt: "" },
      { type: "image", src: "/events/f25tradingcomp/comp20.jpg", alt: "" },
    ],
    rankings: [
      { rank: 1, name: "Alfred Zhang", score: 4.53587 },
      { rank: 2, name: "Tian yi Tong", score: 5.53265 },
      { rank: 3, name: "Joey Xu", score: 6.13033 },
      { rank: 4, name: "David Shi", score: 6.95896 },
      { rank: 5, name: "Adam Kamel", score: 7.78046 },
      { rank: 6, name: "David Gan", score: 7.84710 },
      { rank: 7, name: "Andrej Ohrablo", score: 8.28348 },
      { rank: 8, name: "Leonardo Zhou", score: 8.48545 },
      { rank: 9, name: "Aadya Khanna", score: 8.57984 },
      { rank: 10, name: "Wilson Feng", score: 9.72621 },
    ],
  },
  {
    title: "Options 101",
    date: "Nov 19, 2025 @ 6:00PM",
    location: "RCH 302",
    type: "Workshop",
    description: "An introduction to options trading — calls, puts, volatility and all the greeks.",
    tags: ["FALL 25", "RECORDING"],
    galleryImages: [
      {
        type: "video",
        src: "https://www.youtube.com/embed/gp9hxfE0Eag",
        alt: "Options 101 Recording",
      },
      {
        type: "image",
        src: "/events/options101/options1.jpg",
        alt: "",
      },
      {
        type: "image",
        src: "/events/options101/options2.jpg",
        alt: "",
      },
      {
        type: "image",
        src: "/events/options101/options3.jpg",
        alt: "",
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
    tags: ["FALL 25", "RECORDING"],
    galleryImages: [
      {
        type: "video",
        src: "https://www.youtube.com/embed/c71du1u3bHs",
        alt: "Assets Deep Dive Recording",
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
    tags: ["FALL 25", "RECORDING"],
    galleryImages: [
      {
        type: "video",
        src: "https://www.youtube.com/embed/M22fNi8o8W4",
        alt: "Intro to Trading Workshop Recording",
      },
    ],
    slideDeckUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vRnTRrNVTQMUFj-O4AZfgDedyvpwU4vtPN127ogpsayu4JB19xMl6C-9_Yr3_B2XQ/pub?start=false&loop=false&delayms=3000",
  },
  {
    title: "Intro to Quant Panel",
    date: "Oct 8, 2025 @ 7:30PM",
    location: "RCH 302",
    type: "Panel",
    description:
      "We kicked off the term with our Intro to Quant Panel! Students who've worked at companies such as Jane Street, SIG, HRT, and Point72 shared their experiences, gave insight into the industry, and answered questions live.",
    tags: ["FALL 25"],
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
  const [archiveQuery, setArchiveQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const normalizeTag = (tag: string) => tag.trim().toUpperCase();

  const TERM_TAG_RE = /^(FALL|WINTER|SPRING|SUMMER)\s*\d{2}$/i;

  const termTags = Array.from(
    new Set(
      archivedEvents.flatMap((e) =>
        (e.tags ?? []).map(normalizeTag).filter((t) => TERM_TAG_RE.test(t)),
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const typeTags = Array.from(
    new Set(archivedEvents.map((e) => normalizeTag(e.type))),
  ).sort((a, b) => a.localeCompare(b));

  const typeTagSet = new Set(typeTags);

  const otherTags = Array.from(
    new Set(
      archivedEvents.flatMap((e) =>
        (e.tags ?? [])
          .map(normalizeTag)
          .filter((t) => !TERM_TAG_RE.test(t) && !typeTagSet.has(t)),
      ),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const filteredArchivedEvents = archivedEvents.filter((event) => {
    const haystack = [
      event.title,
      event.description,
      event.location,
      event.date,
      event.type,
      ...(event.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = archiveQuery.trim()
      ? haystack.includes(archiveQuery.trim().toLowerCase())
      : true;

    const tagSet = new Set([event.type, ...(event.tags ?? [])].map(normalizeTag));
    const matchesTags =
      selectedTags.length === 0
        ? true
        : selectedTags.every((t) => tagSet.has(normalizeTag(t)));

    return matchesQuery && matchesTags;
  });

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
                className="group p-6 border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors cursor-pointer"
                style={{ background: 'linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                  <span className="text-xs tracking-widest uppercase text-[#FAFAFA] bg-[#132C7B]/60 px-2 py-1 w-fit">
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
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-8 mt-16">
            Events Archive
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={archiveQuery}
                onChange={(e) => setArchiveQuery(e.target.value)}
                placeholder="Search"
                className="pl-9 bg-black/40 border-[#FAFAFA]/20 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
              />
            </div>
            <Select
              key={selectedTags.join("|")}
              onValueChange={(value) => {
                const tag = normalizeTag(value);
                setSelectedTags((prev) =>
                  prev.includes(tag) ? prev : [...prev, tag],
                );
              }}
            >
              <SelectTrigger className="bg-black/40 border-[#FAFAFA]/20 rounded-none focus:ring-0 focus:ring-offset-0 focus:outline-none">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {termTags.length > 0 && (
                  <>
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground cursor-default select-none">
                        Term
                      </SelectLabel>
                      {termTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    {(typeTags.length > 0 || otherTags.length > 0) && (
                      <SelectSeparator />
                    )}
                  </>
                )}

                {typeTags.length > 0 && (
                  <>
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground cursor-default select-none">
                        Type
                      </SelectLabel>
                      {typeTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    {otherTags.length > 0 && <SelectSeparator />}
                  </>
                )}

                {otherTags.length > 0 && (
                  <>
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground cursor-default select-none">
                        Other
                      </SelectLabel>
                      {otherTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setSelectedTags((prev) => prev.filter((t) => t !== tag))
                  }
                  className="inline-flex items-center gap-2 border border-[#0DBAFF]/60 text-[#0DBAFF] px-3 py-1 text-xs tracking-widest uppercase hover:border-[#0DBAFF] transition-colors"
                >
                  {tag}
                  <X className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {filteredArchivedEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => handleEventClick(event)}
                className="group p-6 border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors cursor-pointer"
                style={{ background: 'linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                  <span className="text-xs tracking-widest uppercase text-[#FAFAFA] bg-[#132C7B]/60 px-2 py-1 w-fit">
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
