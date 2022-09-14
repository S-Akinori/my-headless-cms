import Head from "next/head"
import Footer from "src/components/templates/Footer"
import Header from "src/components/templates/Header"

interface Props {
  children: React.ReactNode
  pageTitle?: string,
  pageDescription?: string
  pagePath?: string
  pageImg?: string
  h1?: string
}
const Layout = ({
  pageTitle = process.env.NEXT_PUBLIC_SITE_NAME, 
  pageDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  pagePath = process.env.NEXT_PUBLIC_HOME_URL, 
  pageImg = process.env.NEXT_PUBLIC_HOME_URL + '/images/concept.jpg', 
  h1 = process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  children
}: Props) => {
return (
  <div style={{overflowX: 'hidden'}}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{pageTitle}</title>
      {process.env.NEXT_PUBLIC_ENV !== 'production' && <meta name="robots" content="noindex, nofollow" />}
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pagePath} />
      <meta property="og:image" content={pageImg} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:locale" content="ja_JP"  />
    </Head>
    <Header />
    <main className="py-12">
      {h1 && <h1 style={{display: 'none'}}>{h1}</h1>}
      <div>
        {children}
      </div>
    </main>
    <Footer />
  </div>
)
}


export default Layout