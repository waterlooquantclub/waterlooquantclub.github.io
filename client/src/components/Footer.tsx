import WqcLogo from "@/assets/wqc-logo.svg";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted-foreground text-sm order-2 md:order-1">© 2026 Waterloo Quant Club</p>
        <img src={WqcLogo} alt="WQC Logo" className="h-8 opacity-50 order-1 md:order-2" />
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 order-3">
          <a
            href="https://www.linkedin.com/company/waterloo-quant-club/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/wlooquantclub/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://discord.gg/qsjtxnhCpE"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Discord
          </a>
          <a
            href="mailto:info@waterlooquantclub.com"
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
