import { useState } from "react";
import { changeDaoReward } from "../contracts/MasterDaoApi";
import { TargetDaoInterface } from "../types/MasterDaoType";
import TargetDao from "./TargetDao";

const SupportReward = (props: TargetDaoInterface) => {
  const [doReward, setDoreward] = useState("0");
  const [proposalId, setProposalId] = useState("0");

  const _doChangeReward = async () => {
    await changeDaoReward(props.daoAddress,Number(proposalId),Boolean(doReward));
  };

  return (
    <>
      <div className="flex justify-center">
        <label className="text-indigo-300 text-24px">
          You are trying to change the DAO Reward settings below...
        </label>
      </div>
      <div className="p-3"></div>
      <div className="flex justify-center">
        <table>
          <TargetDao
            daoAddress={props.daoAddress}
            daoName={props.daoName}
            isMasterDao={false}
          ></TargetDao>
          <tr>
            <th className="flex justify-end px-4 py-5 text-white text-24px">
              Proposal Id:{" "}
            </th>
            <td>
              <input
                className="text-black text-14px px-2 py-1"
                onChange={(e) => setProposalId(e.target.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th className="flex justify-end px-4 py-5 text-white text-24px">
              Change Reward To...
            </th>
            <td className="text-black text-18px">
              <select
                name="doReward"
                onChange={(e) => setDoreward(e.target.value)}
                className="px-2 py-1"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
      <div className="p-3"></div>
      <div className="flex justify-center">
        <button
          className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
          onClick={() => _doChangeReward()}
        >
          Execute
        </button>
      </div>
    </>
  );
};

export default SupportReward;
