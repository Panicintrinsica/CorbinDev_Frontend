import { SkillTag } from './skill.model';

export interface ProjectCard {
  uri: string;
  name: string;
  category: string;
  platform: string;
  link?: string;
  linkType?: string;
  blurb: string;
  thumbnail: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface Project extends ProjectCard {
  details: string;
  client: string;
  role: string;
  skills: SkillTag[];
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface ProjectLink {
  uri: string;
  name: string;
  category: string;
}
