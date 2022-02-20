import {ethers} from 'ethers'
import {MemberERC721ContractConstruct} from '@/contracts/construct'

const deployMemberNFT = async (inputData: any) => {
  inputData = {
    amount: 1,
  }

  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      MemberERC721ContractConstruct.abi,
      MemberERC721ContractConstruct.bytecode,
      signer
    )
    factory
      .deploy('Name', 'Symbol', 'Gihub.com')
      .then((r: any) => {
        console.log(r)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  return
}

export default deployMemberNFT
