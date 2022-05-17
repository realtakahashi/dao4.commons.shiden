import Web3 from 'web3'
import { ethers } from 'ethers'
import { MemberERC721ContractConstruct } from '@/contracts/construct'
import { MemberNFTDeployFormData } from '@/types/MemberNFT'
import SubDAOContractConstruct from './construct/SubDAO'
import { deployContract } from './base'

const DEPOSIT_TOKEN_BALANCE = '2'

// export const deployMemberNFT = async (formValue: MemberNFTDeployFormData) => {
//   const inputData = [
//     formValue.name,
//     formValue.symbol,
//     formValue.tokenURI
//   ]
//   console.log(inputData)
//   const res = await deployContract<string>({
//     contractArtifact: MemberERC721ContractConstruct,
//     data: inputData
//   })
//   return res
// }



export const deployMemberNFT = async (
  inputData: MemberNFTDeployFormData
): Promise<string> => {
  let memberNFTTokenAddress = ''
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      MemberERC721ContractConstruct.abi as string,
      MemberERC721ContractConstruct.bytecode,
      signer
    )
    await factory
      .deploy(
        inputData.name,
        inputData.symbol,
        inputData.tokenURI
      )
      .then((res: any) => {
        console.log(res)
        alert('Succeeded to deploy member NFT contract')
        memberNFTTokenAddress = res.address
        return memberNFTTokenAddress
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to deploy member NFT contract')
      })
  }
  return memberNFTTokenAddress
}

export const mintMemberNFT = async (
  memberNFTTokenAddress: string
): Promise<string> => {
  let id: string = ''
  // console.log('memberNFT address: ', memberNFTTokenAddress)
  if (
    typeof window.ethereum !== 'undefined' &&
    typeof memberNFTTokenAddress !== 'undefined'
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    const contract = new ethers.Contract(
      memberNFTTokenAddress,
      MemberERC721ContractConstruct.abi as string,
      signer
    )

    contract
      .original_mint(signerAddress, { value: Web3.utils.toWei(DEPOSIT_TOKEN_BALANCE) })
      .then((d: any) => {
        console.log(d)
        id = d.address
        alert('Succeeded to mint member NFT!')
        const filters = contract.filters['IssuedMemberToken']
        if (filters !== undefined) {
          provider.once('block', () => {
            contract.on(filters(), (senderAddress, tokenID) => {
              console.log(senderAddress, tokenID)
              id = tokenID._hex
              console.log(id)
            })
          })
        }
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to mint member NFT!')
        console.log(err.message)
      })
  }
  return id
}

export const updateNftAddressAndOwnerTokenId = async (
  subDAOAddress: string,
  memberNFTTokenAddress: string,
  ownerTokenId: number
): Promise<void> => {

  if (
    typeof window.ethereum !== 'undefined' &&
    typeof memberNFTTokenAddress !== 'undefined' &&
    typeof ownerTokenId !== 'undefined'
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOAddress,
      SubDAOContractConstruct.abi as string,
      signer
    )

    contract
      .updateNftAddressAndOwnerTokenId(memberNFTTokenAddress, ownerTokenId)
      .then((d: any) => {
        console.log(d)
        alert('Succeeded to update SubDAO with your member NFT!')
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to update SubDAO with your member NFT!')
        console.log(err.message)
      })
  }
  return
}

export const checkNFTMinted = async (
  memberNFTTokenAddress: string
): Promise<string> => {
  if (
    typeof window.ethereum !== 'undefined' &&
    typeof memberNFTTokenAddress !== 'undefined'
  ) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    const contract = new ethers.Contract(
      memberNFTTokenAddress,
      MemberERC721ContractConstruct.abi as string,
      signer
    )
    let id = ''
    let nId = await contract.ownedTokenId(signerAddress)
    if (nId != 0) {
      alert('You are already minted.Your Token Id is:' + nId)
      id = String(nId)
    }
    return id
  }
  return ''
}
