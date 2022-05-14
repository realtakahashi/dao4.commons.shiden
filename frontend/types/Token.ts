export interface DaoErc20DeployFormData {
  name: string
  symbol: string
  subDAOAddress: string
}

export interface DaoErc20 {
  tokenAddress: string
  tokenKind: number
  name: string
  symbol: string
  totalBalance: number
  onSale: boolean
  salesAmount: number
  price: number
}

export interface DaoErc721DeployFormData {
  name: string
  symbol: string
  subDAOAddress: string
}

export interface DaoErc721 {
  tokenAddress: string
  tokenKind: number
  name: string
  symbol: string
  totalBalance: number
  onSale: boolean
  salesAmount: number
  price: number
}
