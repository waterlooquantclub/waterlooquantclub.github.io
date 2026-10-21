import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";

import Events from "./pages/Events";
import Games from "./pages/Games";
import Competition from "./pages/Competition";
import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import Blotto from "./pages/Blotto";
import { PORTAL_APP_URL } from "./lib/portal";

const queryClient = new QueryClient();

// Sends visitors to a URL outside this site (e.g. pages that moved to the portal),
// replacing the history entry so Back doesn't bounce them here again.
const ExternalRedirect = ({ to }: { to: string }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/events" element={<Events />} />
          <Route path="/games" element={<Games />} />
          {/* <Route path="/competition" element={<Competition />} /> */}
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/join" element={<Join />} />
          <Route path="/games/blotto" element={<Blotto />} />
          {/* Leaderboard moved to the portal; keep old bookmarks and shared links working. */}
          <Route
            path="/games/blotto/leaderboard"
            element={<ExternalRedirect to={`${PORTAL_APP_URL}/blotto?section=leaderboard`} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
