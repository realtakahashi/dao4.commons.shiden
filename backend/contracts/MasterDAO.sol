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
    Counters.Counter private _yesCountOfDao;

    uint DAO_PASS_LINE = 60;

    string public githubURL;
    bool public votingDaoInProgress;
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
        bool finishedVoting;
    }

    struct DaoProposal {
        address daoAddress;
        uint256 countsOfVoter;
    }

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);
    event DaoAdded(address indexed eoa, uint256 daoId);
    event StartedVoteOfDao(address indexed daoAddress,uint256 voteId);
    event Voted(address indexed eoa, bool yes);
    event FinishedVoteOfDao(address indexed daoAddress,uint256 voteId);

    // EAO address => MemberInfo
    mapping(address => MemberInfo) public memberInfoes;
    // dao id => DAOInfo
    mapping(uint256 => DaoInfo) public daoInfoes;
    // Dao address => dao id
    mapping(address => uint256) public daoIds;
    // dao id => DaoProposal
    mapping(uint256 => DaoProposal) public daoProposalHistories;
    // eoa address => dao address 
    mapping(address => address) public checkAlreadyVoted;

    /** 
    * コンストラクター
    * DAOの基本情報をセットし、デプロイしたEOAを第一のメンバーとして登録する。
    */
    constructor(string memory _githubURL, string memory _ownerName){
        // initial id is started 1.
        _daoIdTracker.increment();
        _memberIdTracker.increment();
        _daoIdTracker.increment();

        githubURL = _githubURL;
        memberInfoes[msg.sender] = MemberInfo(_ownerName,_memberIdTracker.current());
        _memberIdTracker.increment();
    }

    /** 
    * DAOを登録する。
    */
    function registerDAO(address daoAddress,string memory daoName,string memory githubURL) public {
        require(daoIds[daoAddress]==0,"already registerd.");
        uint256 id = _daoIdTracker.current();
        daoInfoes[id] = DaoInfo(msg.sender,daoName,githubURL,false,false);
        daoIds[daoAddress] = id;
        _daoIdTracker.increment();
        emit DaoAdded(msg.sender, id);
    }

    /** 
    * DAO投票を開始する。
    */
    function startDaoVoting(address daoAddress) public {
        require(bytes(memberInfoes[msg.sender].name).length!=0);
        require(votingDaoInProgress!=true,"another vote is going.");
        require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
        require(daoInfoes[daoIds[daoAddress]].finishedVoting!=true,"this dao's voting is finished.");
        daoProposalHistories[daoIds[daoAddress]] = DaoProposal(daoAddress,_memberIdTracker.current());
        votingDaoInProgress = true;
        _yesCountOfDao.reset();
        emit StartedVoteOfDao(daoAddress,daoIds[daoAddress]);
    }

    /** 
    * 投票する
    */
    function vote(address daoAddress,bool yes) public {
        require(bytes(memberInfoes[msg.sender].name).length!=0);
        require(votingDaoInProgress=true,"a vote isn't going.");
        require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
        require(checkAlreadyVoted[msg.sender]!=daoAddress,"already voted.");

        checkAlreadyVoted[msg.sender]=daoAddress;
        if (yes) {
            _yesCountOfDao.increment();
        }
        emit Voted(msg.sender, yes);
    }

    /**
    * DAO投票を終了する。
    */
    function finishDaoVoting(address daoAddress) public {
        require(bytes(memberInfoes[msg.sender].name).length!=0);
        require(votingDaoInProgress=true,"a vote isn't going.");
        require(daoAddress!=address(0) || daoIds[daoAddress]!=0,"invalid address.");
        if (_yesCountOfDao.current() * 100 / daoProposalHistories[daoIds[daoAddress]].countsOfVoter >= DAO_PASS_LINE){
            daoInfoes[daoIds[daoAddress]].rewardApproved = true;
        }
        daoInfoes[daoIds[daoAddress]].finishedVoting = true;
        votingDaoInProgress = false;
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
    function divide(address to, uint256 ammount) public payable {
        require(bytes(memberInfoes[msg.sender].name).length!=0,"only member does.");
        payable(to).transfer(ammount);
    }

    /** 
    * contract addressの残高を確認する
    */
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /**
    * メンバーを追加する。
    * 正しくないdaoAddressにてコールした場合に対処するために、NFTのAddressをチェックする。
    */

    /**
    * メンバーを削除する。
    */


}