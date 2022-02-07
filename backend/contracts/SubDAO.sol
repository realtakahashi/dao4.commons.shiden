// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
// import "./MyERC721PresetMinterPauserAutoId.sol";
// import "@openzeppelin/contracts/utils/Context.sol";

/**
* This contract is to create dao easier than pesent methmod.
* - When you create your own dao, you can get a NFT what prove to be a dao member.
*/
contract SubDAO {
    using Counters for Counters.Counter;
    Counters.Counter private _memberIdTracker;

    string public daoName;
    string public githubURL;
    address private erc721Address;

    struct MemberInfo {
        string name;
        uint256 tokenId;
        uint256 memberId;
    }

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);

    // EAO address => DaoInfo
    mapping(address => MemberInfo) public memberInfoes;

    /** 
    * コンストラクター
    * DAOの基本情報をセットし、デプロイしたEOAを第一のメンバーとして登録する。
    */
    constructor(string memory _daoName, string memory _githubURL, address _erc721Address,uint256 _tokenId, 
        string memory _ownerName){
        daoName = _daoName;
        githubURL = _githubURL;
        erc721Address = _erc721Address;
        memberInfoes[msg.sender] = MemberInfo(_ownerName,_tokenId,_memberIdTracker.current());
        _memberIdTracker.increment();

    }

    /**
    * メンバーを追加する。
    * 正しくないdaoAddressにてコールした場合に対処するために、NFTのAddressをチェックする。
    */
    function addMember(address eoa, string memory name, address daoERC721Address,uint256 tokenId) public {
        require(erc721Address==daoERC721Address,"NFT address isn't correct.");
        require(bytes(memberInfoes[msg.sender].name).length!=0,"only member does.");
        memberInfoes[eoa] = MemberInfo(name,tokenId,_memberIdTracker.current());
        emit MemberAdded(eoa,_memberIdTracker.current());
        _memberIdTracker.increment();
    }

    /**
    * メンバーを削除する。
    */
    function deleteMember(address eoa) public {
        require(bytes(memberInfoes[msg.sender].name).length!=0,"only member does.");
        require(bytes(memberInfoes[eoa].name).length!=0,"not exists.");
        uint256 memberId = memberInfoes[eoa].memberId;
        memberInfoes[eoa].name = "";
        memberInfoes[eoa].tokenId = 0;
        memberInfoes[eoa].memberId = 0;
        emit MemberDeleted(eoa,memberId);
    }


}