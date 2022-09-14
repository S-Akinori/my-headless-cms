import { getContentTypes } from "lib/fetchAPI";
import { GetStaticProps } from "next";
import Layout from "src/components/views/Layout"
import { DocumentData } from "firebase/firestore"; 
import ContentType from "src/types/ContentType";
import Container from "src/components/parts/Container";
import Button from "src/components/parts/Button";

interface Props {
  contentTypes: ContentType[];
}

const AdminIndexPage = ({contentTypes}: Props) => {
  console.log(contentTypes)
  return (
    <Layout>
      <Container>
        <h1>こちらは管理者ページです</h1>
        <ul>
        {contentTypes && contentTypes.map(contentType => (
          <li key={contentType.id}>{contentType.id}: {contentType.name}</li>
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

export default AdminIndexPage;