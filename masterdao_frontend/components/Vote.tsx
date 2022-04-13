import { useState } from "react";
import { doVoteForProposal } from "../contracts/ProposalManagerApi";
import { ProposalProps } from "../types/ProposalManagerType";
import ProposalParts from "./ProposalParts";

const Vote = (props: ProposalProps) => {
  const [voteStatus, setVoteStatus] = useState("0");

  const selectVoteStatus = (status: string) => {
    setVoteStatus(status);
  };

  const _doVote = async () => {
    await doVoteForProposal(
      Boolean(Number(voteStatus)),
      Number(props.targetProposal.proposalId)
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white"
          key={props.targetProposal.title}
        >
          <ProposalParts targetProposal={props.targetProposal}></ProposalParts>
          <label className="text-18px text-blue-400 px-7 py-5">
            You Vote For :
          </label>
          <select
            className="font-bold"
            name="Status"
            value={voteStatus}
            onChange={(e) => selectVoteStatus(e.target.value)}
          >
            <option value="1">YES</option>
            <option value="0">NO</option>
          </select>
          <div className="p-3"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
          onClick={() => _doVote()}
        >
          Vote
        </button>
      </div>
    </>
  );
};

export default Vote;
