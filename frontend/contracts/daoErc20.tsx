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
      .then(async (res: DaoErc20[]) => {
        response = await Promise.all(res.map(async (r) => {
          const { name, symbol, totalBalance, salesAmount, onSale, price } = await getDAOERCTokenInfo(r.tokenAddress)
          return {
            ...r,
            symbol,
            name,
            totalBalance,
            salesAmount,
            onSale,
            price
          }
        }))
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to list Token')
      })
  }
  return response
}


interface response {
  name: string
  symbol: string
  totalBalance: number
  onSale: boolean
  salesAmount: number
  price: number
}
export const getDAOERCTokenInfo = async (
  tokenAddress: string
): Promise<response> => {
  const contractConstract = DAOERC20ContractConstruct
  const response = { name: "", symbol: "", totalBalance: 0, onSale: false, salesAmount: 0, price: 0, }
  if (typeof window.ethereum !== 'undefined' && tokenAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      tokenAddress,
      contractConstract.abi as string,
      signer
    )
    await contract
      .name()
      .then((res: string) => {
        response.name = res
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to get token name')
      })
    await contract
      .symbol()
      .then((res: string) => {
        response.symbol = res
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to get token symbol')
      })
    await contract
      .totalSupply()
      .then((res: { _hex: string, _isBigNumber: boolean }) => {
        response.totalBalance = parseInt(res._hex)
      })
      .catch((err: any) => {
        alert('failed to get token balance')
      })
    await contract
      .onSale()
      .then((res: boolean) => {
        response.onSale = res
      })
      .catch((err: any) => {
        alert('failed to get token balance')
      })
    await contract
      .salesAmount()
      .then((res: { _hex: string, _isBigNumber: boolean }) => {
        console.log(res)
        response.salesAmount = parseInt(ethers.utils.formatEther(res._hex))
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to get token balance')
      })
    await contract
      .priceWei()
      .then((res: { _hex: string, _isBigNumber: boolean }) => {
        response.price = parseInt(ethers.utils.formatEther(res._hex))
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to get token balance')
      })

  }
  return response
}
