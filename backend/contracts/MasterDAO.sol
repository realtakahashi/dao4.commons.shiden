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
    Counters.Counter private _memberProposalIdTracker;
    Counters.Counter private _daoIdTracker;
    Counters.Counter private _daoProposalIdTracker;
    Counters.Counter private _yesCountOfDao;
    Counters.Counter private _yesCountOfMember;

    uint public DAO_PASS_LINE = 60;
    uint public MEMBER_PASS_LINE = 60;

    string public githubURL;
    address public votingDaoInProgress;
    bool public isDaoAdded;
    address public votingMemberInProgress;
    bool public isMemberAdded;
    uint256 public amountOfDotation;

    struct MemberInfo {
        string name;
        uint256 memberId;
    }

    struct MemberProposal {
        string name;
        address eoa;
        uint256 countsOfVoter;
    }

    struct DaoInfo {
        address ownerAddress;
        string daoName;
        string githubURL;
        bool rewardApproved;
    }

    struct DaoProposal {
        address daoAddress;
        uint256 countsOfVoter;
    }

    struct Vote {
        address targetAddress;
        bool isAdded;
    }

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);
    event DaoAdded(address indexed eoa, uint256 daoId);
    event StartedVoteOfDao(address indexed daoAddress,uint256 voteId);
    event Voted(address indexed eoa, bool yes);
    event FinishedVoteOfDao(address indexed daoAddress,uint256 voteId);

    // EAO address => MemberInfo
    mapping(address => MemberInfo) public memberInfoes;
    // member proposal id => MemberProposal
    mapping(uint256 => MemberProposal) public memberProposalHistories;
    // voter address => Vote
    mapping(address => Vote) public checkAlreadyMemberVoted;
    // dao id => DAOInfo
    mapping(uint256 => DaoInfo) public daoInfoes;
    // Dao address => dao id
    mapping(address => uint256) public daoIds;
    // dao proposal id => DaoProposal
    mapping(uint256 => DaoProposal) public daoProposalHistories;
    // eoa address => Vote
    mapping(address => Vote) public checkAlreadyDaoVoted;

    /** 
    * コンストラクター
    * DAOの基本情報をセットし、デプロイしたEOAを第一のメンバーとして登録する。
    */
    constructor(string memory _githubURL, string memory _ownerName){
        // initial id is started 1.
        _daoIdTracker.increment();
        _memberIdTracker.increment();
        _daoIdTracker.increment();
        // initialize voting status
        votingDaoInProgress = address(0);
        votingMemberInProgress = address(0);
        isMemberAdded = true;

        githubURL = _githubURL;
        memberInfoes[msg.sender] = MemberInfo(_ownerName,_memberIdTracker.current());
        _memberIdTracker.increment();
    }

    /**
    * メンバーの追加・削除投票を開始する
    */
    function startMemberVoting(string memory name, address memberAddress, bool _isMemberAdded) public onlyMember {
        require(votingMemberInProgress==address(0),"another voting is going.");
        require(memberAddress!=address(0),"invalid address.");
        require((memberProposalHistories[_memberProposalIdTracker.current()].eoa==memberAddress && _isMemberAdded==false) ||
            (memberProposalHistories[_memberProposalIdTracker.current()].eoa==address(0) && _isMemberAdded==true),"already finished.");
        votingMemberInProgress = memberAddress;
        _yesCountOfMember.reset();
        isMemberAdded = _isMemberAdded;
        _memberProposalIdTracker.increment();
        memberProposalHistories[_memberProposalIdTracker.current()]=MemberProposal(name,memberAddress,_memberIdTracker.current());
    }

    /**
    * メンバー投票する
    */
    function voteForMember(address memberAddress,bool yes) public onlyMember {
        require(votingMemberInProgress==memberAddress,"invalid address.");
        require(memberAddress!=address(0),"invalid address.");
        require(checkAlreadyMemberVoted[msg.sender].targetAddress!=memberAddress ||
            (checkAlreadyMemberVoted[msg.sender].targetAddress==memberAddress && isMemberAdded!=
            checkAlreadyMemberVoted[msg.sender].isAdded),"already voted.");
        if (yes){
            _yesCountOfMember.increment();
        }
        checkAlreadyMemberVoted[msg.sender]=Vote(memberAddress, isMemberAdded);
    }

    /**
    * メンバー投票を終了する
    */
    function finishMemberVoting(address memberAddress) public {
        require(votingMemberInProgress==memberAddress,"invalid address.");
        require(memberAddress!=address(0),"invalid address.");

        if (_yesCountOfMember.current() * 100 / memberProposalHistories[_memberProposalIdTracker.current()].countsOfVoter
            >= MEMBER_PASS_LINE){
            memberInfoes[memberAddress]=
                MemberInfo(
                    memberProposalHistories[_memberProposalIdTracker.current()].name,
                    _memberIdTracker.current()
                );
            _memberIdTracker.increment();
        }
        votingMemberInProgress = address(0);
        isMemberAdded = true;
    }

    /** 
    * DAOを登録する。
    */
    function registerDAO(address daoAddress,string memory daoName,string memory githubURL) public {
        require(daoIds[daoAddress]==0,"already registerd.");
        uint256 id = _daoIdTracker.current();
        daoInfoes[id] = DaoInfo(msg.sender,daoName,githubURL,false);
        daoIds[daoAddress] = id;
        _daoIdTracker.increment();
        emit DaoAdded(msg.sender, id);
    }

    /** 
    * DAO投票を開始する。
    */
    function startDaoVoting(address daoAddress,bool isAdded) public onlyMember {
        require(votingDaoInProgress==address(0),"another vote is going.");
        require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
        _daoProposalIdTracker.increment();
        daoProposalHistories[_daoProposalIdTracker.current()] = DaoProposal(daoAddress,_memberIdTracker.current());
        votingDaoInProgress = daoAddress;
        isDaoAdded = isAdded;
        _yesCountOfDao.reset();
        emit StartedVoteOfDao(daoAddress,daoIds[daoAddress]);
    }

    /** 
    * DAOに投票する
    */
    function voteForDao(address daoAddress,bool yes) public onlyMember {
        require(votingDaoInProgress==daoAddress,"a vote isn't going.");
        require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
        require((checkAlreadyDaoVoted[msg.sender].targetAddress!=daoAddress) ||
            (checkAlreadyDaoVoted[msg.sender].targetAddress==daoAddress && 
             checkAlreadyDaoVoted[msg.sender].isAdded!=isDaoAdded),"voting is finished.");

        checkAlreadyDaoVoted[msg.sender]=Vote(daoAddress,isDaoAdded);
        if (yes) {
            _yesCountOfDao.increment();
        }
        emit Voted(msg.sender, yes);
    }

    /**
    * DAO投票を終了する。
    */
    function finishDaoVoting(address daoAddress) public onlyMember {
        require(votingDaoInProgress!=address(0),"a vote isn't going.");
        require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
        if (_yesCountOfDao.current() * 100 / daoProposalHistories[daoIds[daoAddress]].countsOfVoter >= DAO_PASS_LINE){
            daoInfoes[daoIds[daoAddress]].rewardApproved = true;
        }
        else{
            daoInfoes[daoIds[daoAddress]].rewardApproved = false;
        }
        votingDaoInProgress = address(0);
        emit FinishedVoteOfDao(daoAddress,daoIds[daoAddress]);

    }

    /** 
    * 寄付を受け付ける
    */
    function donate() public payable {
        amountOfDotation += msg.value;
    }

    /** 
    * 分配する
    */
    function divide(address to, uint256 ammount) public payable onlyMember {
        require(daoIds[to]!=0 && daoInfoes[daoIds[to]].rewardApproved==true,"only approved dao can get.");
        payable(to).transfer(ammount);
    }

    /** 
    * contract addressの残高を確認する
    */
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /** 
    * Modifiter　メンバーのみ実行可能
    */
    modifier onlyMember(){
        require(bytes(memberInfoes[msg.sender].name).length!=0,"only member does.");
        _;
    }
}