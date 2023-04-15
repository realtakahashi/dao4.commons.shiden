import { expect, assert } from "chai"
import { ethers } from "hardhat"

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("Cooperate contract", function () {
    let MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4, SubDaoOwner5

    before(async function () {
        [MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4, SubDaoOwner5] = await ethers.getSigners()
    })

    const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

    // Proposal kind
    const PROPOSAL_KIND_ADD_MEMBER = 0
    const PROPOSAL_KIND_DELETE_MEMBER = 1
    const PROPOSAL_KIND_USE_OF_FUNDS = 2
    const PROPOSAL_KIND_COMMUNITY_MANAGEMENT = 3
    const PROPOSAL_KIND_ACTIVITIES = 4
    const PROPOSAL_KIND_ELECTION_COMISSION_PROPOSAL = 5
    const PROPOSAL_KIND_DAO_REWARD = 6
    const PROPOSAL_KIND_COOP_PROPOSAL = 7

    // Cooperate Proposal kind
    const CO_PROPOSAL_KIND_USE_OF_FUNDS = 0
    const CO_PROPOSAL_KIND_COMMUNITY_MANAGEMENT = 1
    const CO_PROPOSAL_KIND_ACTIVITIES = 2

    // Proposal status
    const PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB = 0
    const PROPOSAL_STATUS_VOTING = 1
    const PROPOSAL_STATUS_PENDING = 2
    const PROPOSAL_STATUS_RUNNING = 3
    const PROPOSAL_STATUS_REJECTED = 4
    const PROPOSAL_STATUS_FINISHED_VOTING = 5
    const PROPOSAL_STATUS_FINISHED = 6

    let masterDao
    let memberERC721
    let memberERC721a
    let memberERC721b
    let subDao
    let subDaoa
    let daoErc20
    let daoErc721
    let memberManager
    let proposalManager
    let cooperateProposalManager
    let cooperateProposal

    interface CooperateProposalInfo {
        coProposalKind: number;
        daoAddressList: string[];
         title: string;
        outline: string;
        details: string;
        githubURL: string;
        proposalId: string;
        relatedProposalIdList: string[];
        proposalStatus: number;
        targetAddressList: string[];
        targetAmount: string;
        addressOfThisContract: string;
      }

      // interface CooperateProposalInfo {
    //     coProposalKind: number;
    //     daoAddressList: string[];
    //      title: string;
    //     outline: string;
    //     details: string;
    //     githubURL: string;
    //     proposalId: number;
    //     relatedProposalIdList: number[];
    //     proposalStatus: number;
    //     targetAddressList: string[];
    //     targetAmount: number;
    //     addressOfThisContract: string;
    //   }
      
    describe("MemberManager", function () {
        it("MemberManager Deployment.", async function () {
            const MemberManager = await ethers.getContractFactory("MemberManager")
            memberManager = await MemberManager.connect(MasterDaoOwner).deploy()
            // console.log("memberManager Address:",memberManager.address);
            assert.equal(memberManager.address != "", true)
        })
    })

    describe("ProposalManager", function () {
        it("ProposalManager Deployment.", async function () {
            const ProposalManager = await ethers.getContractFactory("ProposalManager")
            proposalManager = await ProposalManager.connect(MasterDaoOwner).deploy()
            assert.equal(proposalManager.address != "", true)
        })
    })

    describe("Master DAO", function () {
        it("MasterDAO Deployment.", async function () {
            await memberManager.connect(MasterDaoOwner).setProposalManager(proposalManager.address)
            await proposalManager.connect(MasterDaoOwner).setMemberManager(memberManager.address)

            const MasterDao = await ethers.getContractFactory("MasterDAO")
            masterDao = await MasterDao.connect(MasterDaoOwner).deploy("test.com", 'shin.takahashi', memberManager.address,
                proposalManager.address)
            await memberManager.connect(MasterDaoOwner).addFirstMember(masterDao.address, 'shin.takahashi', 0)
            const list = await memberManager.getMemberList(masterDao.address)
            assert.equal(await list[0].memberId, 1)
            assert.equal(await list[0].name, "shin.takahashi")
        })
    })
    describe("Sub DAO A", async function () {
        it("MemberERC721 Deployment.", async function () {
            const MemberERC721 = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId")
            memberERC721 = await MemberERC721.connect(SubDaoOwner1).deploy("TEST1", "TEST1", "test.com")
            assert.equal(await memberERC721.name(), "TEST1")
            assert.equal(await memberERC721.symbol(), "TEST1")
        })
        it("MemberERC721a first mint", async function () {
            await memberERC721.connect(SubDaoOwner1).original_mint(SubDaoOwner1.address, { value: ethers.utils.parseEther("2.0") })
            assert.equal(await memberERC721.balanceOf(SubDaoOwner1.address), 1)
            assert.equal(await memberERC721.ownerOf(1), SubDaoOwner1.address)
        })
        it("SubDao deployment", async function () {
            const SubDao = await ethers.getContractFactory("SubDAO")
            subDao = await SubDao.connect(SubDaoOwner1).deploy("narusedai-2-36", "test.com", memberManager.address,
                proposalManager.address, memberERC721.address)
            assert.equal(await subDao.daoName(), "narusedai-2-36")
            assert.equal(await subDao.githubURL(), "test.com")
        })
        it("add First member for subdao.", async function () {
            await memberManager.connect(SubDaoOwner1).addFirstMember(subDao.address, "Shin Takahashi", 1)
            const list = await memberManager.getMemberList(subDao.address)
            const member = list[0]
            assert.equal(member.name, "Shin Takahashi")
            assert.equal(member.memberId, 1)
        })
        it("add cooperate proposal",async function ()  {
            await proposalManager.connect(SubDaoOwner1).submitProposal(subDao.address, PROPOSAL_KIND_COOP_PROPOSAL, "Test", "test",
                "test", "https://github.com/realtakahashi", 0, SubDaoOwner2.address)
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 1, PROPOSAL_STATUS_VOTING)
            await proposalManager.connect(SubDaoOwner1).voteForProposal(subDao.address, 1, true)
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 1, PROPOSAL_STATUS_FINISHED_VOTING)
            const proposalList = await proposalManager.connect(SubDaoOwner2).getProposalList(subDao.address)
            assert.equal(proposalList[0].proposalKind, 7)
        })
    })
    describe("Sub DAO B", async function () {
        it("MemberERC721 Deployment.", async function () {
            const MemberERC721a = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId")
            memberERC721a = await MemberERC721a.connect(SubDaoOwner1).deploy("TESTa", "TESTa", "test.com")
            assert.equal(await memberERC721a.name(), "TESTa")
            assert.equal(await memberERC721a.symbol(), "TESTa")
        })
        it("MemberERC721a first mint", async function () {
            await memberERC721a.connect(SubDaoOwner2).original_mint(SubDaoOwner2.address, { value: ethers.utils.parseEther("2.0") })
            assert.equal(await memberERC721a.balanceOf(SubDaoOwner2.address), 1)
            assert.equal(await memberERC721a.ownerOf(1), SubDaoOwner2.address)
        })
        it("SubDao deployment", async function () {
            const SubDaoa = await ethers.getContractFactory("SubDAO")
            subDaoa = await SubDaoa.connect(SubDaoOwner2).deploy("narusedai-2-36", "test.com", memberManager.address,
                proposalManager.address, memberERC721a.address)
            assert.equal(await subDaoa.daoName(), "narusedai-2-36")
            assert.equal(await subDaoa.githubURL(), "test.com")
        })
        it("add First member for subdao.", async function () {
            await memberManager.connect(SubDaoOwner2).addFirstMember(subDaoa.address, "Shin Takahashi", 1)
            const list = await memberManager.getMemberList(subDaoa.address)
            const member = list[0]
            assert.equal(member.name, "Shin Takahashi")
            assert.equal(member.memberId, 1)
        })
        it("add cooperate proposal",async function ()  {
            await proposalManager.connect(SubDaoOwner2).submitProposal(subDaoa.address, PROPOSAL_KIND_COOP_PROPOSAL, "Test", "test",
                "test", "https://github.com/realtakahashi", 0, SubDaoOwner3.address)
            await proposalManager.connect(SubDaoOwner2).changeProposalStatus(subDaoa.address, 1, PROPOSAL_STATUS_VOTING)
            await proposalManager.connect(SubDaoOwner2).voteForProposal(subDaoa.address, 1, true)
            await proposalManager.connect(SubDaoOwner2).changeProposalStatus(subDaoa.address, 1, PROPOSAL_STATUS_FINISHED_VOTING)
            const proposalList = await proposalManager.connect(SubDaoOwner2).getProposalList(subDaoa.address)
            assert.equal(proposalList[0].proposalKind, 7)
        })
    })
    describe("Cooperate Proposal", async function () {
        it("Cooperate Proposal Manager Deployment.", async function () {
            const CooperateProposalManager = await ethers.getContractFactory("CooperateProposalManager")
            cooperateProposalManager = await CooperateProposalManager.connect(SubDaoOwner1).deploy()
            assert.equal(cooperateProposalManager.address != "", true)
        })
        it("Cooperate Proposal Deployment normal works.", async function () {
            const coProposal:CooperateProposalInfo = {
                coProposalKind: 0,
                daoAddressList: [subDao.address,subDaoa.address],
                 title: "test title",
                 outline: "test outline",
                details: "test details",
                githubURL: "test url",
                proposalId: "0",
                relatedProposalIdList: ["1","1"],
                proposalStatus: 0,
                targetAddressList: [SubDaoOwner1.address, SubDaoOwner2.address],
                targetAmount: "100000",
                addressOfThisContract: ADDRESS_ZERO,    
            }
            const CooperateProposal = await ethers.getContractFactory("CooperateProposal")
            cooperateProposal = await CooperateProposal.connect(SubDaoOwner1).deploy(
                memberManager.address,
                proposalManager.address,
                cooperateProposalManager.address,
                coProposal
            )
            assert.equal(cooperateProposal.address != "", true)
            const list = await cooperateProposalManager.getCooperateProposalList();
            assert.equal(list.length,1);
            const proposal = list[0];
            assert.equal(proposal.proposalId,0);
            assert.equal(proposal.title,"test title");
        })

    })
})