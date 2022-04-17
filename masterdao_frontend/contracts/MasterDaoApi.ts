import MasterDAOContractConstruct from "./construct/MasterDAO";
import {
  SubDAOData,
  DonateInfo
} from "../types/MasterDaoType";
import Web3 from "web3";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { errorFunction } from "./commonFunctions";

export const listSubDAO = async (): Promise<Array<SubDAOData>> => {
  console.log("## MasterDaoApi listSubDAO call 1");
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  console.log("## masterDaoAddress:", masterDAOAddress);
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
          console.log(r)
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

export const changeDaoReward = async (_daoAddress:string,_relatedProposalId:number,_daoReward:boolean) => {
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;

  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .changeDaoReward(_daoAddress, _relatedProposalId,_daoReward)
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
  }
};

export const doDonateSelectedDao = async (_subDaoAddress:string,_amount:number,_proposalId:string) => {
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .divide(_subDaoAddress, ethers.utils.parseEther(String(_amount)),_proposalId)
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
  }
};

export const doDonateMasterDao = async (amount:number) => {
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .donate({value:ethers.utils.parseEther(String(amount))})
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
  }
};

export const getBalance = async (): Promise<number> => {
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  let response: number = 0;
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    response = await contract.getContractBalance().catch((err: any) => {
      console.log(err);
      errorFunction(err);
    });
    console.log("### getProposalList Return: ", response);
  }
  return response;
};



// export const registerProposal = async (
//   inputData: AddProposalFormData
// ) => {
//   console.log("### registerProposal 1");
//   const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
//   const contractConstract = MasterDAOContractConstruct;
//   if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(
//       masterDAOAddress,
//       contractConstract.abi,
//       signer
//     );
//     console.log("## Add Proposal: Detail: ", inputData.detail);
//     await contract
//       .submitProposal(
//         inputData.proposalKind,
//         inputData.title,
//         inputData.outline,
//         inputData.detail,
//         inputData.githubURL,
//         inputData.relatedId,
//         inputData.relatedAddress
//       )
//       .catch((err: any) => {
//         console.log(err);
//         alert(err.message);
//       });
//   }
// };

// export const getProposalListFromContract = async (): Promise<
//   Array<ProposalInfo>
// > => {
//   const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
//   const contractConstract = MasterDAOContractConstruct;
//   let response: ProposalInfo[] = [];
//   if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(
//       masterDAOAddress,
//       contractConstract.abi,
//       signer
//     );
//     response = await contract.getProposalList().catch((err: any) => {
//       console.log(err);
//       alert(err.data.message);
//     });
//     console.log("### getProposalList Return: ", response);
//   }
//   return response;
// };




