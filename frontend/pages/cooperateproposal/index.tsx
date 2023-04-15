import { DfCFooter } from "@/components/DfCFooter";
import { DfCHeader } from "@/components/DfCHeader";
import { useState } from "react";
import Link from "next/link";
import CooperateProposalList from "@/dao4.frontend.common/components/CooperateProposalList";
import CooperateSubmitProposal from "@/dao4.frontend.common/components/CooperateSubmitProposal";

const CooperateProposal = () => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [showBackListButton, setShowBackListButton] = useState(false);
  const _manageShowing = (
    _showSubmit: boolean,
    _showList: boolean,
    _showBackListButton: boolean,
    _showAllList: boolean
  ) => {
    setShowSubmit(_showSubmit);
    setShowList(_showList);
    setShowAll(_showAllList);
    setShowBackListButton(_showBackListButton);
  };
  return (
    <>
      <div className="bg-black flex flex-col min-w-fit">
        <DfCHeader />
        <main className="min-h-[85vh]">
          <button className="m-2 px-4 py-2  border-white border-2 bg-black rounded text-white  hover:bg-indigo-500">
              <Link href="/">Back To Top</Link>
            </button>
          <div className="flex justify-center">
            {showBackListButton == true && (
              <button 
                className="m-2 px-4 py-2  border-black border-2 bg-indigo-200 rounded text-black  hover:bg-indigo-100"
                onClick={() => _manageShowing(false, true, false, true)}
                >
                Back To List
              </button>
            )}
            {showList == true && (
              <>
                <div className="m-5"></div>
                <div>
                  <button
                    className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
                    onClick={() => _manageShowing(true, false, true,false)}
                  >
                    + Submit New
                  </button>
                  <button
                    className="m-2 px-4 py-2  border-black border-2 bg-white rounded text-black  hover:bg-green-200"
                    onClick={() => _manageShowing(false, true, false,!showAll)}
                  >
                    All or Not Finished
                  </button>
                </div>
              </>
            )}
          </div>
          {showList == true && (
            <CooperateProposalList
              setShowSubmmit={setShowSubmit}
              setShowList={setShowList}
              showAllList={showAll}
            ></CooperateProposalList>
          )}
          {showSubmit == true && (
            <CooperateSubmitProposal></CooperateSubmitProposal>
          )}
        </main>
        <DfCFooter />
      </div>
    </>
  );
};

export default CooperateProposal;
