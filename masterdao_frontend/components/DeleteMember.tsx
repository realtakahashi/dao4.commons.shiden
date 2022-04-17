import { useState } from "react";
import { deleteMember } from "../contracts/MemberManagerApi";
import { MemberInfo } from "../types/MemberManagerType";

const DeleteMember = (props: MemberInfo) => {
  const [proposalId, setProposalId] = useState("0");

  const _deleteMember = async () => {
    await deleteMember(props, Number(proposalId));
  };

  return (
    <>
      <div className="p-2"></div>
      <div className="flex justify-center text-25px text-blue-200">
        <label>You are trying to remove the following members:</label>
      </div>
      <div className="p-2 flex justify-center">
        <table>
          <tr className="">
            <th className="px-2 py-4 text-18px text-white flex justify-end ">
              Name:
            </th>
            <td className="px-2 py-4 text-18px text-white ">
              {props.name}
            </td>
          </tr>
          <tr className="">
            <th className="px-2 py-4 text-18px text-white flex justify-end ">
              Member Id:
            </th>
            <td className="px-2 py-4 text-18px text-white ">
              {String(props.memberId)}
            </td>
          </tr>
          <tr className="">
            <th className="px-2 py-4 text-18px text-white flex justify-end ">
              Address:
            </th>
            <td className="px-2 py-4 text-14px text-white ">
              {props.eoaAddress}
            </td>
          </tr>
          <tr className="">
            <th className="flex justify-end px-2 py-4 text-white text-18px ">
              Proposal Id:
            </th>
            <td className="px-2 py-4 text-14px text-white ">
              <input
                className="text-black text-14px px-2 py-2"
                onChange={(e) => setProposalId(e.target.value)}
              ></input>
            </td>
          </tr>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
          onClick={() => _deleteMember()}
        >
          Execute
        </button>
      </div>
    </>
  );
};

export default DeleteMember;
