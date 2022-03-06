import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import { ProposalInfo, AddProposalFormData } from "../types/MasterDaoType";
import {
  getProposalListFromContract,
  changeProposalStatus,
  doVoteForProposal,
  registerProposal,
} from "../contracts/MasterDaoApi";

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

interface AddProposalProps {
  showAddProposal: boolean;
  setShowAddProposal: (flg: boolean) => void;
}

function AddProposalModal(props: AddProposalProps) {
  const [formValue, setFormValue] = useState<AddProposalFormData>({
    proposalKind: 0,
    title: "",
    outline: "",
    detail: "",
    githubURL: "",
    relatedId: "",
    relatedAddress: ""
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    // console.log(formValue)
  };
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    // console.log(formValue)
  };

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("#### Submit 1");
    event.preventDefault();
    await registerProposal(formValue);
    props.setShowAddProposal(false);
  };

  if (props.showAddProposal) {
    return (
      <div id="overlay">
        <div id="content">
          <div className="flex justify-center">
            <form className="" onSubmit={onSubmitForm}>
              <h1 className="text-3xl">Add a proposal</h1>
              <div className="p-3"></div>
              <table className="table-auto">
                <thead></thead>
                <tbody>
                  <tr>
                    <th className="border px-4 py-2">Proposal Kind</th>
                    <td className="border px-4 py-2">
                      <select name="proposalKind" onChange={onChangeSelect}>
                        <option value="0">Add A Member</option>
                        <option value="1">Delete A Member</option>
                        <option value="2">Use Of Funds</option>
                        <option value="3">Community Management</option>
                        <option value="4">Activities</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Title</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="title"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Outline</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="outline"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Detail</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="detail"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Github URL</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="githubURL"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Related Id</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="relatedId"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Related Address</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="relatedAddress"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex items-center justify-end mt-4">
                <button
                  className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 
                    active:bg-gray-200 disabled:opacity-50 mr-4"
                  onClick={() => onSubmitForm}
                >
                  Ok
                </button>
                <button
                  className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 
                    active:bg-gray-200 disabled:opacity-50"
                  onClick={() => props.setShowAddProposal(false)}
                >
                  Chancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

interface VoteModalProps {
  showVote: boolean;
  setShowVote: (flg: boolean) => void;
  selectProposal: ProposalInfo;
}

function VoteModal(props: VoteModalProps) {
  const doVote = async (selectProposal: ProposalInfo) => {
    console.log(
      "## selectProposal.proposalId: ",
      parseInt(selectProposal.proposalId)
    );
    console.log("## proposalStatus: ", voteStatus);

    await doVoteForProposal(
      Boolean(Number(voteStatus)),
      parseInt(selectProposal.proposalId)
    );
  };

  const [voteStatus, setVoteStatus] = useState("0");

  const selectVoteStatus = (status: string) => {
    setVoteStatus(status);
  };

  const changeVoteAndSetShow = async (
    showVote: boolean,
    proposal: ProposalInfo
  ) => {
    props.setShowVote(showVote);
    await doVote(proposal);
  };

  if (props.showVote) {
    return (
      <div id="overlay">
        <div id="content">
          <h1 className="text-3xl">Vote To ... For Proposal</h1>
          <div className="p-3"></div>
          <table className="table-auto">
            <tr>
              <th className="border px-4 py-2">Kind</th>
              <td className="border px-4 py-2">
                {PROPOSAL_KIND[props.selectProposal.proposalKind]}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <td className="border px-4 py-2">{props.selectProposal.title}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Outline</th>
              <td className="border px-4 py-2">
                {props.selectProposal.outline}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Detail</th>
              <td className="border px-4 py-2">
                {props.selectProposal.details}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2">GithubURL</th>
              <td className="border px-4 py-2">
                {props.selectProposal.githubURL}
              </td>
            </tr>
            <tr>
              <th className="border px-4 py-2">Status</th>
              <td className="border px-4 py-2">
                You Vote For :
                <select
                  className="font-bold"
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
              onClick={() => changeVoteAndSetShow(false, props.selectProposal)}
            >
              Ok
            </button>
            <button
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              onClick={() => props.setShowVote(false)}
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

interface ModalPropos {
  show: boolean;
  setShow: (flg: boolean) => void;
  selectProposal: ProposalInfo;
}

function Modal(param: ModalPropos) {
  const doChangeProposalStatus = async (selectProposal: ProposalInfo) => {
    console.log(
      "## selectProposal.proposalId: ",
      parseInt(selectProposal.proposalId)
    );
    console.log("## proposalStatus: ", proposalStatus);

    await changeProposalStatus(
      Number(proposalStatus),
      parseInt(selectProposal.proposalId)
    );
  };

  const [proposalStatus, setProposalStatus] = useState("0");

  const selectStatus = (status: string) => {
    setProposalStatus(status);
  };

  const changeStatusAndSetShow = async (
    show: boolean,
    proposal: ProposalInfo
  ) => {
    param.setShow(show);
    await doChangeProposalStatus(proposal);
  };

  if (param.show) {
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
                  {PROPOSAL_KIND[param.selectProposal.proposalKind]}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <td className="border px-4 py-2">
                  {param.selectProposal.title}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Outline</th>
                <td className="border px-4 py-2">
                  {param.selectProposal.outline}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Detail</th>
                <td className="border px-4 py-2">
                  {param.selectProposal.details}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2">GithubURL</th>
                <td className="border px-4 py-2">
                  {param.selectProposal.githubURL}
                </td>
              </tr>
              <tr>
                <th className="border px-4 py-2">Status</th>
                <td className="border px-4 py-2">
                  Change Status to :
                  <select
                    className="font-bold"
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
                onClick={() =>
                  changeStatusAndSetShow(false, param.selectProposal)
                }
              >
                Ok
              </button>
              <button
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={() => param.setShow(false)}
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

const MasterDaoProposals = () => {
  const [proposalList, setProposalList] = useState<Array<ProposalInfo>>();

  const [show, setShow] = useState(false);
  const [showAddProposal, setShowAddProposal] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [selectProposal, setSelectProposal] = useState({
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

  function setProposal(proposal: ProposalInfo) {
    setSelectProposal(proposal);
  }

  useEffect(() => {
    const getProposalList = async () => {
      const response = await getProposalListFromContract();
      setProposalList(response);
    };
    getProposalList();
  }, []);

  return (
    <>
      <div className="p-3 flex justify-center">
        <h1 className="text-3xl">Proposal List</h1>
        <div className="p-3"></div>
      </div>
      <div className="flex justify-center">
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowAddProposal(true)}
        >
          Add A Propsal
        </button>
        <AddProposalModal showAddProposal={showAddProposal} setShowAddProposal={setShowAddProposal} />
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShow(true)}
        >
          Change Propsal Status
        </button>
        <Modal show={show} setShow={setShow} selectProposal={selectProposal} />

        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowVote(true)}
        >
          Vote For A Proposal
        </button>
        <VoteModal
          showVote={showVote}
          setShowVote={setShowVote}
          selectProposal={selectProposal}
        />
      </div>
      <div className="flex justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Kind</th>
              <th className="border px-4 py-2">Proposal Id</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Outline</th>
              <th className="border px-4 py-2">GithubURL</th>
              <th className="border px-4 py-2">Related Id</th>
              <th className="border px-4 py-2">Related Address</th>
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
                      <td className="border px-4 py-2">{String(proposal.proposalId)}</td>
                      <td className="border px-4 py-2">{proposal.title}</td>
                      <td className="border px-4 py-2">{proposal.outline}</td>
                      <td className="border px-4 py-2">{proposal.githubURL}</td>
                      <td className="border px-4 py-2">{String(proposal.relatedId)}</td>
                      <td className="border px-4 py-2">{String(proposal.relatedAddress)}</td>
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

MasterDaoProposals.Layout = Layout;
export default MasterDaoProposals;
