import Section from "../components/section";
import { MEMBERS, PRESIDENT, VPMEMBERS } from "../util/constants";
import { Link } from "lucide-react";

export type Member = {
  name: string;
  role: string;
  image: string;
  link?: string;
};

function Team() {
  return (
    <Section
      id="team"
      title="Board Members"
      className="z-10 relative flex items-center justify-center flex-col"
    >

      <div className="flex flex-wrap justify-center sm:mx-0 mx-8 sm:max-w-[1000px]">
        <div
          key={PRESIDENT.name}
          className="flex flex-col items-center text-center w-1/2 md:w-1/5 mb-4 sm:mb-8"
        >
          <img
            src={PRESIDENT.image}
            alt={PRESIDENT.name}
            className="sm:w-34 sm:h-34 w-32 h-32 rounded-full border-2 border-purple-400 shadow-lg shadow-purple-400/50"
          />
          <span className="flex flex-row gap-2 items-center justify-center">
            <p className="mt-2 font-semibold text-white">{PRESIDENT.name}</p>
            {PRESIDENT.link && (
              <a 
                href={PRESIDENT.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-gray-400 hover:text-purple-400"
              >
                <Link size={16} />
              </a>
            )}
          </span>
          <p className="text-sm text-gray-300">{PRESIDENT.role}</p>
        </div>
        <div className="w-full"></div>

        {VPMEMBERS.map((m) => (
          <div
            key={m.name}
            className="flex flex-col items-center text-center w-1/2 md:w-1/5 mb-4 sm:mb-4"
          >
            <img
              src={m.image}
              alt={m.name}
              className="sm:w-34 sm:h-34 w-32 h-32 rounded-full border-2 border-purple-400 shadow-lg shadow-purple-400/50"
            />
            <span className="flex flex-row gap-2 items-center justify-center">
              <p className="mt-2 font-semibold text-white">{m.name}</p>
              {m.link && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-gray-400 hover:text-purple-400"
                >
                  <Link size={16} />
                </a>
              )}
            </span>
            <p className="text-sm text-gray-300">{m.role}</p>
          </div>
        ))}

        <div className="w-full"></div>

        {MEMBERS.map((m) => (
          <div
            key={m.name}
            className="flex flex-col items-center text-center w-1/2 md:w-1/5 mb-4 sm:mb-8"
          >
            <img
              src={m.image}
              alt={m.name}
              className="sm:w-34 sm:h-34 w-32 h-32 rounded-full border-2 border-purple-400 shadow-lg shadow-purple-400/50"
            />
            <span className="flex flex-row gap-2 items-center justify-center">
              <p className="mt-2 font-semibold text-white">{m.name}</p>
              {m.link && (
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-gray-400 hover:text-purple-400"
                >
                  <Link size={16} />
                </a>
              )}
            </span>
            <p className="text-sm text-gray-300">{m.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Team;
