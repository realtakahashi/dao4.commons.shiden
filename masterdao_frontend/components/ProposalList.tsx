import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { checkElectionComission } from "../contracts/MemberManagerApi";
import { getProposalList } from "../contracts/ProposalManagerApi";
import {
  ProposalInfo,
  PROPOSAL_VOTING,
  PROPOSAL_FINISHED,
} from "../types/ProposalManagerType";
import ChangeStatusOfProposal from "./ChangeStatusOfProposal";
import ProposalParts from "./ProposalParts";
import Vote from "./Vote";

interface ProposalListProps {
  setShowSubmmitButton: (flg: boolean) => void;
  setShowListButton: (flg: boolean) => void;
  setShowList: (flg: boolean) => void;
  setShowSubmitScreen: (flg: boolean) => void;
  showAllList: boolean;
}

const ProposalList = (props: ProposalListProps) => {
  const [proposalList, setProposalList] = useState<Array<ProposalInfo>>();
  const [isElectionComission, setIsElectionComission] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showListButton, setShowListButton] = useState(false);
  const [targetProposal, setTargetProposal] = useState<ProposalInfo>({
    proposalKind: 0,
    title: "",
    outline: "",
    details: "",
    githubURL: "",
    proposalId: "",
    relatedId: "",
    relatedAddress: "",
    proposalStatus: 0,
  });

  const _setShowAndSetTargetProposal = (
    _showList: boolean,
    _showVote: boolean,
    _showChangeStatus: boolean,
    _showListButton: boolean,
    _backToList: boolean,
    _targetProposal: ProposalInfo
  ) => {
    _setShow(
      _showList,
      _showVote,
      _showChangeStatus,
      _showListButton,
      _backToList
    );
    setTargetProposal(_targetProposal);
  };

  const _setShow = (
    _showList: boolean,
    _showVote: boolean,
    _showChangeStatus: boolean,
    _showListButton: boolean,
    _backToList: boolean
  ) => {
    setShowList(_showList);
    _getProposalList();
    setShowVote(_showVote);
    setShowChangeStatus(_showChangeStatus);
    setShowListButton(_showListButton);
    if (_backToList) {
      props.setShowSubmmitButton(true);
      props.setShowList(true);
      props.setShowListButton(false);
      props.setShowSubmitScreen(false);
    } else {
      props.setShowSubmmitButton(false);
    }
  };

  const _getProposalList = async () => {
    //console.log("## getSubDaoList call 1");
    const result = await getProposalList();
    //console.log("## memberList:",result);
    setProposalList(result);
  };

  const _checkElectionComission = async () => {
    setIsElectionComission(await checkElectionComission());
  };

  useEffect(() => {
    _getProposalList();
    _checkElectionComission();
  }, []);

  return (
    <>
      {showListButton == true && (
        <div className="flex justify-center">
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => _setShow(true, false, false, false, true)}
          >
            Back To List
          </button>
        </div>
      )}
      <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
        {showList == true && (
          <>
            {typeof proposalList !== "undefined"
              ? proposalList.map((proposal) => {
                  return (
                    <div key={proposal.title}>
                      {(props.showAllList == true ||
                        (props.showAllList == false &&
                          proposal.proposalStatus != PROPOSAL_FINISHED)) && (
                        <div
                          className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white"    
                        >
                          <ProposalParts
                            targetProposal={proposal}
                          ></ProposalParts>
                          <div className="px-6 py-4">
                            {proposal.proposalStatus == PROPOSAL_VOTING && (
                              <button
                                className="inline-block bg-red-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                onClick={() =>
                                  _setShowAndSetTargetProposal(
                                    false,
                                    true,
                                    false,
                                    true,
                                    false,
                                    proposal
                                  )
                                }
                              >
                                Vote
                              </button>
                            )}
                            <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              <Link href={proposal.githubURL}>
                                <a target={"_blank"} rel="noopener noreferrer">
                                  Website
                                </a>
                              </Link>
                            </button>
                            {isElectionComission == true && (
                              <button
                                className="inline-block bg-green-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                                onClick={() =>
                                  _setShowAndSetTargetProposal(
                                    false,
                                    false,
                                    true,
                                    true,
                                    false,
                                    proposal
                                  )
                                }
                              >
                                Change Status Of Proposal
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              : ""}
          </>
        )}
      </div>
      <div>
        {showVote == true && <Vote targetProposal={targetProposal}></Vote>}
      </div>
      <div>
        {showChangeStatus == true && (
          <ChangeStatusOfProposal
            targetProposal={targetProposal}
          ></ChangeStatusOfProposal>
        )}
      </div>
    </>
  );
};

export default ProposalList;
