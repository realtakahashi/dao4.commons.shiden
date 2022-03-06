export interface MemberNFTDeployFormData {
  name: string
  symbol: string
  tokenURI: string
  tokenURI: string
}

export interface MemberNFTMintFormData {
  token_address: string
}


export interface AddMemberFormData {
  tokenID: number
  nftContractAddress: string
  name: string
  memberAddress: string
}
