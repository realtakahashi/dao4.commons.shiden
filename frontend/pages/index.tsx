import type { NextPage } from 'next'
import Layout from '@/components/common/Layout'
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <Layout>
      <Link href="/create_dao">
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

export default Home
