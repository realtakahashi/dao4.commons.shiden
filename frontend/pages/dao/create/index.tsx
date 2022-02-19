import type { InferGetStaticPropsType, NextPage } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { ReactElement } from 'react';
import { FC } from 'react';

export const getStaticProps = async () => {
  return { props: {} }
}

// mock
const topLinks = [
  { path: '/dao/create/deploy_subdao', label: "Deploy SubDAO" },
  { path: '/dao/members/deploy_nft', label: "Deploy MemberNFT" },
  { path: '/dao/members/mint_nft', label: "Mint MemberNFT" },
]

const CreateDAO = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
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

CreateDAO.Layout = Layout
export default CreateDAO
