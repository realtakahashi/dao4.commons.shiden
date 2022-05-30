export interface SubDAODeployFormData {
  name: string;
  githubUrl: string;
  memberNFTAddress: string;
  ownerName: string;
  description: string;
}

export interface SubDAOData {
  ownerAddress: string;
  daoAddress: string;
  daoName: string;
  githubURL: string;
  rewardApproved: boolean;
  description: string;
}
