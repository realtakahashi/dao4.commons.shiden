import MasterDAOContractConstruct from "./construct/MasterDAO";
import { SubDAOData } from "../types/MasterDaoType";
import Web3 from "web3";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { errorFunction } from "./commonFunctions";
import MemberManagerConstruct from "../contracts/construct/MemberManager";

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
