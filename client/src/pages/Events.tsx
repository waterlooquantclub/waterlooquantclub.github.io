import { Text } from "../components/text";
import Section from "../components/section";
import EventCard from "../components/event-card";
import { Button } from "../components/button";
import { SOCIAL_LINKS } from "../util/constants";
import { useState } from "react";

function Events() {
  const [showArchive, setShowArchive] = useState(false);

  return (
    <Section
      id="events"
      title="Upcoming Events"
      className="z-10 relative"
      titleFont="krona"
    >
      <Text size="md" className="-mt-4 mb-10 text-center text-xs sm:text-xl">
        Check out our upcoming events or view our events archive.
        <br />
        Fill out the general member form if you want to attend any of our
        events!
      </Text>
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <Button
          as="a"
          href={SOCIAL_LINKS.MEMBER_FORM}
          target="_blank"
          rel="noopener noreferrer"
        >
          Become a member
        </Button>
        <Button as="button" onClick={() => setShowArchive(!showArchive)}>
          {showArchive ? "Upcoming Events" : "Events Archive"}
        </Button>
      </div>
      <div className="flex flex-col gap-8 items-center">
        {!showArchive ? (
          <>
            <EventCard
              eventName="Intro to Trading 101"
              dateTime="Oct 29, 2025 @ 6:00PM"
              location="RCH 302"
              description="An introductory workshop on trading and market structure — covering market making terminology, order book mechanics, and real trade examples."
              imageUrl="/events/intrototrading.png"
              // Add "View details" link after Instagram post is up
              // links={[
              //   {
              //     text: "View details",
              //     href: "https://www.instagram.com/wlooquantclub/?hl=en",
              //   },
              // ]}
            />
            <EventCard
              eventName="Options 101"
              dateTime="Nov 12, 2025 @ 6:00PM"
              location="RCH 302"
              description="An introduction to options trading — covering calls, puts, payoffs, and the basics of pricing and risk management."
              imageUrl="/events/options101.png"
            />
            <EventCard
              eventName="Asset Class Deep Dive"
              dateTime="Nov 19, 2025 @ 6:00PM"
              location="RCH 302"
              description="A survey of non-equity markets — exploring fixed income, FX, and commodities from a quantitative perspective."
              imageUrl="/events/assetclassdeepdive.png"
            />
            <EventCard
              eventName="Capital Markets"
              dateTime="Nov 26, 2025 @ 6:00PM"
              location="RCH 302"
              description="An overview of how financial markets operate — covering primary vs. secondary markets, participants, and the flow of capital."
              imageUrl="/events/capitalmarkets.png"
            />
            <EventCard
              eventName="Stay tuned for more!"
              imageUrl="/events/staytunedformore.png"
            />
          </>
        ) : (
          // Event Archive
          <>
            <EventCard
              eventName="Panel Event"
              dateTime="October 8, 2025 7:30PM"
              location="RCH 302"
              description="Ever wondered what quants really do? Join us for our inaugural event to hear from students with experience at top firms like Jane Street, SIG, HRT, and Point72. Learn more about the industry, roles, and what working in quant is like! You'll also have the opportunity to ask questions. No prior knowledge required!"
              imageUrl="/panelicon.png"
              links={[
                {
                  text: "More Info",
                  href: "https://www.instagram.com/p/DPUXK6TjueQ/",
                },
              ]}
            />
          </>
        )}
      </div>
    </Section>
  );
}

export default Events;
