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
        <Button as={Link} to={ROUTES.EVENTS_ARCHIVE}>
          Events Archive
        </Button>
      </div>
      <div className="flex flex-col gap-8 items-center">
        <EventCard
          eventName="Stay tuned for more!"
          imageUrl="/events/staytunedformore.png"
        />
      </div>
    </Section>
  );
}

export default Events;
