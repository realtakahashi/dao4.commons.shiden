import Link from "next/link";
import { useEffect, useState } from "react";
import DaoBalance from "dao4.frontend.common/components/DaoBalance";
import { useRouter } from "next/router";
import { getDaoName } from "dao4.frontend.common/contracts/subdao_api";
import Member from "@/dao4.frontend.common/components/Member";

const DaoTop = () => {
  const router = useRouter();
  const subDAOaddress = String(router.query.address)
  const [daoName,setDaoName] = useState("");
  const [showMember,setShowMember] = useState(false);
  const [showProposal,setShowProposal] = useState(false);
  const [showDonate,setShowDonate] = useState(false);
  const [showTokens,setShowTokens] = useState(false);

  useEffect(()=>{
    _getDaoName();
  },[])

  const _getDaoName = async () => {
    setDaoName(await getDaoName(subDAOaddress));
  }

  const _setShow = (showMember:boolean,showProposal:boolean,showDonate:boolean,showTokens:boolean) =>{
    setShowMember(showMember);
    setShowProposal(showProposal);
    setShowDonate(showDonate);
    setShowTokens(showTokens);
  }

  return (
    <>
      <div className="bg-black flex flex-col min-h-screen">
        <div className="m-5 text-25px text-left text-white underline leading-none tracking-tight">
          <Link href="/">Back to Top</Link>
        </div>
        <div className="text-center text-100px font-extrabold leading-none tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-orange-300">
            {daoName}
          </span>
        </div>
        <div className="p-4 text-center">
          <DaoBalance daoAddress={subDAOaddress} isMasterDao={false}></DaoBalance>
        </div>
        <div className="p-1 text-center text-25px">
          <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={()=>_setShow(!showMember,false,false,false)}
          >
            Members
          </button>
          <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={()=>_setShow(false,!showProposal,false,false)}
          >
            Proposals
          </button>
          <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={()=>_setShow(false,false,!showDonate,false)}
          >
            Donate
          </button>
          <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={() => _setShow(false,false,false,!setShowTokens)}
          >
            Tokens
          </button>
        </div>
        {showMember == true &&(
          <Member daoAddress={subDAOaddress}></Member>
        )}

      </div>
    </>
  );
};

export default DaoTop;

