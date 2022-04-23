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



  // set up members
  const subDaoOwner1 = await ethers.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  const subDAOMemmbersAddresses = [
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc"
  ]
  const subDAOMemmbersSigners = subDAOMemmbersAddresses.map(async (memberAddress) => {
    return await ethers.getSigner(memberAddress)
  })

  // set up subDAO
  const daoLoopCounter = 5
  for (let i = 0; i < daoLoopCounter; i++) {
    const MemberERC721ContractFactory = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
    const memberERC721Contract = await MemberERC721ContractFactory.deploy(`TEST${i}`, `TEST${i}`, `test${i}.com`);
    console.log("memberERC721 deployed to:", memberERC721Contract.address);
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
    await masterDAOContract.registerDAO(subDaoContract.address, `DAO test${i}`, "https://github.com/realtakahashi/dao4.commons.shiden", `Description ${i}`);
    console.log("subDAO: ", subDaoContract.address, "is connected to masterDAO: ", masterDAOContract.address);

    // add subdao owner as member manager
    await memberManager.connect(subDaoOwner1).addFirstMember(subDaoContract.address, `Shin Takahashi ${i} `, 1)
    console.log("subDAO owner: ", subDaoOwner1.address, "is regstered to member manager: ", memberManager.address);

    subDAOMemmbersSigners.forEach(async (m) => {
      const signer = await m
      await memberERC721Contract
        .connect(signer)
        .original_mint(
          signer.address, { value: ethers.utils.parseEther("2.0") }
        );
      console.log("memberERC721 connected to:", signer.address);
    })
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
