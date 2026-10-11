import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import WavyGrid from "./WavyGrid";
import { fetchPublicEvents } from "@/lib/portal";
import { applicationsAreOpen, competitionDetailsFor, nextCompetition } from "@/lib/competitionDetails";
import { formatCompetitionDates } from "@/lib/eventDates";
import { SPONSOR_TIERS } from "@/lib/sponsors";
import "./home.css";

export function HomeField() {
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const progress = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 0.75));
      if (field.current) field.current.style.opacity = String(1 - progress * 0.88);
      frame = 0;
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={field} className="home-field" aria-hidden="true"><WavyGrid /></div>;
}

const OFFERS = [
  ["Education", "Workshops on statistics, programming, trading, and research."],
  ["Competitions", "Puzzles, technical challenges, and live trading competitions."],
  ["Networking", "Connect with professionals and recruiters from top firms."],
  ["Mentorship", "Learn directly from current and former quants."],
];

function CompetitionHighlight() {
  const { data } = useQuery({
    queryKey: ["portal", "public-events"],
    queryFn: ({ signal }) => fetchPublicEvents(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const event = nextCompetition(data ?? []);
  if (!event) return null;

  const details = competitionDetailsFor(event);
  const title = event.title.replace(/\s+/g, " ").trim();
  const titleParts = title.match(/^(.*?)\s+(Trading Competition)$/i);
  const applicationsOpen = applicationsAreOpen(event);

  return (
    <section id="competition-highlight" className="refined-competition" aria-labelledby="competition-title">
      <div className="refined-shell competition-layout">
        <div className="competition-copy">
          <p className="section-eyebrow"><span className="status-dot" />Upcoming competition</p>
          <h2 id="competition-title">{titleParts ? <>{titleParts[1]}<br />{titleParts[2]}</> : title}</h2>
          {event.description && <p className="competition-intro whitespace-pre-line">{event.description}</p>}
          <div className="competition-actions">
            {applicationsOpen ? (
              <a className="refined-apply" href={event.application_url!} target="_blank" rel="noopener noreferrer">
                Apply now <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <Link className="refined-apply" to="/events">View competition <ArrowUpRight size={16} aria-hidden="true" /></Link>
            )}
            <Link to="/events?competitions=past" className="refined-details">View past competitions <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          {event.application_only && (
            <p className="application-caption">{applicationsOpen ? "Applications open" : "Applications closed"}</p>
          )}
        </div>
        <dl className="competition-facts">
          <div><dt>When</dt><dd>{formatCompetitionDates(event.start_time, event.end_time)}</dd></div>
          {details.location && <div><dt>Where</dt><dd>{details.location}</dd></div>}
          {details.prizePool && <div><dt>Prize pool</dt><dd>{details.prizePool}</dd></div>}
        </dl>
      </div>
    </section>
  );
}

export function HomeContent() {
  return (
    <div className="refined-home" id="home-content">
      <CompetitionHighlight />
      <section id="about-section" className="refined-about">
        <div className="refined-shell about-layout">
          <div className="community-intro">
            <h2>The Waterloo<br />quant community.</h2>
            <p className="about-intro">We prepare students for careers in quantitative finance through workshops, games, and competitions with industry-leading firms.</p>
            <Link to="/join" className="refined-details">Join the community <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="offer-list">
            {OFFERS.map(([title, description]) => (
              <div className="offer-row" key={title}><h3>{title}</h3><p>{description}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="refined-partners" id="partners-section" aria-labelledby="partners-title">
        <div className="refined-shell">
          <div className="partners-heading">
            <div className="partners-intro">
              <h2 id="partners-title">Our partners.</h2>
              <p>We are grateful to our sponsors for supporting the Waterloo Quant Club and helping us create opportunities for our community to explore quantitative finance.</p>
            </div>
            <Link to="/sponsors" className="refined-details">Partner with WQC <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          {SPONSOR_TIERS.map(tier => (
            <div className={`partner-tier ${tier.name.toLowerCase()}-tier`} key={tier.name}>
              <h3 className="tier-label"><img src={tier.suit} alt="" aria-hidden="true" />{tier.name}<span aria-hidden="true" /></h3>
              <div className={`partner-marks ${tier.name.toLowerCase()}-marks`}>
                {tier.sponsors.map(sponsor => (
                  <a href={sponsor.href} target="_blank" rel="noopener noreferrer" className={`partner-mark ${sponsor.id}`} key={sponsor.id}>
                    <img src={sponsor.logo} alt={sponsor.name} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
