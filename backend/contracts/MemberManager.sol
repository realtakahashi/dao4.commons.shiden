// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

interface DaoInterface {
    function setMemberManager(address MemberManagerAddress) external;
}

/**
* MemberManager
*/
contract MemberManager{

    address private targetDaoAddress;

    struct MemberInfo {
        string name;
        address eoaAddress;
        uint256 memberId;
    }

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);

    // EAO address => MemberId
    mapping(address => uint256) public memberIds;
    // Dao Address => Member id => MemberInfo
    mapping(uint256 => MemberInfo) public memberInfoes;

    /** 
    * コンストラクター
    */
    constructor(){}

    /**
    * 初期化する
    */
    function initialize(address _targetDaoAddress,address _ownerAddress, string memory _ownerName, 
        uint256 _targetId) external 
    {
        targetDaoAddress = _targetDaoAddress;
        memberIds[_ownerAddress] = _targetId;
        memberInfoes[_targetId]
            =MemberInfo(_ownerName,_ownerAddress,_targetId);
        emit MemberAdded(_ownerAddress, _targetId);

    }
    /** 
    * メンバーを追加する
    */
    function addMember(string memory _name, address _memberAddress, 
        uint256 _relatedProposalId, uint256 targetId) external onlyTargetDao
    {
        // require(_memberAddress==proposalInfoes[_relatedProposalId].relatedAddress,"Not proposed.");
        // require(proposalInfoes[_relatedProposalId].proposalStatus==ProposalStatus.Running,"Not approved.");
        require(memberInfoes[targetId].eoaAddress==address(0),"already exists.");
        memberIds[_memberAddress] = targetId;
        memberInfoes[targetId]
            =MemberInfo(_name, _memberAddress, targetId);
        // proposalInfoes[_relatedProposalId].proposalStatus = ProposalStatus.Finished;
        emit MemberAdded(_memberAddress, targetId);
    }

    /** 
    * メンバーを削除する
    */
    function deleteMember(address _memberAddress, uint256 _relatedProposalId) external onlyTargetDao
    {
        // require(_memberAddress==proposalInfoes[_relatedProposalId].relatedAddress,"Not proposed.");
        // require(proposalInfoes[_relatedProposalId].proposalStatus==ProposalStatus.Running,"Not approved.");
        uint256 _memberId = memberIds[_memberAddress];
        memberInfoes[_memberId].name = "";
        memberInfoes[_memberId].memberId = 0;
        memberInfoes[_memberId].eoaAddress = address(0);
        memberIds[_memberAddress] = 0;
        emit MemberDeleted(_memberAddress, _memberId);
    }

    /**
    * メンバーの一覧を取得する
    */
    function getMemberList(uint256 currentMaxId) external view 
        returns(MemberInfo[] memory) 
    {
        MemberInfo[] memory memberList = new MemberInfo[](currentMaxId - 1);
        for (uint256 i=1; i < currentMaxId; i++) {
            if (bytes(memberInfoes[i].name).length!=0){
                memberList[i-1] = memberInfoes[i];
            }
        }
        return memberList;
    }

    /**
    * メンバーかを判定する
    */
    function isMember(address targetDaoAddress,address _memberAddress) external view returns(bool){
        return memberIds[_memberAddress]!=0;
    }

    /** 
    * Modifiter　targetDaoからのみ実行可能
    */
    modifier onlyTargetDao(){
        require(msg.sender==targetDaoAddress,"only call from targetDao.");
        _;
    }


}