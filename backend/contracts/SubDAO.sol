// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./MemberManager.sol";
import "./ProposalManager.sol";

/**
* This contract is to create dao easier than pesent methmod.
* - When you create your own dao, you can get a NFT what prove to be a dao member.
*/
contract SubDAO is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _contributeIdTracker;

    MemberManagerInterface private memberManagerContract;
    ProposalManagerInterface private proposalManagerContract;

    string public daoName;
    string public githubURL;
    uint256 public amountOfDotation;
    address private erc721Address;
    address private owner;

    struct ContributeInfo {
        address eoa;
        string githubURL;
    }

    event ReportedContribution(address indexed eoa, string githubURL, uint256 reportId);
    event Donated(address indexed eoa, uint256 amount);
    event Divided(address indexed eoa, address to, uint256 amount);

    // contoribute id => ContributeInfo
    mapping(uint256 => ContributeInfo) public contributionReports;

    /** 
    * コンストラクター
    */
    constructor(string memory _daoName, string memory _githubURL, address _memberManager, address _proposalManger,
        address _memberNFTAddress){
        // initial increment
        _contributeIdTracker.increment();
        
        daoName = _daoName;
        githubURL = _githubURL;
        owner = msg.sender;
        erc721Address = _memberNFTAddress;

        memberManagerContract = MemberManagerInterface(_memberManager);
        proposalManagerContract = ProposalManagerInterface(_proposalManger);
    }

    /**
    * オーナーを取得する
    */
    function getOwnerAddress() public view returns(address) {
        return owner;
    }

    /**
    * SubDAOに関連付けられたメンバーNFTのアドレスを取得する
    */
    function getMemberNFTAddress() public view onlyMember returns (address) {
        return erc721Address;
    }

    /** 
    * 貢献の活動をレポートする。
    */
    function reportContribution(string memory _githubURL) public {
        require(bytes(_githubURL).length!=0,"invalid url.");
        contributionReports[_contributeIdTracker.current()]=ContributeInfo(msg.sender,_githubURL);
        emit ReportedContribution(msg.sender, _githubURL, _contributeIdTracker.current());
        _contributeIdTracker.increment();
    }

    /**
    * 活動の一覧を取得する
    */
    function getContributionList() public view returns (ContributeInfo[] memory) {
        ContributeInfo[] memory contoributionList = new ContributeInfo[](_contributeIdTracker.current() - 1);
        for (uint256 i=1; i < _contributeIdTracker.current(); i++) {
            if (bytes(contributionReports[i].githubURL).length!=0){
                contoributionList[i-1] = contributionReports[i];
            }
        }
        return contoributionList;
    }

    /** 
    * 寄付を受け付ける
    */
    function donate() public payable {
        amountOfDotation += msg.value;
        emit Donated(msg.sender, msg.value);
    }

    /** 
    * 分配する
    */
    function divide(address to, uint256 amount, uint256 _relatedProposalId) public payable onlyMember {
        ProposalInfo memory info = proposalManagerContract.getPropsalInfo(address(this), _relatedProposalId);
        require(info.relatedAddress==to,"Not proposed.");
        require(info.proposalStatus==ProposalStatus.Running,"Not approved.");

        payable(to).transfer(amount);
        proposalManagerContract.updateProposalStatus(address(this), _relatedProposalId, uint(ProposalStatus.Finished));

        emit Divided(msg.sender, to, amount);
    }

    /** 
    * contract addressの残高を確認する
    */
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /**
    * 入金を受け取る
    */
    receive() external payable {}
    
    /**
    * オーナーを取得する
    */
    function getOwner() external view returns(address) {
        if (msg.sender==tx.origin){
            require(msg.sender==owner,"only owner does.");
        }
        return owner;
    }

    /** 
    * メンバーのみチェック
    */
    modifier onlyMember(){
        require(memberManagerContract.isMember(address(this),msg.sender),"only member does.");
        _;
    }

    /**
    * オーナーチェック
    */
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
}