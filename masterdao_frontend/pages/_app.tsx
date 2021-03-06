import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
// import Layout from '../components/Layout'

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//   <Layout>
//   <Component {...pageProps} />
//   </Layout>
//   )
// }

// export default MyApp
