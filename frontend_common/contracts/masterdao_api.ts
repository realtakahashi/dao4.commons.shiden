import { errorFunction } from "./commonFunctions";
import { SubDAODeployFormData } from "../types/SubDaoType";
import MasterDAOContractConstruct from "../contracts/construct/MasterDAO";
import Web3 from "web3";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

export const registerSubDAO = async (
  subDAOContractAddess: string,
  inputData: SubDAODeployFormData,
  masterDAOContractAddress: string
) => {
  console.log("### subDAOContractAddess:", subDAOContractAddess);
  console.log("### SubDAODeployFormData:", inputData);
  console.log("### masterDAOContractAddress:", masterDAOContractAddress);
  const contractConstract = MasterDAOContractConstruct;
  if (typeof window.ethereum !== "undefined" && masterDAOContractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOContractAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .registerDAO(
        subDAOContractAddess,
        inputData.name,
        inputData.githubUrl,
        inputData.description
      )
      .then((r: any) => {
        return;
      })
      .catch((err: any) => {
        errorFunction(err);
        return;
      });
  }
  return;
};
