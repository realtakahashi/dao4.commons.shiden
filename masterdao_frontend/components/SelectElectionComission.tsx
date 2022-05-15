import { useState } from "react";
import { _resetElectionComission } from "../contracts/MemberManagerApi";
import { ElectionComissionFormData } from "../types/MemberManagerType";

const SelectElectionComission = () => {
  const [electionComissionValue, setElectionComissionValue] =
    useState<ElectionComissionFormData>({
      candidateEoa_one: "",
      candidateEoa_two: "",
      relatedProposalId_one: 0,
      relatedProposalId_two: 0,
    });
  const [showSecondCandidate, setShowSecondCandidate] = useState(false);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setElectionComissionValue({
      ...electionComissionValue,
      [event.target.name]: event.target.value,
    });
  };

  const _onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      console.log("## electionComissionValue",electionComissionValue)
    event.preventDefault();
    await _resetElectionComission(electionComissionValue);
  };

  return (
    <>
      <div className="p-7"></div>
      <div className="flex justify-center text-25px text-blue-200">
        <label>
          Enter at least one Election Commission passed by Proposal.
        </label>
      </div>
      <form className="" onSubmit={_onSubmit}>
        <div className="p-3"></div>
        <div className="flex justify-center text-white">
          <label>[First Election Commission]</label>
        </div>
        <div className="flex justify-center">
          <table>
            <tr>
              <th>
                <label className="text-18px text-white">EOA Address:</label>
              </th>
              <td>
                <input
                  className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                            leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="candidateEoa_one"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th>
                <label className="text-18px text-white">
                  Related Proposal Id:
                </label>
              </th>
              <td>
                <input
                  className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                            leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="relatedProposalId_one"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
          </table>
          </div>
          <div>
          <div className="flex justify-center">
          <label
            className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
            onClick={() => setShowSecondCandidate(!showSecondCandidate)}
          >
            +
          </label>
          </div>
          {showSecondCandidate == true && (
        <>
        <div className="p-3"></div>
        <div className="flex justify-center text-red-200">
          <label>[Second Election Commission]</label>
        </div>
        <div className="flex justify-center">
            <table>
              <tr>
                <th>
                  <label className="text-18px text-white">EOA Address:</label>
                </th>
                <td>
                  <input
                    className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                            leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    name="candidateEoa_two"
                    type="text"
                    onChange={onChangeInput}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>
                  <label className="text-18px text-white">
                    Related Proposal Id:
                  </label>
                </th>
                <td>
                  <input
                    className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                            leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    name="relatedProposalId_two"
                    type="text"
                    onChange={onChangeInput}
                  ></input>
                </td>
              </tr>
            </table>
            </div>
            </>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
            onClick={() => _onSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SelectElectionComission;
