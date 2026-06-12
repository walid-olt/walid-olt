import {
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import {
  Docker,
  Go,
  JavaScript,
  Linux,
  MongoDB,
  NextJs,
  NodeJs,
  PostgreSQL,
  React as ReactIcon,
  ReactQuery,
  ReactRouter,
  TailwindCSS,
  TypeScript,
} from "developer-icons";
import type { DeveloperIconProps } from "developer-icons/dist/icon";

export type Skill = {
  label: string;
  description: string;
  Icon: React.FunctionComponent<DeveloperIconProps>;
};

export const skills: Skill[] = [
  {
    label: "TypeScript",
    Icon: TypeScript,
    description: "JavaScript, but type-safe.",
  },
  {
    label: "JavaScript",
    Icon: JavaScript,
    description: "Prefer TypeScript though.",
  },
  {
    label: "React",
    Icon: ReactIcon,
    description: "Modern UI components.",
  },
  {
    label: "Next.js",
    Icon: NextJs,
    description: "Full-stack React framework.",
  },
  {
    label: "Node.js",
    Icon: NodeJs,
    description: "Server-side JavaScript runtime.",
  },
  {
    label: "Go",
    Icon: Go,
    description: "Fast, concurrent backend.",
  },
  {
    label: "Tailwind CSS",
    Icon: TailwindCSS,
    description: "Rapid utility-first styling.",
  },
  {
    label: "React Query",
    Icon: ReactQuery,
    description: "Effortless data fetching.",
  },
  {
    label: "React Router",
    Icon: ReactRouter,
    description: "Declarative client-side routing.",
  },
  {
    label: "MongoDB",
    Icon: MongoDB,
    description: "Flexible document store.",
  },
  {
    label: "Docker",
    Icon: Docker,
    description: "Containerized development environments.",
  },
  {
    label: "Linux",
    Icon: Linux,
    description: "To avoid Microsoft's shenanigans",
  },
];
export type Link = {
  label?: string;
  href: string;
  Icon: React.ElementType;
};
export type Project = {
  label: string;
  description: string;
  stack: Skill[];
  githubUrl?: string;
  imageUrl?: string;
  url?: string;
};

export const projectsData: Project[] = [];

export const sections = {
  About: {
    hash: "about me",
    heading: "Hi 👋, I'm Walid",
    content: `
      I'm a full-stack web developer based in Morocco, I specialize in the React and Node.js ecosystem.
      I'm also a huge enthusiast for 3D web and animations.
`,
  },
  Skills: {
    hash: "skills",
    heading: "Technologies I work with",
    data: skills,
  },
  Projects: {
    hash: "projects",
    heading: "Projects",
    content: "",
    data: [""],
  },
  Contact: {
    hash: "contact",
    heading: "Contact Me",
    content:
      "let's connect! I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  },
};

export const links: Link[] = [
  {
    label: "Github",
    href: "https://github.com/walid-olt",
    Icon: GithubLogoIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/walid101/",
    Icon: LinkedinLogoIcon,
  },
  {
    label: "Email",
    href: "mailto:walid.olt@proton.me",
    Icon: EnvelopeIcon,
  },
];

const STATIC = {
  links,
  sections,
};

export default STATIC;
