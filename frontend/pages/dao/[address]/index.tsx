import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { useSubDAOData } from '@/hooks'
import { Loading } from '@/components/common/Loading'


export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (typeof params !== "undefined"
    && typeof params.address === "string") {
    return {
      props: {
        address: params.address
      }
    }
  }
  return {
    props: {
      address: ""
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/dao/[address]"],
    fallback: true
  }
}

const DAOportal = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  let targetSubDAO
  if (typeof props.address === "undefined") {
    return (
      <Loading />
    )
  }
  targetSubDAO = useSubDAOData(props.address)
  // mock
  const topLinks = [
    { path: `/dao/${props.address}/members`, label: "Members" },
    { path: `/dao/${props.address}/proposals`, label: "Proposals" },
    { path: '/dao', label: "Tokens" },
  ]
  return (
    <>
      {
        typeof targetSubDAO !== "undefined" ? (<h2 className="font-bold text-3xl">DAO Name: {targetSubDAO.daoName}</h2>):""
      }
      {
        typeof targetSubDAO !== "undefined" ? (<h2 className="font-bold text-3xl">Github URL: {targetSubDAO.githubURL}</h2>):""
      }
      {
        typeof targetSubDAO !== "undefined" ? (<h2 className="font-bold">DAO Address: {targetSubDAO.daoAddress}</h2>):""
      }

      <div className="p-3"></div>
      {
        topLinks.map((link) => {
          return (
            <Link href={link.path} key={link.path}>
              <a className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
                  font-bold text-2xl py-2 px-4 m-5 rounded">
                {link.label}
              </a>
            </Link>
          )
        })
      }
    </>
  )
}

DAOportal.Layout = Layout
export default DAOportal
