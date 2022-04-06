import { useState } from "react";
import AddMember from "./AddMember";
import MemberList from "./MemberList";
import SelectElectionComission from "./SelectElectionComission";

const Member = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showMemberButton, setShowMemberButton] = useState(true);
  const [showListButton, setShowListButton] = useState(false);
  const [showSelectElection,setShowSelectElection] = useState(false);
  const [showSelectElectionButton,setShowSelectElectionButton] = useState(true);

  const _manageShowing = (_addMember: boolean, _list: boolean, _election:boolean,_showMemberButton:boolean,
    _showListButton:boolean,_electionButton:boolean) => {
    setShowAddMember(_addMember);
    setShowList(_list);
    setShowMemberButton(_showMemberButton);
    setShowListButton(_showListButton);
    setShowSelectElection(_election);
    setShowSelectElectionButton(_electionButton);
  };

  return (
    <>
      <div className="flex justify-center">
      {showListButton == true && (
        <button 
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={()=>_manageShowing(false,true,false,true,false,true)}
        >
          List
        </button>
        )}
        {showMemberButton == true && (
        <button 
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={()=>_manageShowing(true,false,false, false,true,true)}
        >
          + Memeber
        </button>
        )}
        {showSelectElectionButton == true && (
        <button 
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={()=>_manageShowing(false,false,true,true,true,false)}
        >
          Re: Election Comission
        </button>
        )}
      </div>
      {showList == true && (
        <div>
          <MemberList></MemberList>
        </div>
      )}
      {showAddMember == true && (
          <AddMember></AddMember>
      )}
      {showSelectElection == true && (
          <SelectElectionComission></SelectElectionComission>
      )}
    </>
  );
};

export default Member;
