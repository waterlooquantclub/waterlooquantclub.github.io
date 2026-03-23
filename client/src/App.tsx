import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import BlottoLeaderboard from "./pages/BlottoLeaderboard";

const queryClient = new QueryClient();

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
          <Route path="/games/blotto/leaderboard" element={<BlottoLeaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
