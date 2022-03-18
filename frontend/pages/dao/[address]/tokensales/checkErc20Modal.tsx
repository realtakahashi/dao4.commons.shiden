interface CheckErc20ModalProps {
    showVote: boolean;
    setShowVote: (flg: boolean) => void;
    selectProposal: ProposalInfo;
  }
  
  function CheckErc20Modal(props: VoteModalProps) {
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
  