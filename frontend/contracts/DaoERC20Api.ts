import Web3 from 'web3'
import {ethers} from 'ethers'
import {AddErc20Input} from '@/types/Token'
import DaoERC20ContractConstruct from './construct/DaoERC20';
import { Web3Provider } from '@ethersproject/providers';


export const _deployDaoERC20 = async (
  inputData: AddErc20Input,
  subDaoAdddress:string,
  provider:Web3Provider,
): Promise<string> => {
  let daoERC20okenAddress = ''
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
        DaoERC20ContractConstruct.abi,
        DaoERC20ContractConstruct.bytecode,
      signer
    )
    await factory
      .deploy(
        inputData.name,
        inputData.symbol,
        subDaoAdddress,        
      )
      .then((res: any) => {
        console.log(res)
        alert('Succeeded to deploy member NFT contract')
        daoERC20okenAddress = res.address
        return daoERC20okenAddress
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to deploy member NFT contract')
      })
//   }
  return daoERC20okenAddress
}

export const _mintDaoERC20 = async (
    provider: Web3Provider,
    inputData: AddErc20Input,
  daoERC20Address: string
) => {
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    const contract = new ethers.Contract(
        daoERC20Address,
        DaoERC20ContractConstruct.abi,
      signer
    )

    contract
      .mint(Web3.utils.toWei(inputData.price),inputData.amount)
      .then((d: any) => {
        console.log(d)
        })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to mint member NFT!')
        console.log(err.message)
      })
}

export const registerErc20 = async (
    inputData: AddErc20Input,
    subDaoAdddress:string,  
) => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contractAddress = await _deployDaoERC20(inputData,subDaoAdddress,provider)
    await _mintDaoERC20(provider,inputData,contractAddress)
  }
}

