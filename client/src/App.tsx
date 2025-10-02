import Hero from "./pages/Hero";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { SECTIONS } from "./util/constants";

function App() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Hero />
      {SECTIONS.map(({ id, component: Component }) => (
        <Component key={id} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
