import { getContent, getContents, getContentTypes, getFileURL } from "lib/fetchAPI";
import { GetStaticProps } from "next";
import Layout from "src/components/views/Layout"
import ContentType from "src/types/ContentType";
import Container from "src/components/parts/Container";
import Button from "src/components/parts/Button";
import Box from "src/components/parts/Box";
import { Content, ImageObject } from "src/types/Content";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkFileType } from "lib/functions/checkFileType";
import Image from "next/image";

const AdminContentsDetailPage = () => {
  const router = useRouter();
  const {id} = router.query
  const [content, setContent] = useState<Content>()
  console.log(content)

  useEffect(() => {
    if(id) {
      getContent(process.env.NEXT_PUBLIC_DOMAIN_ID as string, id as string).then((content) => {
        setContent(content);
      })
    }
  }, [id]);

  return (
    <Layout>
      <Container>
        <h1 className="mb-6">コンテンツ</h1>
        <div>
          <div>{content?.title}</div>
          {content && Object.keys(content?.object).map(key => (
            <div key={key} className="mb-6">
              <div>{key}</div>
              {typeof content.object[key] === 'string' && (<div>{content.object[key] as string}</div>)}
              {typeof content.object[key] !== 'string' && (
                <Image 
                  src={(content.object[key] as ImageObject).url}
                  width={(content.object[key] as ImageObject).width}
                  height={(content.object[key] as ImageObject).height}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Layout>   
  )
}

export default AdminContentsDetailPage;