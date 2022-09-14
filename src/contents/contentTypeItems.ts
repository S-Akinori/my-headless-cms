import { ContentTypeItem } from "src/types/ContentType";

export const contentTypeItems: ContentTypeItem[] = [
  {
    id: 'text',
    name: 'text',
    title: '1行テキスト',
    type: '一行テキスト'
  },
  {
    id: 'textarea',
    name: 'textarea',
    title: '複数行テキスト',
    type: '複数行テキスト'
  },
  {
    id: 'image',
    name: 'image',
    title: '画像',
    type: '画像'
  },
  {
    id: 'fieldset',
    name: 'fieldset',
    title: 'フィールドセット',
    type: 'フィールドセット'
  }
]