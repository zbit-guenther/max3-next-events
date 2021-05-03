import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>NextEvents</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
