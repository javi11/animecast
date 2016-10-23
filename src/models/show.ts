export interface Show {
  'title': string,
  'image': string,
  'link': string,
  'description': string,
  'categories': Array<{
    'name': string,
    'link': string
  }>
}