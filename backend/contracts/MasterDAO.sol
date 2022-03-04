// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


/**
* This contract is to create dao easier than pesent methmod.
* - When you create your own dao, you can get a NFT what prove to be a dao member.
*/
contract MasterDAO is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _memberIdTracker;
    Counters.Counter private _daoIdTracker;
    Counters.Counter private _proposalIdTracker;

    uint public PROPOSAL_PASS_LINE = 60;

    string public githubURL;
    uint256 public amountOfDotation;

    struct MemberInfo {
        string name;
        uint256 memberId;
    }

    struct DaoInfo {
        address ownerAddress;
        address daoAddress;
        string daoName;
        string githubURL;
        bool rewardApproved;
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
        uint256 relatedId;
        address relatedAddress;
        ProposalStatus proposalStatus;
    }

    struct VotingInfo {
        uint256 votingCount;
        uint256 yesCount;
        uint256 noCount;
    }

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);
    event DaoAdded(address indexed eoa, uint256 daoId);
    event Donated(address indexed eoa, uint256 amount);
    event Divided(address indexed eoa, address to, uint256 amount);
    event SubmitedProposal(address indexed eoa, string title, uint256 proposalId);
    event ChangedProposalStatus(address indexed eoa, uint256 proposalId, ProposalStatus _proposalStatus);
    event VotedForProposal(address indexed eoa, uint256 _proposalId);
    // event StartedVoteOfDao(address indexed daoAddress,uint256 voteId);
    // event Voted(address indexed eoa, address daoAddress);
    // event FinishedVoteOfDao(address indexed eoa, address daoAddress,uint256 voteId);
    // event StartedMemberVoting(address indexed eoa, address memberAddress, bool isMemberAdded, uint256 proposalId);
    // event VotedForMember(address indexed eoa, address memberAddress);
    // event FinishedMemberVoting(address indexed eoa, address memberAddress);

    // EAO address => MemberId
    mapping(address => uint256) public memberIds;
    // Member id => MemberInfo
    mapping(uint256 => MemberInfo) public memberInfoes;
    // dao id => DAOInfo
    mapping(uint256 => DaoInfo) public daoInfoes;
    // Dao address => dao id
    mapping(address => uint256) public daoIds;
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
    constructor(string memory _githubURL, string memory _ownerName){
        // initial id is started 1.
        _daoIdTracker.increment();
        _memberIdTracker.increment();

        githubURL = _githubURL;
        memberIds[msg.sender] = _memberIdTracker.current();
        memberInfoes[_memberIdTracker.current()]=MemberInfo(_ownerName,_memberIdTracker.current());
        _memberIdTracker.increment();
    }

    /** 
    * DAOを登録する。
    */
    function registerDAO(address daoAddress,string memory daoName,string memory _githubURL) public {
        require(daoIds[daoAddress]==0,"already registerd.");
        uint256 id = _daoIdTracker.current();
        daoInfoes[id] = DaoInfo(msg.sender,daoAddress,daoName,_githubURL,false);
        daoIds[daoAddress] = id;
        _daoIdTracker.increment();
        emit DaoAdded(msg.sender, id);
    }

    /** 
    * DAOの分配承認を変更する
    */
    function changeDaoReward(address _daoAddress, uint256 _relatedProposalId, bool _reward) public onlyMember {
        require(_daoAddress==proposalInfoes[_relatedProposalId].relatedAddress,"Not proposed.");
        require(proposalInfoes[_relatedProposalId].proposalStatus==ProposalStatus.Running,"Not approved.");
        daoInfoes[daoIds[_daoAddress]].rewardApproved = _reward;
        proposalInfoes[_relatedProposalId].proposalStatus = ProposalStatus.Finished;
    }

    /** 
    * メンバーを追加する
    */
    function addMember(string memory _name, address _memberAddress, uint256 _relatedProposalId) public onlyMember {
        require(_memberAddress==proposalInfoes[_relatedProposalId].relatedAddress,"Not proposed.");
        require(proposalInfoes[_relatedProposalId].proposalStatus==ProposalStatus.Running,"Not approved.");
        memberIds[_memberAddress] = _memberIdTracker.current();
        memberInfoes[_memberIdTracker.current()]=MemberInfo(_name,_memberIdTracker.current());
        proposalInfoes[_relatedProposalId].proposalStatus = ProposalStatus.Finished;
        emit MemberAdded(msg.sender, _memberIdTracker.current());
        _memberIdTracker.increment();
    }

    /** 
    * メンバーを削除する
    */
    function deleteMember(address _memberAddress, uint256 _relatedProposalId) public onlyMember {
        require(_memberAddress==proposalInfoes[_relatedProposalId].relatedAddress,"Not proposed.");
        require(proposalInfoes[_relatedProposalId].proposalStatus==ProposalStatus.Running,"Not approved.");
        uint256 _memberId = _memberIdTracker.current();
        memberInfoes[memberIds[_memberAddress]].name = "";
        memberInfoes[memberIds[_memberAddress]].memberId = 0;
        memberIds[_memberAddress] = 0;
        emit MemberDeleted(msg.sender, _memberId);
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
        require(daoIds[to]!=0 && daoInfoes[daoIds[to]].rewardApproved==true,"only approved dao can get.");
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
    * daoの一覧を取得する  
    */
    function getDaoList() public view returns (DaoInfo[] memory){
        DaoInfo[] memory daoList = new DaoInfo[](_daoIdTracker.current() - 1);
        for (uint256 i=1; i < _daoIdTracker.current(); i++) {
            if (bytes(daoInfoes[i].daoName).length!=0){
                daoList[i-1] = daoInfoes[i];
            }
        }
        return daoList;
    }

    /** 
    * 提案を提出する
    */
    function submitProposal(ProposalKind _proposalKind, string memory _title, string memory _outline, string memory _details, 
        string memory _githubURL, uint256 _relatedId, address _relatedAddress) public onlyMember {
        proposalInfoes[_proposalIdTracker.current()] = 
            ProposalInfo(_proposalKind, _title, _outline, _details, _githubURL, _proposalIdTracker.current()
            , _relatedId, _relatedAddress, ProposalStatus.UnderDiscussionOnGithub);
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
        for (uint256 i=0; i < _proposalIdTracker.current() - 1; i++) {
            if (bytes(proposalInfoes[i].title).length!=0){
                proposalList[i] = proposalInfoes[i];
            }
        }
        return proposalList;
    }

    /**
    * メンバーの一覧を取得する
    */
    function getMemberList() public view returns(MemberInfo[] memory) {
        MemberInfo[] memory memberList = new MemberInfo[](_memberIdTracker.current() - 1);
        for (uint256 i=1; i < _memberIdTracker.current(); i++) {
            if (bytes(memberInfoes[i].name).length!=0){
                memberList[i-1] = memberInfoes[i];
            }
        }
        return memberList;
    }

    /**
    * 投票を開始する
    */
    function _startVoting(uint256 _proposalId) internal {
        votingInfoes[_proposalId]=VotingInfo(0,0,0);
    }

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
    * 入金を受け取る
    */
    receive() external payable {}

    /** 
    * Modifiter　メンバーのみ実行可能
    */
    modifier onlyMember(){
        require(memberIds[msg.sender]!=0,"only member does.");
        _;
    }

    // /**
    // * メンバーの追加・削除投票を開始する
    // */
    // function startMemberVoting(string memory name, address memberAddress, bool _isMemberAdded) public onlyMember {
    //     require(votingMemberInProgress==address(0),"another voting is going.");
    //     require(memberAddress!=address(0),"invalid address.");
    //     require((bytes(memberInfoes[memberAddress].name).length==0 && _isMemberAdded==true) || 
    //             (bytes(memberInfoes[memberAddress].name).length!=0 && _isMemberAdded==false),"already finished.");
    //     votingMemberInProgress = memberAddress;
    //     _yesCountOfMember.reset();
    //     isMemberAdded = _isMemberAdded;
    //     _memberProposalIdTracker.increment();
    //     memberProposalHistories[_memberProposalIdTracker.current()]=MemberProposal(name,memberAddress,_memberIdTracker.current());
    //     emit StartedMemberVoting(msg.sender, memberAddress, _isMemberAdded, _memberProposalIdTracker.current());
    // }

    // /**
    // * メンバー投票する
    // */
    // function voteForMember(address memberAddress,bool yes) public onlyMember {
    //     require(votingMemberInProgress==memberAddress,"invalid address.");
    //     require(memberAddress!=address(0),"invalid address.");
    //     require(checkAlreadyMemberVoted[msg.sender].targetAddress!=memberAddress ||
    //         (checkAlreadyMemberVoted[msg.sender].targetAddress==memberAddress && isMemberAdded!=
    //         checkAlreadyMemberVoted[msg.sender].isAdded),"already voted.");
    //     if (yes){
    //         _yesCountOfMember.increment();
    //     }
    //     checkAlreadyMemberVoted[msg.sender]=Vote(memberAddress, isMemberAdded);
    //     emit VotedForMember(msg.sender, memberAddress);
    // }

    // /**
    // * メンバー投票を終了する
    // */
    // function finishMemberVoting(address memberAddress) public onlyMember {
    //     require(votingMemberInProgress==memberAddress,"invalid address.");
    //     require(memberAddress!=address(0),"invalid address.");

    //     // console.log("## yes:",_yesCountOfMember.current());
    //     // console.log("## proposal count:",_memberProposalIdTracker.current());

    //     if (_yesCountOfMember.current() * 100 / memberProposalHistories[_memberProposalIdTracker.current()].countsOfVoter
    //         >= MEMBER_PASS_LINE){          
    //         _memberIdTracker.increment();
    //         memberInfoes[memberAddress]=
    //             MemberInfo(
    //                 memberProposalHistories[_memberProposalIdTracker.current()].name,
    //                 _memberIdTracker.current()
    //             );
    //     }
    //     votingMemberInProgress = address(0);
    //     isMemberAdded = true;
    //     emit FinishedMemberVoting(msg.sender, memberAddress);
    // }

    // /** 
    // * DAO投票を開始する。
    // */
    // function startDaoVoting(address daoAddress,bool isAdded) public onlyMember {
    //     require(votingDaoInProgress==address(0),"another vote is going.");
    //     require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
    //     _daoProposalIdTracker.increment();
    //     daoProposalHistories[_daoProposalIdTracker.current()] = DaoProposal(daoAddress,_memberIdTracker.current());
    //     votingDaoInProgress = daoAddress;
    //     isDaoAdded = isAdded;
    //     _yesCountOfDao.reset();
    //     emit StartedVoteOfDao(daoAddress,daoIds[daoAddress]);
    // }

    // /** 
    // * DAOに投票する
    // */
    // function voteForDao(address daoAddress,bool yes) public onlyMember {
    //     require(votingDaoInProgress==daoAddress,"a vote isn't going.");
    //     require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
    //     require((checkAlreadyDaoVoted[msg.sender].targetAddress!=daoAddress) ||
    //         (checkAlreadyDaoVoted[msg.sender].targetAddress==daoAddress && 
    //          checkAlreadyDaoVoted[msg.sender].isAdded!=isDaoAdded),"voting is finished.");

    //     checkAlreadyDaoVoted[msg.sender]=Vote(daoAddress,isDaoAdded);
    //     if (yes) {
    //         _yesCountOfDao.increment();
    //     }
    //     emit Voted(msg.sender, daoAddress);
    // }

    // /**
    // * DAO投票を終了する。
    // */
    // function finishDaoVoting(address daoAddress) public onlyMember {
    //     require(votingDaoInProgress!=address(0),"a vote isn't going.");
    //     require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
    //     if (_yesCountOfDao.current() * 100 / daoProposalHistories[daoIds[daoAddress]].countsOfVoter >= DAO_PASS_LINE){
    //         if (isDaoAdded){
    //             daoInfoes[daoIds[daoAddress]].rewardApproved = true;
    //         }
    //         else{
    //             daoInfoes[daoIds[daoAddress]].rewardApproved = false;
    //         }
    //     }
    //     else{
    //         if (isDaoAdded){
    //             daoInfoes[daoIds[daoAddress]].rewardApproved = false;
    //         }
    //         else{
    //             daoInfoes[daoIds[daoAddress]].rewardApproved = true;
    //         }
    //     }
    //     votingDaoInProgress = address(0);
    //     emit FinishedVoteOfDao(msg.sender, daoAddress,daoIds[daoAddress]);

    // }

}