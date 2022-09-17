import { FieldValue, Timestamp } from "firebase/firestore"

export default interface ContentType {
  id: string
  name: string
  title: string
  items?: ContentTypeItem[]
  dateFormat?: 'timestamp' | 'string'
  createdAt?: Timestamp | string
  updatedAt?: Timestamp | string
}

export interface ContentTypeItem {
  id: string
  parentId?: string
  name: string
  title: string
  readonly type: '一行テキスト' | '複数行テキスト' | '画像' | 'フィールドセット'
  items?: ContentTypeItem[]
}