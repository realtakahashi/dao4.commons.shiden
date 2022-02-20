import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { listSubDAO } from '@/contracts/SubDAO'
import { SubDAOData } from "@/types/SubDAO"
import { useEffect, useState } from 'react';


export const getStaticProps = async ({ params }: GetStaticPropsContext) => {

  return {
    props: {
      address: params?.address
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/dao/test"],
    fallback: true
  }
}

const DAOportal = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  useEffect(() => {
    const subDAOaddress = props.address
    const setAddress = async () => {
      const subDAOList = await listSubDAO()      
      const target = subDAOList?.find(subDAOList => subDAOList.daoAddress === subDAOaddress)
      if (typeof target !== "undefined") {
        setTargetSubDAO(target)        
      }
    }
    setAddress()
  }, [])
  // mock
  const topLinks = [
    { path: `/dao/${props.address}/members`, label: "Members" },
    { path: `/dao/${props.address}/proposals`, label: "Proposals" },
    { path: '/dao', label: "Tokens" },
  ]
  return (
    <>
      {
        typeof targetSubDAO !== "undefined" ?
        (<h2>
          DAO: {targetSubDAO.daoName}
        </h2>) : ''
      }
      
      {
        topLinks.map((link) => {
          return (
            <Link href={link.path} key={link.path}>
              <a className="m-10 py-2 px-4 border border-black-700 rounded">
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
