import { useState } from "react";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="fixed top-[40px] z-[999] left-1/2 -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-sm border border-white/70 shadow-[0_0_12px_#ffffff80] px-16">
      <ul className="hidden md:flex items-center justify-around py-2 text-[12px] mx-4">
        <li>
          <a href="#about" className="hover:text-[#9770D6] transition-colors mx-4 hover:italic">
            About
          </a>
        </li>
        <li>
          <a href="#events" className="hover:text-[#9770D6] transition-colors mx-4 hover:italic">
            Events
          </a>
        </li>
                <li>
          <a href="#competition" className="hover:text-[#9770D6] transition-colors mx-4 hover:italic">
            Competition
          </a>
        </li>
        <li>
          <a href="#team" className="hover:text-[#9770D6] transition-colors mx-4 hover:italic">
            Team
          </a>
        </li>
        <li>
          <a href="#join" className="hover:text-[#9770D6] transition-colors mx-4 hover:italic">
            Join
          </a>
        </li>
      </ul>

      <button
        className="md:hidden flex items-center justify-center w-6 h-10 text-white"
        onClick={toggleMenu}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <ul className="absolute top-14 left-1/2 -translate-x-1/2 bg-gradient-to-b from-black/80 to-white/20 border border-white/50 backdrop-blur-sm rounded-lg p-4 flex flex-col space-y-2 text-sm md:hidden">
          <li>
            <a href="#about" onClick={toggleMenu} className="block px-2 py-1 hover:text-[#9770D6] hover:italic">
              About
            </a>
          </li>
          <li>
            <a href="#events" onClick={toggleMenu} className="block px-2 py-1 hover:text-[#9770D6] hover:italic">
              Events
            </a>
          </li>
          <li>
            <a href="#competition" onClick={toggleMenu} className="block px-2 py-1 hover:text-[#9770D6] hover:italic">
              Competition
            </a>
          </li>
          <li>
            <a href="#team" onClick={toggleMenu} className="block px-2 py-1 hover:text-[#9770D6] hover:italic">
              Team
            </a>
          </li>
          <li>
            <a href="#join" onClick={toggleMenu} className="block px-2 py-1 hover:text-[#9770D6] hover:italic">
              Join
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
