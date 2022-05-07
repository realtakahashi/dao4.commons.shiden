import { ethers } from 'ethers'
import { DaoErc20DeployFormData, DaoErc20 } from '@/types/Token'
import { DAOERC20ContractConstruct } from './construct'
import { SubDAOContractConstruct } from './construct'

export const deployDaoErc20 = async (
  inputData: DaoErc20DeployFormData
): Promise<string> => {
  const contractConstract = DAOERC20ContractConstruct
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      contractConstract.abi as string,
      contractConstract.bytecode,
      signer
    )
    await factory
      .deploy(
        inputData.name,
        inputData.symbol,
        inputData.subDAOAddress
      )
      .then((res: any) => {
        console.log(res)
        alert('Succeeded to deploy DAO ERC20')
        return res.address

      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to deploy DAO ERC20')
        return
      })
  }
  return ""
}


export const getDAOERCTokenList = async (
  sudDAOAddress: string
): Promise<Array<DaoErc20>> => {
  const contractConstract = SubDAOContractConstruct
  let response: DaoErc20[] = []
  if (typeof window.ethereum !== 'undefined' && sudDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      sudDAOAddress,
      contractConstract.abi as string,
      signer
    )
    await contract
      .getTokenList()
      .then((r: any) => {
        console.log(r)
        response = r
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to list Token')
      })
  }
  return response
}

