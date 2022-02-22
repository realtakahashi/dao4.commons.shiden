import {ethers} from 'ethers'
import {
  SubDAOContractConstruct,
  MasterDAOContractConstruct,
} from '@/contracts/construct'
import {SubDAOData, SubDAOMemberData} from '@/types/SubDAO'

import {SubDAODeployFormData} from '@/types/SubDAO'

import { AddProposalFormData } from '@/types/Proposal'

export const listSubDAO = async (): Promise<Array<SubDAOData>> => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS
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

export const getSubDAOMemberList = async (sudDAOAddress: string): Promise<Array<SubDAOMemberData>> => {
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
      .deploy(inputData.name, inputData.github_url, inputData.owner_url)
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
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS
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
      .registerDAO(subDAOContractAddess, inputData.name, inputData.github_url)
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

export const registerProposal = async (
  subDAOContractAddess: string,
  inputData: AddProposalFormData
): Promise<string> =>{
  console.log("### registerProposal 1")
  const contractConstract = SubDAOContractConstruct
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOContractAddess,
      contractConstract.abi,
      signer
    )
    const tx = await contract.submitProposal(inputData.proposalKind, inputData.title, inputData.outline, 
      inputData.detail, inputData.githubURL)
    const returnValue = await tx.wait();
    console.log("### returnValue:",returnValue);
    console.log("### Proposal ID:",returnValue.events[0].args.proposalId)
    return returnValue.events[0].args.proposalId.toString()
  }
  return ""
}
