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
  eoaAddress:string
  memberId:Number
}

export interface MemberFormData {
  name:string
  memberAddress:string
  proposalId:Number
}

export interface AddProposalFormData {
  proposalKind: number
  title: string
  outline: string
  detail: string
  githubURL: string
  relatedId:string
  relatedAddress:string
}

export interface ProposalInfo {
  proposalKind: number
  title: string
  outline: string
  details: string
  githubURL: string
  proposalId:string
  relatedId:string
  relatedAddress:string
  proposalStatus: number
}
