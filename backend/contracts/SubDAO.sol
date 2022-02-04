// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "./MyERC721PresetMinterPauserAutoId.sol";

contract SubDAO {

    uint constant DEPOSIT_AMOUNT = 1;

    event MintedNewERC721(address indexed owner,address erc721Address, uint256 tokenId);

    struct DaoInfo {
        string daoName;
        string githubURL;
        string ownerName;
        address erc721Address;
    }

    mapping(address => DaoInfo) public daoInfoes;

    MyERC721PresetMinterPauserAutoId memberToken;

    constructor(){
        console.log("Deploying SubDAO");
    }

    // This is a function that creating SubDAO.
    // This function storaged parameter values.
    // And mint ERC721 that represent registering a member of this dao.
    // The owner have to deposite 10 Native tokens.
    function createDAO(string memory daoName, 
                        string memory githubURL, 
                        string memory ownerName
    ) public payable {
        require(msg.value >= DEPOSIT_AMOUNT,"You have to deposite 10 Native tokens.");
        // create erc721
        memberToken = new MyERC721PresetMinterPauserAutoId(daoName,daoName,"nothing");
        uint256 tokenId = memberToken.member_token_mint(msg.sender);
        daoInfoes[msg.sender] = DaoInfo(daoName,githubURL,ownerName,address(memberToken));
        
        console.log("address is : ",address(memberToken));
        console.log("tokenId is :",tokenId);

        emit MintedNewERC721(msg.sender, address(memberToken), tokenId);
    }



}