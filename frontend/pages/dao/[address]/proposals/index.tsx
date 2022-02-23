import { Layout } from '@/components/common'
import { useState, useEffect } from 'react'
import { ProposalInfo } from '@/types/Proposal'
import { getProposalListFromContract } from '@/contracts/SubDAO'
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


const DaoProposals = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [proposalList, setProposalList] = useState<Array<ProposalInfo>>()
  const [targetProposal, setTargetProposal] = useState<ProposalInfo>()
  const router = useRouter();
  const subDAOaddress = router.query.address;

  useEffect(() => {
//    const subDAOaddress = props.address
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
                    >
                      {proposal.title} / {proposal.githubURL}
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