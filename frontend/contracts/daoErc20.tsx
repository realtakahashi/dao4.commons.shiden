import { ethers } from 'ethers'
import { DaoErc20DeployFormData, DaoErc20 } from '@/types/Token'
import { DAOERC20ContractConstruct, SubDAOContractConstruct } from './construct'
import { tokenConst } from './const'

export const deployDaoErc20 = async (
  inputData: DaoErc20DeployFormData
): Promise<string> => {
  const contractConstract = DAOERC20ContractConstruct
  let response: string = ""
  if (!inputData.name || !inputData.symbol || !inputData.subDAOAddress) {
    return "failed"
  }
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      contractConstract.abi as string,
      contractConstract.bytecode,
      signer
    )
    console.log(inputData)
    await factory
      .deploy(
        inputData.name,
        inputData.symbol,
        inputData.subDAOAddress
      )
      .then(async (res: { address: string }) => {
        console.log(res)
        alert('Succeeded to deploy DAO ERC20')
        await AddDAOERC20ToTokenList(res.address, inputData.subDAOAddress)
        response = res.address

      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to deploy DAO ERC20')
        response = "failed"
      })
  }
  return response
}

export const AddDAOERC20ToTokenList = async (
  tokenAddress: string,
  subDAOAddress: string
): Promise<boolean> => {
  const contractConstract = SubDAOContractConstruct
  if (typeof window.ethereum !== 'undefined' && tokenAddress && subDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOAddress,
      contractConstract.abi as string,
      signer
    )
    await contract
      .addTokenToList(tokenConst.TOKEN_KIND_ERC20, tokenAddress)
      .then((res: string) => {
        console.log(res)
        alert('Added erc20 to token list')
        return true
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to add erc20 to token list')
        return false
      })
  }
  alert('Failed to add erc20 to token list')
  return false
}

export const controlERC20TokenSale = async (
  tokenAddress: string,
  saleStatus: boolean
): Promise<void> => {
  const contractConstract = DAOERC20ContractConstruct
  if (typeof window.ethereum !== 'undefined' && tokenAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      tokenAddress,
      contractConstract.abi as string,
      signer
    )
    await contract
      .controlTokenSale(saleStatus)
      .then((res: string) => {
        console.log(res)
        alert('Success token sale status chaneged')
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to token sale status chaneged')
        return
      })
  }
  return
}

export const getDAOERC20TokenList = async (
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
        const list = await Promise.all(res.map(async (r) => {
          if (r.tokenKind === 0) {
            const { name, symbol, totalBalance, salesAmount, onSale, price } = await getDAOERC20TokenInfo(r.tokenAddress)
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
export const getDAOERC20TokenInfo = async (
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
        alert('failed to get token total supply')
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


