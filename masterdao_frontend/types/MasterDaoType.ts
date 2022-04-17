export interface SubDAOData {
  ownerAddress: string;
  daoAddress: string;
  daoName: string;
  githubURL: string;
  description: string;
  rewardApproved: boolean;
}

export interface DonateInfo {
  amount: number;
  relatedProposalId: number;
}

export interface TargetDaoInterface {
  daoAddress: string;
  daoName: string;
  isMasterDao:boolean;
}
