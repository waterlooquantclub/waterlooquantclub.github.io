import WqcLogo from "@/assets/wqc-logo.svg";
import { SOCIAL_LINKS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border relative z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted-foreground text-sm order-2 md:order-1">
          © 2026 Waterloo Quant Club
        </p>
        <img
          src={WqcLogo}
          alt="WQC Logo"
          className="h-8 opacity-50 order-1 md:order-2"
        />
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 order-3">
          <a
            href={SOCIAL_LINKS.LINKEDIN}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.INSTAGRAM}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Instagram
          </a>
          <a
            href={SOCIAL_LINKS.DISCORD}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Discord
          </a>
          <a
            href={SOCIAL_LINKS.EMAIL}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
