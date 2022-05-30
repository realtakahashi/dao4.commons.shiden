import MasterDAOContractConstruct from "./construct/MasterDAO";
import { SubDAOData, SubDAODeployFormData } from "../types/SubDaoType";
import Web3 from "web3";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { errorFunction } from "./commonFunctions";
import MemberManagerConstruct from "../contracts/construct/MemberManager";
import SubDAOContractConstruct from "../contracts/construct/SubDAOContractConstruct";

export const listSubDAO = async (
  masterDAOAddress: string
): Promise<Array<SubDAOData>> => {
  const contractConstract = MasterDAOContractConstruct;
  let response: SubDAOData[] = [];
  const provider = await detectEthereumProvider({ mustBeMetaMask: true });
  if (provider && window.ethereum?.isMetaMask) {
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
          console.log(r);
          response = r;
        })
        .catch((err: any) => {
          console.log(err);
          errorFunction(err);
        });
    }
  } else {
    alert("Please instal metamask.");
  }
  return response;
};

export const getDaoListOfAffiliation = async (
  memberManagerDAOAddress: string,
  subDaoList: Array<SubDAOData>
): Promise<Array<SubDAOData>> => {
  const contractConstract = MemberManagerConstruct;
  let response: SubDAOData[] = [];
  const provider = await detectEthereumProvider({ mustBeMetaMask: true });
  if (provider && window.ethereum?.isMetaMask) {
    if (typeof window.ethereum !== "undefined" && memberManagerDAOAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        memberManagerDAOAddress,
        contractConstract.abi,
        signer
      );
      for (const item of subDaoList) {
        if (await contract.isMember(item.daoAddress, signer.getAddress())) {
          response.push(item);
        }
      }
    }
  } else {
    alert("Please instal metamask.");
  }
  return response;
};

export const deploySubDAO = async (
  inputData: SubDAODeployFormData,
  memberManagerContractAddress: string,
  proposalManagerContractAddress: string,
  setDaoAddress: (address: string) => void
): Promise<string> => {
  let subDAOContractAddess = "";
  const contractConstract = SubDAOContractConstruct;
  if (memberManagerContractAddress === "") {
    throw new Error("memberManagerContractAddress is required");
  }
  if (proposalManagerContractAddress === "") {
    throw new Error("proposalManagerContractAddress is required");
  }
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const factory = new ethers.ContractFactory(
      contractConstract.abi,
      contractConstract.bytecode,
      signer
    );
    const result: any = await factory
      .deploy(
        inputData.name,
        inputData.githubUrl,
        memberManagerContractAddress,
        proposalManagerContractAddress,
        inputData.memberNFTAddress
      )
      // .then((res: any) => {
      //   subDAOContractAddess = res.address
      // })
      .catch((err: any) => {
        errorFunction(err);
      });
    subDAOContractAddess = result.address;
  }
  console.log("### subDAOContractAddess:", subDAOContractAddess);
  setDaoAddress(subDAOContractAddess);
  return subDAOContractAddess;
};
