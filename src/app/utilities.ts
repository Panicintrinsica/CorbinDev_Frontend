function getContentBody(array: Array<{ slug: string, isPublic: boolean, body: string }>, slugName: string): string {
  const obj = array.find(obj => obj.slug === slugName && obj.isPublic);
  return obj ? obj.body : '';
}
export { getContentBody };
