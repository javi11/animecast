export interface Show {
  title?: string,
  image?: string,
  link?: string,
  air?: string,
  status?: string,
  type?: string,
  description?: string,
  categories?: Array<{
    name: string,
    link: string
  }>
}