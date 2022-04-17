import {
  ElectionComissionFormData,
  MemberInfo,
  MemberInfoPlus,
} from "../types/MemberManagerType";
import MemberManagerContractConstruct from "./construct/MemberManager";
import { MemberFormData } from "../types/MemberManagerType";
import { Contract, ethers } from "ethers";
import { errorFunction } from "./commonFunctions";

export const getMemberList = async (): Promise<Array<MemberInfoPlus>> => {
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MemberManagerContractConstruct;
  //console.log("memberManager Address:",memberManagerAddress);

  let response: MemberInfo[] = [];
  let result: MemberInfoPlus[] = [];
  if (typeof window.ethereum !== "undefined" && memberManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      memberManagerAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .getMemberList(masterDaoAddress)
      .then((r: any) => {
        //console.log(r);
        response = r;
      })
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });

    console.log("## result:", result);
    console.log("## response:", response);
    for (var i = 0; i < response.length; i++) {
      const isElectionCommition = await contract.isElectionComission(
        masterDaoAddress,
        response[i].eoaAddress
      );
      result.push({
        eoaAddress: response[i].eoaAddress,
        memberId: response[i].memberId,
        name: response[i].name,
        tokenId: response[i].tokenId,
        isElectionCommition: isElectionCommition,
      });
    }
  }

  return result;
};

export const checkElectionComission = async (): Promise<boolean> => {
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MemberManagerContractConstruct;

  let response: boolean = false;
  if (typeof window.ethereum !== "undefined" && memberManagerAddress) {
    console.log("## addmember 2");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      memberManagerAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .isElectionComission(masterDaoAddress, signer.getAddress())
      .then((r: any) => {
        response = r;
      })
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
  }
  return response;
};

export const addMember = async (_memberFormData: MemberFormData) => {
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MemberManagerContractConstruct;

  console.log("## addmember 1");

  if (typeof window.ethereum !== "undefined" && memberManagerAddress) {
    console.log("## addmember 2");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      memberManagerAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .addMember(
        masterDaoAddress,
        _memberFormData.name,
        _memberFormData.memberAddress,
        _memberFormData.proposalId,
        "0"
      )
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
  }
};

export const _resetElectionComission = async (
  _electionComissionData: ElectionComissionFormData
) => {
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MemberManagerContractConstruct;

  if (typeof window.ethereum !== "undefined" && memberManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      memberManagerAddress,
      contractConstract.abi,
      signer
    );

    console.log("## _electionComissionData", _electionComissionData);
    let _candidateEoaTwo = "";
    let _relatedProposalId_two = 0;
    if (_electionComissionData.candidateEoa_two != "") {
      console.log("## not Space");
      _candidateEoaTwo = _electionComissionData.candidateEoa_two;
      _relatedProposalId_two = Number(
        _electionComissionData.relatedProposalId_two
      );
    } else {
      console.log("##  Space");
      _candidateEoaTwo = "0x0000000000000000000000000000000000000000";
      _relatedProposalId_two = 0;
    }

    await contract
      .resetElectionCommision(
        masterDaoAddress,
        _electionComissionData.candidateEoa_one,
        _candidateEoaTwo,
        _electionComissionData.relatedProposalId_one,
        _relatedProposalId_two
      )
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
  }
};

export const deleteMember = async (
  _memberInfoData: MemberInfo,
  _proposalId: number
) => {
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MemberManagerContractConstruct;

  console.log("## masterDAOAddress:", masterDaoAddress);
  console.log("## memberinfo:", _memberInfoData);
  console.log("## proposalId:", _proposalId);
  if (typeof window.ethereum !== "undefined" && memberManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      memberManagerAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .deleteMember(masterDaoAddress,_memberInfoData.eoaAddress, _proposalId)
      .catch((err: any) => {
        console.log(err);
        errorFunction(err);
      });
  }
};
