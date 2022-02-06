// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
// import "./MyERC721PresetMinterPauserAutoId.sol";
// import "@openzeppelin/contracts/utils/Context.sol";

/**
* This contract is to create dao easier than pesent methmod.
* - When you create your own dao, you can get a NFT what prove to be a dao member.
*/
contract SubDAO {

//    using Strings for uint256;

    uint constant DEPOSIT_AMOUNT = 10;
    uint constant TEST_DEPOSIT_AMOUNT = 10;

    event MintedERC721(address indexed owner,address erc721Address, uint256 tokenId);

    struct DaoInfo {
        string githubURL;
        address erc721Address;
    }

    // EAO address => DaoInfo
    mapping(address => DaoInfo) public daoInfoes;
    // DAO ERC721 Address => EOA => json(name+tokenId)
    mapping(address => mapping(address => uint256)) public daoMembers; 

    //  MyERC721PresetMinterPauserAutoId memberToken;

    constructor(){
        // console.log("Deploying SubDAO");
    }

    /**
    * This is a function that creating SubDAO.
    * This function storaged parameter values.
    * And mint ERC721 that represent registering a member of this dao.
    * The owner have to deposite 10 Native tokens.
    */
    function createDAO(string memory githubURL,address tokenAddress,uint256 tokenId
    ) public payable {
        require(msg.value >= TEST_DEPOSIT_AMOUNT,"10 tokens is needed.");
        // require(bytes(daoName).length!=0 && bytes(githubURL).length!=0 && bytes(ownerName).length!=0,
        //     "All parameters is needed.");
        // require(bytes(daoName).length <= 11,"daoName have to be less than 11 charactors.");
        // require(bytes(ownerName).length < 30,"ownerName have to be less than 30 charactors.");
        // require(bytes(githubURL).length < 256,"githubURL have to be less than 30 charactors.");

        // create erc721
        // memberToken = new MyERC721PresetMinterPauserAutoId(daoName,daoName,"nothing");
        // uint256 tokenId = memberToken.member_token_mint(msg.sender);
        daoInfoes[msg.sender] = DaoInfo(githubURL,tokenAddress);
        daoMembers[tokenAddress][msg.sender] = tokenId + 1;
           // string(abi.encodePacked("[{ name:",ownerName,",","tokenId:",tokenId.toString(),"}]"));
        
        // console.log("address is : ",address(memberToken));
        // console.log("tokenId is :",tokenId);

        // emit MintedERC721(msg.sender, address(memberToken), tokenId);
    }

    /**
    * Add a dao member.
    */
    function addMember(address daoERC721Address,uint256 tokenId) public {
        require(daoMembers[daoERC721Address][msg.sender]!=0,"only member does.");
        // require(bytes(memberName).length!=0 && bytes(memberName).length <= 11,
        //     "memberName have to be less than 11 charactors and not to be empty.");
        // require(daoERC721Address!=address(0),"daoERC721Address is not valid value.");
        // MyERC721PresetMinterPauserAutoId myErc721 = MyERC721PresetMinterPauserAutoId(daoERC721Address);
        // uint256 tokenId = myErc721.member_token_mint(msg.sender);
        
        daoMembers[daoERC721Address][msg.sender] = tokenId + 1;
            // string(abi.encodePacked("[{ name:",memberName,",","tokenId:",tokenId.toString(),"}]"));
        
        // console.log("tokenId is :",tokenId);

        // emit MintedERC721(msg.sender, daoERC721Address, tokenId);
   
    }

    /**
    * Delete a dao member.
    */
    function deleteMember(address daoERC721Address) public {
        require(daoMembers[daoERC721Address][msg.sender]!=0,"only member does.");
        // MyERC721PresetMinterPauserAutoId myErc721 = MyERC721PresetMinterPauserAutoId(daoERC721Address);
        // uint256 tokenId = myErc721.burn
        
        daoMembers[daoERC721Address][msg.sender] = 0;

    }


}