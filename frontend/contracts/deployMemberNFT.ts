import {ethers} from 'ethers'
import subdaoContract from '@/sample/subDAO'
import memberERC721Contract from '@/sample/memberERC721'

const memberNFTContractAddress = process.env.MEMBER_NFT_CONTRACT_ADDRESS
const subDaoContractAddress = process.env.SUBDAO_CONTRACT_ADDRESS

const deployMemberNFT = async (inputData: any) => {
  inputData = {
    amount: 1,
  }

  const contractJSON = JSON.parse(memberERC721Contract)
  const contractABI = contractJSON.abi
  const contractBytecode = contractJSON.bytecode

  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      contractABI,
      contractBytecode,
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
