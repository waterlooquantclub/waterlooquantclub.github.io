export const SOCIAL_LINKS = {
  DISCORD: "https://discord.gg/QwmucS8qBv",
  INSTAGRAM: "https://www.instagram.com/wlooquantclub/",
  LINKEDIN: "https://linkedin.com/company/waterloo-quant-club",
  EMAIL: "mailto:info@waterlooquantclub.com",
} as const;

export interface MemberInfo {
  name: string;
  role: string;
  program: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  email?: string;
  website?: string;
}

export const TEAM: MemberInfo[] = [
  {
    name: "Harry Jiang",
    role: "President",
    program: "Statistics",
    bio: "I'm a 5th year Statistics student, and a Quant Trader at Jane Street. I love sports, photography, and cubing!",
    image: "harry_jiang.jpg",
    linkedin: "https://www.linkedin.com/in/harryjiang7/",
    email: "harryjiang@waterlooquantclub.com",
  },
  {
    name: "Ian Zhao",
    role: "VP Tech",
    program: "Computer Science, Combinatorics & Optimization",
    bio: "I'm a CS + CO student and a SWE at HRT. When I'm not thinking about systems programming or programming languages, I enjoy running, reading, and everything music!",
    image: "ian_zhao.jpg",
    linkedin: "https://www.linkedin.com/in/ian-zhao/",
    email: "ianzhao@waterlooquantclub.com",
  },
  {
    name: "Daniel Shen",
    role: "VP Trading",
    program: "Computer Science",
    image: "daniel_shen.png",
  },
  {
    name: "Samantha La",
    role: "VP Logistics",
    program: "Systems Design Engineering",
    bio: "I'm studying Systems Design Engineering with experiences at the Canadian Banks. I love collecting jellycats and smiskis:)",
    image: "sam_la.jpg",
    linkedin: "https://www.linkedin.com/in/samanthala/",
    email: "samanthala@waterlooquantclub.com",
  },
  {
    name: "John Huang",
    role: "VP Research",
    program: "Computer Science, Mathematical Finance",
    bio: "I'm a CS + Math Finance student and a Quant Researcher at Cubist. I love reading, strategy games, and word puzzles.",
    image: "john_huang.jpg",
  },
  {
    name: "Angelina Wu",
    role: "Creative Design",
    program: "Software Engineering",
  },
  {
    name: "Richard Yang",
    role: "Advisor",
    program: "Computing and Financial Management",
    bio: "Mathematics student working in finance, serving as advisor within the club",
    image: "richard_yang.jpg",
    linkedin: "https://www.linkedin.com/in/richardyang03/",
    email: "richard.yang1@uwaterloo.ca",
  },
  {
    name: "Kenneth Xiao",
    role: "Industry Relations",
    program: "Pure Mathematics",
    bio: "I like tea, math, and games. Previously at Point72.",
    image: "kenneth_xiao.jpg",
    linkedin: "https://www.linkedin.com/in/kdxiao",
    email: "kdxiao@uwaterloo.ca",
  },
  {
    name: "Soham Parmar",
    role: "Industry Relations",
    program: "Computer Engineering",
    bio: "I'm a Computer Engineering student with experience at Jane Street and an interest in software engineering, trading, and the world of finance.",
    image: "soham_parmar.jpg",
    linkedin: "https://www.linkedin.com/in/soham-parmar",
    email: "s24parma@uwaterloo.ca",
  },
  {
    name: "Marcus Lee",
    role: "External Relations",
    program: "Mathematics, Economics",
    bio: "I'm a Math and Econ student with an interest in finance. In my free time, I enjoy hiking and eating!",
    image: "marcus_lee.jpg",
    linkedin: "https://www.linkedin.com/in/marcus-lee-4355aa214/",
    email: "mys2lee@uwaterloo.ca",
  },
  {
    name: "Aurora Shi",
    role: "General Executive",
    program: "Software Engineering",
    bio: "Software Engineering student with 2x internships at Bloomberg. I love baking + painting, check out my website to see!",
    image: "aurora_shi.jpg",
    linkedin: "https://www.linkedin.com/in/ashi16/",
    email: "aurorashi16@gmail.com",
    website: "https://aurorashi.com/",
  },
  {
    name: "Patrick Huang",
    role: "General Executive",
    program: "Software Engineering",
    bio: "30x'd trading marbles in elementary school. In my free time, I like eating food.",
    image: "patrick_huang.jpg",
    linkedin: "https://www.linkedin.com/in/patrick-y-huang/",
    email: "patrick.huang@uwaterloo.ca",
    website: "https://www.patrickhuang.co/",
  },
  {
    name: "Alex Oláh",
    role: "General Executive",
    program: "Masters of Accounting",
    bio: "EY Tax",
    image: "alex_olah.jpg",
    linkedin: "https://www.linkedin.com/in/alexolah",
  },
  {
    name: "Joshua Liu",
    role: "Tech Exec",
    program: "Computer Science",
    bio: "Hi, I am a competitive programmer turned CTF player turned SWE at HRT. I love homelabbing, climbing, and cooking!",
    image: "joshua_liu.jpg",
    linkedin: "https://www.linkedin.com/in/joshua-liu-265681220/",
    email: "joshliu@waterlooquantclub.com",
  },
  {
    name: "Amelie Zhou",
    role: "General Executive",
    program: "Mathematics",
    bio: "I like solving puzzles and exploring alternative subcultures. I also sometimes write actuarial exams.",
    image: "amelie_zhou.jpg",
    linkedin: "https://www.linkedin.com/in/amelie-zhou",
    email: "amelieezhou@gmail.com",
  },
  {
    name: "Moses Xu",
    role: "Tech Executive",
    program: "Computer Science",
    bio: "✨ parallel programming enjoyer ✨ ( I also like tetris, MC, bad jokes, and anything artsy :) )",
    image: "moses_xu.jpg",
    linkedin: "https://www.linkedin.com/in/moses-xu",
    email: "moses.xu@uwaterloo.ca",
  },
];
