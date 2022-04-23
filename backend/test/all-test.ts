import { expect, assert } from "chai"
import { ethers } from "hardhat"

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("All contract", function () {
    let MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4, SubDaoOwner5;

    before(async function () {
        [MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4, SubDaoOwner5] = await ethers.getSigners();
    });

    // Proposal kind
    const PROPOSAL_KIND_ADD_MEMBER = 0;
    const PROPOSAL_KIND_DELETE_MEMBER = 1;
    const PROPOSAL_KIND_USE_OF_FUNDS = 2;
    const PROPOSAL_KIND_COMMUNITY_MANAGEMENT = 3;
    const PROPOSAL_KIND_ACTIVITIES = 4;
    const PROPOSAL_KIND_ELECTION_COMISSION_PROPOSAL = 5;
    const PROPOSAL_KIND_DAO_REWARD = 6;

    // Proposal status
    const PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB = 0;
    const PROPOSAL_STATUS_VOTING = 1;
    const PROPOSAL_STATUS_PENDING = 2;
    const PROPOSAL_STATUS_RUNNING = 3;
    const PROPOSAL_STATUS_REJECTED = 4;
    const PROPOSAL_STATUS_FINISHED_VOTING = 5;
    const PROPOSAL_STATUS_FINISHED = 6;

    // token kind
    const TOKEN_KIND_ERC20 = 0;
    const TOKEN_KIND_ERC721 = 1;

    const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

    let masterDao;
    let memberERC721;
    let memberERC721a;
    let memberERC721b;
    let subDao;
    let subDaoa;
    let daoErc20;
    let daoErc721;
    let memberManager;
    let proposalManager;

    describe("MemberManager", function () {
        it("MemberManager Deployment.", async function () {
            const MemberManager = await ethers.getContractFactory("MemberManager");
            memberManager = await MemberManager.connect(MasterDaoOwner).deploy();
            // console.log("memberManager Address:",memberManager.address);
            assert.equal(memberManager.address != "", true);
        });
    });

    describe("ProposalManager", function () {
        it("ProposalManager Deployment.", async function () {
            const ProposalManager = await ethers.getContractFactory("ProposalManager");
            proposalManager = await ProposalManager.connect(MasterDaoOwner).deploy();
            assert.equal(proposalManager.address != "", true);
        });
    });

    describe("Master DAO", function () {
        it("MasterDAO Deployment.", async function () {
            await memberManager.connect(MasterDaoOwner).setProposalManager(proposalManager.address);
            await proposalManager.connect(MasterDaoOwner).setMemberManager(memberManager.address);

            const MasterDao = await ethers.getContractFactory("MasterDAO");
            masterDao = await MasterDao.connect(MasterDaoOwner).deploy("test.com", 'shin.takahashi', memberManager.address,
                proposalManager.address);
<<<<<<< HEAD:backend/test/all-test.ts
            await memberManager.connect(MasterDaoOwner).addFristMember(masterDao.address, 'shin.takahashi', 0);
=======
            await memberManager.connect(MasterDaoOwner).addFirstMember(masterDao.address,'shin.takahashi',0);
>>>>>>> backend/refactoring:backend/test/all-test.js
            const list = await memberManager.getMemberList(masterDao.address);
            assert.equal(await list[0].memberId, 1);
            assert.equal(await list[0].name, "shin.takahashi");
        });
        it("Get Zero List", async function () {
            const list = await proposalManager.getProposalList(masterDao.address);
            assert.equal(list.length, 0);
        });
        it("Deployment Error Check", async function(){
            await expect(memberManager.connect(SubDaoOwner1).addFirstMember(masterDao.address,
                    'shin.takahashi',0)).to.be.revertedWith("only owner does.");
            await expect(memberManager.connect(MasterDaoOwner).addFirstMember(masterDao.address,
                'shin.takahashi',0)).to.be.revertedWith("already initialized.");
        });
        it("Add a member to Mastar DAO", async function () {
            await proposalManager.connect(MasterDaoOwner).submitProposal(masterDao.address, PROPOSAL_KIND_ADD_MEMBER, "add a new member",
                "I want a new member", "Please Approve to add.", "test.com", 0, SubDaoOwner1.address);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 1, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(MasterDaoOwner).voteForProposal(masterDao.address, 1, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 1, PROPOSAL_STATUS_FINISHED_VOTING);
            await memberManager.connect(MasterDaoOwner).addMember(masterDao.address, "Keisuke Funatsu", SubDaoOwner1.address, 1, 0)

            const list = await memberManager.connect(MasterDaoOwner).getMemberList(masterDao.address);
            const memberInfo = list[1];
            assert.equal(await memberInfo.memberId, 2);
            assert.equal(await memberInfo.eoaAddress, SubDaoOwner1.address)
            assert.equal(await memberInfo.name, "Keisuke Funatsu");
            const proposalList = await proposalManager.getProposalList(masterDao.address);
            assert.equal(proposalList[0].proposalStatus, PROPOSAL_STATUS_FINISHED);
        });
        it("Add another member to Mastar DAO", async function () {
            await proposalManager.connect(SubDaoOwner1).submitProposal(masterDao.address, PROPOSAL_KIND_ADD_MEMBER, "add a new member",
                "I want a new member", "Please Approve to add.", "test.com", 0, SubDaoOwner2.address);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 2, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(masterDao.address, 2, true);
            await proposalManager.connect(MasterDaoOwner).voteForProposal(masterDao.address, 2, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 2, PROPOSAL_STATUS_FINISHED_VOTING);
            await memberManager.connect(SubDaoOwner1).addMember(masterDao.address, "Saki Takahashi", SubDaoOwner2.address, 2, 0)

            const list = await memberManager.connect(SubDaoOwner1).getMemberList(masterDao.address);
            const memberInfo = list[2];
            assert.equal(await memberInfo.memberId, 3);
            assert.equal(await memberInfo.eoaAddress, SubDaoOwner2.address)
            assert.equal(await memberInfo.name, "Saki Takahashi");
            const proposalList = await proposalManager.getProposalList(masterDao.address);
            assert.equal(proposalList[1].proposalStatus, PROPOSAL_STATUS_FINISHED);
        });
        it("Check Member List", async function () {
            const list = await memberManager.connect(SubDaoOwner3).getMemberList(masterDao.address);
            // console.log("## Master DAO Member List: ",list);
            assert.equal(list.length, 3);
        });
        it("Denied to Add another member to Mastar DAO", async function () {
            await proposalManager.connect(MasterDaoOwner).submitProposal(masterDao.address, PROPOSAL_KIND_ADD_MEMBER, "add a new member",
                "I want a new member", "Please Approve to add.", "test.com", 0, SubDaoOwner3.address);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 3, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(masterDao.address, 3, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 3, PROPOSAL_STATUS_FINISHED_VOTING);
            await expect(memberManager.connect(MasterDaoOwner).addMember(masterDao.address, "Anonimous", SubDaoOwner3.address, 3, 0))
                .to.be.revertedWith("Not approved.");
            const list = await proposalManager.connect(SubDaoOwner4).getProposalList(masterDao.address);
            const proposalInfo = await list[2];
            assert.equal(proposalInfo.proposalStatus, PROPOSAL_STATUS_REJECTED);
        });
        it("Delete a member.", async function () {
            await proposalManager.connect(MasterDaoOwner).submitProposal(masterDao.address, PROPOSAL_KIND_DELETE_MEMBER, "delete member",
                "I want to delete a member", "Please Approve to delete.", "test.com", 0, SubDaoOwner2.address);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 4, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(MasterDaoOwner).voteForProposal(masterDao.address, 4, true);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(masterDao.address, 4, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 4, PROPOSAL_STATUS_FINISHED_VOTING);
            await memberManager.connect(MasterDaoOwner).deleteMember(masterDao.address, SubDaoOwner2.address, 4)
            assert.equal(await memberManager.connect(MasterDaoOwner).isMember(masterDao.address, SubDaoOwner2.address), false);
            const proposalList = await proposalManager.getProposalList(masterDao.address);
            assert.equal(proposalList[3].proposalStatus, PROPOSAL_STATUS_FINISHED);
        });
        it("Check ProposalList", async function () {
            const list = await proposalManager.connect(MasterDaoOwner).getProposalList(masterDao.address);
            assert.equal(list.length, 4);
            assert.equal(list[0].title, "add a new member");
            assert.equal(list[3].title, "delete member");
        });
        it("Non member is denied to execute some contract functions.", async function () {
            await expect(proposalManager.connect(SubDaoOwner4).submitProposal(masterDao.address, PROPOSAL_KIND_ADD_MEMBER, "delete member",
                "I want to delete a member", "Please Approve to delete.", "test.com", 0, SubDaoOwner2.address))
                .to.be.revertedWith("only member does.");
            await expect(proposalManager.connect(SubDaoOwner4).changeProposalStatus(masterDao.address, 5, PROPOSAL_STATUS_VOTING))
                .to.be.revertedWith("only election comission does.");
            await expect(proposalManager.connect(SubDaoOwner4).voteForProposal(masterDao.address, 5, true))
                .to.be.revertedWith("only member does.");
            await expect(memberManager.connect(SubDaoOwner4).addMember(masterDao.address, "Anonimous", SubDaoOwner2.address, 5, 0))
                .to.be.revertedWith("only member does.");
            await expect(memberManager.connect(SubDaoOwner4).deleteMember(masterDao.address, SubDaoOwner2.address, 5))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).divide(masterDao.address, 200, masterDao.address))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).changeDaoReward(masterDao.address, 5, true))
                .to.be.revertedWith("only member does.");
        });
    });
    describe("MemberERC721", function () {
        it("MemberERC721 Deployment.", async function () {
            const MemberERC721 = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
            memberERC721 = await MemberERC721.connect(SubDaoOwner1).deploy("TEST", "TEST", "test.com");
            assert.equal(await memberERC721.name(), "TEST");
            assert.equal(await memberERC721.symbol(), "TEST");
        });
        it("Mint MemberToken", async function () {
            await memberERC721.connect(SubDaoOwner1).original_mint(SubDaoOwner1.address, { value: ethers.utils.parseEther("2.0") });
            assert.equal(await memberERC721.balanceOf(SubDaoOwner1.address), 1);
            assert.equal(await memberERC721.ownerOf(1), SubDaoOwner1.address);
        });
        it("SubDao deployment For MemberNFT Test", async function () {
            const SubDaoa = await ethers.getContractFactory("SubDAO");
            subDaoa = await SubDaoa.connect(SubDaoOwner1).deploy("narusedai-2-36", "test.com", memberManager.address,
                proposalManager.address, memberERC721.address);
            assert.equal(await subDaoa.daoName(), "narusedai-2-36");
            assert.equal(await subDaoa.githubURL(), "test.com");
        });
        it("Add First member for subdao a.",async function(){
            await memberManager.connect(SubDaoOwner1).addFirstMember(subDaoa.address,"Shin Takahashi",1)
            const list = await memberManager.getMemberList(subDaoa.address);
            const member = list[0];
            assert.equal(member.name, "Shin Takahashi");
            assert.equal(member.memberId, 1);
        });
        it("Mint fail for without depositing.", async function () {
            await expect(memberERC721.connect(SubDaoOwner3)
                .original_mint(SubDaoOwner1.address, { value: ethers.utils.parseEther("1.9") }))
                .to.be.revertedWith('10 token is needed as deposit.');
        });
        it("Burn fail because without minting.", async function () {
            await expect(memberERC721.connect(SubDaoOwner3)
                .burn(1))
                .to.be.revertedWith("can't burn");
        });
        it("Normal Burn", async function () {
            const beforeBalanceOfSubDaoOwner3 = parseInt(ethers.utils.formatEther(await SubDaoOwner3.getBalance()));
            await memberERC721.connect(SubDaoOwner3).original_mint(SubDaoOwner3.address, { value: ethers.utils.parseEther("2.0") });
            assert.equal(await memberERC721.balanceOf(SubDaoOwner3.address), 1);
            assert.equal(await memberERC721.ownerOf(2), SubDaoOwner3.address);
            await memberERC721.connect(SubDaoOwner3).burn(2);
            const afterBalanceOfSubDaoOwner3 = parseInt(ethers.utils.formatEther(await SubDaoOwner3.getBalance()));
            // console.log("## before:",beforeBalanceOfSubDaoOwner3)
            // console.log("## after:",afterBalanceOfSubDaoOwner3)
            assert.equal(afterBalanceOfSubDaoOwner3 == beforeBalanceOfSubDaoOwner3, true);
        });
        it("Deny Double minting & Get My Token Id.", async function () {
            const MemberERC721 = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
            memberERC721b = await MemberERC721.connect(SubDaoOwner5).deploy("TEST", "TEST", "test.com");
            await memberERC721b.connect(SubDaoOwner5).original_mint(SubDaoOwner5.address, { value: ethers.utils.parseEther("2.0") });
            assert.equal(await memberERC721b.balanceOf(SubDaoOwner5.address), 1);
            assert.equal(await memberERC721b.ownerOf(1), SubDaoOwner5.address);
            await expect(memberERC721b.connect(SubDaoOwner5).original_mint(SubDaoOwner5.address, {
                value: ethers.utils.
                    parseEther("2.0")
            }))
                .to.be.revertedWith("Already minted.");
            assert.equal(await memberERC721b.ownedTokenId(SubDaoOwner5.address), 1);
        });
        it("If you burn a NFT, you can mint again.", async function () {
            await memberERC721b.connect(SubDaoOwner5).burn(1);
            assert.equal(await memberERC721b.balanceOf(SubDaoOwner5.address), 0);
            await expect(memberERC721b.ownerOf(1)).to.be.revertedWith("ERC721: owner query for nonexistent token");
            assert.equal(await memberERC721b.ownedTokenId(SubDaoOwner5.address), 0);
            await memberERC721b.connect(SubDaoOwner5).original_mint(SubDaoOwner5.address, { value: ethers.utils.parseEther("2.0") });
            assert.equal(await memberERC721b.balanceOf(SubDaoOwner5.address), 1);
            assert.equal(await memberERC721b.ownerOf(2), SubDaoOwner5.address);
            assert.equal(await memberERC721b.ownedTokenId(SubDaoOwner5.address), 2);
        });
    });
    describe("Sub DAO", async function () {
        it("MemberERC721a Deployment.", async function () {
            const MemberERC721 = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
            memberERC721a = await MemberERC721.connect(SubDaoOwner1).deploy("TEST1", "TEST1", "test.com");
            assert.equal(await memberERC721a.name(), "TEST1");
            assert.equal(await memberERC721a.symbol(), "TEST1");
        });
        it("MemberERC721a first mint", async function () {
            await memberERC721a.connect(SubDaoOwner1).original_mint(SubDaoOwner1.address, { value: ethers.utils.parseEther("2.0") });
            assert.equal(await memberERC721a.balanceOf(SubDaoOwner1.address), 1);
            assert.equal(await memberERC721a.ownerOf(1), SubDaoOwner1.address);
        });
        it("SubDao deployment", async function () {
            const SubDao = await ethers.getContractFactory("SubDAO");
            subDao = await SubDao.connect(SubDaoOwner1).deploy("narusedai-2-36", "test.com", memberManager.address,
                proposalManager.address, memberERC721a.address);
            assert.equal(await subDao.daoName(), "narusedai-2-36");
            assert.equal(await subDao.githubURL(), "test.com");
        });
        it("add First member for subdao.", async function(){
            await memberManager.connect(SubDaoOwner1).addFirstMember(subDao.address,"Shin Takahashi",1);
            const list = await memberManager.getMemberList(subDao.address);
            const member = list[0];
            assert.equal(member.name, "Shin Takahashi");
            assert.equal(member.memberId, 1);
        });
        it("Add Member", async function () {
            // Mint Member Token
            await memberERC721a.connect(SubDaoOwner2).original_mint(SubDaoOwner2.address, { value: ethers.utils.parseEther("2.0") });
            assert.equal(await memberERC721a.balanceOf(SubDaoOwner2.address), 1);
            assert.equal(await memberERC721a.ownerOf(2), SubDaoOwner2.address);

            await proposalManager.connect(SubDaoOwner1).submitProposal(subDao.address, PROPOSAL_KIND_ADD_MEMBER, "Add Members", "test",
                "test", "https://github.com/realtakahashi", 0, SubDaoOwner2.address);
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 1, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(subDao.address, 1, true);
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 1, PROPOSAL_STATUS_FINISHED_VOTING);

            assert.equal(await memberERC721a.connect(SubDaoOwner1).balanceOf(SubDaoOwner2.address), 1);
            await memberManager.connect(SubDaoOwner1).addMember(subDao.address, "Keisuke Funatsu", SubDaoOwner2.address, 1, 2);

            const list = await memberManager.getMemberList(subDao.address);
            const member = await list[1];
            assert.equal(member.name, "Keisuke Funatsu");
            assert.equal(member.tokenId, 2);
            assert.equal(member.memberId, 2);
            assert.equal(await subDao.connect(SubDaoOwner2).getMemberNFTAddress(), memberERC721a.address)
        });
        it("Non member can not get member token address.", async function () {
            await expect(subDao.connect(SubDaoOwner3).getMemberNFTAddress())
                .to.be.revertedWith("only member does.");
        });
        it("Get Member List", async function () {
            const list = await memberManager.getMemberList(subDao.address);
            assert.equal(list[0].name, "Shin Takahashi");
            assert.equal(list[0].tokenId, 1);
            assert.equal(list[0].memberId, 1);
            assert.equal(list[1].name, "Keisuke Funatsu");
            assert.equal(list[1].tokenId, 2);
            assert.equal(list[1].memberId, 2);
        });
        it("Submit a Proposal.", async function () {
            // 1
            await proposalManager.connect(SubDaoOwner1).submitProposal(subDao.address, PROPOSAL_KIND_COMMUNITY_MANAGEMENT, "Add Members", "I propose to join 2 Members.",
                "one:Saki Takahashi. She is a daughter of Shin Takahashi.¥n two:Sei Takaahashi. He is a son of Shin Takahashi.",
                "https://github.com/realtakahashi", 0, SubDaoOwner3.address);
            const proposalList = await proposalManager.connect(SubDaoOwner3).getProposalList(subDao.address);
            assert.equal(proposalList[1].proposalKind, 3);
            assert.equal(proposalList[1].title, "Add Members");
            assert.equal(proposalList[1].outline, "I propose to join 2 Members.");
            assert.equal(proposalList[1].details, "one:Saki Takahashi. She is a daughter of Shin Takahashi.¥n two:Sei Takaahashi. He is a son of Shin Takahashi.");
            assert.equal(proposalList[1].githubURL, "https://github.com/realtakahashi");
            assert.equal(proposalList[1].proposalStatus, 0);
            // 2
            await proposalManager.connect(SubDaoOwner1).submitProposal(subDao.address, PROPOSAL_KIND_COMMUNITY_MANAGEMENT, "Test Proposal", "I propose to Test.",
                "We Test hard.",
                "https://github.com/realtakahashi", 0, SubDaoOwner3.address);
            const proposalList1 = await proposalManager.connect(SubDaoOwner3).getProposalList(subDao.address);
            assert.equal(proposalList1[2].proposalKind, 3);
            assert.equal(proposalList1[2].title, "Test Proposal");
            assert.equal(proposalList1[2].outline, "I propose to Test.");
            assert.equal(proposalList1[2].details, "We Test hard.");
            assert.equal(proposalList1[2].githubURL, "https://github.com/realtakahashi");
            assert.equal(proposalList1[2].proposalStatus, 0);
            //3 error
            await expect(proposalManager.connect(SubDaoOwner3).submitProposal(subDao.address, PROPOSAL_KIND_COMMUNITY_MANAGEMENT,
                "Test Proposal", "I propose to Test.",
                "We Test hard.",
                "https://github.com/realtakahashi", 0, SubDaoOwner3.address))
                .to.be.revertedWith("only member does.");

        });
        it("Change the Proposal Status.", async function () {
            // Only member check
            await expect(proposalManager.connect(SubDaoOwner3).changeProposalStatus(subDao.address, 2, PROPOSAL_STATUS_PENDING))
                .to.be.revertedWith("only election comission does.");
            // PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB => PROPOSAL_STATUS_PENDING
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 2, PROPOSAL_STATUS_PENDING);
            const proposalList = await proposalManager.getProposalList(subDao.address);
            assert.equal(proposalList[1].proposalStatus, 2);
            // PROPOSAL_STATUS_PENDING => PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 2, PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB);
            const proposalList2 = await proposalManager.getProposalList(subDao.address);
            assert.equal(proposalList2[1].proposalStatus, 0);
            // PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB => PROPOSAL_STATUS_VOTING
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 2, PROPOSAL_STATUS_VOTING);
            const proposalList3 = await proposalManager.getProposalList(subDao.address);
            assert.equal(proposalList3[1].proposalStatus, 1);
            // PROPOSAL_STATUS_PENDING => PROPOSAL_STATUS_VOTING
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 3, PROPOSAL_STATUS_PENDING);
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 3, PROPOSAL_STATUS_VOTING);
            const proposalList4 = await proposalManager.getProposalList(subDao.address);
            assert.equal(proposalList4[2].proposalStatus, 1);
        });
        it("Voting Test.", async function () {
            // error rogic check
            await expect(proposalManager.connect(SubDaoOwner1).voteForProposal(subDao.address, 4, true))
                .to.be.revertedWith("Now can not vote.");
            // normal yes case
            await proposalManager.connect(SubDaoOwner1).voteForProposal(subDao.address, 3, true);
            // // double vote check
            await expect(proposalManager.connect(SubDaoOwner1).voteForProposal(subDao.address, 3, true))
                .to.be.revertedWith("Already voted.");
            await proposalManager.connect(SubDaoOwner2).voteForProposal(subDao.address, 3, true);
            // // double vote check
            await expect(proposalManager.connect(SubDaoOwner2).voteForProposal(subDao.address, 3, true))
                .to.be.revertedWith("Already voted.");
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 3, PROPOSAL_STATUS_FINISHED_VOTING);

            const voteInfo = await proposalManager.getVotingResult(subDao.address, 3);;
            assert.equal(voteInfo.votingCount, 2);
            assert.equal(voteInfo.yesCount, 2);
            assert.equal(voteInfo.noCount, 0);
            const proposalList = await proposalManager.getProposalList(subDao.address);
            assert.equal(proposalList[2].proposalId, 3);
            assert.equal(proposalList[2].proposalStatus, PROPOSAL_STATUS_RUNNING);
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 3, PROPOSAL_STATUS_FINISHED);
            const proposalList2 = await proposalManager.getProposalList(subDao.address);
            assert.equal(proposalList2[2].proposalId, 3);
            assert.equal(proposalList2[2].proposalStatus, 6);
            // reject case
            await proposalManager.connect(SubDaoOwner1).voteForProposal(subDao.address, 2, true);
            await proposalManager.connect(SubDaoOwner2).voteForProposal(subDao.address, 2, false);
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(subDao.address, 2, PROPOSAL_STATUS_FINISHED_VOTING);
            const voteInfo2 = await proposalManager.getVotingResult(subDao.address, 2);
            assert.equal(voteInfo2.votingCount, 2);
            assert.equal(voteInfo2.yesCount, 1);
            assert.equal(voteInfo2.noCount, 1);
            const proposalList3 = await proposalManager.getProposalList(subDao.address);
            assert.equal(proposalList3[1].proposalId, 2);
            assert.equal(proposalList3[1].proposalStatus, PROPOSAL_STATUS_REJECTED);
        });
    });
    describe("Sub DAO is related with Master DAO.", async function () {
        it("Add SubDAO to Master DAO", async function () {
            await masterDao.connect(SubDaoOwner1).registerDAO(subDao.address, "narusedai-2-36", "test.com", "this dao is for test.");
            const daoId = await masterDao.daoIds(subDao.address);
            const daoInfo = await masterDao.daoInfoes(daoId);
            assert.equal(daoInfo.daoName, "narusedai-2-36");
            assert.equal(daoInfo.ownerAddress, SubDaoOwner1.address);
            assert.equal(daoInfo.daoAddress, subDao.address);
            assert.equal(daoInfo.githubURL, "test.com");
            assert.equal(daoInfo.rewardApproved, false);
            const daoList = await masterDao.getDaoList();
            assert.equal(daoList.length, 1);
            assert.equal(daoList[0].daoAddress, subDao.address);
            assert.equal(daoList[0].daoName, "narusedai-2-36");
            assert.equal(daoList[0].githubURL, "test.com");
        });
        it("Voting to a Sub DAO & Approved.", async function () {
            await proposalManager.connect(MasterDaoOwner).submitProposal(masterDao.address, PROPOSAL_KIND_DAO_REWARD, "approve the dao",
                "I want to approve", "Please Approve to reward.", "test.com", 0, subDao.address);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 5, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(MasterDaoOwner).voteForProposal(masterDao.address, 5, true);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(masterDao.address, 5, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 5, PROPOSAL_STATUS_FINISHED_VOTING);
            await masterDao.connect(MasterDaoOwner).changeDaoReward(subDao.address, 5, true);

            const daoId = await masterDao.daoIds(subDao.address);
            const daoInfo = await masterDao.daoInfoes(daoId);
            assert.equal(daoInfo.daoName, "narusedai-2-36");
            assert.equal(daoInfo.ownerAddress, SubDaoOwner1.address);
            assert.equal(daoInfo.daoAddress, subDao.address);
            assert.equal(daoInfo.githubURL, "test.com");
            assert.equal(daoInfo.rewardApproved, true);
            const daoList = await masterDao.getDaoList();
            assert.equal(daoList.length, 1);
            assert.equal(daoList[0].daoAddress, subDao.address);

            const beforedaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));

            await proposalManager.connect(MasterDaoOwner).submitProposal(
                masterDao.address,
                PROPOSAL_KIND_ELECTION_COMISSION_PROPOSAL,
                "Election Comission.",
                "Select Election Comission.",
                "Reselect same person.",
                "test.com",
                0,
                MasterDaoOwner.address
            );
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 6, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(MasterDaoOwner).voteForProposal(masterDao.address, 6, true);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(masterDao.address, 6, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 6, PROPOSAL_STATUS_FINISHED_VOTING);

            await proposalManager.connect(MasterDaoOwner).submitProposal(
                masterDao.address,
                PROPOSAL_KIND_ELECTION_COMISSION_PROPOSAL,
                "Election Comission.",
                "Select SudDaoOwner1 to Election Comission.",
                "select SubDaoOwner1.",
                "test.com",
                0,
                SubDaoOwner1.address
            );
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 7, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(MasterDaoOwner).voteForProposal(masterDao.address, 7, true);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(masterDao.address, 7, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 7, PROPOSAL_STATUS_FINISHED_VOTING);
            //
            await memberManager.connect(MasterDaoOwner).resetElectionCommision(
                masterDao.address,
                MasterDaoOwner.address,
                SubDaoOwner1.address,
                6,
                7
            );

            await proposalManager.connect(MasterDaoOwner).submitProposal(masterDao.address, PROPOSAL_KIND_USE_OF_FUNDS, "divide the dao",
                "I want to divide", "Please divide to reward.", "test.com", 0, subDao.address);
            await proposalManager.connect(SubDaoOwner1).changeProposalStatus(masterDao.address, 8, PROPOSAL_STATUS_VOTING);
            await proposalManager.connect(MasterDaoOwner).voteForProposal(masterDao.address, 8, true);
            await proposalManager.connect(SubDaoOwner1).voteForProposal(masterDao.address, 8, true);
            await proposalManager.connect(MasterDaoOwner).changeProposalStatus(masterDao.address, 8, PROPOSAL_STATUS_FINISHED_VOTING);

            await masterDao.connect(MasterDaoOwner).donate({ value: ethers.utils.parseEther("10.0") });
            await masterDao.connect(MasterDaoOwner).divide(subDao.address, ethers.utils.parseEther("2.0"), 8);
            const afterdaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));
            assert.equal(afterdaobalance - beforedaobalance > 1, true);
            const list = await proposalManager.getProposalList(masterDao.address);
            const proposal6 = list[5];
            assert.equal(proposal6.proposalStatus, PROPOSAL_STATUS_FINISHED);
            const proposal7 = list[6];
            assert.equal(proposal7.proposalStatus, PROPOSAL_STATUS_FINISHED);
            const proposal8 = list[7];
            assert.equal(proposal8.proposalStatus, PROPOSAL_STATUS_FINISHED);
        });
    });
    describe("Error Check Test.", async function () {
        it("Check Proposal Manager", async function () {
            //
            const list = await memberManager.getMemberList(masterDao.address);
            assert.equal(list[1].eoaAddress, SubDaoOwner1.address);
            await expect(proposalManager.connect(SubDaoOwner2).changeProposalStatus(masterDao.address, 0, PROPOSAL_STATUS_VOTING)).
                to.be.revertedWith("only election comission does.");
            //
            await expect(proposalManager.connect(MasterDaoOwner).updateProposalStatus(masterDao.address, 0, PROPOSAL_STATUS_VOTING)).
                to.be.revertedWith("can not call directly.");
            //
            await expect(proposalManager.connect(MasterDaoOwner).submitProposal(
                masterDao.address,
                PROPOSAL_KIND_ELECTION_COMISSION_PROPOSAL,
                "Election Comission.",
                "Select Election Comission.",
                "Reselect same person.",
                "test.com",
                0,
                MasterDaoOwner.address
            )).
                to.be.revertedWith("still within term.");
        });
        it("Check Member Manager.", async function () {
            //
            await expect(memberManager.countupTermCounter(masterDao.address)).to.be.
                revertedWith("invalid operator.");
            //
            assert.equal(await memberManager.isElectionComission(masterDao.address, MasterDaoOwner.address), true);
            assert.equal(await memberManager.isElectionComission(masterDao.address, SubDaoOwner1.address), true);
            assert.equal(await memberManager.isElectionComission(masterDao.address, SubDaoOwner2.address), false);
            assert.equal(await memberManager.isElectionComission(masterDao.address, SubDaoOwner3.address), false);
        });
    });
    describe("Erc20 for DAO.", async function () {
        it("Deploy DaoERC20", async function () {
            const DaoErc20 = await ethers.getContractFactory("DaoERC20");
            daoErc20 = await DaoErc20.connect(SubDaoOwner1).deploy("DAO ERC20", "D20", subDao.address);
            assert.equal(await daoErc20.name(), "DAO ERC20");
            assert.equal(await daoErc20.symbol(), "D20");
            await subDao.connect(SubDaoOwner1).addTokenToList(TOKEN_KIND_ERC20, daoErc20.address);
        });
        it("Only owner check.", async function () {
            // not owner error.
            await expect(daoErc20.connect(SubDaoOwner2).mint(ethers.utils.parseEther("2.0"), 10000))
                .to.be.revertedWith("only owner does");
            await expect(daoErc20.connect(SubDaoOwner2).controlTokenSale(true))
                .to.be.revertedWith("only owner does");
        });
        it("owner mint.", async function () {
            daoErc20.connect(SubDaoOwner1).mint(ethers.utils.parseEther("2.0"), 300);
        });
        it("not on sale", async function () {
            await expect(daoErc20.connect(SubDaoOwner3).buy(10000, { value: ethers.utils.parseEther("2.0") }))
                .to.be.revertedWith("now not on sale.");
        });
        it("be on sale & not be on sale", async function () {
            await daoErc20.connect(SubDaoOwner1).controlTokenSale(true);
            assert.equal(await daoErc20.onSale(), true);
            await daoErc20.connect(SubDaoOwner1).controlTokenSale(false);
            assert.equal(await daoErc20.onSale(), false);
            await daoErc20.connect(SubDaoOwner1).controlTokenSale(true);
            assert.equal(await daoErc20.onSale(), true);
        });
        it("buy with error.", async function () {
            await expect(daoErc20.connect(SubDaoOwner3).buy(301, { value: ethers.utils.parseEther("602.0") }))
                .to.be.revertedWith("invalid amount.");
            await expect(daoErc20.connect(SubDaoOwner3).buy(10, { value: ethers.utils.parseEther("30.0") }))
                .to.be.revertedWith("invalid transfering value.");
        });
        it("normal buy", async function () {
            await daoErc20.connect(SubDaoOwner3).buy(10, { value: ethers.utils.parseEther("20.0") });
            assert.equal(await daoErc20.balanceOf(SubDaoOwner3.address), 10);
        });
        it("check contract balance & withdraw.", async function () {
            assert.equal(await daoErc20.getContractBalance(), 20000000000000000000);
            const beforedaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));
            await daoErc20.withdraw();
            const afterdaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));
            assert.equal(afterdaobalance - beforedaobalance > 19, true);
        });
    });
    describe("Erc721 for DAO.", async function () {
        it("Deploy DaoERC721", async function () {
            const DaoErc721 = await ethers.getContractFactory("DaoERC721");
            daoErc721 = await DaoErc721.connect(SubDaoOwner1).deploy("DAO ERC721", "D721", subDao.address,
                ethers.utils.parseEther("2.0"));
            assert.equal(await daoErc721.name(), "DAO ERC721");
            assert.equal(await daoErc721.symbol(), "D721");
            await subDao.connect(SubDaoOwner1).addTokenToList(TOKEN_KIND_ERC721, daoErc721.address);
        });
        it("Only owner check.", async function () {
            // not owner error.
            await expect(daoErc721.connect(SubDaoOwner2).controlTokenSale(true))
                .to.be.revertedWith("only owner does");
        });
        it("not on sale", async function () {
            await expect(daoErc721.connect(SubDaoOwner3).buy({ value: ethers.utils.parseEther("2.0") }))
                .to.be.revertedWith("now not on sale.");
        });
        it("be on sale & not be on sale", async function () {
            await daoErc721.connect(SubDaoOwner1).controlTokenSale(true);
            assert.equal(await daoErc721.onSale(), true);
            await daoErc721.connect(SubDaoOwner1).controlTokenSale(false);
            assert.equal(await daoErc721.onSale(), false);
            await daoErc721.connect(SubDaoOwner1).controlTokenSale(true);
            assert.equal(await daoErc721.onSale(), true);
        });
        it("buy with error.", async function () {
            await expect(daoErc721.connect(SubDaoOwner3).buy({ value: ethers.utils.parseEther("30.0") }))
                .to.be.revertedWith("invalid transfering value.");
        });
        it("normal buy", async function () {
            await daoErc721.connect(SubDaoOwner3).buy({ value: ethers.utils.parseEther("2.0") });
            assert.equal(await daoErc721.balanceOf(SubDaoOwner3.address), 1);
        });
        it("check contract balance & withdraw.", async function () {
            // const balance = await daoErc721.getContractBalance();
            // console.log("# balance: ",balance);
            assert.equal(await daoErc721.getContractBalance(), 2000000000000000000);
            const beforedaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));
            await daoErc721.withdraw();
            const afterdaobalance = parseInt(ethers.utils.formatEther(await subDao.getContractBalance()));
            // console.log("## beforedaobalance: ",beforedaobalance);
            // console.log("## afterdaobalance: ",afterdaobalance);
            assert.equal(afterdaobalance - beforedaobalance > 1, true);
        });
    });
    describe("token list", async function () {
        it("check token list", async function () {
            const list = await subDao.getTokenList();
            assert.equal(list[0].tokenKind, TOKEN_KIND_ERC20);
            assert.equal(list[0].tokenAddress, daoErc20.address);
            assert.equal(list[1].tokenKind, TOKEN_KIND_ERC721);
            assert.equal(list[1].tokenAddress, daoErc721.address);
        });
    });
});
