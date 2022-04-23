import { ethers } from "hardhat";

async function main() {
// Member Manager
const MemberManager = await ethers.getContractFactory("MemberManager");
const memberManager = await MemberManager.deploy();
await memberManager.deployed();
console.log("Member Manager deployed to:", memberManager.address);

// Proposal Manager
const ProposalManager = await ethers.getContractFactory("ProposalManager");
const proposalManager = await ProposalManager.deploy();
await proposalManager.deployed();
console.log("Proposal Manager deployed to:", proposalManager.address);

// set eachother
await memberManager.setProposalManager(proposalManager.address);
await proposalManager.setMemberManager(memberManager.address);

// Mastar DAO
  const MasterDAO = await ethers.getContractFactory("MasterDAO");
  const masterdao = await MasterDAO.deploy("https://github.com/realtakahashi/dao4.commons.shiden","Shin Takahashi",
    memberManager.address, proposalManager.address);
  await masterdao.deployed();
  console.log("MasterDAO deployed to:", masterdao.address);

  //set first member
  await memberManager.addFirstMember(masterdao.address,"Shin Takahashi",0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
