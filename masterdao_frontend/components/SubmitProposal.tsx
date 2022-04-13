import { AddProposalFormData } from "../types/ProposalManagerType";
import { useState } from "react";
import { registerProposal } from "../contracts/ProposalManagerApi";

const SubmitProposal = () => {
  const [proposalValue, setProposalValue] = useState<AddProposalFormData>({
    proposalKind: 0,
    title: "",
    outline: "",
    detail: "",
    githubURL: "",
    relatedId: "",
    relatedAddress: "",
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProposalValue({
      ...proposalValue,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProposalValue({
      ...proposalValue,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProposalValue({
      ...proposalValue,
      [event.target.name]: event.target.value,
    });
    // console.log(formValue)
  };

  const _onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("## _onSubmit 1");
    event.preventDefault();
    await registerProposal(proposalValue);
  };

  return (
    <>
      <div className="p-7"></div>
      <div className="flex justify-center text-25px text-blue-200">
        <label>Enter the information of the proposal you want to add.</label>
      </div>
      <form className="" onSubmit={_onSubmit}>
        <div className="p-2 flex flex-col">
          <table>
            <tr>
              <th className=" flex justify-end px-4 py-2 text-white">Proposal Kind:</th>
              <td className=" px-4 py-2">
                <select className="py-2 px-4" name="proposalKind" onChange={onChangeSelect}>
                  <option value="0">Add A Member</option>
                  <option value="1">Delete A Member</option>
                  <option value="2">Use Of Funds</option>
                  <option value="3">Community Management</option>
                  <option value="4">Activities</option>
                  <option value="5">ElectionComissionPropsal</option>
                  <option value="6">DaoReward</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className=" flex justify-end px-4 py-2 text-white">Title:</th>
              <td className=" px-4 py-2">
                <input
                  className="appearance-none rounded w-2/3 py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="title"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th className="flex justify-end px-4 py-2 text-white">Outline:</th>
              <td className=" px-4 py-2">
                <textarea
                  className="appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="outline"
                  rows={5}
                  onInput={onChangeText}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th className="flex justify-end px-4 py-2 text-white">Detail:</th>
              <td className=" px-4 py-2">
                <textarea
                  className="appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="detail"
                  rows={10}
                  onInput={onChangeText}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th className="flex justify-end px-4 py-2 text-white">Github URL:</th>
              <td className=" px-4 py-2">
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="githubURL"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th className="flex justify-end px-4 py-2 text-white">Related Id:</th>
              <td className=" px-4 py-2">
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="relatedId"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th className="flex justify-end px-4 py-2 text-white">Related Address:</th>
              <td className=" px-4 py-2">
                <input
                  className="appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="relatedAddress"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
          </table>
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

export default SubmitProposal;
