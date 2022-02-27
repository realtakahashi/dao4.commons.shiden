import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { listSubDAO } from '@/contracts/SubDAO'
import { SubDAOData } from "@/types/SubDAO"
import { useEffect, useState } from 'react';
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
