import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SECTIONS } from "../util/constants";

function NavBar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="fixed top-[40px] z-[999] left-1/2 -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-sm border border-white/70 shadow-[0_0_12px_#ffffff80] md:px-16">
      <ul className="hidden md:flex items-center justify-around py-2 text-[12px] mx-4">
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="hover:text-[#9770D6] transition-colors mx-4 hover:italic"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className="md:hidden flex items-center justify-center h-10 text-white px-16"
        onClick={toggleMenu}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <ul className="absolute top-14 left-1/2 -translate-x-1/2 bg-gradient-to-b from-black/80 to-white/20 border border-white/50 backdrop-blur-sm rounded-lg p-4 flex flex-col space-y-2 text-sm md:hidden">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={toggleMenu}
                className="block px-2 py-1 hover:text-[#9770D6] hover:italic"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
