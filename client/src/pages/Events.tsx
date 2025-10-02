import { Text } from "../components/text";
import Section from "../components/section";
import EventCard from "../components/event-card";
import { SOCIAL_LINKS } from "../util/constants";

function Events() {
  return (
    <Section id="events" title="Upcoming Events" className="z-10 relative">
      <Text size="xl" className="-mt-4 mb-10 text-center">
        Join us for our upcoming events.
      </Text>
      <div className="flex flex-col gap-8 items-center">
        <EventCard
          eventName="Panel Event"
          dateTime="October 8, 2025 7:30-8:30 PM"
          location="RCH 302"
          description="Ever wondered what quants really do? Join us for our inaugural event to hear from students with experience at top firms like Jane Street, SIG, HRT, and Point72. Learn more about the industry, roles, and what working in quant is like! You'll also have the opportunity to ask questions. No prior knowledge required!"
          imageUrl="/hero-background.png"
          linkText="More Info"
          linkHref={SOCIAL_LINKS.INSTAGRAM}
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
