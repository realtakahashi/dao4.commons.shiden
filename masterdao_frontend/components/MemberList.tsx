import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { MemberInfo, MemberInfoPlus } from "../types/MemberManagerType";
import { getMemberList } from "../contracts/MemberManagerApi";
import DeleteMember from "./DeleteMember";

interface ShowListSetting {
  setShowMemberButton: (flg: boolean) => void;
  setShowElectionButton: (flg: boolean) => void;
}

const MemberList = (props: ShowListSetting) => {
  const [memberList, setMemberList] = useState<Array<MemberInfoPlus>>();
  const [showDelete, setShowDelete] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showListButton, setShowListButton] = useState(false);
  const [selectMember, setSelectMember] = useState<MemberInfo>({
    name: "",
    memberId: 0,
    eoaAddress: "",
    tokenId: 0,
  });

  useEffect(() => {
    const _getMemberList = async () => {
      //console.log("## getSubDaoList call 1");
      const result = await getMemberList();
      //console.log("## memberList:",result);
      setMemberList(result);
    };

    _getMemberList();
  }, []);

  const setDeleteShowAndMemberInfo = (
    _showDelete: boolean,
    _showList: boolean,
    _memberInfo: MemberInfo
  ) => {
    setSelectMember(_memberInfo);
    setDeleteShow(_showDelete, _showList);
  };

  const setDeleteShow = (_showDelete: boolean, _showList: boolean) => {
    setShowListButton(_showDelete);
    setShowDelete(_showDelete);
    setShowList(_showList);
    if (_showDelete) {
      props.setShowElectionButton(false);
      props.setShowMemberButton(false);
    } else {
      props.setShowElectionButton(true);
      props.setShowMemberButton(true);
    }
  };

  return (
    <>
      {showListButton == true && (
        <div className="flex flex-wrap justify-center mx-1 lg:-mx-4">
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => setDeleteShow(false, true)}
          >
            Back To List
          </button>
        </div>
      )}
      {showList == true && (
        <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
          {typeof memberList !== "undefined"
            ? memberList.map((member) => {
                return (
                  <div key={member.name}>
                  {member.memberId!=0 &&(
                    
                <div
                    className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white">
                    <div className="px-6 py-4">
                      <div className="font-bold mb-2 text-white">
                        Name: {member.name}
                      </div>
                      {member.isElectionCommition == true && (
                        <p className="text-green-700 font-bold text-14px">
                          Election Comission
                        </p>
                      )}
                      <p className="p-3 text-white text-base">
                        Member Id: {String(member.memberId)}
                      </p>
                      <p className="text-gray-400 text-12px">
                        {member.eoaAddress}
                      </p>
                    </div>
                    <div className="px-6 pb-2">
                      <button
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        onClick={() =>
                          setDeleteShowAndMemberInfo(true, false, member)
                        }
                      >
                        Delete
                      </button>
                    </div>
                    </div>
                    )};
                  </div>
                );
              })
            : ""}
        </div>
      )}
      ;
      {showDelete == true && (
        <DeleteMember
          name={selectMember.name}
          memberId={selectMember.memberId}
          eoaAddress={selectMember.eoaAddress}
          tokenId={selectMember.tokenId}
        ></DeleteMember>
      )}
    </>
  );
};

export default MemberList;
