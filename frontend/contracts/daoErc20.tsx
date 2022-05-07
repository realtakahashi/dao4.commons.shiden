import { ethers } from 'ethers'
import { DaoErc20DeployFormData } from '@/types/Token'
import DAOERC20ContractConstruct from './construct/DAOERC20'

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


