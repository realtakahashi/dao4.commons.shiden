export interface MemberNFTDeployFormData {
    name: string
    symbol: string
    tokenURI: string
  }
  
  export interface MemberNFTMintFormData {
    token_address: string
  }
  
  
  export interface AddMemberFormData {
    tokenID: number  
    name: string
    memberAddress: string
    relatedProposalId: number
  }
  