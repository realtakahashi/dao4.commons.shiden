import Web3 from 'web3'
import {ethers} from 'ethers'
import {MemberERC721ContractConstruct} from '@/contracts/construct'
import {MemberNFTDeployFormData} from '@/types/MemberNFT'

export const deployMemberNFT = async (
  inputData: MemberNFTDeployFormData
): Promise<string> => {
  let memberNFTTokenAddress = ''
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      MemberERC721ContractConstruct.abi,
      MemberERC721ContractConstruct.bytecode,
      signer
    )
    await factory
      .deploy(
        inputData.name,
        inputData.symbol,
        inputData.tokenURI,
        inputData.subdaoAddress
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
      MemberERC721ContractConstruct.abi,
      signer
    )

    contract
      .original_mint(signerAddress, {value: Web3.utils.toWei('10')})
      .then((d: any) => {
        // console.log(d)
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
      })
  }
  return id
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
      MemberERC721ContractConstruct.abi,
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
