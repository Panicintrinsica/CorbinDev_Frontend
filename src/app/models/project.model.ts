export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  client: string;
  role: string;
  started: number;
  ended: number;
  skills: string[];
  link: string;
  thumbnail: {
    name: string;
    mediaType: string;
    enablePublicUrl: boolean;
    singedUrlTimeout: number;
    uploadUrlTimeout: number;
    size: number;
    version: number;
    url: string;
  };
  category: string;
  group: string;
  showLink: boolean;
  isCurrent: boolean;
  hasNotes: boolean;
  isFeatured: boolean;
  isPublic: boolean;
  slug: string;
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

export interface ProjectIndexItem {
  name: string;
  id: string;
}

export interface ProjectStub {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  group: string;
  slug: string;
}

export interface ProjectLink {
  id: string;
  name: string;
  group: string;
  slug: string;
}

export interface CvProject {
  id: string;
  name: string;
  cvDescription: string;
  client: string;
  role: string;
  started: number;
  ended: number;
}
