import { getContentTypes } from "lib/fetchAPI";
import { GetStaticProps } from "next";
import Layout from "src/components/views/Layout"
import ContentType from "src/types/ContentType";
import Container from "src/components/parts/Container";
import Button from "src/components/parts/Button";
import Box from "src/components/parts/Box";
import Link from "next/link";

interface Props {
  contentTypes: ContentType[];
}

const AdminContentTypesIndexPage = ({contentTypes}: Props) => {
  return (
    <Layout>
      <Container>
        <h1>コンテンツタイプ一覧</h1>
        <ul>
        {contentTypes && contentTypes.map(contentType => (
          <li key={contentType.id} className="mb-6 ">
            <Box>
              ID: {contentType.id} <br />
              コード: {contentType.name} <br />
              名前: {contentType.title} <br />
            </Box>
          </li>
        ))}
        </ul>
      </Container>
      <Container>
        <div className="md:flex">
          <Button href="/admin/contentType/create">コンテンツタイプを作成</Button>
        </div>
      </Container>
    </Layout>   
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contentTypes = await getContentTypes(process.env.NEXT_PUBLIC_DOMAIN_ID as string);
  console.log(contentTypes)
  return {
    props: {
      contentTypes
    }
  }
}

export default AdminContentTypesIndexPage;