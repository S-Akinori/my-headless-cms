export interface Content {
  id: string
  typeId: string
  name: string
  title: string
  object: {
    [key: string]: string 
  }
}