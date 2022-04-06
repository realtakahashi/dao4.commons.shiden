import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { MemberInfo, MemberInfoPlus } from "../types/MemberManagerType";
import { getMemberList } from "../contracts/MemberManagerApi";

const MemberList = () => {
  const [memberList, setMemberList] = useState<Array<MemberInfoPlus>>();

  useEffect(() => {
    const _getMemberList = async () => {
      //console.log("## getSubDaoList call 1");
      const result = await getMemberList();
      //console.log("## memberList:",result);
      setMemberList(result);
    };

    _getMemberList();
  }, []);

  return (
    <>
      <div className="p-2 flex flex-wrap justify-center mx-1 lg:-mx-4">
        {typeof memberList !== "undefined"
          ? memberList.map((member) => {
              return (
                <div 
                    className="m-5  max-w-sm rounded overflow-hidden shadow-lg bg-black border-4 border-white"
                    key={member.name}
                >
                  <div className="px-6 py-4">
                    <div className="font-bold mb-2 text-white">Name: {member.name}</div>
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
                    <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Delete
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

export default MemberList;
