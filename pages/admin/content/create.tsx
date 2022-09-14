import { addContent, addContentType, getContentTypes } from "lib/fetchAPI";
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
import { Content } from "src/types/Content";
import TextArea from "src/components/parts/TextArea";

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
  const [contentObject, setContentObject] = useState<{[key: string]: string }>({});

  const selectContentType = (contentType: ContentType) => {
    setSelectedContentType(contentType);
    setCurrentContent({
      ...currentContent,
      typeId: contentType.id
    })
  }

  const onChange : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    setContentObject({
      ...contentObject,
     [name]: value
    })
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
          <div className="border-b border-b-accent">
            <h1 className="mb-4">コンテンツを作成</h1>
            <div className="mb-6">
              <Input label="コンテンツコード" name="contentName" value={currentContent.name} onChange={e => setCurrentContent({...currentContent, name: e.currentTarget.value})} />
            </div>
            <div className="mb-6">
              <Input label="コンテンツ名" name="contentTitle" value={currentContent.title} onChange={e => setCurrentContent({...currentContent, title: e.currentTarget.value})} />
            </div>
            <ul className="mb-4">
              {contentTypes && contentTypes.map(contentType => (
                <li key={contentType.id}><Button onClick={(e) => selectContentType(contentType)}>{contentType.title}</Button></li>
              ))}
            </ul>
          </div>
          {selectedContentType && (
            <div>
              <div className="mb-4">
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
                    <div>項目タイプ: {item.type}</div>
                    {item.type === '一行テキスト' && <Input name={item.name} onChange={onChange} />}
                    {item.type === '複数行テキスト' && <TextArea rows={8} name={item.name} onChange={onChange} />}
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