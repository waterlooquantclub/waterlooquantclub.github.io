import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
      <Navbar />
      <main className="pt-16 flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
