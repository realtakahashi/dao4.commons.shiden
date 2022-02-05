import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from "@/components/common/Footer"
import styles from '../styles/Home.module.scss'
import Layout from '@/components/common/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold underline">
        Hello, World
      </h1>
    </Layout>
  )
}

export default Home
