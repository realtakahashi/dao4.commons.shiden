import { useState } from "react";
import AddMember from "./AddMember";
import MemberList from "./MemberList";
import SelectElectionComission from "./SelectElectionComission";

const Member = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showListButton, setShowListButton] = useState(false);
  const [showMemberButton, setShowMemberButton] = useState(true);
  const [showSelectElection, setShowSelectElection] = useState(false);
  const [showSelectElectionButton, setShowSelectElectionButton] =
    useState(true);

  const _manageShowing = (
    _addMember: boolean,
    _list: boolean,
    _election: boolean,
    _showMemberButton: boolean,
    _electionButton: boolean,
    _showListButton:boolean
  ) => {
    setShowAddMember(_addMember);
    setShowList(_list);
    setShowMemberButton(_showMemberButton);
    setShowSelectElection(_election);
    setShowSelectElectionButton(_electionButton);
    setShowListButton(_showListButton);
  };

  return (
    <>
      <div className="flex justify-center">
      {showListButton == true && (
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() =>
              _manageShowing(false,true,false,true,true,false)
            }
          >
            Back To List
          </button>
        )}
        {showMemberButton == true && (
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() =>
              _manageShowing(true, false, false, false, true, true)
            }
          >
            + Memeber
          </button>
        )}
        {showSelectElectionButton == true && (
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() =>
              _manageShowing(false, false, true, true, false,true)
            }
          >
            Re: Election Comission
          </button>
        )}
      </div>
      {showList == true && (
        <div>
          <MemberList setShowElectionButton={setShowSelectElectionButton} setShowMemberButton={setShowMemberButton}></MemberList>
        </div>
      )}
      {showAddMember == true && <AddMember></AddMember>}
      {showSelectElection == true && (
        <SelectElectionComission></SelectElectionComission>
      )}
    </>
  );
};

export default Member;
