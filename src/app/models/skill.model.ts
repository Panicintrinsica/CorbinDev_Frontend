export interface Skill {
  _id: string,
  name: string,
  level: number,
  learned: string,
  frequency: string,
  experience: number,
  notes: string,
  highlight: boolean,
  display?: boolean,
  category?: string,
}
