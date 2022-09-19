import Image from "next/image"
import React, { ChangeEventHandler, useState } from "react"
import Button from "src/components/parts/Button"
import Input from "src/components/parts/Input"
import TextArea from "src/components/parts/TextArea"
import { ContentObject, ImageObject } from "src/types/Content"
import ContentType, { ContentTypeItem } from "src/types/ContentType"

interface Props {
  fieldset: ContentType
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  contentObjects?: ContentObject[]
}
const Fieldset = ({fieldset, contentObjects, onChange}: Props) => {
  console.log('contentObjects', contentObjects)
  const [count, setCount] = useState(contentObjects ? contentObjects.length : 0)

  return (
    <div>
      <div className="pl-6">
        {Array.from(Array(count), (e, i) => (
          <div key={i}>
            <p className="mb-4">セット{i}</p>
            {fieldset.items?.map(item => (
              <div key={item.id} className="mb-6">
                <div>ID: {item.id}</div>
                <div>コード: {item.name}</div>
                <div>コンテンツ名: {item.title}</div>
                {item.type === '一行テキスト' && <Input name={fieldset.name + '__' + item.name + '__' + i} value={contentObjects && contentObjects[i][item.name] as string} onChange={onChange} />}
                {item.type === '複数行テキスト' && <TextArea rows={8} name={fieldset.name + '__' + item.name + '__' + i} value={contentObjects && contentObjects[i][item.name] as string} onChange={onChange} />}
                {item.type === '画像' && (
                  <div>
                    <Input type="file" name={fieldset.name + '__' + item.name + '__' + i} onChange={onChange} />
                    {contentObjects && (
                      <Image
                        src={(contentObjects[i][item.name] as ImageObject).url}
                        width={(contentObjects[i][item.name] as ImageObject).width}
                        height={(contentObjects[i][item.name] as ImageObject).height}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Button onClick={(e) => setCount(count + 1)}>追加</Button>
    </div>
  )
}

export default Fieldset