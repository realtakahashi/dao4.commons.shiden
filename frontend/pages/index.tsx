import { Layout, SubDAOModal } from '@/components/common'
import Link from "next/link"
import { useState, useEffect } from 'react';
import { SubDAOData } from "@/types/SubDAO"
import { getSubDAOBalance } from '@/contracts/SubDAO';
import { FC } from 'react';
import { listSubDAO } from '@/contracts/SubDAO';

const topLinks = [
  { type: "link", path: "/dao/create", label: "Create DAO" },
  { type: "link", path: "/dao/create/signup_mint_nft", label: "Signup DAO" },
  { type: "link", path: "/dao/tokensale", label: "Token Sale" },
];

const Home = () => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>();
  const [subDAOList, setSubDAOList] = useState<Array<SubDAOData>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subDAOBalance, setSubDAOBalance] = useState<number>();  
  useEffect(() => {
    const f = async () => {
      await listSubDAO()
        .then((res) => {
          res.result
          setSubDAOList(res.result)
        })
        .catch((e) => {        
          subDAOList
          console.log("failed to list subDAO list", e)
      })            
    }
    f()
  },[])

  
  const displayDAOData = (SubDAOAddress: string) => {
    const target = subDAOList?.find(
      (subDAO) => subDAO.daoAddress === SubDAOAddress
    );
    if (typeof target !== "undefined") {
      setTargetSubDAO(target)
      const setBalance = async () => {
        await getSubDAOBalance(target?.daoAddress)
          .then((response) => {
            if (typeof response !== "undefined") {
              setSubDAOBalance(response)
            }
          })
      }
      setBalance()
      setIsModalOpen(true)
    }
  }

  interface SubDAOListElementProps {
    dao: SubDAOData
  }
  const SubDAOListElement: FC<SubDAOListElementProps> = ({dao}) => {
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
              <a className="py-1 px-3 ml-7 inline-flex items-center button-dao-default text-sm">
                Members
              </a>
            </Link>
            <Link href={`/dao/${dao.daoAddress}/proposals`}>
              <a className="py-1 px-3 ml-7 inline-flex items-center button-dao-default text-sm">
                Proposals
              </a>
            </Link>
          </div>
          <div className="py-2 flex">
            <Link href={`/dao/${dao.daoAddress}/tokens`}>
              <a className="py-1 px-3 ml-7 inline-flex items-center button-dao-default text-sm">
                Tokens
              </a>
            </Link>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="block">
        {topLinks.map((link) => {
          return (
            <Link href={link.path} key={link.path}>
              <a className="button-dao-default p-4 m-2">{link.label}</a>
            </Link>
          );
        })}
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <h2 className="text-center">List of Sub DAOs to which you belong</h2>
        <div className="flex flex-wrap justify-center mx-1 lg:-mx-4">

          {subDAOList instanceof Error || typeof subDAOList !== "undefined" ?            
            subDAOList.map((dao) => {    
              return (
                <SubDAOListElement
                  key={dao.daoAddress}
                  dao={dao}
                />
              )
            })            
            : ""
          }

          {typeof targetSubDAO !== "undefined" &&
          typeof subDAOBalance !== "undefined" ? (
            <SubDAOModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              subDAO={targetSubDAO}
              subDAOBalance={subDAOBalance}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
Home.Layout = Layout;
export default Home;
