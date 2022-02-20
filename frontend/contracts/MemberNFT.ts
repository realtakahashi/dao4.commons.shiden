import Web3 from 'web3'
import {ethers} from 'ethers'
import {MemberERC721ContractConstruct} from '@/contracts/construct'
import {MemberNFTDeployFormData} from '@/types/MemberNFT'

const memberNFTContractAddress = process.env.MEMBER_NFT_CONTRACT_ADDRESS

export const deployMemberNFT = async (inputData: MemberNFTDeployFormData) => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      MemberERC721ContractConstruct.abi,
      MemberERC721ContractConstruct.bytecode,
      signer
    )
    factory
      .deploy(inputData.name, inputData.symbol, inputData.token_uri)
      .then((r: any) => {
        console.log(r)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
  return
}

// export const mintMemberNFT = async (inputData: MemberNFTDeployFormData) => {
//   const tokenAddress = memberNFTContractAddress

//   if (
//     typeof window.ethereum !== 'undefined' &&
//     typeof tokenAddress !== 'undefined'
//   ) {
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     const signer = provider.getSigner()
//     const contract = new ethers.Contract(
//       tokenAddress,
//       MemberERC721ContractConstruct.abi,
//       signer
//     )

//     contract
//       .original_mint(address, {value: Web3.utils.toWei('10')})
//       .then((d: any) => {
//         console.log(d)
//       })
//       .catch((err: any) => console.log(err))
//   }
//   return
// }
