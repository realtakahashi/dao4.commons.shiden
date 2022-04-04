export interface SubDAOData {
    ownerAddress:string
    daoAddress: string
    daoName: string
    githubURL: string
    description: string
    rewardApproved:boolean
  }

  export interface ApproveDaoData {
    relatedProposalId:number
    doReward:boolean
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

export interface DonateInfo {
  amount: number
  relatedProposalId:number
}