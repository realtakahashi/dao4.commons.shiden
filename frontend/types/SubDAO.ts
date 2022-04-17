export interface SubDAODeployFormData {
  name: string
  githubUrl: string
  memberNFTAddress: string
  ownerName: string
  description: string
}

export interface SubDAOData {
  ownerAddress: string
  daoAddress: string
  daoName: string
  githubURL: string
  rewardApproved: boolean
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

export interface DeleteMemberFormData {
  memberAddress: string
  relatedProposalId: number
}
