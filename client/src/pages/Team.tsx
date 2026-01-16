import { useState } from "react";
import Layout from "@/components/Layout";
import { TEAM } from "@/lib/constants";
import { Linkedin, Mail, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Dynamic imports for team images
const teamImages: Record<string, string> = import.meta.glob(
  "@/assets/team/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

const getTeamImage = (imageName?: string): string | undefined => {
  if (!imageName) return undefined;
  const key = Object.keys(teamImages).find((k) => k.includes(imageName));
  return key ? teamImages[key] : undefined;
};

const Team = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedMember = selectedIndex !== null ? TEAM[selectedIndex] : null;
  const selectedImage = selectedMember
    ? getTeamImage(selectedMember.image)
    : undefined;

  const goToPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? TEAM.length - 1 : selectedIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === TEAM.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            Team
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12">
            Executive Board
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {TEAM.map((member, index) => {
              const image = getTeamImage(member.image);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="group border border-border hover:border-muted-foreground transition-colors text-left cursor-pointer overflow-hidden"
                  style={{ background: 'linear-gradient(to top left, rgba(19, 44, 123, 0.25) 0%, rgba(0, 0, 0, 0.98) 100%)' }}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={member.name}
                      className="w-full aspect-square object-cover"
                      style={
                        member.name === "Alex Oláh"
                          ? { objectPosition: "center 20%" }
                          : undefined
                      }
                    />
                  ) : (
                    <div className="w-full aspect-square bg-secondary flex items-center justify-center text-foreground font-medium text-2xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-foreground font-medium">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {member.program}
                    </p>
                    <div
                      className="flex gap-2 mt-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {member.website && (
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-semibold mb-4">Join the Team</h2>
            <p className="text-muted-foreground">
              Executive applications are closed for Winter 2026. Stay tuned for
              future openings!
            </p>
          </div>
        </div>
      </section>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {selectedMember?.name} - {selectedMember?.role}
          </DialogTitle>

          {selectedMember && (
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
                      alt={selectedMember.name}
                      className="w-64 h-64 object-cover mb-4"
                      style={
                        selectedMember.name === "Alex Oláh"
                          ? { objectPosition: "center 20%" }
                          : undefined
                      }
                    />
                  ) : (
                    <div className="w-64 h-64 bg-secondary flex items-center justify-center text-foreground font-medium text-4xl mb-4">
                      {selectedMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <h3 className="text-foreground font-semibold text-lg">
                    {selectedMember.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedMember.role}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {selectedMember.program}
                  </p>
                </div>

                {selectedMember.bio && (
                  <p className="text-muted-foreground text-sm leading-relaxed text-center mb-4">
                    {selectedMember.bio}
                  </p>
                )}

                <div className="flex justify-center gap-3">
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.website && (
                    <a
                      href={selectedMember.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {TEAM.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === selectedIndex
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
