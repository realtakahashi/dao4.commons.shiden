import { Layout } from "@/components/common";
import React, { useState, useEffect, FC } from "react";
import { ProposalInfo } from "@/types/Proposal";
import {
  getProposalListFromContract,
  changeProposalStatus,
  doVoteForProposal,
} from "@/contracts/SubDAO";
import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      address: params?.address,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/dao/[address]/proposals"],
    fallback: true,
  };
};

const PROPOSAL_KIND = [
  "AddAMember",
  "DeleteAMember",
  "UseOfFunds",
  "CommunityManagement",
  "Activities",
] as const;
const PROPOSAL_STATUS = [
  "UnderDiscussionOnGithub",
  "Voting",
  "Pending",
  "Running",
  "Rejected",
  "FinishedVoting",
  "Finished",
] as const;

function VoteModal({ showVote, setShowVote, selectProposal, subDaoAddress }) {
  const doVote = async (selectProposal) => {
    console.log("## subDaoAddress: ", subDaoAddress);
    console.log(
      "## selectProposal.proposalId: ",
      parseInt(selectProposal.proposalId)
    );
    console.log("## proposalStatus: ", voteStatus);

    await doVoteForProposal(
      subDaoAddress,
      voteStatus,
      parseInt(selectProposal.proposalId)
    );
  };

  const [voteStatus, setVoteStatus] = useState(0);

  const selectVoteStatus = (status) => {
    setVoteStatus(status);
  };

  const changeVoteAndSetShow = async (showVote, proposal) => {
    setShowVote(showVote);
    await doVote(proposal);
  };

  if (showVote) {
    return (
      <div id="overlay">
        <div id="content">
          <h1 className="text-3xl">Vote To ... For Proposal</h1>
          <div className="p-3"></div>
          <table className="table-auto">
            <tr>
              <th className="border px-4 py-2">Kind</th>
              <td className="border px-4 py-2">
                {PROPOSAL_KIND[selectProposal.proposalKind]}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <td className="border px-4 py-2">{selectProposal.title}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Outline</th>
              <td className="border px-4 py-2">{selectProposal.outline}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Detail</th>
              <td className="border px-4 py-2">{selectProposal.details}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">GithubURL</th>
              <td className="border px-4 py-2">{selectProposal.githubURL}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Status</th>
              <td className="border px-4 py-2">
                You Vote For :
                <select
                  className=""
                  name="Status"
                  value={voteStatus}
                  onChange={(e) => selectVoteStatus(e.target.value)}
                >
                  <option value="1">YES</option>
                  <option value="0">NO</option>
                </select>
              </td>
            </tr>
          </table>
          <div className="flex items-center justify-end mt-4">
            <button
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 mr-4"
              onClick={() => changeVoteAndSetShow(false, selectProposal)}
            >
              Ok
            </button>
            <button
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              onClick={() => setShowVote(false)}
            >
              Chancel
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

interface ModalProps {
  show: boolean
  setShow: boolean
  selectProposal: (flag: boolean) => void
  subDaoAddress: string
}

// function Modal({ show, setShow, selectProposal, subDaoAddress }: ModalProps) {
// function Modal(props: ModalProps) {
  const Modal:FC<ModalProps>  = (props) => {
  
  const doChangeProposalStatus = async (selectProposal) => {
    console.log("## subDaoAddress: ", props.subDaoAddress);
    console.log(
      "## selectProposal.proposalId: ",
      parseInt(selectProposal.proposalId)
    );
    console.log("## proposalStatus: ", proposalStatus);

    await changeProposalStatus(
      subDaoAddress,
      proposalStatus,
      parseInt(selectProposal.proposalId)
    );
  };

  const [proposalStatus, setProposalStatus] = useState(0);

  const selectStatus = (status) => {
    setProposalStatus(status);
  };

  const changeStatusAndSetShow = async (show, proposal) => {
    setShow(show);
    await doChangeProposalStatus(proposal);
  };

  if (show) {
    return (
      <div id="overlay">
        <div id="content">
          <div className="shadow-lg rounded p-8 bg-white">
            <h1 className="text-3xl">Chang Proposal Status to ...</h1>
            <div className="p-3"></div>
            <table className="table-auto">
              <tr>
                <th className="border px-4 py-2">Kind</th>
                <td className="border px-4 py-2">
                  {PROPOSAL_KIND[selectProposal.proposalKind]}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <td className="border px-4 py-2">{selectProposal.title}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Outline</th>
                <td className="border px-4 py-2">{selectProposal.outline}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Detail</th>
                <td className="border px-4 py-2">{selectProposal.details}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">GithubURL</th>
                <td className="border px-4 py-2">{selectProposal.githubURL}</td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Status</th>
                <td className="border px-4 py-2">
                  Change Status to :
                  <select
                    className=""
                    name="Status"
                    value={proposalStatus}
                    onChange={(e) => selectStatus(e.target.value)}
                  >
                    <option value="0">UnderDiscussionOnGithub</option>
                    <option value="1">Voting</option>
                    <option value="2">Pending</option>
                    <option value="3">Running</option>
                    <option value="4">Rejected</option>
                    <option value="5">FinishedVoting</option>
                    <option value="6">Finished</option>
                  </select>
                </td>
              </tr>
            </table>

            <div className="flex items-center justify-end mt-4">
              <button
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 mr-4"
                onClick={() => changeStatusAndSetShow(false, selectProposal)}
              >
                Ok
              </button>
              <button
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={() => setShow(false)}
              >
                Chancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

const DaoProposals = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const [proposalList, setProposalList] = useState<Array<ProposalInfo>>();
  const [targetProposal, setTargetProposal] = useState<ProposalInfo>();
  const router = useRouter();
  const subDAOaddress = router.query.address;

  const [show, setShow] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [selectProposal, setSelectProposal] = useState(null);

  function setProposal(proposal) {
    setSelectProposal(proposal);
  }

  useEffect(() => {
    const getProposalList = async () => {
      if (typeof subDAOaddress === "string") {
        const response = await getProposalListFromContract(subDAOaddress);
        setProposalList(response);
      }
    };
    getProposalList();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl">Proposal List</h1>
        <div className="p-3"></div>
      </div>
      <div className="">
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
				       py-2 px-4 m-5 rounded"
          type="button"
        >
          <a href={"/dao/" + subDAOaddress + "/proposals/add_proposal"}>
            {" "}
            Add A Propsal
          </a>
        </button>

        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
				       py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShow(true)}
        >
          Change Propsal Status
        </button>
        <Modal
          show={show}
          setShow={setShow}
          selectProposal={selectProposal}
          subDaoAddress={subDAOaddress}
        />

        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
				       py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowVote(true)}
        >
          Vote For A Proposal
        </button>
        <VoteModal
          showVote={showVote}
          setShowVote={setShowVote}
          selectProposal={selectProposal}
          subDaoAddress={subDAOaddress}
        />
      </div>
      <div>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Kind</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Outline</th>
              <th className="border px-4 py-2">GithubURL</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {typeof proposalList !== "undefined"
              ? proposalList.map((proposal) => {
                  return (
                    <tr
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      key={proposal.title}
                      style={
                        selectProposal !== null &&
                        proposal.title === selectProposal.title
                          ? { background: "#ffe4e1" }
                          : {}
                      }
                      onClick={() => setProposal(proposal)}
                    >
                      <td className="border px-4 py-2">
                        {PROPOSAL_KIND[proposal.proposalKind]}
                      </td>
                      <td className="border px-4 py-2">{proposal.title}</td>
                      <td className="border px-4 py-2">{proposal.outline}</td>
                      <td className="border px-4 py-2">{proposal.githubURL}</td>
                      <td className="border px-4 py-2">
                        {PROPOSAL_STATUS[proposal.proposalStatus]}
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
};

DaoProposals.Layout = Layout;
export default DaoProposals;
