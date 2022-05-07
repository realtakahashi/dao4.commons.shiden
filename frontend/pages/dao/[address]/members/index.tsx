
import { useEffect, useState } from 'react'
import { Layout, MemberModal } from '@/components/common'
import { SubDAOMemberData } from '@/types/SubDAO'
import Link from 'next/link'
import { useSubDAOData } from '@/hooks'
import { useRouter } from 'next/router'
import { getSubDAOMemberList } from '@/contracts/MemberManager'

const DaoMembers = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const targetSubDAO = useSubDAOData(subDAOaddress)
  const [daoMemberList, setDAOMemberList] = useState<Array<SubDAOMemberData>>()
  const [targetDAOMember, setTargetDAOMember] = useState<SubDAOMemberData>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    const listMember = async () => {
      console.log(subDAOaddress)
      const membersList = await getSubDAOMemberList(subDAOaddress)
      setDAOMemberList(membersList)
      // console.log(daoMemberList)
      if (typeof daoMemberList !== "undefined") {
        daoMemberList.map(member => {          
          return member.memberId
        })
      }
      
    }
    listMember()
  }, [])

  const handleClickDAOmember = (memberID: string) => {
    const target = daoMemberList?.find(member => member.memberId._hex === memberID)
    setIsModalOpen(true)
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


        <div className="m-5 text-center">
          <Link
            href={`/dao/${subDAOaddress}/members/add`}
          >
            <a
              className="button-dao-default px-4 py-2 m-2"
            >
              Add Member
            </a>
          </Link>
        </div>
        <h2>Members</h2>
        <div className="flex justify-center">
          {typeof daoMemberList !== "undefined" ?
            daoMemberList.map((member) => {
              return (
                <>
                  <div
                    key={member.memberId._hex}
                    className="bg-black w-64 py-5 my-2 border border-gray-700 hover:border-gray-500 max-w-sm rounded overflow-hidden shadow-lg"
                  >
                    <div className="px-6 py-2">
                      <div
                        className="text-xl mb-2 cursor-pointer"
                        onClick={() => handleClickDAOmember(member.memberId._hex)}
                      >{member.name}</div>                      
                    </div>
                    <Link                                            
                      href={`/dao/${subDAOaddress}/members/delete`}
                    >
                      <a
                        className='button-dao-default px-4 py-2 m-2'>
                        Delete Member
                      </a>                      
                    </Link>
                  </div>
                </>
              )
            }) : ""
          }
        </div>
      </div>
      {typeof targetDAOMember !== "undefined" ? (
        <MemberModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          member={targetDAOMember}
        />
      ) : ""}
    </>
  )
}

DaoMembers.Layout = Layout
export default DaoMembers
