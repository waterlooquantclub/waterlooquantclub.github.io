import Section from "../components/section";
import { MEMBERS, PRESIDENT, VPMEMBERS } from "../util/constants";
import { Link } from "lucide-react";

export type Member = {
  name: string;
  role: string;
  image: string;
  link?: string;
};

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col items-center text-center w-1/2 md:w-1/5 mb-4 sm:mb-8">
      <img
        src={member.image}
        alt={member.name}
        className="sm:w-34 sm:h-34 w-32 h-32 rounded-full border-2 border-purple-400 shadow-lg shadow-purple-400/50 object-cover"
      />
      <span className="flex flex-row gap-2 items-center justify-center">
        <p className="mt-2 font-semibold text-white">{member.name}</p>
        {member.link && (
          <a
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-gray-400 hover:text-purple-400"
          >
            <Link size={16} />
          </a>
        )}
      </span>
      <p className="text-sm text-gray-300">{member.role}</p>
    </div>
  );
}

function Team() {
  return (
    <Section
      id="team"
      title="Board Members"
      titleFont="krona"
      className="z-10 relative flex items-center justify-center flex-col"
    >
      <div className="flex flex-wrap justify-center sm:mx-0 mx-8 sm:max-w-[1000px]">
        <MemberCard member={PRESIDENT} />
        <div className="w-full" />
        {VPMEMBERS.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
        <div className="w-full" />
        {MEMBERS.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
      </div>
    </Section>
  );
}

export default Team;
