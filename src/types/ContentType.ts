export default interface ContentType {
  id: string
  name: string
  title: string
  items?: ContentTypeItem[]
}

export interface ContentTypeItem {
  id: string
  name: string
  title: string
  readonly type: string
}