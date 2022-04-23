import { useState } from "react";
import { MemberFormData } from "../types/MemberManagerType";
import { addMember } from "../contracts/MemberManagerApi";

const AddMember = () => {
  const [addMemberValue, setAddMemberValue] = useState<MemberFormData>({
    name: "",
    memberAddress: "",
    proposalId: 0,
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddMemberValue({
      ...addMemberValue,
      [event.target.name]: event.target.value,
    });
  };

  const _onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("## _onSubmit 1");
    event.preventDefault();
    await addMember(addMemberValue);
  };

  return (
    <>
      <div className="p-7"></div>
      <div className="flex justify-center text-24px text-blue-200">
        <label>Enter the information of the member you want to add.</label>
      </div>
      <form className="" onSubmit={_onSubmit}>
        <div className="p-2 flex justify-center">
          <table>
            <tr>
              <th>
                <label className="text-24px text-white">Name:</label>
              </th>
              <td>
                <input
                  className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="name"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th>
                <label className="text-24px text-white">EOA Address:</label>
              </th>
              <td>
                <input
                  className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="memberAddress"
                  type="text"
                  onChange={onChangeInput}
                ></input>
              </td>
            </tr>
            <tr>
              <th>
                <label className="text-24px text-white">Proposal Id:</label>
              </th>
              <td>
                <input
                  className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name="proposalId"
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

export default AddMember;
