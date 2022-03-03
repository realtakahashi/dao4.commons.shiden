import type { NextPage } from "next";
import { useState,useEffect} from "react";
import { listSubDAO } from "../contracts/MasterDaoApi";
import { SubDAOData } from "../types/MasterDaoType";

const Home: NextPage = () => {
  const [subDaoList, setSubDaoList] = useState<Array<SubDAOData>>();;
  const [selectDao, setSelectDao] = useState(null);

  useEffect(() => {
    const getSubDaoList = async () => {
      console.log("## getSubDaoList call 1")
      const result = await listSubDAO();
      setSubDaoList(result);
    };

    getSubDaoList();
  }, []);

  return (
    <>
      <h1 className="flex justify-center font-bold text-3xl p-3">Sub DAO List</h1>
      <div className="p-2 flex justify-center">
        <table className="table-auto">
          <thead>
            <tr className="">
              <th className="border px-4 py-2">DAO Name</th>
              {/* <th className="border px-4 py-2">Owner Address</th> */}
              <th className="border px-4 py-2">DAO Address</th>
              <th className="border px-4 py-2">GithubURL</th>
              <th className="border px-4 py-2">Reward Approved</th>
            </tr>
          </thead>
          <tbody>
            {typeof subDaoList !== "undefined"
              ? subDaoList.map((subDao) => {
                  return (
                    <tr
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      key={subDao.daoName}
                      style={
                        selectDao !== null && subDao.daoName === selectDao.daoName
                          ? { background: "#ffe4e1" }
                          : {}
                      }
                      onClick={() => setSelectDao(subDao)}
                    >
                      <td className="border px-4 py-2">{subDao.daoName}</td>
                      {/* <td className="border px-4 py-2">{subDao.ownerAddress}</td> */}
                      <td className="border px-4 py-2">{subDao.daoAddress}</td>
                      <td className="border px-4 py-2">{subDao.githubURL}</td>
                      <td className="border px-4 py-2">
                        {subDao.rewardApproved ? "Approved" : "Not Approved"}
                      </td>
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

export default Home;
