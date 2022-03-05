import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { useSubDAOData } from '@/hooks'
import { SubDAOData } from "@/types/SubDAO"
import { Loading } from '@/components/common/Loading'
import { useRouter } from 'next/router'
import { getSubDAOBalance,listSubDAO } from '@/contracts/SubDAO'
import { useEffect,useState } from 'react'


const DAOportal = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  const [_daoBalnce, setDAOBalance] = useState("");
  useEffect(() => {
    const _getDAOInfo = async () => {
      if (targetSubDAO==null){
        const subDAOList = await listSubDAO()      
        const target = subDAOList?.find(subDAOList => subDAOList.daoAddress === subDAOaddress)
        setTargetSubDAO(target)
      }
      if (_daoBalnce==""){
      const balance = await getSubDAOBalance(subDAOaddress)
      console.log("## dao balance:",balance)
      setDAOBalance(balance)
      }
    }
    _getDAOInfo()
  }, [])

  const getRewardString=():String=> {
    if (typeof targetSubDAO !== "undefined" && targetSubDAO.rewardApproved==true){
      return "(#Reward Approved)"
    }
    else{
      return "(#Reward Not Approved)"
    }
    return ""
  }

  const topLinks = [
    { path: `/dao/${subDAOaddress}/members`, label: "Members" },
    { path: `/dao/${subDAOaddress}/proposals`, label: "Proposals" },
    { path: '/dao', label: "Tokens" },
  ]

  return (
    <>

      {
        typeof targetSubDAO !== "undefined" ? (
          <div>
            <p className=" text-3xl">{targetSubDAO.daoName}</p>
            <p className=" text-3xl">{getRewardString()}</p>            
            <p className="">
              <a href={targetSubDAO.githubURL}> 
                {targetSubDAO.githubURL}
              </a>
            </p>
            <p className="">{targetSubDAO.daoAddress}</p>
            <p className=" text-xl">DAO Balance: {_daoBalnce} ether</p>
          </div>
        ) : ""
      }    
      <div className="p-3"></div>
      {
        topLinks.map((link) => {
          return (
            <Link href={link.path} key={link.path}>
              <a className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
                   text-2xl py-2 px-4 m-5 rounded">
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
