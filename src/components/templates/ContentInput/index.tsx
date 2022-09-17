import { ChangeEventHandler } from "react"
import Input from "src/components/parts/Input"
import TextArea from "src/components/parts/TextArea"
import Fieldset from "../FieldSet"

interface Props {
  type: '一行テキスト' | '複数行テキスト' | '画像' | 'フィールドセット'
  name: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const ContentInput = ({type, name, onChange}: Props) => {
  return (
    <div>
      {type === '一行テキスト' && <Input name={name} onChange={onChange} />}
      {type === '複数行テキスト' && <TextArea rows={8} name={name} onChange={onChange} />}
      {type === 'フィールドセット' && <Fieldset contentTypeItems={} name={name} onChange={onChange} />}
    </div>
  )
}

export default ContentInput