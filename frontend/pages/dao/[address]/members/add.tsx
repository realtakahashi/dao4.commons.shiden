import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common'
import { useState, useEffect } from 'react'
import { FormInputSelect, FormInputText, FormText } from '@/components/ui'
import { AddMemberFormData } from "@/types/MemberNFT"
import { addMemberToSubDAO, getProposalListFromContract } from '@/contracts/SubDAO'
import { Loading } from '@/components/common/Loading'
import { useSubDAOData } from '@/hooks'
import { useRouter } from 'next/router'
import { ProposalInfo } from '@/types/Proposal'


const MintMemberNFT = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const [memberAdded, setMemberAdded] = useState(false)
  const [relatedProposalList, setRelatedProposalList] = useState<Array<ProposalInfo>>([])
  const [formValue, setFormValue] = useState<AddMemberFormData>({
    tokenID: 0,
    name: "",
    memberAddress: "",
    relatedProposalId: 0,
  })

  useEffect(() => {
    const getProposalList = async () => {
      if (typeof subDAOaddress === "string") {
        const response = await getProposalListFromContract(subDAOaddress)
        const proposalList = response.filter((res) => {
          return res.proposalKind == 0 && res.proposalStatus == 6
        })
        setRelatedProposalList(proposalList)
        // console.log(proposalList)
      }
    }
    getProposalList()
  }, [])

  const targetSubDAO = useSubDAOData(subDAOaddress)
  if (typeof targetSubDAO === "undefined") {
    return <Loading />
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
    // console.log(formValue)
  }
  const onSubmitAddMemberForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addMemberToSubDAO(subDAOaddress, formValue)
    setMemberAdded(true)
  }
  return (
    <>
      <div className="w-full form-container">
        {
          typeof targetSubDAO !== "undefined" ?
            (<h2>
              DAO: {targetSubDAO.daoName}
            </h2>) : ''
        }
        <h2 className="text-xl">Add DAO member</h2>
        <form
          onSubmit={onSubmitAddMemberForm}
        >
          <FormInputText
            label='Member Address'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="memberAddress"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Name'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="name"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='TokenID'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="tokenID"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputSelect
            label='Related Proposal Id'
            className="text-black appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="relatedProposalId"
            handleOnChangeSelect={onChangeInput}
            selectList={relatedProposalList}
            optionLabelKey={"title"}
            optionValueKey={"proposalId"}
            itemName={"Related ProposalId"}
          />

          <FormText
            label='Sub DAO'
            // className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            text={`${targetSubDAO?.daoName}(${targetSubDAO?.daoAddress})`}
          />

          <div className="">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="button-dao-default px-4 py-2 m-2"
                type="submit"
              >
                Add Member
              </button>
            </div>
          </div>

        </form>
        {memberAdded ? (
          <div className='mt-10'>
            <p className="text-lg">
              Member Added! Welcome!
            </p>
          </div>
        ) : ""}
      </div>
    </>
  )
}

MintMemberNFT.Layout = Layout
export default MintMemberNFT
