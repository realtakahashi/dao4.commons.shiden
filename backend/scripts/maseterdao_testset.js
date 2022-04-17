// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // member manager
    const MemberManager = await hre.ethers.getContractFactory("MemberManager");
    const memberManager = await MemberManager.attach("0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f");
    // proposal manager
    const ProposalManager = await hre.ethers.getContractFactory("ProposalManager");
    const proposalManager = await ProposalManager.attach("0xB581C9264f59BF0289fA76D61B2D0746dCE3C30D");
    // master dao
    const MasterDao = await hre.ethers.getContractFactory("MasterDAO");
    const masterDao = await MasterDao.attach("0xb09da8a5B236fE0295A345035287e80bb0008290");
    //member nft
    const NFT = await hre.ethers.getContractFactory("MemberERC721PresetMinterPauserAutoId");
    const nft = await NFT.deploy("test", "test", "test.com");
    await nft.deployed();
    console.log("Member NFT deployed to:", nft.address);

    const SubDAO = await hre.ethers.getContractFactory("SubDAO");
    const subdao1 = await SubDAO.deploy("testDAO1", "test1.com",  memberManager.address, proposalManager.address, nft.address);
    await subdao1.deployed();
    console.log("SubDAO1 deployed to:", subdao1.address);
    const subdao2 = await SubDAO.deploy("testDAO2", "test2.com",  memberManager.address, proposalManager.address, nft.address);
    await subdao2.deployed();
    console.log("SubDAO2 deployed to:", subdao2.address);
    const subdao3 = await SubDAO.deploy("testDAO3", "test3.com",  memberManager.address, proposalManager.address, nft.address);
    await subdao3.deployed();
    console.log("SubDAO3 deployed to:", subdao3.address);
    const subdao4 = await SubDAO.deploy("testDAO4", "test4.com",  memberManager.address, proposalManager.address, nft.address);
    await subdao4.deployed();
    console.log("SubDAO4 deployed to:", subdao4.address);
    const subdao5 = await SubDAO.deploy("testDAO5", "test5.com",  memberManager.address, proposalManager.address, nft.address);
    await subdao5.deployed();
    console.log("SubDAO5 deployed to:", subdao5.address);
    const subdao6 = await SubDAO.deploy("testDAO6", "test6.com",  memberManager.address, proposalManager.address, nft.address);
    await subdao6.deployed();
    console.log("SubDAO6 deployed to:", subdao6.address);

    const DISCRIPTION = "This DAO was created to test the Master DAO. That's why we survive to help Master DAO complete functional tests. We hate products that have not been fully tested.Thoroughly test using these data.";
    await masterDao.registerDAO(subdao1.address,"DAO test1","https://github.com/realtakahashi/dao4.commons.shiden",DISCRIPTION);
    await masterDao.registerDAO(subdao2.address,"DAO test2","https://github.com/realtakahashi/dao4.commons.shiden",DISCRIPTION);
    await masterDao.registerDAO(subdao3.address,"DAO test3","https://github.com/realtakahashi/dao4.commons.shiden",DISCRIPTION);
    await masterDao.registerDAO(subdao4.address,"DAO test4","https://github.com/realtakahashi/dao4.commons.shiden",DISCRIPTION);
    await masterDao.registerDAO(subdao5.address,"DAO test5","https://github.com/realtakahashi/dao4.commons.shiden",DISCRIPTION);
    await masterDao.registerDAO(subdao6.address,"DAO test6","https://github.com/realtakahashi/dao4.commons.shiden",DISCRIPTION);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
