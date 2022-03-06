import MasterDAOContractConstruct from "./construct/MasterDAO";
import {
  MemberInfo,
  SubDAOData,
  MemberFormData,
  ProposalInfo,
  AddProposalFormData,
  ApproveDaoData,
  DonateInfo
} from "../types/MasterDaoType";
import Web3 from "web3";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

export const listSubDAO = async (): Promise<Array<SubDAOData>> => {
  console.log("## MasterDaoApi listSubDAO call 1");
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
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
          // console.log(r)
          response = r;
        })
        .catch((err: any) => {
          console.log(err);
          alert(err.data.message);
        });
    }
  } else {
    alert("Please instal metamask.");
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

export const addMember = async (_memberFormData: MemberFormData) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  console.log("## add Member");
  console.log("## add Member masterDAOAddress:", masterDAOAddress);
  console.log("## add Member form data:", _memberFormData);
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .addMember(
        _memberFormData.name,
        _memberFormData.memberAddress,
        _memberFormData.proposalId
      )
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
};

export const deleteMember = async (
  _memberInfoData: MemberInfo,
  _proposalId: number
) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  console.log("## masterDAOAddress:", masterDAOAddress);
  console.log("## memberinfo:", _memberInfoData);
  console.log("## proposalId:", _proposalId);
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .deleteMember(_memberInfoData.eoaAddress, _proposalId)
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
};

export const registerProposal = async (
  inputData: AddProposalFormData
): Promise<string> => {
  console.log("### registerProposal 1");
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    console.log("## Add Proposal: Detail: ", inputData.detail);
    const tx = await contract
      .submitProposal(
        inputData.proposalKind,
        inputData.title,
        inputData.outline,
        inputData.detail,
        inputData.githubURL,
        inputData.relatedId,
        inputData.relatedAddress
      )
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
        return "";
      });
    if (tx) {
      const returnValue = await tx.wait();
      console.log("### returnValue:", returnValue);
      console.log("### Proposal ID:", returnValue.events[0].args.proposalId);
      return returnValue.events[0].args.proposalId.toString();
    }
  }
  return "";
};

export const getProposalListFromContract = async (): Promise<
  Array<ProposalInfo>
> => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  let response: ProposalInfo[] = [];
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    response = await contract.getProposalList().catch((err: any) => {
      console.log(err);
      alert(err.data.message);
    });
    console.log("### getProposalList Return: ", response);
  }
  return response;
};

export const changeProposalStatus = async (
  proposalStatus: number,
  proposalId: number
) => {
  console.log("#### changeProposalStatus ####");
  console.log("## Proposal Status: ", proposalStatus);
  console.log("## Proposal Id: ", proposalId);
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  let response: ProposalInfo[] = [];
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    response = await contract
      .changeProposalStatus(proposalId, proposalStatus)
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
    console.log("### changeProposalStatus Return: ", response);
  }
  return response;
};

export const doVoteForProposal = async (yes: boolean, proposalId: number) => {
  console.log("## doVote:yes: ", yes);
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  let response: ProposalInfo[] = [];
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    response = await contract
      .voteForProposal(proposalId, yes)
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
    console.log("### voteForProposal Return: ", response);
  }
  return response;
};


export const changeDaoReward = async (approveDaoData: ApproveDaoData, subDaoData: SubDAOData) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  let response: ProposalInfo[] = [];
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    response = await contract
      .changeDaoReward(subDaoData.daoAddress, approveDaoData.relatedProposalId,approveDaoData.doReward)
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
  return response;
};

export const doDonateSelectedDao = async (donateInfo:DonateInfo,subDaoData: SubDAOData) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MasterDAOContractConstruct;
  if (typeof window.ethereum !== "undefined" && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    );
    console.log("## subDaoData.daoAddress:",subDaoData.daoAddress)
    console.log("## donateInfo.amount:", donateInfo.amount)
    console.log("## donateInfo.amount ETH:", Number(Web3.utils.toWei(String(donateInfo.amount))))
    await contract
      .divide(subDaoData.daoAddress, ethers.utils.parseEther(String(donateInfo.amount)),donateInfo.relatedProposalId)
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
};

export const doDonateMasterDao = async (donateInfo:DonateInfo) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
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
      .donate({value:ethers.utils.parseEther(String(donateInfo.amount))})
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });
  }
};

export const getBalance = async (): Promise<number> => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS;
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
      alert(err.data.message);
    });
    console.log("### getProposalList Return: ", response);
  }
  return response;
};
