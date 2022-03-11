import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import { ProposalInfo, AddErc20Input } from "../types/MasterDaoType";
import { TokenInfo } from "@/types/Token";
import { useRouter } from "next/router";
import { registerErc20 } from "@/contracts/DaoERC20Api";

const TOKEN_KIND = ["ERC20", "ERC721"] as const;

const router = useRouter();
const subDAOaddress = router.query.address as string;

interface AddErc20Propos {
  showAddErc20: boolean;
  setShowAddErc20: (flg: boolean) => void;
}

function AddErc20Modal(props: AddErc20Propos) {
  const [formValue, setFormValue] = useState<AddErc20Input>({
    name: "",
    symbol: "",
    daoAddress: "",
    price: 0,
    amount: 0,
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
    // console.log(formValue)
  };

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("#### Submit 1");
    event.preventDefault();
    await registerErc20(formValue,subDAOaddress);
    props.setShowAddErc20(false);
  };

  if (props.showAddErc20) {
    return (
      <div id="overlay">
        <div id="content">
          <div className="flex justify-center">
            <form className="" onSubmit={onSubmitForm}>
              <h1 className="text-3xl">Add a ERC20</h1>
              <div className="p-3"></div>
              <table className="table-auto">
                <thead></thead>
                <tbody>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="name"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Symbol</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="symbol"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Sub DAO Address</th>
                    <td className="border px-4 py-2">
                      <label
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      >{subDAOaddress}</label>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Price</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="price"
                        type="text"
                        onChange={onChangeInput}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="border px-4 py-2">Amount</th>
                    <td className="border px-4 py-2">
                      <input
                        className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        name="amount"
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
                  onClick={() => props.setShowAddErc20(false)}
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

const TokenSales = () => {
  const [tokenList, settokenList] = useState<Array<TokenInfo>>();

  const [showAddErc20, setShowAddErc20] = useState(false);
  const [showCheckErc20, setShowCheckErc20] = useState(false);
  const [showAddErc721, setShowAddErc721] = useState(false);
  const [showCheckErc721, setShowCheckErc721] = useState(false);
  const [selectToken, setSelectToken] = useState<TokenInfo>({
    tokenID: 0,
    tokenKind: 0,
    name: "",
    symbol: "",
    address: "",
  });

  function setTokenInfo(tokenInfo: TokenInfo) {
    setSelectToken(tokenInfo);
  }

  useEffect(() => {
    const getTokenList = async () => {
      const response = await getErc20ListFromContract();
      settokenList(response);
    };
    getTokenList();
  }, []);

  return (
    <>
      <div className="p-3 flex justify-center">
        <h1 className="text-3xl">Token List</h1>
        <div className="p-3"></div>
      </div>
      <div className="flex justify-center">
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowAddErc20(true)}
        >
          Add ERC20
        </button>
        <AddErc20Modal
          showAddErc20={showAddErc20}
          setShowAddErc20={setShowAddErc20}
        />
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowCheckErc20(true)}
        >
          Check ERC20
        </button>
        <CheckErc20Modal
          showCheckErc20={showCheckErc20}
          setShowCheckErc20={setShowCheckErc20}
          selectToken={selectToken}
        />

        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowAddErc721(true)}
        >
          Add ERC721
        </button>
        <AddErc721Modal
          showAddErc721={showAddErc721}
          setShowAddErc721={setShowAddErc721}
        />
        <button
          className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 m-5 rounded"
          type="button"
          onClick={() => setShowCheckErc721(true)}
        >
          Check ERC721
        </button>
        <CheckErc721Modal
          showCheckErc721={showCheckErc721}
          setShowCheckErc721={setShowCheckErc721}
          selectToken={selectToken}
        />
      </div>
      <div className="flex justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Token Id</th>
              <th className="border px-4 py-2">Token Kind</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Symbol</th>
              <th className="border px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {typeof tokenList !== "undefined"
              ? tokenList.map((token) => {
                  return (
                    <tr
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      key={token.tokenID}
                      style={
                        selectToken !== null &&
                        token.tokenID === selectToken.tokenID
                          ? { background: "#ffe4e1" }
                          : {}
                      }
                      onClick={() => setTokenInfo(token)}
                    >
                      <td className="border px-4 py-2">
                        {String(token.tokenID)}
                      </td>
                      <td className="border px-4 py-2">
                        {TOKEN_KIND[token.tokenKind]}
                      </td>
                      <td className="border px-4 py-2">{token.name}</td>
                      <td className="border px-4 py-2">{token.symbol}</td>
                      <td className="border px-4 py-2">{token.address}</td>
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
