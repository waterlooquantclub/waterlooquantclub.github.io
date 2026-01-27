import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import wqcLogo from "@/assets/wqc-logo.svg";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Games", path: "/games" },
  { name: "Competition", path: "/competition" },
  { name: "Team", path: "/team" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Join", path: "/join" },
];

interface NavbarProps {
  hasAnnouncementBar?: boolean;
}

const Navbar = ({ hasAnnouncementBar = false }: NavbarProps) => {
  const location = useLocation();

  return (
    <nav className={`fixed left-0 right-0 z-50 ${hasAnnouncementBar ? 'top-[52px] md:top-[44px]' : 'top-0'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 md:px-18 py-6 md:py-14 flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <img src={wqcLogo} alt="WQC Logo" className="h-7 w-auto" />
          <span className="text-foreground font-merriweather text-2xl tracking-tight">WQC</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn("nav-link text-xl", location.pathname === link.path && "nav-link-active")}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation using Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-foreground p-2"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-background border-none flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-3xl font-light tracking-wide",
                    location.pathname === link.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
