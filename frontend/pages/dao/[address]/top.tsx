import Link from "next/link";
import { useEffect, useState } from "react";
import DaoBalance from "dao4.frontend.common/components/DaoBalance";
import { useRouter } from "next/router";
import { getDaoName } from "dao4.frontend.common/contracts/subdao_api";
import Member from "@/dao4.frontend.common/components/Member";
import Proposal from "@/dao4.frontend.common/components/Proposal";
import Donate from "@/dao4.frontend.common/components/Donate";
import { TargetDaoKind } from "@/dao4.frontend.common/types/MasterDaoType";
import Divide from "@/dao4.frontend.common/components/Divide";
import MemberNFTAddress from "@/components/MemberNFTAddress";
import { DfCHeader } from "@/components/DfCHeader";
import { DfCFooter } from "@/components/DfCFooter";
import { BackTopButton } from "@/components/BackTopButton";

const DaoTop = () => {
  const router = useRouter();
  const subDAOaddress = String(router.query.address)
  const [daoName,setDaoName] = useState("");
  const [showMember,setShowMember] = useState(false);
  const [showProposal,setShowProposal] = useState(false);
  const [showDonate,setShowDonate] = useState(false);
  const [showDivide,setShowDivide] = useState(false);

  useEffect(()=>{
    _getDaoName();
  },[])

  const _getDaoName = async () => {
    setDaoName(await getDaoName(subDAOaddress));
  }

  const _setShow = (showMember:boolean,showProposal:boolean,showDonate:boolean,showDivide:boolean) =>{
    setShowMember(showMember);
    setShowProposal(showProposal);
    setShowDonate(showDonate);
    setShowDivide(showDivide);
  }

  return (
    <>
    <DfCHeader/>
      <div className="bg-black flex flex-col min-h-[87vh]">
        <BackTopButton/>
        <div className="text-center text-100px font-extrabold leading-none tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-100" style={{"fontFamily":"Gill sans"}}>
            {daoName}
          </span>
        </div>
        <div className="p-4 text-center">
          <DaoBalance daoAddress={subDAOaddress} isMasterDao={false}></DaoBalance>
        </div>
        <div className="p-4 text-center">
          <p className="text-white text-20px">This DAO's Address: {subDAOaddress}</p>
        </div>
        <div className="p-4 text-center">
          <MemberNFTAddress daoAddress={subDAOaddress}></MemberNFTAddress>
        </div>
        <div className="p-1 text-center text-25px">
          {showMember==false && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={()=>_setShow(!showMember,false,false,false)}
          >
            Members
          </button>
          )}
          {showMember==true && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={()=>_setShow(!showMember,false,false,false)}
          >
            Members
          </button>
          )}
          {showProposal==false && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={()=>_setShow(false,!showProposal,false,false)}
          >
            Proposals
          </button>
          )}
          {showProposal==true && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={()=>_setShow(false,!showProposal,false,false)}
          >
            Proposals
          </button>
          )}
          {showDonate==false && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={()=>_setShow(false,false,!showDonate,false)}
          >
            Donate
          </button>
          )}
          {showDonate==true && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={()=>_setShow(false,false,!showDonate,false)}
          >
            Donate
          </button>
          )}
          {showDivide==false && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={()=>_setShow(false,false,false,!showDivide)}
          >
            Divide
          </button>
          )}
          {showDivide==true && (
            <button 
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={()=>_setShow(false,false,false,!showDivide)}
          >
            Divide
          </button>
          )}
          
          <Link href={`/dao/${subDAOaddress}/tokens`}>
          <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
          >
            Tokens
          </button>
          </Link>
        </div>
        {showMember == true &&(
          <Member daoAddress={subDAOaddress}></Member>
        )}
        {showProposal == true &&(
          <Proposal daoAddress={subDAOaddress}></Proposal>
        )}
        {showDonate == true && (
          <Donate daoAddress={subDAOaddress} daoName={daoName} targetDaoKind={TargetDaoKind.TARGET_DAO_FROM_INDIVIDIALS}></Donate>
        )}
        {showDivide == true && (
          <Divide  daoAddress={subDAOaddress} daoName={daoName} targetDaoKind={TargetDaoKind.NONE}></Divide>
        )}
      </div>
    <DfCFooter/>
    </>
  );
};

export default DaoTop;

