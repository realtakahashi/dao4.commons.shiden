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

  // set each other
  await memberManager.setProposalManager(proposalManager.address);
  await proposalManager.setMemberManager(memberManager.address);

  // Mastar DAO
  const masterDAOContractFactory = await ethers.getContractFactory("MasterDAO");
  const masterDAOContract = await masterDAOContractFactory.deploy("https://github.com/realtakahashi/dao4.commons.shiden", "Shin Takahashi",
    memberManager.address, proposalManager.address);
  await masterDAOContract.deployed();
  console.log("MasterDAO deployed to:", masterDAOContract.address);

  //set masterdao first member 
  await memberManager.addFirstMember(masterDAOContract.address, "Shin Takahashi", 0);

  const MemberERC721ContractFactory = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
  const memberERC721Contract = await MemberERC721ContractFactory.deploy("TEST", "TEST", "test.com");
  console.log("memberERC721 deployed to:", memberERC721Contract.address);
  const subDaoOwner1 = await ethers.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  await memberERC721Contract
    .connect(subDaoOwner1)
    .original_mint(
      subDaoOwner1.address, { value: ethers.utils.parseEther("2.0") }
    );
  console.log("memberERC721 connected to:", subDaoOwner1.address);
  const subDAOContractFactory = await ethers.getContractFactory("SubDAO");
  const subDaoContract = await subDAOContractFactory
    .connect(subDaoOwner1)
    .deploy(
      "narusedai-2-36",
      "test.com",
      memberManager.address,
      proposalManager.address,
      memberERC721Contract.address
    );
  console.log("SubDAO deployed to:", subDaoContract.address);

  // add subDAO to masterDAO
  await masterDAOContract.registerDAO(subDaoContract.address, "DAO test1", "https://github.com/realtakahashi/dao4.commons.shiden", "Description1");
  console.log("subDAO: ", subDaoContract.address, "is connected to masterDAO: ", masterDAOContract.address);

  // add subdao owner as member manager
  await memberManager.connect(subDaoOwner1).addFirstMember(subDaoContract.address, "Shin Takahashi", 1)
  console.log("subDAO owner: ",subDaoOwner1.address, "is regstered to member manager: ", memberManager.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
