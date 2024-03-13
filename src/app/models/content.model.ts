export interface ContentBlock {
  id: string;
  slug: string;
  body: string;
  group: string;
  isPublic: boolean;
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  }
}
