import { BigNumber } from "@ethersproject/bignumber";

export interface SubDAOData {
    ownerAddress:string
    daoAddress: string
    daoName: string
    githubURL: string
    rewardApproved:boolean
  }
  
export interface MemberInfo {
  name:string
  memberId:BigNumber
}

export interface MemberFormData {
  name:string
  memberAddress:string
  proposalId:Number
}