import { useState } from "react";
import { SubDAOData, TargetDaoKind } from "../dao4.frontend.common/types/MasterDaoType";
import { listSubDAO } from "../dao4.frontend.common/contracts/MasterDaoApi";
import { useEffect } from "react";
import Link from "next/link";
import Donate from "../dao4.frontend.common/components/Donate";
import SupportReward from "./SupportReward";

const SubDaoList = () => {
  const [subDaoList, setSubDaoList] = useState<Array<SubDAOData>>();
  const [showList, setShowList] = useState(true);
  const [showListButton, setShowListButton] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [selectDao, setSelectDao] = useState<SubDAOData>({
    daoName: "",
    daoAddress: "",
    githubURL: "",
    rewardApproved: false,
    description: "",
    ownerAddress: "",
  });

  const getSubDaoList = async () => {
    //console.log("## getSubDaoList call 1");
    const result = await listSubDAO();
    setSubDaoList(result);
  };

  useEffect(() => {
    getSubDaoList();
  }, []);

  const showSettingAndSelectDAO = (
    _showList: boolean,
    _showListButton: boolean,
    _showDonate: boolean,
    _showReward: boolean,
    _selectDao: SubDAOData
  ) => {
    showSetting(_showList, _showListButton, _showDonate, _showReward);
    setSelectDao(_selectDao);
  };

  const showSetting = (
    _showList: boolean,
    _showListButton: boolean,
    _showDonate: boolean,
    _showReward: boolean
  ) => {
    setShowList(_showList);
    getSubDaoList();
    setShowListButton(_showListButton);
    setShowDonate(_showDonate);
    setShowReward(_showReward);
  };

  return (
    <>
      <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
        {showListButton == true && (
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => showSetting(true, false, false, false)}
          >
            Back To List
          </button>
        )}
      </div>
      <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
        {typeof subDaoList !== "undefined"
          ? subDaoList.map((subDao) => {
              return (
                <div key={subDao.daoName}>
                  {showList == true && (
                    <div className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white">
                      <div className="px-6 py-4">
                        <div className="font-bold mb-2 text-white">
                          {subDao.daoName}
                        </div>
                        {subDao.rewardApproved == true && (
                          <p className="text-red-700 font-bold text-14px">
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
                        <button
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          onClick={() =>
                            showSettingAndSelectDAO(
                              false,
                              true,
                              true,
                              false,
                              subDao
                            )
                          }
                        >
                          Donate
                        </button>
                        <button
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                          onClick={() =>
                            showSettingAndSelectDAO(
                              false,
                              true,
                              false,
                              true,
                              subDao
                            )
                          }
                        >
                          Support Reward
                        </button>
                        <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          <Link href={subDao.githubURL}>
                            <a target={"_blank"} rel="noopener noreferrer">
                              Website
                            </a>
                          </Link>
                        </button>
                      </div>
                    </div>
                  )}
                  ;
                </div>
              );
            })
          : ""}
      </div>
      {showDonate == true && (
        <Donate
          daoAddress={selectDao.daoAddress}
          daoName={selectDao.daoName}
          targetDaoKind={TargetDaoKind.TARGET_DAO_FROM_MASTER_DAO}
        ></Donate>
      )}
      {showReward == true && (
        <SupportReward
          daoAddress={selectDao.daoAddress}
          daoName={selectDao.daoName}
          targetDaoKind={TargetDaoKind.NONE}
        ></SupportReward>
      )}
    </>
  );
};

export default SubDaoList;
