// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MasterDAO.sol";
import "./ProposalManager.sol";

interface MemberManagerInterface {
    function isMember(address _targetDaoAddress, address _memberAddress) external view returns(bool);
    function getMemberCount(address _targetDaoAddress) external view returns(uint256);
}

interface DaoInterface {
    function getOwner() external returns(address);
}

/**
* MemberManager
*/
contract MemberManager{
    using Counters for Counters.Counter;

    struct MemberInfo {
        string name;
        address eoaAddress;
        uint256 memberId;
        uint256 tokenId;
    }

    ProposalManagerInterface proposalManagerContract;

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);

    // DAO address => EAO address => MemberId
    mapping(address => mapping(address => uint256)) private memberIds;
    // Dao Address => Member id => MemberInfo
    mapping(address => mapping(uint256 => MemberInfo)) private memberInfoes;
    // Dao Address => Counter
    mapping(address => Counters.Counter) private memberCounters;

    /** 
    * コンストラクター
    */
    constructor(){}

    /**
    * memberManagerをセットする。
    */
    function setProposalManager(address _memberManber) public {
        proposalManagerContract = ProposalManagerInterface(_memberManber);
    }

    /**
    * 初期メンバーを登録する
    */
    function addFristMember(address _targetDaoAddress,address _ownerAddress, string memory _ownerName, uint256 tokenId) 
        onlyOwner(_targetDaoAddress) public 
    {
        require(memberIds[_targetDaoAddress][_ownerAddress]==0,"aliready initialized.");

        memberCounters[_targetDaoAddress].increment();

        uint256 memberId = memberCounters[_targetDaoAddress].current();
        memberIds[_targetDaoAddress][_ownerAddress] = memberId;
        memberInfoes[_targetDaoAddress][memberId]
            =MemberInfo(_ownerName,_ownerAddress,memberId,tokenId);

        memberCounters[_targetDaoAddress].increment();
        emit MemberAdded(_ownerAddress, memberId);

    }

    /**
    * オーナーのみ
    */
    modifier onlyOwner(address _targetDaoAddress) {
        DaoInterface targetDao = DaoInterface(_targetDaoAddress);
        require(targetDao.getOwner()==msg.sender,"only owner does.");
        _;
    }

    /**
    * メンバーのみ
    */
    modifier onlyMember(address _targetDaoAddress){
        require(memberIds[_targetDaoAddress][msg.sender]!=0,"only member does.");
        _;
    }

    /** 
    * メンバーを追加する
    */
    function addMember(address _targetDaoAddress, string memory _name, address _memberAddress, 
        uint256 _relatedProposalId,uint256 tokenId) public onlyMember(_targetDaoAddress)
    {
        address relatedAddress = proposalManagerContract.getProposalRelatedAddress(_targetDaoAddress, _relatedProposalId);
        require(_memberAddress==relatedAddress,"Not proposed.");

        ProposalManager.ProposalStatus status = 
            ProposalManager.ProposalStatus(proposalManagerContract.getPropsalStatus(_targetDaoAddress, _relatedProposalId));
        require(status==ProposalManager.ProposalStatus.Running,"Not approved.");
        require(memberIds[_targetDaoAddress][_memberAddress]==0,"already exists");

        uint256 memberId = memberCounters[_targetDaoAddress].current();
        memberIds[_targetDaoAddress][_memberAddress] = memberId;
        memberInfoes[_targetDaoAddress][memberId]
            =MemberInfo(_name, _memberAddress, memberId, tokenId);
        // proposalInfoes[_relatedProposalId].proposalStatus = ProposalStatus.Finished;
        memberCounters[_targetDaoAddress].increment();
        emit MemberAdded(_memberAddress, memberId);
    }

    /** 
    * メンバーを削除する
    */
    function deleteMember(address _targetDaoAddress, address _memberAddress, uint256 _relatedProposalId) public
        onlyMember(_targetDaoAddress)
    {
        address relatedAddress = proposalManagerContract.getProposalRelatedAddress(_targetDaoAddress, _relatedProposalId);
        require(_memberAddress==relatedAddress,"Not proposed.");

        ProposalManager.ProposalStatus status = 
            ProposalManager.ProposalStatus(proposalManagerContract.getPropsalStatus(_targetDaoAddress, _relatedProposalId));
        require(status==ProposalManager.ProposalStatus.Running,"Not approved.");

        uint256 _memberId = memberIds[_targetDaoAddress][_memberAddress];
        memberInfoes[_targetDaoAddress][_memberId].name = "";
        memberInfoes[_targetDaoAddress][_memberId].memberId = 0;
        memberInfoes[_targetDaoAddress][_memberId].tokenId = 0;
        memberInfoes[_targetDaoAddress][_memberId].eoaAddress = address(0);
        memberIds[_targetDaoAddress][_memberAddress] = 0;
        emit MemberDeleted(_memberAddress, _memberId);
    }

    /**
    * メンバーの一覧を取得する
    */
    function getMemberList(address _targetDaoAddress) public view returns(MemberInfo[] memory) 
    {
        return _getMemberList(_targetDaoAddress);
    }

    function _getMemberList(address _targetDaoAddress) internal view returns(MemberInfo[] memory){
        MemberInfo[] memory memberList = new MemberInfo[](memberCounters[_targetDaoAddress].current() - 1);
        for (uint256 i=1; i < memberCounters[_targetDaoAddress].current(); i++) {
            if (bytes(memberInfoes[_targetDaoAddress][i].name).length!=0){
                memberList[i-1] = memberInfoes[_targetDaoAddress][i];
            }
        }
        return memberList;
    }

    /**
    * メンバー数を取得する
    */
    function getMemberCount(address _targetDaoAddress) external view returns(uint256) {
        MemberInfo[] memory list = _getMemberList(_targetDaoAddress);
        return list.length;
    }

    /**
    * メンバー判定
    */
    function isMember(address _targetDaoAddress, address _memberAddress) external view returns(bool) {
        return memberIds[_targetDaoAddress][_memberAddress]!=0;
    }

}