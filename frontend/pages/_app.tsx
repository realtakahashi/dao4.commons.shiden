import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { FC } from 'react'

const Noop: FC = ({children}) => <>{children}</>

function DaoMaker({Component, pageProps}: AppProps & {Component: {Layout: FC}}) {
  const Layout = Component.Layout ?? Noop
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}


export default DaoMaker
