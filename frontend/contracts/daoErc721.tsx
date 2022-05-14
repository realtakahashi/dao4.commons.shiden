import { ethers } from 'ethers'
import { DaoErc721DeployFormData, DaoErc721 } from '@/types/Token'
import { DAOERC721ContractConstruct, SubDAOContractConstruct } from './construct'
import { tokenConst } from './const'

export const deployDaoErc721 = async (
  inputData: DaoErc721DeployFormData
): Promise<string> => {
  const contractConstract = DAOERC721ContractConstruct
  let response: string = ""
  if (!inputData.name || !inputData.symbol || !inputData.subDAOAddress || inputData.price || !inputData.tokenUri) {
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
    await factory
      .deploy(
        inputData.name,
        inputData.symbol,
        inputData.subDAOAddress,
        inputData.price,
        inputData.tokenUri
      )
      .then(async (res: { address: string }) => {
        console.log(res)
        alert('Succeeded to deploy DAO ERC721')
        await AddDAOERC721ToTokenList(res.address, inputData.subDAOAddress)
        response = res.address
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to deploy DAO ERC721')
        response = "failed"
      })
  }
  return response
}

export const AddDAOERC721ToTokenList = async (
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
      .addTokenToList(tokenConst.TOKEN_KIND_ERC721, tokenAddress)
      .then((res: string) => {
        console.log(res)
        alert('Added erc721 to token list')
        return true
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to add erc721 to token list')
        return false
      })
  }
  alert('Failed to add erc721 to token list')
  return false
}

export const buyERC721Token = async (
  amount: number,
  tokenAddress: string
): Promise<void> => {
  const contractConstract = DAOERC721ContractConstruct
  if (typeof window.ethereum !== 'undefined' && tokenAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      tokenAddress,
      contractConstract.abi as string,
      signer
    )
    await contract
      .buy(10, { value: ethers.utils.parseEther("721.0") })
      .then((res: string) => {
        console.log(res)
        alert('Success token bought')
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to token buy')
        return
      })
  }
  return
}

export const controlERC721TokenSale = async (
  tokenAddress: string,
  saleStatus: boolean
): Promise<void> => {
  const contractConstract = DAOERC721ContractConstruct
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
          if (r.tokenKind === 0) {
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


