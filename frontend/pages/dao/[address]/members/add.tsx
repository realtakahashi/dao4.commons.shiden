
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
    paths: ["/dao/[address]/members/add"],
    fallback: true
  }
}

const AddDaoMember = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  const [daoMemberList, setDAOMemberList] = useState<Array<SubDAOMemberData>>()
  const [targetDAOMember, setTargetDAOMember] = useState<SubDAOMemberData>()
  useEffect(() => {
    const subDAOaddress = props.address
    const setAddress = async () => {
      const daoList = await listSubDAO()
      const target = daoList?.find(dao => dao.daoAddress === subDAOaddress)
      if (typeof target !== "undefined") {
        setTargetSubDAO(target)
        const membersList = await getSubDAOMemberList(target.daoAddress)
        setDAOMemberList(membersList)
        daoMemberList?.map(member => member.member_id)
      }
    }
    setAddress()
  }, [])

  const handleClickDAOmember = (memberID: string) => {
    const target = daoMemberList?.find(member => member.member_id === memberID)
    setTargetDAOMember(target)
  }
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
          <div className="mx-5">
            <Link
              href={`/dao/${props.address}/members/add`}
            >
              <a
                className="m-2 py-2 px-4 border border-black-700 rounded"
              >
                Add Member
              </a>
            </Link>
          </div>
          <h2>Members</h2>
          <div className="flex justify-center">
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
              {typeof daoMemberList !== "undefined" ?
                daoMemberList.map((member) => {
                  return (
                    <li
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      key={member.name}
                      onClick={() => handleClickDAOmember(member.member_id)}
                    >
                      {member.name}
                    </li>
                  )
                }) : ""
              }
            </ul>
          </div>
        </div>
        <div className='mt-5'>
          {typeof targetDAOMember !== "undefined" ? (
            <div>
              <p>Name: {targetDAOMember.name}</p>
              <p>MemberID: {targetDAOMember.member_id}</p>
            </div>
          ) : ""}
        </div>
      </div>
    </>
  )
}

AddDaoMember.Layout = Layout
export default AddDaoMember