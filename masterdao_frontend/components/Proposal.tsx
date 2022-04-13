import { useState } from "react";
import ProposalList from "./ProposalList";
import SubmitProposal from "./SubmitProposal";

const Proposal = () => {
  const [showListButton, setShowListButton] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showList, setShowList] = useState(true);
  const [showSubmitScreen, setShowSubmitScreen] = useState(false);

  const _manageShowing = (
    _listButton: boolean,
    _submitButton: boolean,
    _list: boolean,
    _submitScreen: boolean
  ) => {
    setShowListButton(_listButton);
    setShowSubmitButton(_submitButton);
    setShowList(_list);
    setShowSubmitScreen(_submitScreen);
  };

  return (
    <>
      <div className="flex justify-center">
        {showListButton == true && (
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => _manageShowing(false, true, true, false)}
          >
            List
          </button>
        )}
        {showSubmitButton == true && (
          <button
            className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
            onClick={() => _manageShowing(true, false, false, true)}
          >
            + Submit New
          </button>
        )}
      </div>
      <div>
        {showList == true && (
          <ProposalList 
            setShowSubmmitButton={setShowSubmitButton}
            setShowList={setShowList}
            setShowListButton={setShowListButton}
            setShowSubmitScreen={setShowSubmitScreen}
            />
        )}
        {showSubmitScreen == true && <SubmitProposal></SubmitProposal>}
      </div>
    </>
  );
};

export default Proposal;
