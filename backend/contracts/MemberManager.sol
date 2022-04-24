// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MasterDAO.sol";
import "./ProposalManager.sol";

interface MemberManagerInterface {
    function isMember(address _targetDaoAddress, address _memberAddress)
        external
        view
        returns (bool);

    function getMemberCount(address _targetDaoAddress)
        external
        view
        returns (uint256);

    function checkWithinElectionCommisionTerm(address _targetDaoAddress)
        external
        view
        returns (bool);

    function countupTermCounter(address _targetDaoAddress) external;

    function isElectionComission(
        address _targetDaoAddress,
        address _memberAddress
    ) external view returns (bool);
}

interface DaoInterface {
    function getOwner() external returns (address);
}

/**
 * MemberManager
 */
contract MemberManager {
    using Counters for Counters.Counter;

    struct MemberInfo {
        string name;
        address eoaAddress;
        uint256 memberId;
        uint256 tokenId;
    }

    ProposalManagerInterface private proposalManagerContract;
    address private proposalManagerAddress;

    event MemberAdded(address indexed eoa, uint256 memberId);
    event MemberDeleted(address indexed eoa, uint256 memberId);

    // DAO address => EAO address => MemberId
    mapping(address => mapping(address => uint256)) private memberIds;
    // Dao Address => Member id => MemberInfo
    mapping(address => mapping(uint256 => MemberInfo)) private memberInfoes;
    // Dao Address => Counter
    mapping(address => Counters.Counter) private memberCounters;

    // 選挙管理委員
    // DAO address => id(1 or 2) => eoa address
    mapping(address => mapping(uint256 => address)) public electionCommision;
    // 任期カウンター
    // DAO address => counter
    mapping(address => Counters.Counter) public termCounter;
    // 任期定数
    uint256 public TERM_COUNT = 5;

    /**
     * コンストラクター
     */
    constructor() {}

    /**
     * memberManagerをセットする。
     */
    function setProposalManager(address _poposalManber) public {
        proposalManagerContract = ProposalManagerInterface(_poposalManber);
        proposalManagerAddress = _poposalManber;
    }

    /**
     * 初期メンバーを登録する
     */
    function addFirstMember(
        address _targetDaoAddress,
        string memory _ownerName,
        uint256 tokenId
    ) public onlyOwner(_targetDaoAddress) {
        require(
            memberIds[_targetDaoAddress][msg.sender] == 0,
            "already initialized."
        );

        memberCounters[_targetDaoAddress].increment();

        uint256 memberId = memberCounters[_targetDaoAddress].current();
        memberIds[_targetDaoAddress][msg.sender] = memberId;
        memberInfoes[_targetDaoAddress][memberId] = MemberInfo(
            _ownerName,
            msg.sender,
            memberId,
            tokenId
        );

        memberCounters[_targetDaoAddress].increment();

        //初期選挙管理委
        electionCommision[_targetDaoAddress][1] = msg.sender;

        emit MemberAdded(msg.sender, memberId);
    }

    /**
     * オーナーのみ
     */
    modifier onlyOwner(address _targetDaoAddress) {
        DaoInterface targetDao = DaoInterface(_targetDaoAddress);
        require(targetDao.getOwner() == msg.sender, "only owner does.");
        _;
    }

    /**
     * メンバーのみ
     */
    modifier onlyMember(address _targetDaoAddress) {
        require(
            memberIds[_targetDaoAddress][msg.sender] != 0,
            "only member does."
        );
        _;
    }

    /**
     * メンバーを追加する
     */
    function addMember(
        address _targetDaoAddress,
        string memory _name,
        address _memberAddress,
        uint256 _relatedProposalId,
        uint256 tokenId
    ) public  {
        ProposalInfo memory info = proposalManagerContract.getPropsalInfo(
            _targetDaoAddress,
            _relatedProposalId
        );
        require(
            info.proposalKind == ProposalKind.AddAMember,
            "invalid proposalKind."
        );
        require(info.relatedAddress == _memberAddress, "Not proposed.");
        require(info.proposalStatus == ProposalStatus.Running, "Not approved.");
        require(
            memberIds[_targetDaoAddress][_memberAddress] == 0,
            "already exists"
        );
        require((msg.sender==info.relatedAddress) || (memberIds[_targetDaoAddress][msg.sender] != 0), "Invalide operater.");

        uint256 memberId = memberCounters[_targetDaoAddress].current();
        memberIds[_targetDaoAddress][_memberAddress] = memberId;
        memberInfoes[_targetDaoAddress][memberId] = MemberInfo(
            _name,
            _memberAddress,
            memberId,
            tokenId
        );
        proposalManagerContract.updateProposalStatus(_targetDaoAddress, _relatedProposalId, uint(ProposalStatus.Finished));
        memberCounters[_targetDaoAddress].increment();
        emit MemberAdded(_memberAddress, memberId);
    }

    /**
     * メンバーを削除する
     */
    function deleteMember(
        address _targetDaoAddress,
        address _memberAddress,
        uint256 _relatedProposalId
    ) public onlyMember(_targetDaoAddress) {
        ProposalInfo memory info = proposalManagerContract.getPropsalInfo(
            _targetDaoAddress,
            _relatedProposalId
        );
        require(
            info.proposalKind == ProposalKind.DeleteAMember,
            "invalid proposalKind."
        );
        require(info.relatedAddress == _memberAddress, "Not proposed.");
        require(info.proposalStatus == ProposalStatus.Running, "Not approved.");

        uint256 _memberId = memberIds[_targetDaoAddress][_memberAddress];
        memberInfoes[_targetDaoAddress][_memberId].name = "";
        memberInfoes[_targetDaoAddress][_memberId].memberId = 0;
        memberInfoes[_targetDaoAddress][_memberId].tokenId = 0;
        memberInfoes[_targetDaoAddress][_memberId].eoaAddress = address(0);
        memberIds[_targetDaoAddress][_memberAddress] = 0;
        proposalManagerContract.updateProposalStatus(_targetDaoAddress, _relatedProposalId, uint(ProposalStatus.Finished));
        emit MemberDeleted(_memberAddress, _memberId);
    }

    /**
     * メンバーの一覧を取得する
     */
    function getMemberList(address _targetDaoAddress)
        public
        view
        returns (MemberInfo[] memory)
    {
        return _getMemberList(_targetDaoAddress);
    }

    function _getMemberList(address _targetDaoAddress)
        internal
        view
        returns (MemberInfo[] memory)
    {
        uint256 counter = 0;
        for (
            uint256 i = 1;
            i < memberCounters[_targetDaoAddress].current();
            i++
        ) {
            if (bytes(memberInfoes[_targetDaoAddress][i].name).length != 0) {
                counter++;
            }
        }

        MemberInfo[] memory memberList = new MemberInfo[](
            counter
        );
        for (
            uint256 i = 1;
            i < memberCounters[_targetDaoAddress].current();
            i++
        ) {
            if (bytes(memberInfoes[_targetDaoAddress][i].name).length != 0) {
                memberList[i - 1] = memberInfoes[_targetDaoAddress][i];
            }
        }
        return memberList;
    }

    // 選挙管理委員を実装する
    // todo:連続で委員にはなれないようにする
    function resetElectionCommision(
        address _targetDaoAddress,
        address _candidateEoaOne,
        address _candidateEoaTwo,
        uint256 _relatedProposalIdOne,
        uint256 _relatedProposalIdTwo
    ) public onlyMember(_targetDaoAddress) {
        require(memberIds[_targetDaoAddress][_candidateEoaOne] != 0,"must be a member.");
        ProposalInfo memory infoOne = proposalManagerContract.getPropsalInfo(
            _targetDaoAddress,
            _relatedProposalIdOne
        );
        require(
            infoOne.relatedAddress == _candidateEoaOne,
            "first candidate is not proposed."
        );
        require(
            infoOne.proposalStatus == ProposalStatus.Running,
            "first candidate is not approved."
        );

        if (_candidateEoaTwo != address(0)) {
            require(memberIds[_targetDaoAddress][_candidateEoaTwo] != 0,"must be a member.");
            ProposalInfo memory infoTwo = proposalManagerContract
                .getPropsalInfo(_targetDaoAddress, _relatedProposalIdTwo);
            require(
                infoTwo.proposalStatus == ProposalStatus.Running,
                "second candidate is not approved."
            );
            require(
                infoTwo.relatedAddress == _candidateEoaTwo,
                "second candidate is not proposed."
            );
            electionCommision[_targetDaoAddress][2] = _candidateEoaTwo;
            proposalManagerContract.updateProposalStatus(_targetDaoAddress, _relatedProposalIdTwo, uint(ProposalStatus.Finished));
        }

        termCounter[_targetDaoAddress].reset();
        electionCommision[_targetDaoAddress][1] = _candidateEoaOne;
        proposalManagerContract.updateProposalStatus(_targetDaoAddress, _relatedProposalIdOne, uint(ProposalStatus.Finished));
    }

    /**
     * メンバー数を取得する
     */
    function getMemberCount(address _targetDaoAddress)
        external
        view
        returns (uint256)
    {
        MemberInfo[] memory list = _getMemberList(_targetDaoAddress);
        return list.length;
    }

    /**
     * メンバー判定
     */
    function isMember(address _targetDaoAddress, address _memberAddress)
        external
        view
        returns (bool)
    {
        return memberIds[_targetDaoAddress][_memberAddress] != 0;
    }

    /**
     * 選挙管理委員会の任期チェック
     */
    function checkWithinElectionCommisionTerm(address _targetDaoAddress)
        external
        view
        returns (bool)
    {
        return termCounter[_targetDaoAddress].current() < TERM_COUNT;
    }

    /**
     * 任期カウンターをアップする
     */
    function countupTermCounter(address _targetDaoAddress) external {
        require(msg.sender == proposalManagerAddress, "invalid operator.");
        termCounter[_targetDaoAddress].increment();
    }

    /**
     * 選挙管理委員か
     */
    function isElectionComission(
        address _targetDaoAddress,
        address _memberAddress
    ) external view returns (bool) {
        return (electionCommision[_targetDaoAddress][1] == _memberAddress ||
            electionCommision[_targetDaoAddress][2] == _memberAddress);
    }
}
