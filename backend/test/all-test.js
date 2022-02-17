const { expect, assert } = require("chai");
const { ethers, artifacts } = require("hardhat");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("All contract", function() {
    let accounts;
    let MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4;

    before(async function() {
        accounts = await web3.eth.getAccounts();
        [MasterDaoOwner, SubDaoOwner1, SubDaoOwner2, SubDaoOwner3, SubDaoOwner4] = await ethers.getSigners();
    });

    let masterDao;
    let memberERC721;
    let subDao;

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
            beforeBalanceOfSubDaoOwner1 = parseInt(ethers.utils.formatEther(await SubDaoOwner1.getBalance()));
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
            await memberERC721.connect(SubDaoOwner1).burn(0);
            const afterBalanceOfSubDaoOwner1 = parseInt(ethers.utils.formatEther(await SubDaoOwner1.getBalance()));
            assert.equal(afterBalanceOfSubDaoOwner1 == beforeBalanceOfSubDaoOwner1,true);
        });
    });
    describe("Sub DAO", async function() {
        it("SubDao deployment", async function() {
            const SubDao = await ethers.getContractFactory("SubDAO");
            subDao = await SubDao.connect(SubDaoOwner1).deploy("narusedai-2-36","test.com",memberERC721.address,0,"Shin Takahashi");
            assert.equal(await subDao.daoName(),"narusedai-2-36");
            assert.equal(await subDao.githubURL(),"test.com");

            const member = await subDao.memberInfoes(SubDaoOwner1.address);
            assert.equal(member.name, "Shin Takahashi");
            assert.equal(member.tokenId,0);
            assert.equal(member.memberId,1);
        });
        it("Add Member", async function() {
            // Mint Member Token
            await memberERC721.connect(SubDaoOwner2).original_mint(SubDaoOwner2.address,{value:ethers.utils.parseEther("10.0")});
            assert.equal(await memberERC721.balanceOf(SubDaoOwner2.address),1);
            assert.equal(await memberERC721.ownerOf(1),SubDaoOwner2.address);

            await subDao.connect(SubDaoOwner1).addMember(SubDaoOwner2.address, "Keisuke Funatsu", memberERC721.address,1);
            const member = await subDao.memberInfoes(SubDaoOwner2.address);
            assert.equal(member.name, "Keisuke Funatsu");
            assert.equal(member.tokenId,1);
            assert.equal(member.memberId,2);
        });
        it("Get Member List", async function() {
            const list = await subDao.getMembers();
            assert.equal(list[0].name,"Shin Takahashi");
            assert.equal(list[0].tokenId,0);
            assert.equal(list[0].memberId,1);
            assert.equal(list[1].name,"Keisuke Funatsu");
            assert.equal(list[1].tokenId,1);
            assert.equal(list[1].memberId,2);
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


});