import About from "../pages/About";
import Events from "../pages/Events";
import Join from "../pages/Join";
import Competition from "../pages/Competition";

export const SECTIONS = [
  {
    id: "about",
    label: "About",
    component: About,
  },
  {
    id: "events",
    label: "Events",
    component: Events,
  },
  {
    id: "competition",
    label: "Competition",
    component: Competition,
  },
  // {
  //   id: "team",
  //   label: "Team",
  //   component: Team,
  // },
  {
    id: "join",
    label: "Join",
    component: Join,
  },
];
