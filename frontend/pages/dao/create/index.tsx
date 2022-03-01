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
  { path: '/dao/create/subdao', label: "Deploy SubDAO" },
  { path: '/dao/create/member_nft', label: "Deploy MemberNFT" },
  { path: '/dao/create/signup_mint_nft', label: "Mint MemberNFT" },
]

const CreateDAO = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
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

CreateDAO.Layout = Layout
export default CreateDAO
