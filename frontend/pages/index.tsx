import type { InferGetStaticPropsType } from 'next'
import { Layout, SubDAOModal } from '@/components/common'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const subDAOList = useSubDAOList()
  const displayDAOData = (SubDAOAddress: string) => {
    const target = subDAOList?.find(subDAO => subDAO.daoAddress === SubDAOAddress)
    setTargetSubDAO(target)
    setIsModalOpen(true)
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
                  className="button-dao-default p-4 m-2"
                >
                  {link.label}
                </a>
              </Link>
            )
          })
        }
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <h2 className="text-center">List of Sub DAOs to which you belong</h2>
        <div className="flex flex-wrap justify-center mx-1 lg:-mx-4">

          {typeof subDAOList !== "undefined" ?
            subDAOList.map((dao) => {
              return (
                <>
                  <div
                    key={dao.daoAddress}
                    className="bg-black w-64 my-2 border border-gray-700 hover:border-gray-500 max-w-sm rounded overflow-hidden shadow-lg"                    
                  >
                    <div className="px-6 py-2">
                      <div
                        className="text-xl mb-2 cursor-pointer"
                        onClick={() => displayDAOData(dao.daoAddress)}
                      >{dao.daoName}</div>
                    </div>
                    <hr className='p-1 border-gray-700' />
                    <div className="py-2 flex">
                      <Link href={`/dao/${dao.daoAddress}/members`}>
                        <a
                          className="py-1 px-3 ml-7 inline-flex items-center button-dao-default text-sm"
                        >
                          Members
                        </a>
                      </Link>
                      <Link href={`/dao/${dao.daoAddress}/proposals`}>
                        <a
                          className="py-1 px-3 ml-7 inline-flex items-center button-dao-default text-sm"
                        >
                          Proposals
                        </a>
                      </Link>
                    </div>
                  </div>
                </>
              )
            }) : ""
          }

          {typeof targetSubDAO !== "undefined" ? (
            <SubDAOModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              subDAO={targetSubDAO}
            />
          ) : ""}
        </div>
      </div>
    </>

  )
}
Home.Layout = Layout
export default Home
