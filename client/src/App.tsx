import Hero from "./pages/Hero"
import About from "./pages/About"
import Events from "./pages/Events"
import Team from "./pages/Team"
import Join from "./pages/Join"
import NavBar from "./components/navbar"

function App() {

  return (
    <>
    <NavBar />
      <Hero />
      <About />
      <Events />
      <Team />
      <Join />
    </>
  )
}

export default App
