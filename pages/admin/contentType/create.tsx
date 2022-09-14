import { addContentType, getContentTypes } from "lib/fetchAPI";
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

const AdminContentTypeCreatePage = () => {
  const router = useRouter();
  const [currentContentType, setCurrentContentType] = useState<ContentType>({
    id: generateId(),
    name: 'newContentType',
    title: '新しいコンテンツタイプ',
    items: []
  })
  const [currentContentTypeItems, setCurrentContentTypeItems] = useState<ContentTypeItem[]>([]);
  const [targetItem, setTargetItem] = useState<ContentTypeItem>()

  const onClick = (e: Event, contentTypeItem:ContentTypeItem) => {
    const id = generateId();
    const newItem = {
      ...contentTypeItem,
      id: id,
    }
    setCurrentContentTypeItems([
      ...currentContentTypeItems,
      newItem
    ])
    setTargetItem(newItem)
  }

  const onClickSetTarget = (contentTypeItem: ContentTypeItem) => {
    setTargetItem(contentTypeItem)
  }

  const onChange : ChangeEventHandler<HTMLInputElement> = (e) => {
    if(targetItem) {
      const {name, value} = e.currentTarget
      const newTargetItem = {
        ...targetItem,
        [name]: value,
      }
      const index = currentContentTypeItems.findIndex(item => item.id === newTargetItem.id);
      setCurrentContentTypeItems(
        currentContentTypeItems.map((item, i) => (i === index ? newTargetItem : item))
      )
      setTargetItem(newTargetItem)
    }
  }

  const saveContentType: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const contentType: ContentType = {
      ...currentContentType,
      items: currentContentTypeItems
    }
    try {
      await addContentType('MtDx5o2bav9hxzQxyshx', contentType);
      alert('保存しました')
      router.push('/admin/contentType')
    } catch(e) {
      alert('エラー')
    }
  }

  return (
    <Layout>
      <div style={{width: 'calc(100% - 20rem)'}}>
        <Container>
          <h1 className="mb-4">コンテンツタイプ作成</h1>
          <div className="mb-6">
            <Input label="コンテンツタイプコード" name="contentTypeName" value={currentContentType.name} onChange={e => setCurrentContentType({...currentContentType, name: e.currentTarget.value})} />
          </div>
          <div className="mb-6">
            <Input label="コンテンツタイプ名" name="contentTypeTitle" value={currentContentType.title} onChange={e => setCurrentContentType({...currentContentType, title: e.currentTarget.value})} />
          </div>
          <ul className="flex flex-wrap">
            {contentTypeItems.map(item => (
              <div className="p-4" key={item.id}>
                <Button onClick={(e) => onClick(e, item)}>{item.title}</Button>
              </div>
            ))}
          </ul>
          <ul>
          {currentContentTypeItems && currentContentTypeItems.map(item => (
            <li key={item.id}><Button color="none" onClick={(e) => onClickSetTarget(item)}>{item.title}</Button></li>
          ))}
          </ul>
          <div className="text-right">
            <Button color="accent" onClick={saveContentType}>保存</Button>
          </div>
        </Container>
      </div>
      {targetItem && (
        <div className="fixed p-4 top-28 right-0 w-80 h-3/4 bg-main">
          <div className="mb-6">
            <Input label="コード" name="name" value={targetItem.name} onChange={onChange} />
          </div>
          <div className="mb-6">
            <Input label="タイトル" name="title" value={targetItem.title} onChange={onChange} />
          </div>
          <div className="mb-6">
            <Input label="種類" name="type" value={targetItem.type} disabled onChange={onChange} />
          </div>
        </div>
      )}
    </Layout>   
  )
}

export default AdminContentTypeCreatePage;