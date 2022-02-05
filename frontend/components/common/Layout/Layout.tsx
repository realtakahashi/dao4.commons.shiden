import Head from "next/head";
import { FC } from "react";
import { Footer, Header } from "@/components/common";
import styles from "./Layout.module.scss"

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>dao4.commons.shiden</title>
        <meta name="description" content="dao4.commons.shiden Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className={styles.root}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout
