import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { WalletProvider } from '@/contracts/context'


const Noop: FC = ({ children }) => <>{children}</>
// https://zenn.dev/sora_kumo/articles/e86bbf0291d4a7
DaoMaker.getInitialProps = async () => ({ pageProps: {} })

function DaoMaker({ Component, pageProps }: AppProps & { Component: { Layout: FC } }) {
  const Layout = Component.Layout ?? Noop
  return (
    <WalletProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletProvider>
  )
}


export default DaoMaker
