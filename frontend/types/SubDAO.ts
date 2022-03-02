export interface SubDAODeployFormData {
  name: string
  owner_name: string
  github_url: string
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