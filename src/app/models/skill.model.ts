export interface SkillTag {
  _id: string;
  name: string;
  group: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export interface Skill extends SkillTag {
  notes: string;
  acquired: string;
  proficiency: string;
  level: number;
  logo: string;
  link?: string;
}
