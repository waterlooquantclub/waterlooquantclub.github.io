import { Text } from "../components/text";
import Section from "../components/section";
import { Button } from "../components/button";
import { ROUTES, GAMES_REGISTRY } from "../util/constants";
import { Link } from "react-router-dom";

function GameCard({
  id,
  name,
  description,
  thumbnail,
  creator,
}: {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  creator?: {
    name: string;
    url: string;
  };
}) {
  return (
    <a
      href={`/games/${id}/index.html`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-md"
    >
      <div className="bg-gradient-to-b from-[#1a0f2e] to-[#2a1a3d] border border-[#EECFEF] shadow-[0_0_8px_2px_#EECFEF] rounded-xl overflow-hidden hover:shadow-[0_0_16px_4px_#EECFEF] transition-shadow duration-300 cursor-pointer">
        {/* Thumbnail */}
        <div className="w-full h-48 bg-[#1a0f2e] flex items-center justify-center overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl">♦️♣️♥️♠️</div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Text font="krona" className="text-xl font-bold">
              {name}
            </Text>
            {creator && (
              <a
                href={creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#BB68C5] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {creator.name}
              </a>
            )}
          </div>
          <Text className="text-sm text-gray-300 mb-4">{description}</Text>
          <div className="flex items-center gap-2 text-[#BB68C5]">
            <span>Play Now</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

function Games() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-black via-[#2a1a3d] to-[#1a0f2e]">
      <Section
        id="games"
        title="Games"
        className="z-10 relative pt-24"
        titleFont="krona"
      >
        <Text
          size="md"
          className="-mt-4 mb-10 text-center text-[0.7rem] leading-relaxed sm:text-xl"
        >
          Take a break and play some of the games from our weekly events!
        </Text>
        <div className="flex justify-center mb-10">
          <Button as={Link} to={ROUTES.HOME}>
            Back to Home
          </Button>
        </div>

        {/* Games Grid */}
        <div className="flex flex-wrap gap-8 justify-center pb-20">
          {GAMES_REGISTRY.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              name={game.name}
              description={game.description}
              thumbnail={game.thumbnail}
              creator={game.creator}
            />
          ))}
        </div>

        {/* Add Your Game Section */}
        <div className="text-center pb-12">
          <Text className="text-gray-400 text-sm">
            Like playing these games? Join us on {" "}
            <a
              href="https://discord.gg/QwmucS8qBv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#BB68C5] hover:underline"
            >
              Discord
            </a>
            !
          </Text>
        </div>
      </Section>
    </div>
  );
}

export default Games;
