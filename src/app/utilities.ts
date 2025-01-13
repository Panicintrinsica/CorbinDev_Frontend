import { Detail } from './models/detail.model';
import { ContentBlock } from './models/content.model';

export function getContentBody(
  array: Array<ContentBlock>,
  selector: string,
): string {
  const obj = array.find((obj) => obj.uri === selector);
  return obj ? obj.body : '';
}

export function getDetail(
  array: Array<Detail>,
  selector: string,
  field: keyof Detail,
): string {
  const obj = array.find((obj) => obj.label === selector);
  return obj ? String(obj[field]) : '';
}
