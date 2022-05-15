import { ethers } from 'ethers'
import {
  SubDAOContractConstruct,
  MasterDAOContractConstruct,
} from '@/contracts/construct'
import {
  SubDAOData,
  SubDAOMemberData,
  SubDAODeployFormData,
  DeleteMemberFormData,
} from '@/types/SubDAO'
import { AddProposalFormData, ProposalInfo } from '@/types/Proposal'
import { AddMemberFormData } from '@/types/MemberNFT'
import { callContract } from './base'
import MemberManagerContractConstruct from './construct/MemberManager'
import ProposalManagerContractConstruct from './construct/ProposalManager'
import { masterDAOContractAddress, proposalManagerContractAddress, memberManagerContractAddress } from './const'
export const listSubDAO = async () => {
  const res = await callContract<Array<SubDAOData>>({
    contractAddress: masterDAOContractAddress ?? '',
    contractArtifact: MasterDAOContractConstruct,
  })
  return res
}

export const deploySubDAO = async (
  inputData: SubDAODeployFormData
): Promise<string> => {
  let subDAOContractAddess = ''
  const contractConstract = SubDAOContractConstruct
  if (memberManagerContractAddress === "") {
    throw new Error("memberManagerContractAddress is required")
  }
  if (proposalManagerContractAddress === "") {
    throw new Error("proposalManagerContractAddress is required")
  }
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      contractConstract.abi as string,
      contractConstract.bytecode,
      signer
    )
    await factory
      .deploy(
        inputData.name,
        inputData.githubUrl,
        memberManagerContractAddress,
        proposalManagerContractAddress,
        inputData.memberNFTAddress
      )
      .then((res: any) => {
        console.log(res)
        subDAOContractAddess = res.address
        registerSubDAO(subDAOContractAddess, inputData)
        alert('Succeeeded to deploy SubDAO')
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to deploy SubDAO')
      })
  }
  return subDAOContractAddess
}

export const getSubDAOMemberList = async (
  sudDAOAddress: string
): Promise<Array<SubDAOMemberData>> => {
  const contractConstract = SubDAOContractConstruct
  let response: SubDAOMemberData[] = []
  if (typeof window.ethereum !== 'undefined' && sudDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      sudDAOAddress,
      contractConstract.abi as string,
      signer
    )
    await contract
      .getMemberList()
      .then((r: any) => {
        console.log(r)
        response = r
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to list SubDAO Member')
      })
  }
  return response
}

export const registerSubDAO = async (
  subDAOContractAddess: string,
  inputData: SubDAODeployFormData
) => {
  const contractConstract = MasterDAOContractConstruct
  if (typeof window.ethereum !== 'undefined' && masterDAOContractAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      masterDAOContractAddress,
      contractConstract.abi as string,
      signer
    )
    await contract
      .registerDAO(subDAOContractAddess, inputData.name, inputData.githubUrl, inputData.description)
      .then((r: any) => {
        console.log(r)
        alert('Succeeded to connect SubDAO and MasterDAO')
        addFirstMember(subDAOContractAddess, inputData.ownerName)
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to connect SubDAO and MasterDAO')
        return
      })
  }
  return
}

export const addFirstMember = async (
  subDAOContractAddess: string,
  ownerName: string
): Promise<void> => {
  const contractConstract = MemberManagerContractConstruct
  const memberManagerContractAddress = process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS ?? ""
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      memberManagerContractAddress,
      contractConstract.abi as string,
      signer
    )
    const tx = await contract
      .addFristMember(subDAOContractAddess, ownerName, 0)
      .then((r: any) => {
        console.log(r)
        alert('Succeeded to add first member to SubDAO')
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to add first member to SubDAO')
        return
      })
  }
  return
}

export const addMemberToSubDAO = async (
  subDAOContractAddess: string,
  inputData: AddMemberFormData
): Promise<void> => {
  const contractConstract = MemberManagerContractConstruct
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      memberManagerContractAddress as string,
      contractConstract.abi as string,
      signer
    )
    const tx = await contract
      .addMember(
        subDAOContractAddess,
        inputData.name,
        inputData.memberAddress,
        inputData.relatedProposalId,
        inputData.tokenID,
      )
      .then((r: any) => {
        console.log(r)
        console.log(subDAOContractAddess,
          inputData.name,
          inputData.memberAddress,
          inputData.relatedProposalId,
          inputData.tokenID)
        alert('Succeeded to add member to SubDAO')
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to add Member to SubDAO')
        return
      })
  }
  return
}

