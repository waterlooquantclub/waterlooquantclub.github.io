import { useState } from "react";
import Layout from "@/components/Layout";
import {
  TEAM,
  ALUMNI,
  type MemberInfo,
  type AlumniInfo,
} from "@/lib/constants";
import {
  Linkedin,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Dynamic imports for team images
const teamImages: Record<string, string> = import.meta.glob(
  "@/assets/team/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const getTeamImage = (imageName?: string): string | undefined => {
  if (!imageName) return undefined;
  const key = Object.keys(teamImages).find((k) => k.includes(imageName));
  return key ? teamImages[key] : undefined;
};

type Person = MemberInfo | AlumniInfo;
type Group = "team" | "alumni";

const isAlumni = (person: Person): person is AlumniInfo => "gradYear" in person;

// Alumni show their full-time role and grad year where members show role and program.
const primaryLine = (person: Person) =>
  isAlumni(person) ? `${person.position}, ${person.company}` : person.role;

const secondaryLine = (person: Person) =>
  isAlumni(person) ? `Class of ${person.gradYear}` : person.program;

const imageStyle = (person: Person) =>
  person.name === "Alex Oláh" ? { objectPosition: "center 20%" } : undefined;

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const SocialLinks = ({
  person,
  size,
}: {
  person: Person;
  size: "sm" | "lg";
}) => {
  const iconClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <>
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Linkedin className={iconClass} />
        </a>
      )}
      {person.email && (
        <a
          href={`mailto:${person.email}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className={iconClass} />
        </a>
      )}
      {person.website && (
        <a
          href={person.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Globe className={iconClass} />
        </a>
      )}
    </>
  );
};

const PersonGrid = ({
  people,
  onSelect,
}: {
  people: Person[];
  onSelect: (index: number) => void;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {people.map((person, index) => {
      const image = getTeamImage(person.image);
      return (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="group flex flex-col  border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-colors text-left cursor-pointer overflow-hidden"
          style={{
            background:
              "linear-gradient(to top left, rgba(19, 44, 123, 0.25) 0%, rgba(0, 0, 0, 0.98) 100%)",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={person.name}
              className="w-full aspect-square object-cover"
              style={imageStyle(person)}
            />
          ) : (
            <div className="w-full aspect-square bg-secondary flex items-center justify-center text-foreground font-medium text-2xl">
              {initials(person.name)}
            </div>
          )}
          <div className="p-4">
            <h3 className="text-foreground font-medium">{person.name}</h3>
            <p className="text-muted-foreground text-sm">
              {primaryLine(person)}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              {secondaryLine(person)}
            </p>
            <div
              className="flex gap-2 mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <SocialLinks person={person} size="sm" />
            </div>
          </div>
        </button>
      );
    })}
  </div>
);

const Team = () => {
  const [selected, setSelected] = useState<{
    group: Group;
    index: number;
  } | null>(null);

  const activeList: Person[] = selected?.group === "alumni" ? ALUMNI : TEAM;
  const selectedPerson = selected ? activeList[selected.index] : null;
  const selectedImage = selectedPerson
    ? getTeamImage(selectedPerson.image)
    : undefined;

  const goTo = (index: number) =>
    setSelected((current) => (current ? { ...current, index } : current));

  const goToPrev = () => {
    if (selected) {
      goTo(selected.index === 0 ? activeList.length - 1 : selected.index - 1);
    }
  };

  const goToNext = () => {
    if (selected) {
      goTo(selected.index === activeList.length - 1 ? 0 : selected.index + 1);
    }
  };

  const scrollToAlumni = () => {
    document
      .getElementById("alumni")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            Team
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight">
              Executive Board
            </h1>
            {ALUMNI.length > 0 && (
              <button
                onClick={scrollToAlumni}
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors pb-1 md:pb-3"
              >
                Alumni
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            )}
          </div>

          <PersonGrid
            people={TEAM}
            onSelect={(index) => setSelected({ group: "team", index })}
          />

          {ALUMNI.length > 0 && (
            <div
              id="alumni"
              className="mt-16 pt-16 border-t border-[#FAFAFA]/15 scroll-mt-24"
            >
              <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
                Where they are now
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-12">
                Alumni
              </h2>

              <PersonGrid
                people={ALUMNI}
                onSelect={(index) => setSelected({ group: "alumni", index })}
              />
            </div>
          )}

          <div className="mt-16 pt-16 border-t border-[#FAFAFA]/15">
            <h2 className="text-2xl font-semibold mb-4">Join the Team</h2>
            <p className="text-muted-foreground mb-6">
              Interested in joining the executive team? Apply through our
              portal.
            </p>
            <a
              href="https://portal.waterlooquantclub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedPerson?.name} -{" "}
            {selectedPerson ? primaryLine(selectedPerson) : ""}
          </DialogTitle>

          {selectedPerson && (
            <div className="relative">
              {/* Navigation arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={selectedPerson.name}
                      className="w-64 h-64 object-cover mb-4"
                      style={imageStyle(selectedPerson)}
                    />
                  ) : (
                    <div className="w-64 h-64 bg-secondary flex items-center justify-center text-foreground font-medium text-4xl mb-4">
                      {initials(selectedPerson.name)}
                    </div>
                  )}
                  <h3 className="text-foreground font-semibold text-lg">
                    {selectedPerson.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {primaryLine(selectedPerson)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {secondaryLine(selectedPerson)}
                  </p>
                </div>

                {selectedPerson.bio && (
                  <p className="text-muted-foreground text-sm leading-relaxed text-center mb-4">
                    {selectedPerson.bio}
                  </p>
                )}

                <div className="flex justify-center gap-3">
                  <SocialLinks person={selectedPerson} size="lg" />
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {activeList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === selected?.index
                          ? "bg-foreground"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Team;

