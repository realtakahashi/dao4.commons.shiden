const { expect, assert } = require("chai");
const { ethers, artifacts } = require("hardhat");

const MasterDao = artifacts.require("MasterDAO");

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("All contract", function() {
    let accounts;
    let owner, addr1, addr2;

    before(async function() {
        accounts = await web3.eth.getAccounts();
        [owner, addr1, addr2] = await ethers.getSigners();
    });


    let masterDao;
    let memberERC721;
    let subDao;

    describe("Master DAO Deployment", function() {
        it("MasterDAO Deployment.", async function() {
            masterDao = await MasterDao.new("test.com","Shin Takahashi");
            const memberInfo = await masterDao.memberInfoes(owner.address);
            assert.equal(await memberInfo.memberId,1);
            assert.equal(await memberInfo.name,"Shin Takahashi");
        });
    });
    describe("MemberERC721", function() {
        it("MemberERC721 Deployment.", async function(){
            const MemberERC721 = await ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
            memberERC721 = await MemberERC721.connect(addr1).deploy("TEST","TEST","test.com");
            assert.equal(await memberERC721.name(),"TEST");
            assert.equal(await memberERC721.symbol(),"TEST");
        });
        it("Mint MemberToken", async function() {
            await memberERC721.connect(addr1).original_mint(addr1.address,{value:ethers.utils.parseEther("10.0")});
            assert.equal(await memberERC721.balanceOf(addr1.address),1);
            assert.equal(await memberERC721.ownerOf(0),addr1.address);
        });

    });
    describe("Sub DAO", async function() {
        it("SubDao deployment", async function() {
            const SubDao = await ethers.getContractFactory("SubDAO");
            subDao = await SubDao.connect(addr1).deploy("narusedai-2-36","test.com",memberERC721.address,0,"Shin Takahashi");
            assert.equal(await subDao.daoName(),"narusedai-2-36");
            assert.equal(await subDao.githubURL(),"test.com");

            const member = await subDao.memberInfoes(addr1.address);
            assert.equal(await member.name, "Shin Takahashi");
            assert.equal(await member.tokenId,0);
            assert.equal(await member.memberId,1);
        });
    });


});