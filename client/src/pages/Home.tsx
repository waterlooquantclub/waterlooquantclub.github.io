import Hero from "./Hero";
import { SECTIONS } from "../util/constants";

const Home = () => {
  return (
    <>
      <Hero />
      {SECTIONS.map(({ id, component: Component }) => (
        <Component key={id} />
      ))}
    </>
  );
};

export default Home;
