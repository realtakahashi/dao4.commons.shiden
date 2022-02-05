import type { InferGetStaticPropsType, NextPage } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"

export const getStaticProps = async () => {
  return { props: {} }
}
const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Link href="/dao/create">
        <a className="m-10 py-2 px-4 border border-black-700 rounded">
          Create DAO
        </a>
      </Link>
      <Link href="/login_dao">
        <a className="m-10 py-2 px-4 border border-black-700 rounded">
          Login DAO
        </a>
      </Link>
      <Link href="/marketplace">
        <a className="m-10 py-2 px-4 border border-black-700 rounded">
          MarketPlace
        </a>
      </Link>
    </Layout>
  )
}

Home.Layout = Layout
export default Home
