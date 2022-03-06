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
  tokenId: {
    _hex: string
  }
  memberId: {
    _hex: string
  }
}