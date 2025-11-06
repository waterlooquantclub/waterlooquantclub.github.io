import { Text } from "../components/text";
import Section from "../components/section";
import EventCard from "../components/event-card";
import { Button } from "../components/button";
import { ROUTES } from "../util/constants";
import { Link } from "react-router-dom";

function EventArchive() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-black via-[#2a1a3d] to-[#1a0f2e]">
      <Section
        id="event-archive"
        title="Events Archive"
        className="z-10 relative pt-24"
        titleFont="krona"
      >
        <Text
          size="md"
          className="-mt-4 mb-10 text-center text-[0.7rem] leading-relaxed sm:text-xl"
        >
          Missed an event? Catch up on what we've been up to through highlights,
          photos, and recaps from our Quant Club sessions.
        </Text>
        <div className="flex justify-center mb-10">
          <Button as={Link} to={ROUTES.HOME}>
            Back to Home
          </Button>
        </div>
        <div className="flex flex-col gap-8 items-center pb-20">
          <EventCard
            eventName="Intro to Trading"
            dateTime="Oct 29, 2025 @ 6:00PM"
            location="RCH 302"
            description="An introductory workshop on trading and market structure — covering market making terminology, order book mechanics, and real trade examples."
            imageUrl="/events/intrototrading.png"
            links={[
              {
                text: "Slides",
                href: "https://docs.google.com/presentation/d/1EblF0_GjA--Eie6c0fP-YGNt3EmFFW59/edit?usp=sharing&ouid=114331788599003086089&rtpof=true&sd=true",
              },
              {
                text: "Recording",
                href: "https://drive.google.com/file/d/1Z1Gn93rwBu6VWECMNu7DQImiHSFk1PbW/view?usp=drive_link",
              },
            ]}
          />
          <EventCard
            eventName="Intro to Quant Panel"
            dateTime="Oct 8, 2025 @ 7:30PM"
            location="RCH 302"
            description="We kicked off the term with our Intro to Quant Panel! Students who've worked at companies such as Jane Street, SIG, HRT, and Point72 shared their experiences, gave insight into the industry, and answered questions live."
            imageUrl="/events/introtoquantpanel.png"
            links={[
              {
                text: "View details",
                href: "/events/intro-to-quant-panel",
              },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}

export default EventArchive;
