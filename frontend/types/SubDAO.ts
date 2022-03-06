export interface SubDAODeployFormData {
  name: string
  ownerName: string
  githubUrl: string
}

export interface SubDAOData {
  ownerAddress:string
  daoAddress: string
  daoName: string
  githubURL: string
  rewardApproved:boolean
}

export interface SubDAOMemberData {
  name: string
  token_id: string
  member_id:string
}