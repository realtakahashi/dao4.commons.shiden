import { ethers } from "hardhat";
import { proposalConst } from "./proposal_const"

async function main() {


  const masterDAOOwner = await ethers.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

  const signerAddresses = [
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc"
  ]
  const signers = {}
  signerAddresses.forEach(async (signerAddress, i) => {
    signers[i] = await ethers.getSigner(signerAddress)
  })

  // Member Manager
  const memberManagerContractFactory = await ethers.getContractFactory("MemberManager");
  const memberManagerContract = await memberManagerContractFactory.connect(masterDAOOwner).deploy();
  await memberManagerContract.deployed();
  console.log("Member Manager deployed to:", memberManagerContract.address);

  // Proposal Manager
  const proposalManagerContractFactory = await ethers.getContractFactory("ProposalManager");
  const proposalManagerContract = await proposalManagerContractFactory.connect(masterDAOOwner).deploy();
  await proposalManagerContract.deployed();
  console.log("Proposal Manager deployed to:", proposalManagerContract.address);

  // set each other
  await memberManagerContract.connect(masterDAOOwner).setProposalManager(proposalManagerContract.address);
  await proposalManagerContract.connect(masterDAOOwner).setMemberManager(memberManagerContract.address);

  // Master DAO
  const masterDAOContractFactory = await ethers.getContractFactory("MasterDAO");
  const masterDAOContract = await masterDAOContractFactory
    .connect(masterDAOOwner)
    .deploy(
      "https://github.com/realtakahashi/dao4.commons.shiden",
      "Shin Takahashi",
      memberManagerContract.address,
      proposalManagerContract.address
    );
  await masterDAOContract.deployed();
  console.log("MasterDAO deployed to:", masterDAOContract.address);

  //set masterdao first member 
  await memberManagerContract.connect(masterDAOOwner).addFirstMember(masterDAOContract.address, "Shin Takahashi", 0);

  // // add subdao owner to masterdao
  // await proposalManagerContract
  //   .connect(masterDAOOwner)
  //   .submitProposal(masterDAOContract.address,
  //     proposalConst.kind.PROPOSAL_KIND_ADD_MEMBER,
  //     "add a new member",
  //     "I want a new member",
  //     "Please Approve to add.",
  //     "test.com",
  //     0,
  //     signers[0].address
  //   )
  // await proposalManagerContract.connect(masterDAOOwner).changeProposalStatus(masterDAOContract.address, 1, proposalConst.status.PROPOSAL_STATUS_VOTING);
  // await proposalManagerContract.connect(masterDAOOwner).voteForProposal(masterDAOContract.address, 1, true);
  // await proposalManagerContract.connect(masterDAOOwner).changeProposalStatus(masterDAOContract.address, 1, proposalConst.status.PROPOSAL_STATUS_FINISHED_VOTING);
  // await memberManagerContract.connect(masterDAOOwner).addMember(masterDAOContract.address, "Keisuke Funatsu", signers[0].address, 1, 0)

  // set up subDAO
  const daoLoopCounter = 5
  // for (let i = 0; i < daoLoopCounter; i++) {
  const MemberERC721ContractFactory = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
  const memberERC721Contract = await MemberERC721ContractFactory.connect(
    signers[0]).deploy(`TEST$`, `TEST$`, `test$.com`);
  console.log("memberERC721 deployed to:", memberERC721Contract.address);
  await memberERC721Contract
    .connect(signers[0])
    .original_mint(
      signers[0].address, { value: ethers.utils.parseEther("2.0") }
    );
  console.log("memberERC721 minted by:", signers[0].address);
  const subDAOContractFactory = await ethers.getContractFactory("SubDAO");
  const subDaoContract = await subDAOContractFactory
    .connect(signers[0])
    .deploy(
      "narusedai-2-36",
      "test.com",
      memberManagerContract.address,
      proposalManagerContract.address,
      memberERC721Contract.address
    );
  console.log("SubDAO deployed to:", subDaoContract.address);

  // add subDAO to masterDAO
  await masterDAOContract.connect(signers[0]).registerDAO(subDaoContract.address, `DAO test`, "https://github.com/realtakahashi/dao4.commons.shiden", `Description`);
  console.log("subDAO: ", subDaoContract.address, "is connected to masterDAO: ", masterDAOContract.address);

  // add subdao owner as member manager (the signer is registered as commisionar implicitly)
  await memberManagerContract.connect(signers[0]).addFirstMember(subDaoContract.address, `Shin Takahashi`, 1)
  console.log("subDAO owner: ", signers[0].address, "is regstered to member manager: ", memberManagerContract.address);

  // add member proposals
  await proposalManagerContract.connect(signers[0]).submitProposal(
    subDaoContract.address,
    proposalConst.kind.PROPOSAL_KIND_ADD_MEMBER,
    "Add Members",
    "test",
    "test",
    "https://github.com/realtakahashi",
    0,
    signers[1].address
  );

  // vote new member proposal by subdaoOwner
  await proposalManagerContract.connect(signers[0]).changeProposalStatus(subDaoContract.address, 1, proposalConst.status.PROPOSAL_STATUS_VOTING)
  await proposalManagerContract.connect(signers[0]).voteForProposal(subDaoContract.address, 1, true)
  await proposalManagerContract.connect(signers[0]).changeProposalStatus(subDaoContract.address, 1, proposalConst.status.PROPOSAL_STATUS_FINISHED_VOTING)

  // add member 
  await memberManagerContract.connect(signers[0]).addMember(subDaoContract.address, "Keisuke Funatsu", signers[1].address, 1, 2);


  // // add subdao owner as election commision 
  // await proposalManagerContract.connect(masterDAOOwner).submitProposal(
  // masterDAOContract.address,
  //   proposalConst.kind.PROPOSAL_KIND_ELECTION_COMISSION_PROPOSAL,
  //   "Election Comission.",
  //   "Select SudDaoOwner1 to Election Comission.",
  //   "select SubDaoOwner1.",
  //   "test.com",
  //   0,
  //   signers[0].address
  // );
  // await proposalManagerContract.connect(masterDAOOwner).changeProposalStatus(masterDAOContract.address, 7, status.PROPOSAL_STATUS_VOTING);
  // await proposalManagerContract.connect(masterDAOOwner).voteForProposal(masterDAOContract.address, 7, true);
  // await proposalManagerContract.connect(signers[0]).voteForProposal(masterDAOContract.address, 7, true);
  // await proposalManagerContract.connect(masterDAOOwner).changeProposalStatus(masterDAOContract.address, 7, status.PROPOSAL_STATUS_FINISHED_VOTING);

  
}
// }


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
