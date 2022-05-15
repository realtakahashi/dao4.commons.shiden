import { ethers } from 'ethers'
import {
  SubDAOMemberData,  
} from '@/types/SubDAO'
import { callContract } from './base'
import MemberManagerContractConstruct from './construct/MemberManager'

export const getSubDAOMemberList = async (
  subDAOAddress: string
): Promise<Array<SubDAOMemberData>> => {
  const contractConstract = MemberManagerContractConstruct
  const memberMangerContractAddress = process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS ?? ''
  let response: SubDAOMemberData[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      memberMangerContractAddress,
      contractConstract.abi as string,
      signer
    )
    console.log(subDAOAddress)
    await contract
      .getMemberList(subDAOAddress)
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
