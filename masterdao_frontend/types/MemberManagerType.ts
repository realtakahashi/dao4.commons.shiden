export interface MemberInfo {
    name:string
    eoaAddress:string
    memberId:Number
    tokenId:Number 
  }
  
  export interface MemberInfoPlus {
    name:string
    eoaAddress:string
    memberId:Number
    tokenId:Number 
    isElectionCommition:boolean
  }

  export interface MemberFormData {
    name:string
    memberAddress:string
    proposalId:Number
  }
  