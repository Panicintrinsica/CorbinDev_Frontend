import {Detail} from "./models/detail.model";

export function getContentBody(array: Array<{ slug: string, isPublic: boolean, body: string }>, slugName: string): string {
  const obj = array.find(obj => obj.slug === slugName && obj.isPublic);
  return obj ? obj.body : '';
}

export function getDetail(array: Array<Detail>, selector: string, field: keyof Detail): string {
  const obj = array.find(obj => obj.label === selector);
  return obj ? String(obj[field]) : '';
}
