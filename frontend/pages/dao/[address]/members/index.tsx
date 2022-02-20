import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { listSubDAO, getSubDAOMemberList } from '@/contracts/SubDAO'
import { SubDAOData } from "@/types/SubDAO"
import { useEffect, useState } from 'react';
import { Layout } from '@/components/common'
import { SubDAOMemberData } from '../../../../types/SubDAO';
import Link from 'next/link';


export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      address: params?.address
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/dao/[address]/members"],
    fallback: true
  }
}

const DaoMembers = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  const [daoMemberList, setDAOMemberList] = useState<Array<SubDAOMemberData>>()
  useEffect(() => {
    const subDAOaddress = props.address
    const setAddress = async () => {
      const daoMemberList = await listSubDAO()
      const target = daoMemberList?.find(daoMemberList => daoMemberList.daoAddress === subDAOaddress)
      if (typeof target !== "undefined") {
        setTargetSubDAO(target)
        const membersList = await getSubDAOMemberList(target.daoAddress)
        setDAOMemberList(membersList)
      }
    }
    setAddress()


  }, [])
  return (
    <>
      <div>
        <div className="flex justify-center">
          {
            typeof targetSubDAO !== "undefined" ?
              (<h2>
                DAO: {targetSubDAO.daoName}
              </h2>) : ''
          }
        </div>

        <div className='mt-5'>
          <div className="flex justify-center">
            <h2>Members</h2>
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
              {typeof daoMemberList !== "undefined" ?
                daoMemberList.map((member) => {
                  return (
                    <li
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      key={member.member_id}                      
                    >
                      {member.name}
                    </li>
                  )
                }) : ""
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

DaoMembers.Layout = Layout
export default DaoMembers