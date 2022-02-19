const { expect, assert } = require("chai");
const { ethers, artifacts } = require("hardhat");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("All contract", function() {
    let MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4;

    before(async function() {
        [MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4] = await ethers.getSigners();
    });

    // Proposal kind
    const PROPOSAL_KIND_ADD_MEMBER = 0;
    const PROPOSAL_KIND_DELETE_MEMBER = 1;
    const PROPOSAL_KIND_USE_OF_FUNDS = 2;
    const PROPOSAL_KIND_COMMUNITY_MANAGEMENT = 3;
    const PROPOSAL_KIND_ACTIVITIES = 4;

    // Proposal status
    const PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB = 0;
    const PROPOSAL_STATUS_VOTING = 1;
    const PROPOSAL_STATUS_PENDING = 2;
    const PROPOSAL_STATUS_RUNNING = 3;
    const PROPOSAL_STATUS_REJECTED = 4;
    const PROPOSAL_STATUS_FINISHED_VOTING = 5;
    const PROPOSAL_STATUS_FINISHED = 6;

    let masterDao;
    let memberERC721;
    let subDao;
    let daoErc20;
    let daoErc721;

    describe("Master DAO Deployment", function() {
        it("MasterDAO Deployment.", async function() {
            const MasterDao = await ethers.getContractFactory("MasterDAO");
            masterDao = await MasterDao.connect(MasterDaoOwner).deploy("test.com","Shin Takahashi");
            const memberInfo = await masterDao.memberInfoes(MasterDaoOwner.address);
            assert.equal(await memberInfo.memberId,1);
            assert.equal(await memberInfo.name,"Shin Takahashi");
        });
        it("Add a member to Mastar DAO", async function(){
            await masterDao.connect(MasterDaoOwner).startMemberVoting("Keisuke Funatsu",SubDaoOwner1.address,true);
            await masterDao.connect(MasterDaoOwner).voteForMember(SubDaoOwner1.address,true);
            await masterDao.connect(MasterDaoOwner).finishMemberVoting(SubDaoOwner1.address);

            //const proposalInfo = await masterDao.memberProposalHistories(1);
            //console.log("poposal:",proposalInfo);

            const memberInfo = await masterDao.memberInfoes(SubDaoOwner1.address);
            assert.equal(await memberInfo.memberId,2);
            assert.equal(await memberInfo.name,"Keisuke Funatsu");
        });
        it("Add another member to Mastar DAO", async function(){
            await masterDao.connect(SubDaoOwner1).startMemberVoting("Saki Takahashi",SubDaoOwner2.address,true);
            await masterDao.connect(SubDaoOwner1).voteForMember(SubDaoOwner2.address,true);
            await masterDao.connect(MasterDaoOwner).voteForMember(SubDaoOwner2.address,true);
            await masterDao.connect(SubDaoOwner1).finishMemberVoting(SubDaoOwner2.address);

            const memberInfo = await masterDao.memberInfoes(SubDaoOwner2.address);
            assert.equal(await memberInfo.memberId,3);
            assert.equal(await memberInfo.name,"Saki Takahashi");
        });
        it("Mastar DAO denied starting vote a already finished member.", async function(){
            await expect(masterDao.connect(SubDaoOwner1).startMemberVoting("Saki Takahashi",SubDaoOwner2.address,true))
                .to.be.revertedWith("already finished.");
        });
        it("Mastar DAO denied adding a member.", async function(){
            await masterDao.connect(SubDaoOwner2).startMemberVoting("Sei Takahashi",SubDaoOwner3.address,true);
            await masterDao.connect(SubDaoOwner2).voteForMember(SubDaoOwner3.address,true);
            await masterDao.connect(SubDaoOwner2).finishMemberVoting(SubDaoOwner3.address);

            const proposalInfo = await masterDao.memberProposalHistories(2);
            // console.log("poposal:",proposalInfo);

            const memberInfo = await masterDao.memberInfoes(SubDaoOwner3.address);
            assert.equal(await memberInfo.memberId,0);
            assert.equal(await memberInfo.name,"");
        });
        it("Non member is denied to execute some contract functions.", async function(){
            await expect(masterDao.connect(SubDaoOwner4).startMemberVoting("Sei Takahashi",SubDaoOwner3.address,true))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).voteForMember(SubDaoOwner3.address,true))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).finishMemberVoting(SubDaoOwner3.address))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).startDaoVoting(masterDao.address,true))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).voteForDao(masterDao.address,true))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).finishDaoVoting(masterDao.address))
                .to.be.revertedWith("only member does.");
            await expect(masterDao.connect(SubDaoOwner4).divide(masterDao.address,200))
                .to.be.revertedWith("only member does.");
        });
    });
    describe("MemberERC721", function() {
        it("MemberERC721 Deployment.", async function(){
            const MemberERC721 = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
            memberERC721 = await MemberERC721.connect(SubDaoOwner1).deploy("TEST","TEST","test.com");
            assert.equal(await memberERC721.name(),"TEST");
            assert.equal(await memberERC721.symbol(),"TEST");
        });
        let balanceOfSubDaoOwner1;
        it("Mint MemberToken", async function() {
            await memberERC721.connect(SubDaoOwner1).original_mint(SubDaoOwner1.address,{value:ethers.utils.parseEther("10.0")});
            assert.equal(await memberERC721.balanceOf(SubDaoOwner1.address),1);
            assert.equal(await memberERC721.ownerOf(0),SubDaoOwner1.address);
        });
        it("Mint fail for without depositing.",async function() {
            await expect(memberERC721.connect(SubDaoOwner1)
                .original_mint(SubDaoOwner1.address,{value:ethers.utils.parseEther("9.0")}))
                .to.be.revertedWith('10 token is needed as deposit.');
        });
        it("Burn fail because without minting.",async function(){
            await expect(memberERC721.connect(SubDaoOwner2)
                .burn(0))
                .to.be.revertedWith("can't burn");
        });
        it("Normal Burn", async function() {
            beforeBalanceOfSubDaoOwner3 = parseInt(ethers.utils.formatEther(await SubDaoOwner3.getBalance()));
            await memberERC721.connect(SubDaoOwner3).original_mint(SubDaoOwner3.address,{value:ethers.utils.parseEther("10.0")});
            assert.equal(await memberERC721.balanceOf(SubDaoOwner3.address),1);
            assert.equal(await memberERC721.ownerOf(1),SubDaoOwner3.address);
            await memberERC721.connect(SubDaoOwner3).burn(1);
            const afterBalanceOfSubDaoOwner3 = parseInt(ethers.utils.formatEther(await SubDaoOwner3.getBalance()));
            assert.equal(afterBalanceOfSubDaoOwner3+1 == beforeBalanceOfSubDaoOwner3,true);
        });
    });
    describe("Sub DAO", async function() {
        it("SubDao deployment", async function() {
            const SubDao = await ethers.getContractFactory("SubDAO");
            subDao = await SubDao.connect(SubDaoOwner1).deploy("narusedai-2-36","test.com","Shin Takahashi");
            assert.equal(await subDao.daoName(),"narusedai-2-36");
            assert.equal(await subDao.githubURL(),"test.com");

            const member = await subDao.memberInfoes(SubDaoOwner1.address);
            assert.equal(member.name, "Shin Takahashi");
            assert.equal(member.memberId,1);
        });
        it("Update NftAddress & OwnerTokenId", async function() {
            await subDao.connect(SubDaoOwner1).updateNftAddressAndOwnerTokenId(memberERC721.address,0);
            const member = await subDao.memberInfoes(SubDaoOwner1.address);
            assert.equal(member.name, "Shin Takahashi");
            assert.equal(member.memberId,1);
            assert.equal(member.tokenId,0);
        });
        it("Add Member", async function() {
            // Mint Member Token
            await memberERC721.connect(SubDaoOwner2).original_mint(SubDaoOwner2.address,{value:ethers.utils.parseEther("10.0")});
            assert.equal(await memberERC721.balanceOf(SubDaoOwner2.address),1);
            assert.equal(await memberERC721.ownerOf(2),SubDaoOwner2.address);

            await subDao.connect(SubDaoOwner1).addMember(SubDaoOwner2.address, "Keisuke Funatsu", memberERC721.address,2);
            const member = await subDao.memberInfoes(SubDaoOwner2.address);
            assert.equal(member.name, "Keisuke Funatsu");
            assert.equal(member.tokenId,2);
            assert.equal(member.memberId,2);
        });
        it("Get Member List", async function() {
            const list = await subDao.getMemberList();
            assert.equal(list[0].name,"Shin Takahashi");
            assert.equal(list[0].tokenId,0);
            assert.equal(list[0].memberId,1);
            assert.equal(list[1].name,"Keisuke Funatsu");
            assert.equal(list[1].tokenId,2);
            assert.equal(list[1].memberId,2);
        });
        it("Submit a Proposal.", async function() {
            // 1
            await subDao.connect(SubDaoOwner1).submitProposal(PROPOSAL_KIND_COMMUNITY_MANAGEMENT, "Add Members", "I propose to join 2 Members.", 
                "one:Saki Takahashi. She is a daughter of Shin Takahashi.¥n two:Sei Takaahashi. He is a son of Shin Takahashi.",
                "https://github.com/realtakahashi");
            const proposalList = await subDao.connect(SubDaoOwner3).getProposalList();
            assert.equal(proposalList[0].proposalKind,3);
            assert.equal(proposalList[0].title,"Add Members");
            assert.equal(proposalList[0].outline,"I propose to join 2 Members.");
            assert.equal(proposalList[0].details,"one:Saki Takahashi. She is a daughter of Shin Takahashi.¥n two:Sei Takaahashi. He is a son of Shin Takahashi.");
            assert.equal(proposalList[0].githubURL,"https://github.com/realtakahashi");
            assert.equal(proposalList[0].proposalStatus,0);
            // 2
            await subDao.connect(SubDaoOwner1).submitProposal(PROPOSAL_KIND_COMMUNITY_MANAGEMENT, "Test Proposal", "I propose to Test.", 
                "We Test hard.",
                "https://github.com/realtakahashi");
            const proposalList1 = await subDao.connect(SubDaoOwner3).getProposalList();
            assert.equal(proposalList1[1].proposalKind,3);
            assert.equal(proposalList1[1].title,"Test Proposal");
            assert.equal(proposalList1[1].outline,"I propose to Test.");
            assert.equal(proposalList1[1].details,"We Test hard.");
            assert.equal(proposalList1[1].githubURL,"https://github.com/realtakahashi");
            assert.equal(proposalList1[1].proposalStatus,0);
            //3 error
            await expect(subDao.connect(SubDaoOwner3).submitProposal(PROPOSAL_KIND_COMMUNITY_MANAGEMENT, 
                "Test Proposal", "I propose to Test.", 
                "We Test hard.",
                "https://github.com/realtakahashi"))
                .to.be.revertedWith("only member does.");

        });
        it("Change the Proposal Status.", async function() {
            // Only member check
            await expect(subDao.connect(SubDaoOwner3).changeProposalStatus(1,PROPOSAL_STATUS_PENDING))
                .to.be.revertedWith("only member does.");
            // PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB => PROPOSAL_STATUS_PENDING
            await subDao.connect(SubDaoOwner1).changeProposalStatus(1,PROPOSAL_STATUS_PENDING);
            const proposalList = await subDao.getProposalList();
            assert.equal(proposalList[0].proposalStatus,2);
            // PROPOSAL_STATUS_PENDING => PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB
            await subDao.connect(SubDaoOwner1).changeProposalStatus(1,PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB);
            const proposalList2 = await subDao.getProposalList();
            assert.equal(proposalList2[0].proposalStatus,0);
            // PROPOSAL_STATUS_UNDER_DISCUSSION_ON_GITHUB => PROPOSAL_STATUS_VOTING
            await subDao.connect(SubDaoOwner1).changeProposalStatus(1,PROPOSAL_STATUS_VOTING);
            const proposalList3 = await subDao.getProposalList();
            assert.equal(proposalList3[0].proposalStatus,1);
            // PROPOSAL_STATUS_PENDING => PROPOSAL_STATUS_VOTING
            await subDao.connect(SubDaoOwner1).changeProposalStatus(2,PROPOSAL_STATUS_PENDING);
            await subDao.connect(SubDaoOwner1).changeProposalStatus(2,PROPOSAL_STATUS_VOTING);
            const proposalList4 = await subDao.getProposalList();
            assert.equal(proposalList4[1].proposalStatus,1);
        });
        it("Voting Test.", async function() {
            // error rogic check
            await expect(subDao.connect(SubDaoOwner1).vote(3,true)).to.be.revertedWith("Now can not vote.");
            // normal yes case
            await subDao.connect(SubDaoOwner1).vote(2,true);
            await subDao.connect(SubDaoOwner2).vote(2,true);
            await subDao.connect(SubDaoOwner1).changeProposalStatus(2,PROPOSAL_STATUS_FINISHED_VOTING);
            const voteInfo = await subDao.votingInfoes(2);
            // console.log("## voteinfo:",voteInfo);
            assert.equal(voteInfo.votingCount,2);
            assert.equal(voteInfo.yesCount,2);
            assert.equal(voteInfo.noCount,0);
            const proposalList = await subDao.getProposalList();
            assert.equal(proposalList[1].proposalId,2);
            assert.equal(proposalList[1].proposalStatus,PROPOSAL_STATUS_RUNNING);
            await subDao.connect(SubDaoOwner1).changeProposalStatus(2,PROPOSAL_STATUS_FINISHED);
            const proposalList2 = await subDao.getProposalList();
            assert.equal(proposalList2[1].proposalId,2);
            assert.equal(proposalList2[1].proposalStatus,6);
            // reject case
            await subDao.connect(SubDaoOwner1).vote(1,true);
            await subDao.connect(SubDaoOwner2).vote(1,false);
            await subDao.connect(SubDaoOwner1).changeProposalStatus(1,PROPOSAL_STATUS_FINISHED_VOTING);
            const voteInfo2 = await subDao.votingInfoes(1);
            // console.log("## voteinfo:",voteInfo);
            assert.equal(voteInfo2.votingCount,2);
            assert.equal(voteInfo2.yesCount,1);
            assert.equal(voteInfo2.noCount,1);
            const proposalList3 = await subDao.getProposalList();
            assert.equal(proposalList3[0].proposalId,1);
            assert.equal(proposalList3[0].proposalStatus,PROPOSAL_STATUS_REJECTED);
        });
    });
    describe("Sub DAO is related with Master DAO.", async function() {
        it("Add SubDAO to Master DAO", async function() {
            await masterDao.connect(SubDaoOwner1).registerDAO(subDao.address,"narusedai-2-36","test.com");
            const daoId = await masterDao.daoIds(subDao.address);
            const daoInfo = await masterDao.daoInfoes(daoId);
            assert.equal(daoInfo.daoName,"narusedai-2-36");
            assert.equal(daoInfo.ownerAddress,SubDaoOwner1.address);
            assert.equal(daoInfo.daoAddress,subDao.address);
            assert.equal(daoInfo.githubURL,"test.com");
            assert.equal(daoInfo.rewardApproved,false);
            const daoList = await masterDao.getDaoList();
            assert.equal(daoList.length,1);
            assert.equal(daoList[0],subDao.address);
        });
        it("Voting to a Sub DAO & Approved.", async function() {
            await masterDao.connect(MasterDaoOwner).startDaoVoting(subDao.address,true);
            await masterDao.connect(MasterDaoOwner).voteForDao(subDao.address,true);
            await masterDao.connect(SubDaoOwner1).voteForDao(subDao.address,true);
            await masterDao.connect(MasterDaoOwner).finishDaoVoting(subDao.address);
            const daoId = await masterDao.daoIds(subDao.address);
            const daoInfo = await masterDao.daoInfoes(daoId);
            assert.equal(daoInfo.daoName,"narusedai-2-36");
            assert.equal(daoInfo.ownerAddress,SubDaoOwner1.address);
            assert.equal(daoInfo.daoAddress,subDao.address);
            assert.equal(daoInfo.githubURL,"test.com");
            assert.equal(daoInfo.rewardApproved,true);
            const daoList = await masterDao.getDaoList();
            assert.equal(daoList.length,1);
            assert.equal(daoList[0],subDao.address);
        });
    });
    describe("Erc20 for DAO.", async function() {
        it("Deploy DaoERC20", async function() {
            const DaoErc20 = await ethers.getContractFactory("DaoERC20");
            daoErc20 = await DaoErc20.connect(SubDaoOwner1).deploy("DAO ERC20","D20",memberERC721.address);
        });
        it("Only owner can mint.", async function() {
            // not owner error.
            await expect(daoErc20.connect(SubDaoOwner2).mint(ethers.utils.parseEther("10.0"),10000))
                .to.be.revertedWith("only owner does");
        });
        it("owner mint.", async function() {
            daoErc20.connect(SubDaoOwner1).mint(ethers.utils.parseEther("10.0"),10000);
        });
        it("not on sale", async function() {
            await expect(daoErc20.connect(SubDaoOwner3).buy(10000,{value:ethers.utils.parseEther("10.0")}))
            .to.be.revertedWith("now not on sale.");
        });
    });

});