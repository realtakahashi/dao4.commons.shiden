// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MemberManager.sol";
import "./ProposalManager.sol";
import "./CooperateProposal.sol";

interface CooperateProposalManagerInterface {
    function addToCooperateProposalList(
        address cooperateProposalInfoAddress
    ) external;

    function getManagerAddresses()
        external
        view
        returns (address, address, address);
}

/**
 * CooperateProposalManager
 */
contract CooperateProposalManager is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter public cooperateProposalCounter;
    // proposal id => CooperateProposalInfo Contract Address
    mapping(uint256 => address) private cooperateProposalInfoes;

    function addToCooperateProposalList(
        address cooperateProposalInfoAddress
    ) external {
        require(msg.sender != tx.origin, "can not depoist directly.");
        cooperateProposalInfoes[
            cooperateProposalCounter.current()
        ] = cooperateProposalInfoAddress;
        cooperateProposalCounter.increment();
    }

    function getCooperateProposalList()
        public
        view
        returns (CooperationProposalInfo[] memory)
    {
        CooperationProposalInfo[]
            memory cooperateProposalList = new CooperationProposalInfo[](
                cooperateProposalCounter.current()
            );
        for (uint i = 0; i < cooperateProposalCounter.current(); i++) {
            CooperateProposalInterface cooperateProposalContract = CooperateProposalInterface(
                    cooperateProposalInfoes[i]
                );
            CooperationProposalInfo
                memory cooperationProposalInfo = cooperateProposalContract
                    .getCooperateProposalInfo();
            cooperationProposalInfo.proposalId = i;
            cooperateProposalList[i] = cooperationProposalInfo;
        }
        return cooperateProposalList;
    }
}
