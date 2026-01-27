import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  announcementBar?: ReactNode;
}

const Layout = ({ children, announcementBar }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Fixed blue gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 75%, rgba(19, 44, 123, 0.5) 0%, transparent 50%)',
          zIndex: 1,
        }}
      />
      {/* Announcement Bar - above navbar */}
      {announcementBar && (
        <div className="fixed top-0 left-0 right-0 z-[60]">
          {announcementBar}
        </div>
      )}
      <Navbar hasAnnouncementBar={!!announcementBar} />
      <main className={`flex-1 relative z-10 ${announcementBar ? 'pt-[calc(4rem+52px)] md:pt-[calc(4rem+44px)]' : 'pt-16'}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
