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
  MEMBER_FORM: "https://forms.gle/iHKc2pY1o9r4WerZ8",
};

export const MEMBERS: Member[] = [
  {
    name: "Angelina Wu",
    role: "Creative Design",
    link: "https://linkedin.com/in/anglerona",
    image: "/members/default_profile.png",
  },
  {
    name: "Meilin Cai",
    role: "Social Media",
    image: "/members/default_profile.png",
  },

  {
    name: "Richard Yang",
    role: "Advisor",
    link: "https://www.linkedin.com/in/richardyang03/",
    image: "/members/richard_yang.jpg",
  },

  {
    name: "Kenneth Xiao",
    role: "Industry Relations",
    link: "https://www.linkedin.com/in/kdxiao",
    image: "/members/kenneth_xiao.JPG",
  },
  {
    name: "Soham Parmar",
    role: "Industry Relations",
    link: "https://www.linkedin.com/in/soham-parmar",
    image: "/members/soham_parmar.jpeg",
  },

  {
    name: "Marcus Lee",
    role: "External Relations",
    link: "https://www.linkedin.com/in/marcus-lee-4355aa214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    image: "/members/marcus_lee.jpeg",
  },

  {
    name: "Aurora Shi",
    role: "General Executive",
    link: "https://aurorashi.com/",
    image: "/members/aurora_shi.JPG",
  },

  {
    name: "Patrick Huang",
    role: "General Executive",
    link: "https://www.patrickhuang.co/",
    image: "/members/patrick_huang.jpeg",
  },
];

export const VPMEMBERS: Member[] = [
  {
    name: "Ian Zhao",
    role: "VP Tech",
    image: "/members/ian_zhao.jpeg",
  },
  {
    name: "Daniel Shen",
    role: "VP Trading",
    image: "/members/daniel_shen.png",
  },

  {
    name: "Samantha La",
    role: "VP Logistics",
    link: "https://www.linkedin.com/in/samanthala/",
    image: "/members/sam_la.jpg",
  },
  {
    name: "John Huang",
    role: "VP Research",
    image: "/members/john_huang.jpg",
  },
];

export const PRESIDENT: Member = {
  name: "Harry Jiang",
  role: "President",
  link: "https://www.linkedin.com/in/harryjiang7/",
  image: "/members/harry_jiang.JPG",
};
