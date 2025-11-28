import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import EventArchive from "./pages/EventArchive";
import Games from "./pages/Games";
import IntroToQuantPanel from "./pages/event-archive/introtoquantpanel";
import IntroToTrading from "./pages/event-archive/intrototrading";
import AssetClassDeepDive from "./pages/event-archive/assetclassdeepdive";
import { SECTIONS, ROUTES } from "./util/constants";
import Options101 from "./pages/event-archive/options101";
import CapitalMarkets from "./pages/event-archive/capitalmarkets";

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      {SECTIONS.map(({ id, component: Component }) => (
        <Component key={id} />
      ))}
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EVENTS_ARCHIVE} element={<EventArchive />} />
        <Route path={ROUTES.GAMES} element={<Games />} />
        <Route
          path="/events/intro-to-quant-panel"
          element={<IntroToQuantPanel />}
        />
        <Route path="/events/intro-to-trading" element={<IntroToTrading />} />
        <Route
          path="/events/asset-class-deep-dive"
          element={<AssetClassDeepDive />}
        />
        <Route path="/events/options-101" element={<Options101 />} />
        <Route path="/events/capital-markets" element={<CapitalMarkets />} />
      </Routes>
    </div>
  );
}

export default App;
