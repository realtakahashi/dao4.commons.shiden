import MasterDAOContractConstruct from "./construct/MasterDAO";
import { SubDAOData } from "../types/MasterDaoType";
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
        alert("failed to list SubDAO");
      });
  }
  return response;
};
