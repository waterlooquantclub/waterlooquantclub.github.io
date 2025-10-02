import { Instagram, Linkedin, Mail } from "lucide-react";
import { SECTIONS } from "../util/constants";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-black from-16% to-[#412445] py-8 md:py-12 rounded-tl-3xl rounded-tr-3xl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile layout (side by side goose/logo) */}
        <div className="md:hidden flex items-center justify-center gap-4 mb-6">
          <img
            src="/purpleGoose.png"
            alt="Waterloo Quant Club Purple Goose"
            className="w-32 h-32 object-contain"
          />
          <img
            src="/logo.png"
            alt="Waterloo Quant Club Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Desktop layout (see Figma) */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-center">
          {/* Goose */}
          <div className="flex items-center justify-end">
            <img
              src="/purpleGoose.png"
              alt="Waterloo Quant Club Purple Goose"
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* Icons (socials) + logo */}
          <div className="flex flex-col items-center space-y-6">
            <img
              src="/logo.png"
              alt="Waterloo Quant Club Logo"
              className="w-32 h-32 object-contain"
            />
            <div>
              <h3 className="text-gray-400 text-sm font-bold mb-3 text-left">
                Socials
              </h3>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://instagram.com/uwaterlooquant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#EAD0ED" }}
                  // Hover wasn't working, so I decided to use mouse eventHandlers instead
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#9770D6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#EAD0ED")
                  }
                  aria-label="Instagram"
                >
                  <Instagram size={28} />
                </a>
                <a
                  href="https://linkedin.com/company/waterloo-quant-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#EAD0ED" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#9770D6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#EAD0ED")
                  }
                  aria-label="LinkedIn"
                >
                  <Linkedin size={28} />
                </a>
                <a
                  href="https://discord.gg/QwmucS8qBv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: "#EAD0ED" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#9770D6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#EAD0ED")
                  }
                  aria-label="Discord"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                <a
                  href="mailto:info@waterlooquantclub.com"
                  className="transition-colors"
                  style={{ color: "#EAD0ED" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#9770D6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#EAD0ED")
                  }
                  aria-label="Email"
                >
                  <Mail size={28} />
                </a>
              </div>
            </div>
          </div>

          {/* Resources (desktop) */}
          <div className="flex flex-col items-start justify-center">
            <h3 className="text-gray-400 text-sm font-bold mb-3">Resources</h3>
            <ul className="space-y-2" style={{ color: "#EAD0ED" }}>
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="transition-colors"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#9770D6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#EAD0ED")
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Socials + resources (mobile) */}
        <div className="md:hidden">
          {/* Socials */}
          <div className="mb-6">
            <h3 className="text-gray-400 text-sm font-bold mb-3 text-center">
              Socials
            </h3>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://instagram.com/uwaterlooquant"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "#EAD0ED" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9770D6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#EAD0ED")}
                aria-label="Instagram"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://linkedin.com/company/waterloo-quant-club"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "#EAD0ED" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9770D6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#EAD0ED")}
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://discord.gg/QwmucS8qBv"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "#EAD0ED" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9770D6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#EAD0ED")}
                aria-label="Discord"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="mailto:info@waterlooquantclub.com"
                className="transition-colors"
                style={{ color: "#EAD0ED" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9770D6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#EAD0ED")}
                aria-label="Email"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center">
            <h3 className="text-gray-400 text-sm font-bold mb-3 text-center">
              Resources
            </h3>
            <ul className="space-y-2 text-center" style={{ color: "#EAD0ED" }}>
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="transition-colors"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#9770D6")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#EAD0ED")
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-3 md:mt-4 text-center">
          <p className="text-xs md:text-sm" style={{ color: "#EAD0ED" }}>
            University of Waterloo Quant Club © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
