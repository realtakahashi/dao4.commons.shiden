import { useState } from "react";
import { SubDAOData } from "../types/MasterDaoType";
import { listSubDAO } from "../contracts/MasterDaoApi";
import { useEffect } from "react";
import Link from "next/link";

const SubDaoList = () => {
  const [subDaoList, setSubDaoList] = useState<Array<SubDAOData>>();

  useEffect(() => {
    const getSubDaoList = async () => {
      //console.log("## getSubDaoList call 1");
      const result = await listSubDAO();
      setSubDaoList(result);
    };

    getSubDaoList();
  }, []);

  return (
    <>
      <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
        {typeof subDaoList !== "undefined"
          ? subDaoList.map((subDao) => {
              return (
                <div className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white">
                  <div className="px-6 py-4">
                    <div className="font-bold mb-2 text-white">
                      {subDao.daoName}
                    </div>
                    {subDao.rewardApproved == true && (
                      <p className="text-red-700 font-bold text-10px">
                        Reward Approved
                      </p>
                    )}
                    <p className="text-gray-200 text-12px">
                      {subDao.daoAddress}
                    </p>
                    <p className="p-3 text-gray-400 text-base">
                      {subDao.description}
                    </p>
                  </div>
                  <div className="px-6 pb-2">
                    <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Donate
                    </button>
                    <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Support Reward
                    </button>
                    <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <Link href={subDao.githubURL}>Website</Link>
                    </button>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default SubDaoList;
