import type { InferGetStaticPropsType } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { useState } from 'react';
import { SubDAOData } from "@/types/SubDAO"
import { useSubDAOList } from '@/hooks';

export const getStaticProps = async () => {
  return { props: {} }
}

// mock
const topLinks = [
  { type: "link", path: '/dao/create', label: "Create DAO" },
  { type: "link", path: '/dao/create/signup_mint_nft', label: "Signup DAO" },
]

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  const subDAOList = useSubDAOList()
  const displayDAOData = (SubDAOAddress: string) => {
    const target = subDAOList?.find(subDAO => subDAO.daoAddress === SubDAOAddress)
    setTargetSubDAO(target)
  }
  return (
    <>
      <div className='block'>
        {
          topLinks.map((link) => {
            return (
              <Link
                href={link.path}
                key={link.path}>
                <a
                  className="button-dao-default text-xl p-4 m-4"
                >
                  {link.label}
                </a>
              </Link>
            )
          })
        }
      </div>
      <div className='mt-5 p-5'>
        <h2 className="">List of Sub DAOs to which you belong</h2>
        <div className="flex justify-center p-3">
          <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            {typeof subDAOList !== "undefined" ?
              subDAOList.map((dao) => {
                return (
                  <li
                    className="cursor-pointer px-6 py-2 border-b border-gray-200  w-full rounded-t-lg"
                    key={dao.daoAddress}
                    onMouseEnter={() => displayDAOData(dao.daoAddress)}
                  >
                    <Link href={`/dao/${dao.daoAddress}`}>
                      <a className='block text-xl'>
                        {dao.daoName}
                      </a>
                    </Link>
                  </li>
                )
              }) : ""
            }
          </ul>
        </div>
      </div>


      <div className='mt-5'>
        {typeof targetSubDAO !== "undefined" ? (
          <div>
            <p>Name: {targetSubDAO.daoName}</p>
            <p>Github URL: {targetSubDAO.githubURL}</p>
          </div>
        ) : ""}
      </div>
    </>

  )
}
Home.Layout = Layout
export default Home
