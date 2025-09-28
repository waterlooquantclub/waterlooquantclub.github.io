import { Text } from "../components/text";
import Section from "../components/section";
import EventCard from "../components/event-card";

function Events() {
  return (
    <Section id="events" title="Upcoming Events">
      <Text size="xl" className="-mt-4 mb-10 text-center">
        Join us for our upcoming events.
      </Text>
      <div className="flex flex-col gap-8 items-center">
        <EventCard
          eventName="Panel Event"
          dateTime="October 8, 2025 6:00 PM"
          location="MC 1234"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis enim tortor. Donec aliquet sapien sapien, eu vulputate lorem rhoncus ac."
          imageUrl="/hero-background.png"
          linkText="More Info"
          linkHref="#"
        />
        <EventCard
          eventName="Stay Tuned for More!"
          imageUrl="/hero-background.png"
        />
      </div>
    </Section>
  );
}

export default Events;
