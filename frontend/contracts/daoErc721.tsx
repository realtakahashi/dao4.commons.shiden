import { ethers } from 'ethers'
import { DaoErc721DeployFormData, DaoErc721 } from '@/types/Token'
import { DAOERC721ContractConstruct } from './construct'
import { SubDAOContractConstruct } from './construct'

export const deployDaoErc721 = async (
  inputData: DaoErc721DeployFormData
): Promise<string> => {
  const contractConstract = DAOERC721ContractConstruct
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
        alert('Succeeded to deploy DAO ERC721')
        return res.address

      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to deploy DAO ERC721')
        return
      })
  }
  return ""
}


export const getDAOERC721TokenList = async (
  sudDAOAddress: string
): Promise<Array<DaoErc721>> => {
  const contractConstract = SubDAOContractConstruct
  let response: DaoErc721[] = []
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
      .then(async (res: DaoErc721[]) => {
        const list = await Promise.all(res.map(async (r) => {
          if (r.tokenKind === 1) {
            const { name, symbol, totalBalance, salesAmount, onSale, price } = await getDAOERC721TokenInfo(r.tokenAddress)
            return {
              ...r,
              symbol,
              name,
              totalBalance,
              salesAmount,
              onSale,
              price
            }
          }
        }))
        list.forEach((l) => {
          if (typeof l !== "undefined") {
            response.push(l)
          }
        })
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
export const getDAOERC721TokenInfo = async (
  tokenAddress: string
): Promise<response> => {
  const contractConstract = DAOERC721ContractConstruct
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
      .onSale()
      .then((res: boolean) => {
        response.onSale = res
      })
      .catch((err: any) => {
        alert('failed to get token onsale')
      })
    await contract
      .salesAmount()
      .then((res: { _hex: string, _isBigNumber: boolean }) => {
        response.salesAmount = parseInt(ethers.utils.formatEther(res._hex))
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to get token salesamount')
      })
    await contract
      .priceWei()
      .then((res: { _hex: string, _isBigNumber: boolean }) => {
        response.price = parseInt(ethers.utils.formatEther(res._hex))
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to get token pricewei')
      })

  }
  return response
}
