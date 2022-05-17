import Head from "next/head";
import { FC } from "react";
import { Footer, Header } from "@/components/common";
import styles from "./Layout.module.scss"
import { Sidebar } from "../Sidebar";

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>dao4.commons.shiden</title>
        <meta name="description" content="dao4.commons.shiden Project" />
        <link rel="icon" href="/favicon.ico" />
        <link href="http://fonts.googleapis.com/earlyaccess/notosansjp.css"></link>
      </Head>
      <Header />
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <Sidebar></Sidebar>
        </div>        
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout
