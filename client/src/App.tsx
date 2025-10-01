import Hero from "./pages/Hero";
import About from "./pages/About";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Join from "./pages/Join";
import NavBar from "./components/navbar";
import Competition from "./pages/Competition";
import Footer from "./components/footer";

function App() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Events />
      <Competition />
      <Team />
      <Join />
      <Footer />
    </div>
  );
}

export default App;
