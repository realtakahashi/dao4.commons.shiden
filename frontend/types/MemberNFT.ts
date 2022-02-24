export interface MemberNFTDeployFormData {
  name: string
  symbol: string
  token_uri: string
  subdao_address: string
}

export interface MemberNFTMintFormData {
  token_address: string
}


export interface AddMemberFormData {
  subDaoAddress: string
  tokenID: number
  nftContractAddress: string
  name: string
  memberAddress: string
}