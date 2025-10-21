import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import EventArchive from "./pages/EventArchive";
import IntroToQuantPanel from "./pages/event-archive/introtoquantpanel";
import { SECTIONS, ROUTES } from "./util/constants";

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
        <Route path={ROUTES.EVENT_DETAIL} element={<IntroToQuantPanel />} />
      </Routes>
    </div>
  );
}

export default App;
