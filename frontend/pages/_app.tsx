import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function DaoMaker({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default DaoMaker
