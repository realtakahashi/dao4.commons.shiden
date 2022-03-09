import { FC, Dispatch, SetStateAction } from "react"
import cn from "classnames"
import { SubDAOData, SubDAOMemberData } from '@/types/SubDAO';

interface SubDAOProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  subDAO: SubDAOData
  subDAOBalance: number
}

export const SubDAOModal: FC<SubDAOProps> = ({ isModalOpen, setIsModalOpen, subDAO,subDAOBalance }) => {


  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const subDAOModalClassName = cn(
    "overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0",
    { "hidden": !isModalOpen }
  )

  return (
    <>
      <div id="defaultModal" aria-hidden="true"
        className={subDAOModalClassName}
      >
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">

          <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">

            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                SubDAO Name: {subDAO.daoName}
              </h3>
              <button
                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                onClick={handleModalClose}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-white dark:text-white">
                {
                  subDAO.rewardApproved ? `Reward Approved` : "Reward Not Approved"
                }
              </p>
              <p className="text-base leading-relaxed text-white dark:text-white">
                Balance: {subDAOBalance} SDN
              </p>
              <p className="text-base leading-relaxed text-white dark:text-white">
                Owner Address: {subDAO.ownerAddress}
              </p>
              <p className="text-base leading-relaxed text-white dark:text-white">
                Github URL: {subDAO.githubURL}
              </p>

            </div>

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface MemberProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  member: SubDAOMemberData
}


export const MemberModal: FC<MemberProps> = ({ isModalOpen, setIsModalOpen, member }) => {
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const memberModalClassName = cn(
    "overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0",
    { "hidden": !isModalOpen }
  )
  console.log(member)
  return (
    <>
      <div id="defaultModal" aria-hidden="true"
        className={memberModalClassName}
      >
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">

          <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">

            <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-white lg:text-2xl dark:text-white">
                Name: {member.name}
              </h3>
              <button
                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal"
                onClick={handleModalClose}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-white dark:text-white">
                MemberID: {member.memberId._hex}
              </p>
              <p className="text-base leading-relaxed text-white dark:text-white">
                TokenID: {member.tokenId._hex}
              </p>

            </div>

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

