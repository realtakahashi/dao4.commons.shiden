// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
* This contract is to create dao easier than pesent methmod.
* - When you create your own dao, you can get a NFT what prove to be a dao member.
*/
contract SubDAO is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _memberIdTracker;
    Counters.Counter private _contributeIdTracker;
    Counters.Counter private _proposalIdTracker;

    uint public PROPOSAL_PASS_LINE = 60;

    string public daoName;
    string public githubURL;
    uint256 public amountOfDotation;
    address private erc721Address;
    address private owner;

    struct MemberInfo {
        string name;
        uint256 tokenId;
        uint256 memberId;
    }

    struct ContributeInfo {
        address eoa;
        string githubURL;
    }

    enum ProposalKind {
        AddAMember,  
        DeleteAMember,
        UseOfFunds,
        CommunityManagement,
        Activities
    }

    enum ProposalStatus {
        UnderDiscussionOnGithub,
        Voting,
        Pending,
        Running,
        Rejected,
        FinishedVoting,
        Finished
    }

    struct ProposalInfo {
        ProposalKind proposalKind;
        string title;
        string outline;
        string details;
        string githubURL;
        uint256 proposalId;
        ProposalStatus proposalStatus;
    }

    struct VotingInfo {
        uint256 votingCount;
        uint256 yesCount;
        uint256 noCount;
    }

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);
    event UpdatedOwnerInfo(address memberNft, uint256 tokenId);
    event ReportedContribution(address indexed eoa, string githubURL, uint256 reportId);
    event Donated(address indexed eoa, uint256 amount);
    event Divided(address indexed eoa, address to, uint256 amount);
    event SubmitedProposal(address indexed eoa, string title, uint256 proposalId);
    event ChangedProposalStatus(address indexed eoa, uint256 proposalId, ProposalStatus _proposalStatus);
    event VotedForProposal(address indexed eoa, uint256 _proposalId);

    // EOA address => MemberInfo
    mapping(address => MemberInfo) public memberInfoes;
    // Member Id => EOA address
    mapping(uint256 => address) public memberIds;
    // contoribute id => ContributeInfo
    mapping(uint256 => ContributeInfo) public contributionReports;
    // proposal id => ProposalInfo
    mapping(uint256 => ProposalInfo) public proposalInfoes;
    // proposal id => Voting Info
    mapping(uint256 => VotingInfo) public votingInfoes;
    // proposal id => ( eoa => Already Voted)
    mapping(uint256 => mapping(address => bool)) public checkVoted;

    /** 
    * コンストラクター
    * DAOの基本情報をセットし、デプロイしたEOAを第一のメンバーとして登録する。
    */
    constructor(string memory _daoName, string memory _githubURL, string memory _ownerName){
        // initial increment
        _memberIdTracker.increment();
        _proposalIdTracker.increment();
        _contributeIdTracker.increment();
        
        daoName = _daoName;
        githubURL = _githubURL;
        owner = msg.sender;
        memberInfoes[msg.sender] = MemberInfo(_ownerName,0,_memberIdTracker.current());
        memberIds[_memberIdTracker.current()] = msg.sender;
        _memberIdTracker.increment();
    }

    /**
    * SubDao用のNFTのアドレス、オーナーのTokenIdを設定する
    */
    function updateNftAddressAndOwnerTokenId(address _nftAddress, uint256 _ownerTokenId) public onlyOwner {
        erc721Address = _nftAddress;
        memberInfoes[msg.sender].tokenId = _ownerTokenId;
        emit UpdatedOwnerInfo(_nftAddress,_ownerTokenId);
    }

    /**
    * SubDAOに関連付けられたメンバーNFTのアドレスを取得する
    */
    function getMemberNFTAddress() public view onlyMember returns (address) {
        return erc721Address;
    }

    /**
    * メンバーを追加する。
    * 正しくないdaoAddressにてコールした場合に対処するために、NFTのAddressをチェックする。
    */
    function addMember(address eoa, string memory name, address daoERC721Address,uint256 tokenId) public onlyMember {
        require(erc721Address==daoERC721Address,"NFT address isn't correct.");
        memberInfoes[eoa] = MemberInfo(name,tokenId,_memberIdTracker.current());
        memberIds[_memberIdTracker.current()] = eoa;
        emit MemberAdded(eoa,_memberIdTracker.current());
        _memberIdTracker.increment();
    }

    /**
    * メンバーを削除する。
    */
    function deleteMember(address eoa) public onlyMember {
        require(bytes(memberInfoes[eoa].name).length!=0,"not exists.");
        uint256 memberId = memberInfoes[eoa].memberId;
        memberInfoes[eoa].name = "";
        memberInfoes[eoa].tokenId = 0;
        memberInfoes[eoa].memberId = 0;
        memberIds[memberId] = address(0);
        emit MemberDeleted(eoa,memberId);
    }

    /**
    * メンバーの一覧を取得する
    */
    function getMemberList() public view returns (MemberInfo[] memory) {
        MemberInfo[] memory memberList = new MemberInfo[](_memberIdTracker.current() - 1);
        for (uint256 i=1; i < _memberIdTracker.current(); i++) {
            if (bytes(memberInfoes[memberIds[i]].name).length!=0){
                memberList[i-1] = memberInfoes[memberIds[i]];
            }
        }
        return memberList;
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
    function divide(address to, uint256 amount) public payable onlyMember {
        payable(to).transfer(amount);
        emit Divided(msg.sender, to, amount);
    }

    /** 
    * contract addressの残高を確認する
    */
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /** 
    * 提案を提出する
    */
    function submitProposal(ProposalKind _proposalKind, string memory _title, string memory _outline, string memory _details, 
        string memory _githubURL) public onlyMember {
        proposalInfoes[_proposalIdTracker.current()] = 
            ProposalInfo(_proposalKind, _title, _outline, _details, _githubURL, _proposalIdTracker.current()
            ,ProposalStatus.UnderDiscussionOnGithub);
        emit SubmitedProposal(msg.sender, _title, _proposalIdTracker.current());
        _proposalIdTracker.increment();
    }

    /**
    * 提案のステータスを変更する
    */
    function changeProposalStatus(uint256 _proposalId, ProposalStatus _proposalStatus) public onlyMember {
        require(bytes(proposalInfoes[_proposalId].title).length!=0,"Invalid proposal.");
        if (proposalInfoes[_proposalId].proposalStatus == ProposalStatus.UnderDiscussionOnGithub) {
            if ((_proposalStatus != ProposalStatus.Voting) && (_proposalStatus != ProposalStatus.Pending) && 
                (_proposalStatus != ProposalStatus.Rejected)) {
                revert("Invalid Status.");
            }
        }
        else if (proposalInfoes[_proposalId].proposalStatus == ProposalStatus.Pending) {
            if ((_proposalStatus != ProposalStatus.Voting) && 
                (_proposalStatus != ProposalStatus.Rejected) &&
                (_proposalStatus != ProposalStatus.UnderDiscussionOnGithub)) {
                revert("Invalid Status.");
            }
        }
        else if (proposalInfoes[_proposalId].proposalStatus == ProposalStatus.Voting) {
            if ((_proposalStatus != ProposalStatus.FinishedVoting)) {
                revert("Invalid Status.");
            }
        }
        else if (proposalInfoes[_proposalId].proposalStatus == ProposalStatus.Running) {
            if ((_proposalStatus != ProposalStatus.Finished)) {
                revert("Invalid Status.");
            }
        }
        else if ((proposalInfoes[_proposalId].proposalStatus == ProposalStatus.Finished) ||
                (proposalInfoes[_proposalId].proposalStatus == ProposalStatus.Rejected)) {
                revert("Invalid Status.");
        }

        if (_proposalStatus == ProposalStatus.FinishedVoting){
            proposalInfoes[_proposalId].proposalStatus = _checkVotingResult(_proposalId);
        }
        else if (_proposalStatus == ProposalStatus.Voting){
            proposalInfoes[_proposalId].proposalStatus = _proposalStatus;
            _startVoting(_proposalId);
        }
        else {
            proposalInfoes[_proposalId].proposalStatus = _proposalStatus;
        }
        emit ChangedProposalStatus(msg.sender, _proposalId, _proposalStatus);
    }

    /**
    * 投票する
    */
    function voteForProposal(uint256 _proposalId, bool yes) public onlyMember {
        require(proposalInfoes[_proposalId].proposalStatus==ProposalStatus.Voting,"Now can not vote.");
        require(checkVoted[_proposalId][msg.sender]==false,"Already voted.");
        votingInfoes[_proposalId].votingCount++;
        if (yes){
            votingInfoes[_proposalId].yesCount++;
        }
        else{
            votingInfoes[_proposalId].noCount++;
        }
        checkVoted[_proposalId][msg.sender] = true;
        emit VotedForProposal(msg.sender, _proposalId);
    }

    /**
    * 提案の一覧を取得する
    */
    function getProposalList() public view returns (ProposalInfo[] memory) {
        ProposalInfo[] memory proposalList = new ProposalInfo[](_proposalIdTracker.current() - 1);
        for (uint256 i=1; i < _proposalIdTracker.current(); i++) {
            if (bytes(proposalInfoes[i].title).length!=0){
                proposalList[i-1] = proposalInfoes[i];
            }
        }
        return proposalList;
    }

    /**
    * 投票を開始する
    */
    function _startVoting(uint256 _proposalId) internal {
        votingInfoes[_proposalId]=VotingInfo(0,0,0);
    }

    /**
    * 入金を受け取る
    */
    receive() external payable {}
    
    /**
    * 投票結果をチェックする。
    */
    function _checkVotingResult(uint256 _proposalId) internal view returns (ProposalStatus){
        if (votingInfoes[_proposalId].yesCount * 100 / (_memberIdTracker.current() - 1) >= PROPOSAL_PASS_LINE){   
            return ProposalStatus.Running;
        }
        else {
            return ProposalStatus.Rejected;
        }       
    }

    /** 
    * メンバーのみチェック
    */
    modifier onlyMember(){
        require(bytes(memberInfoes[msg.sender].name).length!=0,"only member does.");
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