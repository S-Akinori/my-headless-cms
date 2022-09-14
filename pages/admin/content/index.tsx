import { getContent, getContents, getContentTypes } from "lib/fetchAPI";
import { GetStaticProps } from "next";
import Layout from "src/components/views/Layout"
import ContentType from "src/types/ContentType";
import Container from "src/components/parts/Container";
import Button from "src/components/parts/Button";
import Box from "src/components/parts/Box";
import { Content } from "src/types/Content";
import { useEffect } from "react";

interface Props {
  contents: Content[];
}

const AdminContentsIndexPage = ({contents}: Props) => {
  return (
    <Layout>
      <Container>
        <h1>コンテンツ一覧</h1>
        <ul>
        {contents && contents.map(content => (
          <li key={content.id} className="mb-6 ">
            <Box>
              ID: {content.id} <br />
              コード: {content.name} <br />
              名前: {content.title} <br />
            </Box>
          </li>
        ))}
        </ul>
      </Container>
      <Container>
        <div className="md:flex">
          <Button href="/admin/content/create">コンテンツを作成</Button>
        </div>
      </Container>
    </Layout>   
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contents = await getContents(process.env.NEXT_PUBLIC_DOMAIN_ID as string);
  return {
    props: {
      contents
    }
  }
}

export default AdminContentsIndexPage;