export const deleteMemberOfSubDAO = async (
  subDAOContractAddess: string,
  inputData: DeleteMemberFormData
): Promise<void> => {
  const contractConstract = SubDAOContractConstruct
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi as string,
      signer
    )
    const tx = await contract
      .deleteMember(inputData.memberAddress, inputData.relatedProposalId)
      .then((r: any) => {
        console.log(r)
        alert('Succeeded to delete member to SubDAO')
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to delete Member to SubDAO')
        return
      })
  }
  return
}

export const registerProposal = async (
  subDAOContractAddess: string,
  inputData: AddProposalFormData
): Promise<string> => {
  console.log('### registerProposal 1')
  const contractConstract = ProposalManagerContractConstruct
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      proposalManagerContractAddress as string,
      contractConstract.abi as string,
      signer
    )
    console.log('## Add Proposal: Detail: ', inputData.detail)
    const tx = await contract.submitProposal(
      subDAOContractAddess,
      inputData.proposalKind,
      inputData.title,
      inputData.outline,
      inputData.detail,
      inputData.githubURL,
      0,
      inputData.relatedAddress
    )

    const returnValue = await tx.wait()
    console.log('### returnValue:', returnValue)
    console.log('### Proposal ID:', returnValue.events[0].args.proposalId)
    return returnValue.events[0].args.proposalId.toString()
  }
  return ''
}

export const getProposalListFromContract = async (
  subDAOContractAddess: string
): Promise<Array<ProposalInfo>> => {
  console.log('## SubDao Address: ', subDAOContractAddess)
  const contractConstract = ProposalManagerContractConstruct

  let response: ProposalInfo[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      proposalManagerContractAddress as string,
      contractConstract.abi as string,
      signer
    )
    response = await contract.getProposalList(subDAOContractAddess).catch((err: any) => {
      console.log(err)
      alert('failed to list Proposal Info.')
    })
    console.log('### getProposalList Return: ', response)
  }
  return response
}

export const changeProposalStatus = async (
  subDAOContractAddess: string,
  proposalStatus: number,
  proposalId: number
) => {
  console.log('#### changeProposalStatus ####')
  console.log('## SubDao Address: ', subDAOContractAddess)
  console.log('## Proposal Status: ', proposalStatus)
  console.log('## Proposal Id: ', proposalId)
  const contractConstract = ProposalManagerContractConstruct
  let response: ProposalInfo[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      proposalManagerContractAddress as string,
      contractConstract.abi as string,
      signer
    )
    response = await contract
      .changeProposalStatus(subDAOContractAddess, proposalId, proposalStatus)
      .catch((err: any) => {
        console.log(err)
        alert('failed changeProposalStatus.')
      })
    console.log('### changeProposalStatus Return: ', response)
    alert('Chainging proposal status is succeeded.')
  }
  return response
}

export const doVoteForProposal = async (
  subDAOContractAddess: string,
  yes: boolean,
  proposalId: number
) => {
  console.log('## doVote:yes: ', yes)
  console.log('## doVote:SubDao Address: ', subDAOContractAddess)
  const contractConstract = ProposalManagerContractConstruct
  let response: ProposalInfo[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      proposalManagerContractAddress as string,
      contractConstract.abi as string,
      signer
    )
    response = await contract
      .voteForProposal(subDAOContractAddess, proposalId, yes)
      .catch((err: any) => {
        console.log(err)
        alert('failed voteForProposal.')
      })
    console.log('### voteForProposal Return: ', response)
    alert('Voting proposal status is succeeded.')
  }
  return response
}

export const getSubDAOBalance = async (
  subDAOContractAddess: string
): Promise<number> => {
  const contractConstract = SubDAOContractConstruct

  let response: number = 0
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi as string,
      signer
    )
    response = await contract.getContractBalance().catch((err: any) => {
      console.log(err)
      alert('failed getSubDAOBalance.')
    })
    console.log(
      '### getSubDAOBalance Return: ',
      ethers.utils.formatEther(response)
    )
    return parseInt(ethers.utils.formatEther(response))
    // alert('Voting proposal status is succeeded.')
  }
  return response
}

export const getMemberNFTAddress = async (
  subDAOContractAddess: string
): Promise<string> => {
  const contractConstract = SubDAOContractConstruct

  let response: string = ''
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi as string,
      signer
    )
    response = await contract.getMemberNFTAddress().catch((err: any) => {
      console.log(err)
      if (typeof err.data.message !== 'undefined') {
        alert(err.data.message)
      }
    })
  }
  return response
}
