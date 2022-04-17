import { AddProposalFormData, ProposalInfo } from "../types/ProposalManagerType";
import ProposalManagerContractConstruct from "./construct/ProposalManager";
import { ethers } from "ethers";
import { errorFunction } from "./commonFunctions";

export const getProposalList = async (): Promise<
  Array<ProposalInfo>
> => {
  const proposalManagerAddress =
    process.env.NEXT_PUBLIC_PROPOSAL_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = ProposalManagerContractConstruct;

  let response: ProposalInfo[] = [];
  if (typeof window.ethereum !== "undefined" && proposalManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      proposalManagerAddress,
      contractConstract.abi,
      signer
    );
    response = await contract
      .getProposalList(masterDaoAddress)
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
    console.log("### getProposalList Return: ", response);
  }
  return response;
};

export const registerProposal = async (
  inputData: AddProposalFormData
) => {
  console.log("### registerProposal 1");
  const proposalManagerAddress =
    process.env.NEXT_PUBLIC_PROPOSAL_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = ProposalManagerContractConstruct;

  if (typeof window.ethereum !== "undefined" && proposalManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      proposalManagerAddress,
      contractConstract.abi,
      signer
    );
    console.log("## Add Proposal: Detail: ", inputData.detail);
    await contract
      .submitProposal(
        masterDaoAddress,
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
        errorFunction(err);
      });
  }
};

export const doVoteForProposal = async (yes: boolean, proposalId: number) => {
  console.log("## doVote:yes: ", yes);
  const proposalManagerAddress =
    process.env.NEXT_PUBLIC_PROPOSAL_MANAGER_CONTRACT_ADDRESS;
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = ProposalManagerContractConstruct;
  let response: ProposalInfo[] = [];
  if (typeof window.ethereum !== "undefined" && proposalManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      proposalManagerAddress,
      contractConstract.abi,
      signer
    );
    response = await contract
      .voteForProposal(masterDAOAddress, proposalId, yes)
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
    console.log("### voteForProposal Return: ", response);
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
  const proposalManagerAddress =
    process.env.NEXT_PUBLIC_PROPOSAL_MANAGER_CONTRACT_ADDRESS;
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = ProposalManagerContractConstruct;
  let response: ProposalInfo[] = [];
  if (typeof window.ethereum !== "undefined" && proposalManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      proposalManagerAddress,
      contractConstract.abi,
      signer
    );
    response = await contract
      .changeProposalStatus(masterDAOAddress, proposalId, proposalStatus)
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
    console.log("### changeProposalStatus Return: ", response);
  }
  return response;
};
