import {ethers} from 'ethers'
import {
  SubDAOContractConstruct,
  MasterDAOContractConstruct,
} from '@/contracts/construct'
import {
  SubDAOData,
  SubDAOMemberData,
  SubDAODeployFormData,
} from '@/types/SubDAO'
import {AddProposalFormData, ProposalInfo} from '@/types/Proposal'
import {AddMemberFormData} from '@/types/MemberNFT'

export const listSubDAO = async (): Promise<Array<SubDAOData>> => {
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS
  const contractConstract = MasterDAOContractConstruct
  let response: SubDAOData[] = []
  if (typeof window.ethereum !== 'undefined' && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    )
    await contract
      .getDaoList()
      .then((r: any) => {
        // console.log(r)
        response = r
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to list SubDAO')
      })
  }
  return response
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
      contractConstract.abi,
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
export const deploySubDAO = async (
  inputData: SubDAODeployFormData
): Promise<string> => {
  let subDAOContractAddess = ''
  const contractConstract = SubDAOContractConstruct
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      contractConstract.abi,
      contractConstract.bytecode,
      signer
    )
    await factory
      .deploy(inputData.name, inputData.githubUrl, inputData.ownerName)
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

export const registerSubDAO = async (
  subDAOContractAddess: string,
  inputData: SubDAODeployFormData
) => {
  const masterDAOAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS
  const contractConstract = MasterDAOContractConstruct
  if (typeof window.ethereum !== 'undefined' && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    )
    await contract
      .registerDAO(subDAOContractAddess, inputData.name, inputData.githubUrl)
      .then((r: any) => {
        console.log(r)
        alert('Succeeded to connect SubDAO and MasterDAO')
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
export const addMemberToSubDAO = async (
  subDAOContractAddess: string,
  inputData: AddMemberFormData
): Promise<void> => {
  const contractConstract = SubDAOContractConstruct
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi,
      signer
    )
    const tx = await contract
      .addMember(
        inputData.memberAddress,
        inputData.name,
        inputData.nftContractAddress,
        inputData.tokenID
      )
      .then((r: any) => {
        console.log(r)
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

export const registerProposal = async (
  subDAOContractAddess: string,
  inputData: AddProposalFormData
): Promise<string> => {
  console.log('### registerProposal 1')
  const contractConstract = SubDAOContractConstruct
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi,
      signer
    )
    console.log("## Add Proposal: Detail: ",inputData.detail)
    const tx = await contract.submitProposal(
      inputData.proposalKind,
      inputData.title,
      inputData.outline,
      inputData.detail,
      inputData.githubURL
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
  const contractConstract = SubDAOContractConstruct
  let response: ProposalInfo[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi,
      signer
    )
    response = await contract.getProposalList().catch((err: any) => {
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
  console.log("#### changeProposalStatus ####")
  console.log("## SubDao Address: ", subDAOContractAddess)
  console.log("## Proposal Status: ", proposalStatus)
  console.log("## Proposal Id: ", proposalId)
  const contractConstract = SubDAOContractConstruct
  let response: ProposalInfo[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi,
      signer
    )
    response = await contract
      .changeProposalStatus(proposalId,proposalStatus)
      .catch((err: any) => {
        console.log(err)
        alert('failed changeProposalStatus.')
      })
    console.log("### changeProposalStatus Return: ",response)
    alert('Chainging proposal status is succeeded.')
  }
  return response
}

export const doVoteForProposal = async (
  subDAOContractAddess: string,
  yes: boolean,
  proposalId: number
) => {
  console.log("## doVote:yes: ",yes)
  console.log("## doVote:SubDao Address: ", subDAOContractAddess)
  const contractConstract = SubDAOContractConstruct
  let response: ProposalInfo[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi,
      signer
    )
    response = await contract
      .voteForProposal(proposalId,yes)
      .catch((err: any) => {
        console.log(err)
        alert('failed voteForProposal.')
      })
    console.log("### voteForProposal Return: ",response)
    alert('Voting proposal status is succeeded.')
  }
  return response
}

export const getSubDAOBalance = async (
  subDAOContractAddess: string,
  ):Promise<string> => 
{
  const contractConstract = SubDAOContractConstruct

  let response:number = 0;
  if (typeof window.ethereum !== 'undefined' && subDAOContractAddess) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi,
      signer
    )
    response = await contract
      .getContractBalance()
      .catch((err: any) => {
        console.log(err)
        alert('failed getSubDAOBalance.')
      })
    console.log("### getSubDAOBalance Return: ",ethers.utils.formatEther(response))
    return ethers.utils.formatEther(response)
    // alert('Voting proposal status is succeeded.')
  }
  return ""
}