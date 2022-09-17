import { addContent, addContentType, addFile, getContentTypes } from "lib/fetchAPI";
import { GetStaticProps } from "next";
import Layout from "src/components/views/Layout"
import { DocumentData } from "firebase/firestore"; 
import ContentType, { ContentTypeItem } from "src/types/ContentType";
import Container from "src/components/parts/Container";
import Button from "src/components/parts/Button";
import { contentTypeItems } from "src/contents/contentTypeItems";
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState } from "react";
import generateId from "lib/functions/generateId";
import Input from "src/components/parts/Input";
import { useRouter } from "next/router";
import { Content, ContentObject, ImageObject } from "src/types/Content";
import TextArea from "src/components/parts/TextArea";
import Fieldset from "src/components/templates/FieldSet";

interface Props {
  contentTypes: ContentType[]
}

const AdminContentCreatePage = ({contentTypes}: Props) => {
  const router = useRouter();
  const [currentContent, setCurrentContent] = useState<Content>({
    id: generateId(),
    typeId: '',
    name: 'newContent',
    title: '新しいコンテンツ',
    object: {}
  })
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null)
  const [contentObject, setContentObject] = useState<ContentObject>({});

  const selectContentType = (contentType: ContentType) => {
    setSelectedContentType(contentType);
    setCurrentContent({
      ...currentContent,
      typeId: contentType.id
    })
    if(contentType.items) {
      const newContentObject: ContentObject = {}
      contentType.items.forEach(item => {
        if(item.type === 'フィールドセット') newContentObject[item.name] = []
        else newContentObject[item.name] = ''
      })
      setContentObject(newContentObject)
      setCurrentContent({
        ...currentContent,
        typeId: contentType.id,
        object: newContentObject
      })
    }
  }

  const onChange : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = async (e) => {
    const name = e.currentTarget.name
    const nameArr = name.split('__') // this name should be 'parent__input__index'
    const parentName = nameArr[0]
    const inputName = nameArr[1]
    const index = parseInt(nameArr[2])
    if(e.currentTarget.type === 'file') {
      const files = (e.currentTarget as HTMLInputElement).files;
      if(files && files?.length > 0) {
        const file = files[0];
        const image = new Image();
        let result = {width:0, height: 0}
        image.onload = function() {
          result = {width: image.naturalWidth, height: image.naturalHeight};
        }
        image.src = URL.createObjectURL(file);
        const imageRef = await addFile('MtDx5o2bav9hxzQxyshx', file);
        const value: ImageObject = {
          path: imageRef.fullPath,
          url: `http://${process.env.NEXT_PUBLIC_STORAGE_DOMAIN}/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${imageRef.fullPath}?alt=media`,
          width: result.width,
          height: result.height
        }

        const key = Object.keys(contentObject).find(key => key === parentName)
        if(key && Array.isArray(contentObject[parentName])) {
          const newContentObject = (contentObject[parentName] as ContentObject[]).map((item, i) => (i === index) ? {...contentObject[parentName][i], [inputName]: value} : item)
          if(newContentObject.length === index) {
            newContentObject.push({
              [inputName]: value
            })
          }
  
          setContentObject({
            ...contentObject,
            [parentName]: newContentObject
          })
        } else {
          setContentObject({
            ...contentObject,
            [name]: value
          })
        }
      }
    } else {
      const value: string = e.currentTarget.value
      const key = Object.keys(contentObject).find(key => key === parentName)
      if(key && Array.isArray(contentObject[parentName])) {
        const newContentObject = (contentObject[parentName] as ContentObject[]).map((item, i) => (i === index) ? {...contentObject[parentName][i], [inputName]: value} : item)
        if(newContentObject.length === index) {
          newContentObject.push({
            [inputName]: value
          })
        }

        setContentObject({
          ...contentObject,
          [parentName]: newContentObject
        })
      } else {
        setContentObject({
          ...contentObject,
          [name]: value
        })
      }
    }
  }

  const saveContent: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const content: Content = {
      ...currentContent,
      object: contentObject
    }
    try {
      await addContent('MtDx5o2bav9hxzQxyshx', content);
      alert('保存しました')
      router.push('/admin/content')
    } catch(e) {
      console.log(e)
      alert('エラー')
    }
  }

  return (
    <Layout>
      <div>
        <Container>
          <div className="">
            <h1 className="mb-4">コンテンツを作成</h1>
            <div className="mb-6">
              <Input label="コンテンツコード" name="contentName" value={currentContent.name} onChange={e => setCurrentContent({...currentContent, name: e.currentTarget.value})} />
            </div>
            <div className="mb-6">
              <Input label="コンテンツ名" name="contentTitle" value={currentContent.title} onChange={e => setCurrentContent({...currentContent, title: e.currentTarget.value})} />
            </div>
            <ul className="mb-4 flex">
              {contentTypes && contentTypes.map(contentType => (
                <li key={contentType.id} className="p-4"><Button onClick={(e) => selectContentType(contentType)}>{contentType.title}</Button></li>
              ))}
            </ul>
          </div>
          {selectedContentType && (
            <div>
              <div className="mb-4 pb-4 border-b border-b-accent">
                <div>ID: {selectedContentType.id}</div>
                <div>コード名: {selectedContentType.name}</div>
                <div>コンテンツタイプ名: {selectedContentType.title}</div>
              </div>
              <div>
                {selectedContentType.items && selectedContentType.items.map(item => (
                  <div key={item.id} className="mb-6">
                    <div>ID: {item.id}</div>
                    <div>コード: {item.name}</div>
                    <div>コンテンツ名: {item.title}</div>
                    {item.type === '一行テキスト' && <Input name={item.name} onChange={onChange} />}
                    {item.type === '複数行テキスト' && <TextArea rows={8} name={item.name} onChange={onChange} />}
                    {item.type === '画像' && (<Input type="file" name={item.name} onChange={onChange} />)}
                    {item.type === 'フィールドセット' && item.items && <Fieldset fieldset={item} onChange={onChange} />}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-right">
            <Button color="accent" onClick={saveContent}>保存</Button>
          </div>
        </Container>
      </div>
    </Layout>   
  )
}

export const getStaticProps: GetStaticProps = async () =>  {
  const contentTypes = await getContentTypes(process.env.NEXT_PUBLIC_DOMAIN_ID as string);
  return {
    props: {
      contentTypes
    }
  }
}

export default AdminContentCreatePage;