import { FieldValue, Timestamp } from "firebase/firestore"

export interface Content {
  id: string
  typeId: string
  name: string
  title: string
  object: ContentObject
  dateFormat?: 'timestamp' | 'string'
  createdAt?: Timestamp | string
  updatedAt?: Timestamp | string
}

export interface ImageObject {
  path : string
  url: string
  width: number
  height: number
}

export interface ContentObject {
  [key: string]: string | ImageObject | {[key: string]: string}[]
}