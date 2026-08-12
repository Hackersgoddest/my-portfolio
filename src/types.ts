import type { Component } from "vue";

export interface NavSection {
  key: string;
  label: string;
  index: string;
}

export type ProjectLinkType = "site" | "code" | "ios" | "android";

export interface ProjectLink {
  name: string;
  type: ProjectLinkType;
  link: string;
}

export type ProjectCategory = "Personal Project" | "Team Project" | "Freelance Project" | "School Project";

export interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  images: string[];
  tools: string[];
  links: ProjectLink[];
}

export interface Service {
  title: string;
  description: string;
  icon: Component;
  tools: string[];
}

export type SkillLevel = "Expert" | "Advanced" | "Intermediate";

export interface SkillItem {
  name: string;
  src: string;
  category: string;
  level: SkillLevel;
  percentage: number;
  projects: number;
  description: string;
}

export interface SkillTab {
  name: string;
  label: string;
  skills: SkillItem[];
}
