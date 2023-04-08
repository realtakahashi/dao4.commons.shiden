// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MemberManager.sol";
import "./ProposalManager.sol";
import "./CooperateProposalManager.sol";

interface CooperateProposalInterface {
    function getCooperateProposalInfo() external view returns(CooperationProposalInfo memory);
}

enum CooperationProposalKind {
    UseOfFunds,
    CommunityManagement,
    Activities
}

struct CooperationProposalInfo {
    CooperationProposalKind cooperationProposalKind;
    address[] daoAddressList;
    string title;
    string outline;
    string details;
    string githubURL;
    uint256[] relatedProposalIdList;
    ProposalStatus proposalStatus;
    address[] targetAddressList;
    uint256 targetAmount;
    address addressOfThisContract;
}

/**
 * CooperationProposal
 */
contract CooperateProposal is ReentrancyGuard {
    uint256 public COOPERATE_PROPOSAL_PASS_LINE = 60;
    MemberManagerInterface private memberManagerContract;
    ProposalManagerInterface private proposalManagerContract;
    CooperateProposalManagerInterface private cooperateProposalManagerContract;
    address private memberManagerAddress;
    address private proposalManagerAddress;
    address private cooperateProposalManagerAddress;
    CooperationProposalInfo public cooperateProposalInfo;
    VotingInfo public cooperateVotingInfo;
    mapping(address => bool) private cooperateCheckVoted;

    event SubmitedCooperateProposal(
        address indexed propsalAddress,
        string title
    );
    event ChangedCooperateProposalStatus(
        address indexed eoa,
        address proposalAddress,
        ProposalStatus _proposalStatus
    );
    event VotedForCooperateProposal(
        address indexed eoa,
        address proposalAddress
    );
    event ExecutedDivide(address indexed thisContractAddress);

    function setManagerContract(
        address _memberManagerAddress,
        address _proposalManagerAddress,
        address _cooperateProposalManagerAddress
    ) public {
        memberManagerContract = MemberManagerInterface(_memberManagerAddress);
        memberManagerAddress = _memberManagerAddress;
        proposalManagerContract = ProposalManagerInterface(
            _proposalManagerAddress
        );
        proposalManagerAddress = _proposalManagerAddress;
        cooperateProposalManagerContract = CooperateProposalManagerInterface(_cooperateProposalManagerAddress);
        cooperateProposalManagerAddress = _cooperateProposalManagerAddress;
    }

    /**
     * 提案を提出する
     */
    function submitProposal(
        address[] memory _daoAddressList,
        CooperationProposalKind _proposalKind,
        string memory _title,
        string memory _outline,
        string memory _details,
        string memory _githubURL,
        uint256[] memory _proposalIdListPassedByEachDao,
        address[] memory _targetAddressList,
        uint256 _targetAmount
    )
        public
        onlyCooperateMemeber(_daoAddressList)
        passedProposalByEachDao(_daoAddressList, _proposalIdListPassedByEachDao)
        CheckTermOfElectionCommision(_daoAddressList)
    {
        cooperateProposalInfo.cooperationProposalKind = _proposalKind;
        cooperateProposalInfo.daoAddressList = _daoAddressList;
        cooperateProposalInfo.title = _title;
        cooperateProposalInfo.outline = _outline;
        cooperateProposalInfo.details = _details;
        cooperateProposalInfo.githubURL = _githubURL;
        cooperateProposalInfo
            .relatedProposalIdList = _proposalIdListPassedByEachDao;
        cooperateProposalInfo.proposalStatus = ProposalStatus
            .UnderDiscussionOnGithub;
        cooperateProposalInfo.targetAddressList = _targetAddressList;
        cooperateProposalInfo.targetAmount = _targetAmount;
        cooperateProposalInfo.addressOfThisContract = address(this);

        cooperateProposalManagerContract.addToCooperateProposalList(address(this));

        emit SubmitedCooperateProposal(address(this), _title);
    }

    function changeProposalStatus(ProposalStatus _proposalStatus) public {
        require(
            onlyEitherElectionCommision(cooperateProposalInfo.daoAddressList),
            "Only Either Election Commision does."
        );
        require(
            checkAbleToChangeStatus(
                cooperateProposalInfo.proposalStatus,
                _proposalStatus
            ),
            "Invalid change status."
        );

        if (_proposalStatus == ProposalStatus.FinishedVoting) {
            cooperateProposalInfo.proposalStatus = _checkVotingResult();
            address tmpDaoAddress = getDaoAddressWhichYouBelong(
                cooperateProposalInfo.daoAddressList
            );
            memberManagerContract.countupTermCounter(tmpDaoAddress);
        } else if (_proposalStatus == ProposalStatus.Voting) {
            cooperateProposalInfo.proposalStatus = _proposalStatus;
            _startVoting();
        } else {
            cooperateProposalInfo.proposalStatus = _proposalStatus;
        }
        emit ChangedCooperateProposalStatus(
            msg.sender,
            address(this),
            _proposalStatus
        );
    }

    /**
     * 投票する
     */
    function voteForProposal(
        bool yes
    ) public {
        checkOnlyCooperateMemeber(cooperateProposalInfo.daoAddressList);
        require(
            cooperateProposalInfo.proposalStatus == ProposalStatus.Voting,
            "Now can not vote."
        );
        require(cooperateCheckVoted[msg.sender] == false, "Already voted.");
        cooperateVotingInfo.votingCount++;
        if (yes) {
            cooperateVotingInfo.yesCount++;
        } else {
            cooperateVotingInfo.noCount++;
        }
        cooperateCheckVoted[msg.sender] = true;
        emit VotedForCooperateProposal(msg.sender, address(this));
    }

    function divide(
        uint256[] memory divideList
    ) public payable {
        require(
            cooperateProposalInfo.targetAddressList.length == divideList.length,
            "Invalid divide."
        );
        uint256 divideAmount = 0;
        for (uint i = 0; i < divideList.length; i++) {
            divideAmount = divideAmount + divideList[i];
        }
        require(
            divideAmount <= address(this).balance,
            "Invalid deposited amount."
        );
        for (uint i = 0; i < divideList.length; i++) {
            payable(cooperateProposalInfo.targetAddressList[i]).transfer(
                divideList[i]
            );
        }
        cooperateProposalInfo.proposalStatus = ProposalStatus.Finished;
        emit ExecutedDivide(address(this));
    }

    function getCooperateProposalInfo() external view returns(CooperationProposalInfo memory) {
        return cooperateProposalInfo;
    }

    modifier onlyCooperateMemeber(address[] memory _daoAddressList) {
        bool result = false;
        for (uint i = 0; i < _daoAddressList.length; i++) {
            if (
                memberManagerContract.isMember(
                    _daoAddressList[i],
                    msg.sender
                ) == true
            ) {
                result = true;
                break;
            }
        }
        require(result, "only member does.");
        _;
    }

    function checkOnlyCooperateMemeber(address[] memory _daoAddressList) private onlyCooperateMemeber(_daoAddressList) {}

    modifier passedProposalByEachDao(
        address[] memory _daoAddressList,
        uint256[] memory _proposalIdListPassedByEachDao
    ) {
        bool result = true;
        if (
            _daoAddressList.length == 0 ||
            _proposalIdListPassedByEachDao.length == 0
        ) {
            result = false;
        } else {
            if (
                _daoAddressList.length != _proposalIdListPassedByEachDao.length
            ) {
                result = false;
            } else {
                for (uint i = 0; i < _daoAddressList.length; i++) {
                    ProposalInfo memory proposalInfo = proposalManagerContract
                        .getPropsalInfo(
                            _daoAddressList[i],
                            _proposalIdListPassedByEachDao[i]
                        );
                    if (proposalInfo.proposalStatus != ProposalStatus.Running) {
                        result = false;
                    } else if (
                        proposalInfo.proposalKind !=
                        ProposalKind.CooperationProposal
                    ) {
                        result = false;
                    }
                }
            }
        }
        require(result, "Need the valid each proposal.");
        _;
    }

    modifier CheckTermOfElectionCommision(address[] memory _daoAddressList) {
        bool result = false;
        for (uint i = 0; i < _daoAddressList.length; i++) {
            if (
                memberManagerContract.checkWithinElectionCommisionTerm(
                    _daoAddressList[i]
                ) == true
            ) {
                result = true;
                break;
            }
        }
        require(result, "Any DAO Electoral Commissioner must be in office");
        _;
    }

    function getDaoAddressWhichYouBelong(
        address[] memory _daoAddressList
    ) private view returns (address) {
        address result;
        for (uint i = 0; i < _daoAddressList.length; i++) {
            if (
                memberManagerContract.isElectionComission(
                    _daoAddressList[i],
                    msg.sender
                ) == true
            ) {
                result = _daoAddressList[i];
                break;
            }
        }
        return result;
    }

    function onlyEitherElectionCommision(
        address[] memory _daoAddressList
    ) private view returns (bool) {
        bool result = false;
        for (uint i = 0; i < _daoAddressList.length; i++) {
            if (
                memberManagerContract.isElectionComission(
                    _daoAddressList[i],
                    msg.sender
                ) == true
            ) {
                result = true;
                break;
            }
        }
        return result;
    }

    function checkAbleToChangeStatus(
        ProposalStatus presecntStatus,
        ProposalStatus toStatus
    ) private pure returns (bool) {
        if (presecntStatus == ProposalStatus.UnderDiscussionOnGithub) {
            if (
                (toStatus != ProposalStatus.Voting) &&
                (toStatus != ProposalStatus.Pending) &&
                (toStatus != ProposalStatus.Rejected)
            ) {
                return false;
            }
        } else if (presecntStatus == ProposalStatus.Pending) {
            if (
                (toStatus != ProposalStatus.Voting) &&
                (toStatus != ProposalStatus.Rejected) &&
                (toStatus != ProposalStatus.UnderDiscussionOnGithub)
            ) {
                return false;
            }
        } else if (presecntStatus == ProposalStatus.Voting) {
            if ((toStatus != ProposalStatus.FinishedVoting)) {
                return false;
            }
        } else if (presecntStatus == ProposalStatus.Running) {
            return false;
        } else if (
            (presecntStatus == ProposalStatus.Finished) ||
            (presecntStatus == ProposalStatus.Rejected)
        ) {
            return false;
        }
        return true;
    }


    /**
     * 投票を開始する
     */
    function _startVoting() internal {
        cooperateVotingInfo = VotingInfo(0, 0, 0);
    }

    /**
     * 投票結果をチェックする。
     */
    function _checkVotingResult() internal view returns (ProposalStatus) {
        uint256 memberCount = 0;
        for (uint i = 0; i < cooperateProposalInfo.daoAddressList.length; i++) {
            uint256 count = memberManagerContract.getMemberCount(
                cooperateProposalInfo.daoAddressList[i]
            );
            memberCount = memberCount + count;
        }
        if (
            (cooperateVotingInfo.yesCount * 100) / memberCount >=
            COOPERATE_PROPOSAL_PASS_LINE
        ) {
            return ProposalStatus.Running;
        } else {
            return ProposalStatus.Rejected;
        }
    }

    /**
     * 入金を受け取る
     */
    receive() external payable {
        require(msg.sender != tx.origin, "can not depoist directly.");
    }
}
