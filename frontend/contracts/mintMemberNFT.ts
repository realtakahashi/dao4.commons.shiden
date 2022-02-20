import Web3 from 'web3'
import {ethers} from 'ethers'
import {MemberERC721ContractConstruct} from '@/contracts/construct'

const memberNFTContractAddress = process.env.MEMBER_NFT_CONTRACT_ADDRESS

// TODO addressの取得
const address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

const mintMemberNFT = async (inputData: any) => {
  inputData = {
    amount: 1,
  }
  const tokenAddress = memberNFTContractAddress

  if (
    typeof window.ethereum !== 'undefined' &&
    typeof tokenAddress !== 'undefined'
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      tokenAddress,
      MemberERC721ContractConstruct.abi,
      signer
    )

    contract
      .original_mint(address, {value: Web3.utils.toWei('10')})
      .then((d: any) => {
        console.log(d)
      })
      .catch((err: any) => console.log(err))
  }
  return
}

export default mintMemberNFT