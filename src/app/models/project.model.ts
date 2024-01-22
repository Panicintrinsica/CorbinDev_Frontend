export interface Project {
  _id: string,
  name: string,
  shortDescription: string,
  longDescription: string,
  company: string,
  title: string,
  type: string,
  startDate: number,
  endDate: number,
  skills: [{
    name: string,
    highlight?: boolean,
    _id: string
  }],
  features: string,
  stack: string,
  url: string,
  photo: string,
  slug: string,
  category: string
  hasLink: boolean,
  hasDetails: boolean,
  isCurrent: boolean,
  cvDisplay?: boolean,
  published: boolean,
}

export interface ProjectStub {
  _id: string,
  name: string,
  startDate: number,
  endDate: number,
  category: string,
  slug: string,
}
