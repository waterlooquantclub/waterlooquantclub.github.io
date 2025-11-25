import About from "../pages/About";
import Events from "../pages/Events";
import Join from "../pages/Join";
import Team from "../pages/Team";
import Competition from "../pages/Competition";
import type { Memberinfo } from "../pages/Team";

export const ROUTES = {
  HOME: "/",
  EVENTS_ARCHIVE: "/events-archive",
  EVENT_DETAIL: "/events/:eventId",
  GAMES: "/games",
} as const;

// We add new games here: each game should have its own folder in public/games/
export interface GameInfo {
  id: string; // Folder name in public/games/
  name: string;
  description: string;
  thumbnail?: string; // Optional thumbnail image path
  creator?: {
    name: string;
    url: string;
  };
}

export const GAMES_REGISTRY: GameInfo[] = [
  {
    id: "renjie-poker",
    name: "Renjie Poker",
    description:
      "A poker solitaire game. Select cards to build a better hand than the dealer!",
    creator: {
      name: "paramt",
      url: "https://github.com/paramt/poker",
    },
  },
];

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

export const MEMBERS: string[] = [
  "Angelina Wu",
  "Meilin Cai",
  "Richard Yang",
  "Kenneth Xiao",
  "Soham Parmar",
  "Marcus Lee",
  "Aurora Shi",
  "Patrick Huang",
  "Alex Oláh",
];

export const VPMEMBERS: string[] = [
  "Ian Zhao",
  "Daniel Shen",
  "Samantha La",
  "John Huang",
];

export const PRESIDENT: string = "Harry Jiang";

export const MEMBERINFO: Record<string, Memberinfo> = {
  "Harry Jiang": {
    bio: "I'm a 5th year Statistics student, and a Quant Trader at Jane Street. I love sports, photography, and cubing!",
    role: "President",
    image: "/members/harry_jiang.JPG",
    linkedin: "https://www.linkedin.com/in/harryjiang7/",
    email: "harryjiang@waterlooquantclub.com",
  },

  "Ian Zhao": {
    bio: "I'm a CS + CO student and a SWE at HRT. When I'm not thinking about systems programming or programming languages, I enjoy running, reading, and everything music!",
    role: "VP Tech",
    image: "/members/ian_zhao.jpeg",
    email: "ianzhao@waterlooquantclub.com",
    linkedin: "https://www.linkedin.com/in/ian-zhao/",
  },
  "Daniel Shen": {
    bio: "",
    role: "VP Trading",
    image: "/members/daniel_shen.png",
  },
  "Samantha La": {
    bio: "I'm studying Systems Design Engineering with experiences at the Canadian Banks. I love collecting jellycats and smiskis:)",
    role: "VP Logistics",
    image: "/members/sam_la.jpg",
    email: "samanthala@waterlooquantclub.com",
    linkedin: "https://www.linkedin.com/in/samanthala/",
  },
  "John Huang": {
    bio: "I'm a CS + Math Finance student and a Quant Researcher at Cubist. I love reading, strategy games, and word puzzles.",
    role: "VP Research",
    image: "/members/john_huang.jpg",
  },

  "Angelina Wu": {
    bio: "",
    role: "Creative Design",
    image: "/members/default_profile.png",
  },
  "Meilin Cai": {
    bio: "",
    role: "Social Media",
    image: "/members/default_profile.png",
  },
  "Richard Yang": {
    bio: "Mathematics student working in finance, serving as advisor within the club",
    role: "Advisor",
    image: "/members/richard_yang.jpg",
    linkedin: "https://www.linkedin.com/in/richardyang03/",
    email: "richard.yang1@uwaterloo.ca",
  },
  "Kenneth Xiao": {
    bio: "I like math and games.",
    role: "Industry Relations",
    image: "/members/kenneth_xiao.JPG",
    linkedin: "https://www.linkedin.com/in/kdxiao",
    email: "kdxiao@uwaterloo.ca",
  },
  "Soham Parmar": {
    bio: "I’m a Computer Engineering student with experience at Jane Street and an interest in software engineering, trading, and the world of finance.",
    role: "Industry Relations",
    image: "/members/soham_parmar.jpeg",
    linkedin: "https://www.linkedin.com/in/soham-parmar",
    email: "s24parma@uwaterloo.ca",
  },
  "Marcus Lee": {
    bio: "I'm a Math and Econ student with an interest in finance. In my free time, I enjoy hiking and eating!",
    role: "External Relations",
    image: "/members/marcus_lee.jpeg",
    linkedin: "https://www.linkedin.com/in/marcus-lee-4355aa214/",
    email: "mys2lee@uwaterloo.ca",
  },
  "Aurora Shi": {
    bio: "I'm a Software Engineering student with 2x internships at Bloomberg. I love baking + painting, check out my website to see!",
    role: "General Executive",
    image: "/members/aurora_shi.JPG",
    linkedin: "https://www.linkedin.com/in/ashi16/",
    email: "aurorashi16@gmail.com",
    website: "https://aurorashi.com/",
  },
  "Patrick Huang": {
    bio: "30x'd trading marbles in elementary school. In my free time, I like eating food.",
    role: "General Executive",
    image: "/members/patrick_huang.jpeg",
    linkedin: "https://www.linkedin.com/in/patrick-y-huang/",
    email: "patrick.huang@uwaterloo.ca",
    website: "https://www.patrickhuang.co/",
  },
  "Alex Oláh": {
    bio: "EY Tax",
    role: "General Executive",
    image: "/members/alex-olah.png",
    linkedin: "https://www.linkedin.com/in/alexolah",
  },
};
