import { Layout } from '@/components/common'
import { useState, useEffect } from 'react'
import { ProposalInfo } from '@/types/Proposal'
import { getProposalListFromContract, changeProposalStatus } from '@/contracts/SubDAO'
import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      address: params?.address
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/dao/[address]/proposals"],
    fallback: true
  }
}

const PROPOSAL_KIND = ['AddAMember', 'DeleteAMember', 'UseOfFunds', 'CommunityManagement', 'Activities'] as const;
const PROPOSAL_STATUS = ['UnderDiscussionOnGithub', 'Voting', 'Pending', 'Running', 'Rejected', 'FinishedVoting',
  'Finished'] as const;


function Modal({show, setShow, selectProposal, subDaoAddress}){

  const doChangeProposalStatus = async (selectProposal) => {
    console.log("## subDaoAddress: ", subDaoAddress)
    console.log("## selectProposal.proposalId: ", parseInt(selectProposal.proposalId))
    console.log("## proposalStatus: ", proposalStatus)

    await changeProposalStatus(subDaoAddress,parseInt(selectProposal.proposalId), proposalStatus)
  }

  const [proposalStatus, setProposalStatus] = useState(0)

  const selectStatus = (status) => {
    setProposalStatus(status)
  }

  const changeStatusAndSetShow = async (show,proposal) => {
    setShow(show)
    await doChangeProposalStatus(proposal)
  }

  if(show){
    return (
      <div id="overlay">
        <div id="content">
          <div className="shadow-lg rounded p-8 bg-white">
            <p className="font-bold text-gray-700 leading-relaxed">
              Proposal Kind: {PROPOSAL_KIND[selectProposal.proposalKind]}
            </p>
            <p className="font-bold text-gray-700 leading-relaxed">
              Tiltle: {selectProposal.title}
            </p>
            <p className="font-bold text-gray-700 leading-relaxed">
              Outline: {selectProposal.outline}
            </p>
            <p className="font-bold text-gray-700 leading-relaxed">
              Detail: {selectProposal.detail}
            </p>
            <p className="font-bold text-gray-700 leading-relaxed">
              GithubUrl: {selectProposal.githubURL}
            </p>
            <p className="font-bold text-gray-700 leading-relaxed">
              Proposal Status: {PROPOSAL_STATUS[selectProposal.proposalStatus]}
            </p>
            Change Status to :
            <select 
              name="Status"
              value={proposalStatus}
              onChange={e => selectStatus(e.target.value)}
            >
              <option value="0">UnderDiscussionOnGithub</option>
              <option value="1">Voting</option>
              <option value="2">Pending</option>
              <option value="3">Running</option>
              <option value="4">Rejected</option>
              <option value="5">FinishedVoting</option>
              <option value="6">Finished</option>
            </select>
            <div className="flex items-center justify-end mt-4">
              <button
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 mr-4"
                onClick={() => changeStatusAndSetShow(false,selectProposal)}
              >
                Ok
              </button>
              <button
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                onClick={() => setShow(false)}
              >
                Chancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else{
    return null;
  }
}

const DaoProposals = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [proposalList, setProposalList] = useState<Array<ProposalInfo>>()
  const [targetProposal, setTargetProposal] = useState<ProposalInfo>()
  const router = useRouter();
  const subDAOaddress = router.query.address;

  const [show, setShow] = useState(false)
  const [selectProposal, setSelectProposal] = useState(null)
  
  function setProposal(proposal){
    setSelectProposal(proposal)
  }

  useEffect(() => {
    const getProposalList = async () => {
      if (typeof subDAOaddress === 'string'){
        const response = await getProposalListFromContract(subDAOaddress)
        setProposalList(
          response
        )
      }
    }
    getProposalList()
  }, [])
  
  return (
    <>
      <div>
        Proposals page
      </div>
		  <div className="">
			      <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
				      font-bold py-2 px-4 rounded" type="button"
			        onClick={() => setShow(true)}
			      >
				      Change Propsal Status
			      </button>
              <Modal show={show} setShow={setShow} selectProposal={selectProposal} subDaoAddress={subDAOaddress} />
		  </div>
      <div className='mt-5'>
          <h2>Proposals</h2>
          <div className="flex justify-center">
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
              {typeof proposalList !== "undefined" ?
                proposalList.map((proposal) => {
                  return (
                    <li
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      key={proposal.title}
                      style={
                        selectProposal!==null && proposal.title===selectProposal.title ? { background: "#ffe4e1" } : {}
                      }
                      onClick={() => setProposal(proposal) }                      
                    >
                      {PROPOSAL_KIND[proposal.proposalKind]} / {proposal.title} / {proposal.outline} / {proposal.githubURL} / {PROPOSAL_STATUS[proposal.proposalStatus]}
                    </li>
                  )
                }) : ""
              }
            </ul>
          </div>
      </div>

    </>
  )
}

DaoProposals.Layout = Layout
export default DaoProposals