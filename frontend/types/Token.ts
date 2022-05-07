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
  balance: number
}


