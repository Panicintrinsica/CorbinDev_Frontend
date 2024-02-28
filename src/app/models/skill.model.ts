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
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  }
}
