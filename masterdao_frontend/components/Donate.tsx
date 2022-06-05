import { useState } from "react";
import { doDonateSelectedDao } from "../contracts/MasterDaoApi";
import { TargetDaoInterface } from "../types/MasterDaoType";
import TargetDao from "../components/TargetDao";
import { doDonateMasterDao } from "../dao4.frontend.common/contracts/masterdao_api";

const Donate = (props: TargetDaoInterface) => {
  const [donateAmount, setDonateAmount] = useState(0);
  const [proposalId, setProposalId] = useState("0");

  const _doDonate = async () => {
    await doDonateSelectedDao(props.daoAddress, donateAmount, proposalId);
  };

  const _doDonateMasterDao =async () => {
    await doDonateMasterDao(donateAmount);
    
  }

  return (
    <>
      <div className="flex justify-center">
        <label className="text-indigo-300 text-24px">
          You are trying to raise funds for the following DAO:
        </label>
      </div>
      <div className="p-1"></div>
      <div className="flex justify-center">
        <table>
          <TargetDao
            daoAddress={props.daoAddress}
            daoName={props.daoName}
            isMasterDao={false}
          ></TargetDao>
          {props.isMasterDao == false && (
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
          )}
          <tr>
            <th className="flex justify-end px-4 py-5 text-white text-24px">
              Donate Amount:{" "}
            </th>
            <td className="text-white text-18px">
              <input
                className="text-black text-14px px-2 py-1"
                onChange={(e) => setDonateAmount(Number(e.target.value))}
              ></input>{" "}
              SDN
            </td>
          </tr>
        </table>
      </div>
      <div className="p-3"></div>
      {props.isMasterDao == true && (
        <div className="flex justify-center">
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
            onClick={() => _doDonateMasterDao()}
          >
            Donate for Master Dao
          </button>
        </div>
      )}
      {props.isMasterDao == false && (
        <div className="flex justify-center">
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-blue-200 rounded text-black  hover:bg-green-200"
            onClick={() => _doDonate()}
          >
            Execute
          </button>
        </div>
      )}
    </>
  );
};

export default Donate;
