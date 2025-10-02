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

export const SOCIAL_LINKS = {
  DISCORD: "https://discord.gg/QwmucS8qBv",
  INSTAGRAM: "https://www.instagram.com/wlooquantclub/",
  LINKEDIN: "https://linkedin.com/company/waterloo-quant-club",
  EMAIL: "mailto:info@waterlooquantclub.com",
};
