// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MemberManager.sol";

enum ProposalKind {
    AddAMember,
    DeleteAMember,
    UseOfFunds,
    CommunityManagement,
    Activities,
    ElectionComissionPropsal,
    DaoReward,
    CooperationProposal
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

interface ProposalManagerInterface {
    function getPropsalInfo(address _targetDaoAddress, uint256 _proposalId)
        external
        view
        returns (ProposalInfo memory);

    function updateProposalStatus(
        address _targetDaoAddress,
        uint256 _proposalId,
        uint256 _poposalStatus
    ) external;
}

/**
 * ProposalManager
 */
contract ProposalManager {
    using Counters for Counters.Counter;

    MemberManagerInterface private memberManagerContract;
    address private memberManagerAddress;

    uint256 public PROPOSAL_PASS_LINE = 60;

    // Dao address => proposal id => ProposalInfo
    mapping(address => mapping(uint256 => ProposalInfo)) private proposalInfoes;
    // Dao address => proposal id => Voting Info
    mapping(address => mapping(uint256 => VotingInfo)) private votingInfoes;
    // Dao address => proposal id => ( eoa => Already Voted)
    mapping(address => mapping(uint256 => mapping(address => bool))) private checkVoted;
    // Dao address => Counter
    mapping(address => Counters.Counter) private proposalCounters;

    event SubmitedProposal(
        address indexed eoa,
        string title,
        uint256 proposalId
    );
    event ChangedProposalStatus(
        address indexed eoa,
        uint256 proposalId,
        ProposalStatus _proposalStatus
    );
    event VotedForProposal(address indexed eoa, uint256 _proposalId);

    constructor() {}

    function setMemberManager(address _memberManagerAddress) public {
        memberManagerContract = MemberManagerInterface(_memberManagerAddress);
        memberManagerAddress = _memberManagerAddress;
    }

    modifier onlyMember(address _targetDaoAddress) {
        require(
            memberManagerContract.isMember(_targetDaoAddress, msg.sender),
            "only member does."
        );
        _;
    }

    modifier onlyElectionComission(address _targetDaoAddress) {
        require(
            memberManagerContract.isElectionComission(
                _targetDaoAddress,
                msg.sender
            ),
            "only election comission does."
        );
        _;
    }

    /**
     * 提案を提出する
     */
    function submitProposal(
        address _targetDaoAddress,
        ProposalKind _proposalKind,
        string memory _title,
        string memory _outline,
        string memory _details,
        string memory _githubURL,
        uint256 _relatedId,
        address _relatedAddress
    ) public onlyMember(_targetDaoAddress) {
        //選挙管理委員提案以外の場合は、任期をチェックする
        if (_proposalKind != ProposalKind.ElectionComissionPropsal) {
            if (
                memberManagerContract.checkWithinElectionCommisionTerm(
                    _targetDaoAddress
                ) == false
            ) {
                revert("need to select election comission.");
            }
        }
        //選挙管理委員提案でも任期内の場合は変更を不可とする。
        if (_proposalKind == ProposalKind.ElectionComissionPropsal) {
            if (
                memberManagerContract.checkWithinElectionCommisionTerm(
                    _targetDaoAddress
                ) == true
            ) {
                revert("still within term.");
            }
        }

        // Proposal Idを１から始めるためにカウントアップ
        if (proposalCounters[_targetDaoAddress].current() == 0) {
            proposalCounters[_targetDaoAddress].increment();
        }
        uint256 proposalId = proposalCounters[_targetDaoAddress].current();
        proposalInfoes[_targetDaoAddress][proposalId] = ProposalInfo(
            _proposalKind,
            _title,
            _outline,
            _details,
            _githubURL,
            proposalCounters[_targetDaoAddress].current(),
            _relatedId,
            _relatedAddress,
            ProposalStatus.UnderDiscussionOnGithub
        );
        emit SubmitedProposal(msg.sender, _title, proposalId);
        proposalCounters[_targetDaoAddress].increment();
    }

    /**
     * 提案のステータスを変更する
     */
    function changeProposalStatus(
        address _targetDaoAddress,
        uint256 _proposalId,
        ProposalStatus _proposalStatus
    ) public onlyElectionComission(_targetDaoAddress) {
        require(
            bytes(proposalInfoes[_targetDaoAddress][_proposalId].title)
                .length != 0,
            "Invalid proposal."
        );
        if (
            proposalInfoes[_targetDaoAddress][_proposalId].proposalStatus ==
            ProposalStatus.UnderDiscussionOnGithub
        ) {
            if (
                (_proposalStatus != ProposalStatus.Voting) &&
                (_proposalStatus != ProposalStatus.Pending) &&
                (_proposalStatus != ProposalStatus.Rejected)
            ) {
                revert("Invalid Status.");
            }
        } else if (
            proposalInfoes[_targetDaoAddress][_proposalId].proposalStatus ==
            ProposalStatus.Pending
        ) {
            if (
                (_proposalStatus != ProposalStatus.Voting) &&
                (_proposalStatus != ProposalStatus.Rejected) &&
                (_proposalStatus != ProposalStatus.UnderDiscussionOnGithub)
            ) {
                revert("proposalStatuss.");
            }
        } else if (
            proposalInfoes[_targetDaoAddress][_proposalId].proposalStatus ==
            ProposalStatus.Voting
        ) {
            if ((_proposalStatus != ProposalStatus.FinishedVoting)) {
                revert("Invalid Status.");
            }
        } else if (
            proposalInfoes[_targetDaoAddress][_proposalId].proposalStatus ==
            ProposalStatus.Running
        ) {
            if ((_proposalStatus != ProposalStatus.Finished)) {
                revert("Invalid Status.");
            }
        } else if (
            (proposalInfoes[_targetDaoAddress][_proposalId].proposalStatus ==
                ProposalStatus.Finished) ||
            (proposalInfoes[_targetDaoAddress][_proposalId].proposalStatus ==
                ProposalStatus.Rejected)
        ) {
            revert("Invalid Status.");
        }

        if (_proposalStatus == ProposalStatus.FinishedVoting) {
            proposalInfoes[_targetDaoAddress][_proposalId]
                .proposalStatus = _checkVotingResult(
                _targetDaoAddress,
                _proposalId
            );
            memberManagerContract.countupTermCounter(_targetDaoAddress);
        } else if (_proposalStatus == ProposalStatus.Voting) {
            proposalInfoes[_targetDaoAddress][_proposalId]
                .proposalStatus = _proposalStatus;
            _startVoting(_targetDaoAddress, _proposalId);
        } else if (_proposalStatus == ProposalStatus.Running) {
            revert("Invalid Status.");
        } else {
            proposalInfoes[_targetDaoAddress][_proposalId]
                .proposalStatus = _proposalStatus;
        }
        emit ChangedProposalStatus(msg.sender, _proposalId, _proposalStatus);
    }

    /**
     * 投票する
     */
    function voteForProposal(
        address _targetDaoAddress,
        uint256 _proposalId,
        bool yes
    ) public onlyMember(_targetDaoAddress) {
        require(
            proposalInfoes[_targetDaoAddress][_proposalId].proposalStatus ==
                ProposalStatus.Voting,
            "Now can not vote."
        );
        require(
            checkVoted[_targetDaoAddress][_proposalId][msg.sender] == false,
            "Already voted."
        );
        votingInfoes[_targetDaoAddress][_proposalId].votingCount++;
        if (yes) {
            votingInfoes[_targetDaoAddress][_proposalId].yesCount++;
        } else {
            votingInfoes[_targetDaoAddress][_proposalId].noCount++;
        }
        checkVoted[_targetDaoAddress][_proposalId][msg.sender] = true;
        emit VotedForProposal(msg.sender, _proposalId);
    }

    /**
     * 提案の一覧を取得する
     */
    function getProposalList(address _targetDaoAddress)
        public
        view
        returns (ProposalInfo[] memory)
    {
        uint256 index = 0;
        if (proposalCounters[_targetDaoAddress].current() != 0) {
            index = proposalCounters[_targetDaoAddress].current() - 1;
        }
        ProposalInfo[] memory proposalList = new ProposalInfo[](index);
        for (
            uint256 i = 1;
            i < proposalCounters[_targetDaoAddress].current();
            i++
        ) {
            if (bytes(proposalInfoes[_targetDaoAddress][i].title).length != 0) {
                proposalList[i - 1] = proposalInfoes[_targetDaoAddress][i];
            }
        }
        return proposalList;
    }

    /**
     * 投票結果を取得する
     */
    function getVotingResult(address _targetDaoAddress, uint256 _proposalId)
        public
        view
        returns (VotingInfo memory)
    {
        return votingInfoes[_targetDaoAddress][_proposalId];
    }

    /**
     * 投票を開始する
     */
    function _startVoting(address _targetDaoAddress, uint256 _proposalId)
        internal
    {
        votingInfoes[_targetDaoAddress][_proposalId] = VotingInfo(0, 0, 0);
    }

    /**
     * 投票結果をチェックする。
     */
    function _checkVotingResult(address _targetDaoAddress, uint256 _proposalId)
        internal
        view
        returns (ProposalStatus)
    {
        uint256 memberCount = memberManagerContract.getMemberCount(
            _targetDaoAddress
        );
        if (
            (votingInfoes[_targetDaoAddress][_proposalId].yesCount * 100) /
                memberCount >=
            PROPOSAL_PASS_LINE
        ) {
            return ProposalStatus.Running;
        } else {
            return ProposalStatus.Rejected;
        }
    }

    /**
     * 該当の提案状態を取得する
     */
    function getPropsalInfo(address _targetDaoAddress, uint256 _proposalId)
        external
        view
        returns (ProposalInfo memory)
    {
        return proposalInfoes[_targetDaoAddress][_proposalId];
    }

    /**
     * 該当する提案のステータスを更新する
     */
    function updateProposalStatus(
        address _targetDaoAddress,
        uint256 _proposalId,
        uint256 _poposalStatus
    ) external {
        require(msg.sender != tx.origin, "can not call directly.");
        require(
            msg.sender == memberManagerAddress ||
                msg.sender == _targetDaoAddress,
            "invalid origin."
        );
        // require(memberManagerContract.isMember(_targetDaoAddress, msg.sender),"only member does.");
        proposalInfoes[_targetDaoAddress][_proposalId]
            .proposalStatus = ProposalStatus(_poposalStatus);
    }
}
