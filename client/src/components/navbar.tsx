function NavBar() {
  return (
    <nav className="fixed top-[40px] z-999 left-1/2 -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-sm border border-white/70 shadow-[0_0_12px_#ffffff80]">
      <ul className="flex items-center justify-around py-2 text-[12px] mx-20">
        <li>
          <a href="#about" className="font-lato hover:text-[#9770D6] transition-colors mx-4 hover:italic">
              About
          </a>
        </li>
        <li>
          <a href="#events" className="font-lato hover:text-[#9770D6] transition-colors mx-4 hover:italic">
              Events
          </a>
        </li>
        <li>
          <a href="#team" className="font-lato hover:text-[#9770D6] transition-colors mx-4 hover:italic">
              Team
          </a>
        </li>
        <li>
          <a href="#competition" className="font-lato hover:text-[#9770D6] transition-colors mx-4 hover:italic">
              Competition
          </a>
        </li>
        <li>
          <a href="#join" className="font-lato hover:text-[#9770D6] transition-color mx-4 hover:italic">
              Join
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
