import type { InferGetStaticPropsType, NextPage } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"

const topLinks = [
  { path: '/dao/create/subdao', label: "Deploy SubDAO" },
  { path: '/dao/create/member_nft', label: "Deploy MemberNFT" },
  { path: '/dao/create/signup_mint_nft', label: "Mint MemberNFT" },
]

const CreateDAO = () => {
  return (
    <>
      {
        topLinks.map((link) => {
          return (
            <Link href={link.path} key={link.path}>
              <a className="button-dao-default p-4 m-10">
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