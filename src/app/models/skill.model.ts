import {XataMeta} from "./xata.model";

export interface Skill {
  id: string;
  name: string;
  years: number;
  level: number;
  notes: string;
  logo?: {
    name: string;
    mediaType: string;
    enablePublicUrl: boolean;
    singedUrlTimeout: number;
    uploadUrlTimeout: number;
    size: number;
    version: number;
    url: string;
  };
  learned: string;
  isPublic: boolean;
  isFeatured: boolean;
  group: string;
  link: string;
  xata: XataMeta
}

export interface BasicSkill {
  id: string,
  name: string
}

export interface SkillLink {
  id: string;
  name: string;
  isFeatured: true;
}
