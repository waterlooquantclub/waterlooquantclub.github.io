import Section from "../components/section";
import { useState } from "react";
import { MEMBERS, PRESIDENT, VPMEMBERS, MEMBERINFO } from "../util/constants";
import { Link } from "lucide-react";
import ProfileCard from "../components/profile-card";

export type Member = {
  name: string;
  role: string;
  image: string;
  link?: string;
};

function MemberCard({
  member,
  onClick,
}: {
  member: Member;
  onClick: (name: string) => void;
}) {
  return (
    <div
      className={
        "flex flex-col items-center text-center w-1/2 md:w-1/5 mb-4 sm:mb-8 cursor-pointer"
      }
      onClick={() => onClick(member.name)}
    >
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
export type Memberinfo = {
  role: string;
  image: string;
  website?: string;
  linkedin?: string;
  email?: string;
  bio: string;
};

function Team() {
  const memberNames = Object.keys(MEMBERINFO);
  const [member, setMember] = useState("");
  const onClose = () => {
    setMember("");
  };

  const onNext = () => {
    if (member) {
      const currIndex = memberNames.indexOf(member);
      const nextIndex = (currIndex + 1) % memberNames.length;
      setMember(memberNames[nextIndex]);
    }
  };

  const onPrev = () => {
    if (member) {
      const currIndex = memberNames.indexOf(member);
      const prevIndex =
        (currIndex - 1 + memberNames.length) % memberNames.length;
      setMember(memberNames[prevIndex]);
    }
  };

  return (
    <Section
      id="team"
      title="Board Members"
      titleFont="krona"
      className="z-10 relative flex items-center justify-center flex-col"
    >
      <div className="flex flex-wrap justify-center sm:mx-0 mx-8 sm:max-w-[1000px]">
        <MemberCard member={PRESIDENT} onClick={setMember} />
        <div className="w-full" />
        {VPMEMBERS.map((m) => (
          <MemberCard key={m.name} member={m} onClick={setMember} />
        ))}
        <div className="w-full" />
        {MEMBERS.map((m) => (
          <MemberCard key={m.name} member={m} onClick={setMember} />
        ))}
      </div>
      {member && (
        <ProfileCard
          fullname={member}
          role={MEMBERINFO[member].role}
          bio={MEMBERINFO[member].bio}
          image={MEMBERINFO[member].image}
          linkedin={MEMBERINFO[member].linkedin}
          email={MEMBERINFO[member].email}
          website={MEMBERINFO[member].website}
          onClose={onClose}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </Section>
  );
}

export default Team;
