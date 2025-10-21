import { Text } from "../components/text";
import Section from "../components/section";
import EventCard from "../components/event-card";
import { Button } from "../components/button";
import { SOCIAL_LINKS, ROUTES } from "../util/constants";
import { Link } from "react-router-dom";

function Events() {
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
        Fill out the general member form to attend any of our events!
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
        <Link to={ROUTES.EVENTS_ARCHIVE}>
          <Button as="button">Events Archive</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <EventCard
          eventName="Intro to Trading"
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
          eventName="Asset Class Deep Dive"
          dateTime="Nov 12, 2025 @ 6:00PM"
          location="RCH 302"
          description="A survey of all other asset classes — exploring fixed income, equities, commodities, and more."
          imageUrl="/events/assetclassdeepdive.png"
        />
        <EventCard
          eventName="Options 101"
          dateTime="Nov 19, 2025 @ 6:00PM"
          location="RCH 302"
          description="An introduction to options trading — calls, puts, volatility and all the greeks."
          imageUrl="/events/options101.png"
        />
        <EventCard
          eventName="Capital Markets"
          dateTime="Nov 26, 2025 @ 6:00PM"
          location="RCH 302"
          description="An overview of Capital Markets theory (CapM) — understanding and exploring the relationship between risk and expected return."
          imageUrl="/events/capitalmarkets.png"
        />
        <EventCard
          eventName="Stay tuned for more!"
          imageUrl="/events/staytunedformore.png"
        />
      </div>
    </Section>
  );
}

export default Events;
