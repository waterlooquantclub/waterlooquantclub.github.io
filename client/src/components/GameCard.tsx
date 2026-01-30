import { ArrowRight } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  url: string;
}

const GameCard = ({ title, description, url }: GameCardProps) => {
  return (
    <a
      href={url}
      className="group block p-6 border border-[#FAFAFA]/20 hover:border-[#FAFAFA]/50 transition-all cursor-pointer"
      style={{ background: 'linear-gradient(to top left, rgba(19, 44, 123, 0.35) 0%, rgba(0, 0, 0, 0.97) 100%)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
        <span className="text-xs tracking-widest uppercase text-[#FAFAFA] bg-[#132C7B]/60 px-2 py-1 w-fit">
          Game
        </span>
      </div>
      <h3 className="text-xl font-medium text-foreground mb-2 flex items-center gap-2">
        {title}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </a>
  );
};

export default GameCard;
