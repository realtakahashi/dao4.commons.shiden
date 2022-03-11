export interface TokenInfo {
    tokenID: number
    tokenKind: number
    name: string
    symbol: string
    address: string
}

export interface AddErc20Input {
    name: string
    symbol: string
//    daoAddress:string
    price:string
    amount:string
}
  