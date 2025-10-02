import Home from "./pages/Home";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
