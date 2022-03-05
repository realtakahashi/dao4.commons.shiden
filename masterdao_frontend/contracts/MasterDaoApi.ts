import MasterDAOContractConstruct from "./construct/MasterDAO";
import { MemberInfo, SubDAOData,MemberFormData } from "../types/MasterDaoType";
import Web3 from "web3";
import { ethers } from "ethers";

export const listSubDAO = async (): Promise<Array<SubDAOData>> => {
  console.log("## MasterDaoApi listSubDAO call 1");
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  console.log("## masterDaoAddress:",masterDAOAddress);
  const contractConstract = MasterDAOContractConstruct;
  let response: SubDAOData[] = [];
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .getDaoList()
      .then((r: any) => {
        // console.log(r)
        response = r;
      })
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
  return response;
};

export const getMemberList = async (): Promise<Array<MemberInfo>> => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  let response: MemberInfo[] = [];
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .getMemberList()
      .then((r: any) => {
        // console.log(r)
        response = r;
      })
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
  return response;
};

export const addMember = async (_memberFormData:MemberFormData) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  console.log("## add Member")
  console.log("## add Member masterDAOAddress:",masterDAOAddress)
  console.log("## add Member form data:",_memberFormData)
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .addMember(_memberFormData.name,_memberFormData.memberAddress,_memberFormData.proposalId)
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
};

export const deleteMember = async (_memberInfoData:MemberInfo,_proposalId:number) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  console.log("## memberinfo:",_memberInfoData);
  console.log("## proposalId:",_proposalId)
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .deleteMember("0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",_proposalId)
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
};
