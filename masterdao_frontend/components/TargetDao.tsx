import { TargetDaoInterface } from "../types/MasterDaoType";

const TargetDao = (props: TargetDaoInterface) => {
  return (
    <>
      <tr>
        <th className="flex justify-end px-4 py-2 text-white text-18px">
          DAO Name:{" "}
        </th>
        <td className="text-white text-18px">{props.daoName}</td>
      </tr>
      <tr>
        <th className="flex justify-end px-4 py-2 text-white text-18px">
          DAO Address:{" "}
        </th>
        <td className="text-white text-14px">{props.daoAddress}</td>
      </tr>
    </>
  );
};

export default TargetDao;
