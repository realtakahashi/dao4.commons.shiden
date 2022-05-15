import { TargetDaoInterface } from "../types/MasterDaoType";

const TargetDao = (props: TargetDaoInterface) => {
  return (
    <>
      <tr>
        <th className="flex justify-end px-4 py-5 text-white text-24px">
          DAO Name:{" "}
        </th>
        <td className="text-white text-24px">{props.daoName}</td>
      </tr>
      <tr>
        <th className="flex justify-end px-4 py-5 text-white text-24px">
          DAO Address:{" "}
        </th>
        <td className="text-white text-14px">{props.daoAddress}</td>
      </tr>
    </>
  );
};

export default TargetDao;
