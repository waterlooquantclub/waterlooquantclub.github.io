import Section from "../components/section";
import { MEMBERS } from "../util/constants";
import { Text } from "../components/text";

import { Link } from "lucide-react";

export type Member = {
  name: string;
  program: string;
  image: string;
  link?: string;
};

function Team() {
  return (
    <Section
      id="team"
      title="Team"
      className="z-10 relative flex items-center justify-center flex-col"
    >
      <Text size="xl" className="-mt-4 mb-10 text-center">
        WQC executive members.
      </Text>
      <div className="flex flex-wrap justify-center sm:mx-0 mx-8 sm:max-w-[1000px]">
        {MEMBERS.map((m) => (
          <div
            key={m.name}
            className="flex flex-col items-center text-center w-1/2 md:w-1/5 mb-4 sm:mb-8"
          >
            <img
              src={m.image}
              alt={m.name}
              className="sm:w-40 sm:h-40 w-36 h-36 rounded-full border-2 border-purple-400 shadow-lg shadow-purple-400/50"
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

            <p className="mt-1 text-sm text-gray-300">{m.program}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
export default Team;
