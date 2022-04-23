import { ethers } from "hardhat";

async function main() {

  let MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4;

  // before(async function() {
      [MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4, SubDaoOwner5] = await ethers.getSigners();
  // });

  // Member Manager
  const MemberManager = await hre.ethers.getContractFactory("MemberManager");
  const memberManager = await MemberManager.deploy();
  await memberManager.deployed();
  console.log("Member Manager deployed to:", memberManager.address);

  // Proposal Manager
  const ProposalManager = await hre.ethers.getContractFactory("ProposalManager");
  const proposalManager = await ProposalManager.deploy();
  await proposalManager.deployed();
  console.log("Proposal Manager deployed to:", proposalManager.address);

  // set each other
  await memberManager.setProposalManager(proposalManager.address);
  await proposalManager.setMemberManager(memberManager.address);

  // Mastar DAO
  const MasterDAO = await hre.ethers.getContractFactory("MasterDAO");
  const masterdao = await MasterDAO.deploy("https://github.com/realtakahashi/dao4.commons.shiden", "Shin Takahashi",
    memberManager.address, proposalManager.address);
  await masterdao.deployed();
  console.log("MasterDAO deployed to:", masterdao.address);

  //set first member
  await memberManager.addFristMember(masterdao.address, "Shin Takahashi", 0);


  const MemberERC721Contract = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
  const memberERC721 = await MemberERC721Contract.connect(SubDaoOwner1).deploy("TEST", "TEST", "test.com");
  await memberERC721.connect(SubDaoOwner1).original_mint(SubDaoOwner1.address, { value: ethers.utils.parseEther("2.0") });

  // it("SubDao deployment For MemberNFT Test", async function () {
  //   const SubDaoa = await ethers.getContractFactory("SubDAO");
  //   subDaoa = await SubDaoa.connect(SubDaoOwner1).deploy("narusedai-2-36", "test.com", memberManager.address,
  //     proposalManager.address, memberERC721.address);
  //   assert.equal(await subDaoa.daoName(), "narusedai-2-36");
  //   assert.equal(await subDaoa.githubURL(), "test.com");
  // });
  // it("Add Frist member for subdao a.", async function () {
  //   await memberManager.connect(SubDaoOwner1).addFristMember(subDaoa.address, "Shin Takahashi", 1)
  //   const list = await memberManager.getMemberList(subDaoa.address);
  //   const member = list[0];
  //   assert.equal(member.name, "Shin Takahashi");
  //   assert.equal(member.memberId, 1);
  // });
  // it("Mint fail for without depositing.", async function () {
  //   await expect(memberERC721.connect(SubDaoOwner3)
  //     .original_mint(SubDaoOwner1.address, { value: ethers.utils.parseEther("1.9") }))
  //     .to.be.revertedWith('10 token is needed as deposit.');
  // });
  // it("Burn fail because without minting.", async function () {
  //   await expect(memberERC721.connect(SubDaoOwner3)
  //     .burn(1))
  //     .to.be.revertedWith("can't burn");
  // });
  // it("Normal Burn", async function () {
  //   beforeBalanceOfSubDaoOwner3 = parseInt(ethers.utils.formatEther(await SubDaoOwner3.getBalance()));
  //   await memberERC721.connect(SubDaoOwner3).original_mint(SubDaoOwner3.address, { value: ethers.utils.parseEther("2.0") });
  //   assert.equal(await memberERC721.balanceOf(SubDaoOwner3.address), 1);
  //   assert.equal(await memberERC721.ownerOf(2), SubDaoOwner3.address);
  //   await memberERC721.connect(SubDaoOwner3).burn(2);
  //   const afterBalanceOfSubDaoOwner3 = parseInt(ethers.utils.formatEther(await SubDaoOwner3.getBalance()));
  //   // console.log("## before:",beforeBalanceOfSubDaoOwner3)
  //   // console.log("## after:",afterBalanceOfSubDaoOwner3)
  //   assert.equal(afterBalanceOfSubDaoOwner3 == beforeBalanceOfSubDaoOwner3, true);
  // });
  // it("Deny Double minting & Get My Token Id.", async function () {
  //   const MemberERC721 = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
  //   memberERC721b = await MemberERC721.connect(SubDaoOwner5).deploy("TEST", "TEST", "test.com");
  //   await memberERC721b.connect(SubDaoOwner5).original_mint(SubDaoOwner5.address, { value: ethers.utils.parseEther("2.0") });
  //   assert.equal(await memberERC721b.balanceOf(SubDaoOwner5.address), 1);
  //   assert.equal(await memberERC721b.ownerOf(1), SubDaoOwner5.address);
  //   await expect(memberERC721b.connect(SubDaoOwner5).original_mint(SubDaoOwner5.address, {
  //     value: ethers.utils.
  //       parseEther("2.0")
  //   }))
  //     .to.be.revertedWith("Already minted.");
  //   assert.equal(await memberERC721b.ownedTokenId(SubDaoOwner5.address), 1);
  // });
  // it("If you burn a NFT, you can mint again.", async function () {
  //   await memberERC721b.connect(SubDaoOwner5).burn(1);
  //   assert.equal(await memberERC721b.balanceOf(SubDaoOwner5.address), 0);
  //   await expect(memberERC721b.ownerOf(1)).to.be.revertedWith("ERC721: owner query for nonexistent token");
  //   assert.equal(await memberERC721b.ownedTokenId(SubDaoOwner5.address), 0);
  //   await memberERC721b.connect(SubDaoOwner5).original_mint(SubDaoOwner5.address, { value: ethers.utils.parseEther("2.0") });
  //   assert.equal(await memberERC721b.balanceOf(SubDaoOwner5.address), 1);
  //   assert.equal(await memberERC721b.ownerOf(2), SubDaoOwner5.address);
  //   assert.equal(await memberERC721b.ownedTokenId(SubDaoOwner5.address), 2);
  // });
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
