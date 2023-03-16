import { DfCFooter } from "@/components/DfCFooter";
import { DfCHeader } from "@/components/DfCHeader";
import IssueErc20 from "@/components/IssueErc20";
import IssueErc721 from "@/components/IssueErc721";
import IssueGovernance from "@/components/IssueGovernanceToken";
import TokenList from "@/components/TokenList";
import { getDaoName } from "@/dao4.frontend.common/contracts/subdao_api";
import { Group } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tokens = () => {
  const router = useRouter();
  const subDAOaddress = String(router.query.address);
  const [daoName,setDaoName] = useState("");
  const [showTokenList, setShowTokenList] = useState(true);
  const [showIssueErc20, setShowIssueErc20] = useState(false);
  const [showIssueErc721, setShowIssueErc721] = useState(false);
  const [showIssueGovernance, setShowIssueGovernance] = useState(false);

  const _setShow = (
    _showTokeList: boolean,
    _showIssueErc20: boolean,
    _showIssueErc721: boolean,
    _showIssueGovernance: boolean,
  ) => {
      setShowTokenList(_showTokeList);
      setShowIssueErc20(_showIssueErc20);
      setShowIssueErc721(_showIssueErc721);
      setShowIssueGovernance(_showIssueGovernance);
  };

  useEffect(()=>{
    _getDaoName();
  },[])

  const _getDaoName = async () => {
    setDaoName(await getDaoName(subDAOaddress));
  }

  return (
    <>
    
      <div className="bg-black flex flex-col min-h-screen">
      <DfCHeader/>
        <Group position="apart" >
        <button className="m-5 px-6 px-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500 text-30px" style={{"fontFamily":"Gill sans"}}>
          <Link href={`/dao/${subDAOaddress}/top`}>Back to Dao Top</Link>
        </button>
        </Group>
        <div className="text-center text-100px font-extrabold leading-none tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-100" style={{"fontFamily":"Gill sans"}}>
            {daoName}
          </span>
        </div>
        <div className="p-1 text-center text-25px">
          <p className="text-white text-100px">Tokens</p>
          {showTokenList==false && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={() => _setShow(!showTokenList,false,false,false)}
          >
            Token List
          </button>
          )}
          {showTokenList==true && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={() => _setShow(!showTokenList,false,false,false)}
          >
            Token List
          </button>
          )}
          {showIssueErc20==false && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={() => _setShow(false,!showIssueErc20,false,false)}
          >
            Issue Erc20
          </button>
          )}
          {showIssueErc20==true && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={() => _setShow(false,!showIssueErc20,false,false)}
          >
            Issue Erc20
          </button>
          )}
          {showIssueErc721==false && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={() => _setShow(false, false, !showIssueErc721,false)}
          >
            Issue Erc721
          </button>
          )}
          {showIssueErc721==true && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={() => _setShow(false, false, !showIssueErc721,false)}
          >
            Issue Erc721
          </button>
          )}
          {showIssueGovernance==false && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500"
            onClick={() => _setShow(false, false, false,!showIssueGovernance)}
          >
            Issue Governance Token
          </button>
          )}
          {showIssueGovernance==true && (
            <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-white rounded text-black  hover:border-orange-500"
            onClick={() => _setShow(false, false, false,!showIssueGovernance)}
          >
            Issue Governance Token
          </button>
          )}
        </div>
        <table className="w-[100%]">
        {showTokenList == true && (
        <TokenList daoAddress={subDAOaddress} showList={true} setShowList={()=>setShowTokenList} forMember={true}></TokenList>
      )}
      {showIssueErc20 == true && (
        <IssueErc20 daoAddress={subDAOaddress}></IssueErc20>
      )}
      {showIssueErc721 == true && (
        <IssueErc721 daoAddress={subDAOaddress}></IssueErc721>
      )}
      {showIssueGovernance == true && (
        <IssueGovernance daoAddress={subDAOaddress}></IssueGovernance>
      )}
        </table>
      
      </div>
      <DfCFooter />
    </>
  );
};

export default Tokens;
