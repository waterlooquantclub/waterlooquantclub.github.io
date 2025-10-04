import About from "../pages/About";
import Events from "../pages/Events";
import Join from "../pages/Join";
import Team from "../pages/Team";
import Competition from "../pages/Competition";
import type { Member } from "../pages/Team";

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
  {
    id: "team",
    label: "Team",
    component: Team,
  },
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

export const MEMBERS: Member[] = [
  {
    name: "Ian Zhao",
    program: "CS",
    image: "/members/ian_zhao.jpeg",
  },
  {
    name: "Daniel Shen",
    program: "CS",
    image: "/members/daniel_shen.png",
  },

  {
    name: "Harry Jiang",
    program: "CS/Stats",
    link: "https://www.linkedin.com/in/harryjiang7/",
    image: "/members/harry_jiang.JPG",
  },

  {
    name: "Aurora Shi",
    program: "SE",
    link: "https://aurorashi.com/",
    image: "/members/aurora_shi.JPG",
  },

  {
    name: "Patrick Huang",
    program: "SE",
    link: "https://www.patrickhuang.co/",
    image: "/members/patrick_huang.jpeg",
  },
  {
    name: "Marcus Lee",
    program: "Math/Econ",
    link: "https://www.linkedin.com/in/marcus-lee-4355aa214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "/members/marcus_lee.jpeg",
  },

  {
    name: "Soham Parmar",
    program: "CE",
    link: "https://www.linkedin.com/in/soham-parmar",
    image: "/members/soham_parmar.jpeg",
  },
  {
    name: "Samantha La",
    program: "SYDE",
    link: "https://www.linkedin.com/in/samanthala/",
    image: "/members/sam_la.jpg",
  },
  {
    name: "Jacob Yan",
    program: "CS/Stats",
    link: "https://www.linkedin.com/in/jacob-yan/",
    image: "/members/jacob_yan.jpg",
  },
];
