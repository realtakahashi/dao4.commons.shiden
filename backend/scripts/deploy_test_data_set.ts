import { ethers } from "hardhat"
import { proposalConst, tokenConst } from "./const"
import { NonceManager } from "@ethersproject/experimental"

async function main() {


  const masterDAOOwner = await ethers.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

  const signerAddresses = [
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc"
  ]

  let signers: NonceManager[] = []

  signerAddresses.forEach(async (signerAddress, i) => {
    const signer = await ethers.getSigner(signerAddress)
    signers[i] = new NonceManager(signer)
  })

  // Member Manager
  const memberManagerContractFactory = await ethers.getContractFactory("MemberManager")
  const memberManagerContract = await memberManagerContractFactory.connect(masterDAOOwner).deploy()
  await memberManagerContract.deployed()
  console.log("Member Manager deployed to:", memberManagerContract.address)

  // Proposal Manager
  const proposalManagerContractFactory = await ethers.getContractFactory("ProposalManager")
  const proposalManagerContract = await proposalManagerContractFactory.connect(masterDAOOwner).deploy()
  await proposalManagerContract.deployed()
  console.log("Proposal Manager deployed to:", proposalManagerContract.address)

  // set each other
  await memberManagerContract.connect(masterDAOOwner).setProposalManager(proposalManagerContract.address)
  await proposalManagerContract.connect(masterDAOOwner).setMemberManager(memberManagerContract.address)

  // Master DAO
  const masterDAOContractFactory = await ethers.getContractFactory("MasterDAO")
  const masterDAOContract = await masterDAOContractFactory
    .connect(masterDAOOwner)
    .deploy(
      "https://github.com/realtakahashi/dao4.commons.shiden",
      "Shin Takahashi",
      memberManagerContract.address,
      proposalManagerContract.address
    )
  await masterDAOContract.deployed()
  console.log("MasterDAO deployed to:", masterDAOContract.address)

  //set masterdao first member 
  await memberManagerContract.connect(masterDAOOwner).addFirstMember(masterDAOContract.address, "Shin Takahashi", 0)

  // set up subDAO  
  for (let i = 0; i < signers.length; i++) {
    const a = await signers[i].getAddress()
    const MemberERC721ContractFactory = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId")
    const memberERC721Contract = await MemberERC721ContractFactory.connect(
      signers[i]).deploy(`TEST${i}`, `TEST${i}`, `test${i}.com`)
    await memberERC721Contract.deployed()
    console.log("memberERC721 deployed to:", memberERC721Contract.address)
    await memberERC721Contract
      .connect(signers[i])
      .original_mint(
        a, { value: ethers.utils.parseEther("2.0") }
      )
    console.log("memberERC721 minted by:", a)
    const subDAOContractFactory = await ethers.getContractFactory("SubDAO")
    const subDaoContract = await subDAOContractFactory
      .connect(signers[i])
      .deploy(
        "narusedai-2-36",
        "test.com",
        memberManagerContract.address,
        proposalManagerContract.address,
        memberERC721Contract.address
      )
    await subDaoContract.deployed()
    console.log("SubDAO deployed to:", subDaoContract.address)

    // add subDAO to masterDAO
    await masterDAOContract.connect(signers[i]).registerDAO(subDaoContract.address, `DAO test ${i}`, "https://github.com/realtakahashi/dao4.commons.shiden", `Description`)
    console.log("subDAO: ", subDaoContract.address, "is connected to masterDAO: ", masterDAOContract.address)

    // add subdao owner as member manager (the signer is registered as commisionar implicitly)
    await memberManagerContract.connect(signers[i]).addFirstMember(subDaoContract.address, `Shin Takahashi`, 1)
    console.log("subDAO owner: ", a, "is regstered to member manager: ", memberManagerContract.address)

    const findOtherSigners = async () => {
      const signerAddress = await signers[i].getAddress()
      const otherAddress = signerAddresses.filter((s) => {
        return s.toUpperCase() !== signerAddress.toUpperCase()
      })
      return await Promise.all(otherAddress.map(async (s, k) => {
        const signer = await ethers.getSigner(s)
        return new NonceManager(signer)
      }))
    }

    const otherSigners = await findOtherSigners()
    // add other signer as member
    otherSigners.forEach(async (s, j) => {
      const addressAsMember = await s.getAddress()
      // // just wait for queue auto mining problem
      // const waitMining = () => {
      // setTimeout(function () {
      // }, 5000)}
      // waitMining()
      // // add member proposals
      // await proposalManagerContract.connect(signers[i]).submitProposal(
      //   subDaoContract.address,
      //   proposalConst.kind.PROPOSAL_KIND_ADD_MEMBER,
      //   `Add Members ${j}`,
      //   `add ${addressAsMember} as member`,
      //   `add ${addressAsMember} as member`,
      //   "https://github.com/realtakahashi",
      //   0,
      //   addressAsMember
      // )
      // console.log("member proposal added to:", subDaoContract.address)

      // // vote new member proposal by subdaoOwner
      // await proposalManagerContract.connect(signers[i]).changeProposalStatus(subDaoContract.address, j + 1, proposalConst.status.PROPOSAL_STATUS_VOTING)
      // await proposalManagerContract.connect(signers[i]).voteForProposal(subDaoContract.address, j + 1, true)
      // await proposalManagerContract.connect(signers[i]).changeProposalStatus(subDaoContract.address, j + 1, proposalConst.status.PROPOSAL_STATUS_FINISHED_VOTING)

      // // add member 
      // if ((j + 1) % 2 === 0) {
      //   await memberManagerContract.connect(signers[i]).addMember(subDaoContract.address, `Keisuke Funatsu${j + 1}`, addressAsMember, j + 1, j)
      //   console.log("member added to:", subDaoContract.address)
      // }
    })

    // Token sale ERC20
    const daoErc20TokenTotalSupply = 30000
    const daoErc20ContractFactory = await ethers.getContractFactory("DaoERC20")
    const daoErc20Contract = await daoErc20ContractFactory.connect(signers[i]).deploy("DAO ERC20", "D20", subDaoContract.address)
    await daoErc20Contract.deployed()
    console.log("erc20 token deployed to:", daoErc20Contract.address)
    await subDaoContract.connect(signers[i]).addTokenToList(tokenConst.TOKEN_KIND_ERC20, daoErc20Contract.address)
    await daoErc20Contract.connect(signers[i]).mint(ethers.utils.parseEther("2.0"), daoErc20TokenTotalSupply)
    console.log("erc20 token minted:", daoErc20Contract.address)
    if (i % 2 === 0) {
      await daoErc20Contract.connect(signers[i]).controlTokenSale(true)
      await daoErc20Contract.connect(signers[i]).buy(10, { value: ethers.utils.parseEther("20.0") })
      console.log("erc20 token bought by:", await signers[i].getAddress())
    }

    // Token sale ERC721
    const daoErc721ContractFactory = await ethers.getContractFactory("DaoERC721")
    const daoErc721Contract = await daoErc721ContractFactory
      .connect(signers[i])
      .deploy(
        `DAO ERC721-${i} `,
        `D721-${i}`,
        subDaoContract.address,
        ethers.utils.parseEther("2.0"),
        "test uri"
      )
    console.log("erc721: ", daoErc721Contract.address, " was deployed")
    await subDaoContract.connect(signers[i]).addTokenToList(tokenConst.TOKEN_KIND_ERC721, daoErc721Contract.address)
    if (i % 2 !== 0) {
      await daoErc721Contract.connect(signers[i]).controlTokenSale(true)
      await daoErc721Contract.connect(signers[i]).buy({ value: ethers.utils.parseEther("2.0") })
    }

    console.log("erc721 token", daoErc721Contract.address, " was bought")



    // it("check contract balance & withdraw.", async function () {
    //   assert.equal(await daoErc20.getContractBalance(), 20000000000000000000);
    //   const beforedaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));
    //   await daoErc20.withdraw();
    //   const afterdaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));
    //   assert.equal(afterdaobalance - beforedaobalance > 19, true);
    // });
  }
}


main()

  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
