// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./MemberManager.sol";
import "./ProposalManager.sol";

interface ProposalManagerInterface {
    function getPropsalStatus(address _targetDaoAddress, uint256 _proposalId) external view returns (uint);
    function getProposalRelatedAddress(address _targetDaoAddress, uint256 _proposalId) external view returns (address);
    function updateProposalStatus(address _targetDaoAddress, uint256 _proposalId,uint _poposalStatus) external;
}

/**
* This contract is to create dao easier than pesent methmod.
* - When you create your own dao, you can get a NFT what prove to be a dao member.
*/
contract MasterDAO is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _daoIdTracker;

    MemberManagerInterface private memberManagerContract;
    ProposalManagerInterface private proposalManagerContract;

    uint public PROPOSAL_PASS_LINE = 60;

    string public githubURL;
    uint256 public amountOfDotation;
    address private owner;
    string public ownerName;

    struct DaoInfo {
        address ownerAddress;
        address daoAddress;
        string daoName;
        string githubURL;
        bool rewardApproved;
    }


    event DaoAdded(address indexed eoa, uint256 daoId);
    event Donated(address indexed eoa, uint256 amount);
    event Divided(address indexed eoa, address to, uint256 amount);

    // dao id => DAOInfo
    mapping(uint256 => DaoInfo) public daoInfoes;
    // Dao address => dao id
    mapping(address => uint256) public daoIds;

    /** 
    * コンストラクター
    * DAOの基本情報をセットし、デプロイしたEOAを第一のメンバーとして登録する。
    */
    constructor(string memory _githubURL, string memory _ownerName, address _memberManager, address _proposalManger)
    {
        // initial id is started 1.
        _daoIdTracker.increment();

        owner = msg.sender;
        ownerName = _ownerName;
        githubURL = _githubURL;

        memberManagerContract = MemberManagerInterface(_memberManager);
        proposalManagerContract = ProposalManagerInterface(_proposalManger);
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
    function changeDaoReward(address _daoAddress, uint256 _relatedProposalId, bool _reward) public 
        onlyMember(address(this),msg.sender) 
    {
        address relatedAddress = proposalManagerContract.getProposalRelatedAddress(address(this), _relatedProposalId);
        require(_daoAddress==relatedAddress,"Not proposed.");
        
        ProposalManager.ProposalStatus status = 
            ProposalManager.ProposalStatus(proposalManagerContract.getPropsalStatus(address(this), _relatedProposalId));
        require(status==ProposalManager.ProposalStatus.Running,"Not approved.");
        
        daoInfoes[daoIds[_daoAddress]].rewardApproved = _reward;
        proposalManagerContract.updateProposalStatus(address(this), _relatedProposalId, 
            uint(ProposalManager.ProposalStatus.Finished));
    }


    /** 
    * 寄付を受け付ける
    */
    function donate() public payable {
        amountOfDotation += msg.value;
        emit Donated(msg.sender, msg.value);
    }

    /** 
    * MasterDAOの残高を分配する
    */
    function divide(address to, uint256 amount,uint256 relatedProposalId) public onlyMember(address(this),msg.sender) {
        require(daoIds[to]!=0 && daoInfoes[daoIds[to]].rewardApproved==true,"only approved dao can get.");

        ProposalManager.ProposalStatus status = 
            ProposalManager.ProposalStatus(proposalManagerContract.getPropsalStatus(address(this), relatedProposalId));
        require(status==ProposalManager.ProposalStatus.Running,"not Approved");
        address relatedAddress = proposalManagerContract.getProposalRelatedAddress(address(this), relatedProposalId);
        require(relatedAddress==to,"not Related");
        payable(to).transfer(amount);
        proposalManagerContract.updateProposalStatus(address(this), relatedProposalId, uint(ProposalManager.ProposalStatus.Finished));
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
    * オーナーを取得する
    */
    function getOwner() external view returns(address) {
        if (msg.sender==tx.origin){
            require(msg.sender==owner,"only owner does.");
        }
        return owner;
    }

    /**
    * 入金を受け取る
    */
    receive() external payable {}

    /** 
    * Modifiter　メンバーのみ実行可能
    */
    modifier onlyMember(address _targetDaoAddress, address _memberAddress){
        require(memberManagerContract.isMember(_targetDaoAddress, _memberAddress),"only member does.");
        _;
    }

}