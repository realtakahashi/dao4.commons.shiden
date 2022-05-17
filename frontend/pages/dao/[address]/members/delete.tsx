
import { Layout } from '@/components/common'
import { useState } from 'react'
import { FormInputText, FormText } from '@/components/ui'
import { deleteMemberOfSubDAO } from '@/contracts/SubDAO'
import { useSubDAOData } from '@/hooks'
import { useRouter } from 'next/router'
import { DeleteMemberFormData } from '@/types/SubDAO'


const MintMemberNFT = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const [memberDeleted, setMemberDeleted] = useState(false)

  const targetSubDAO = useSubDAOData(subDAOaddress)
  const [formValue, setFormValue] = useState<DeleteMemberFormData>({
    memberAddress: "",
    relatedProposalId: 0
  })

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
    console.log(formValue)
  }
  const onSubmitDeleteMemberForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await deleteMemberOfSubDAO(subDAOaddress, formValue)
    setMemberDeleted(true)

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
        <h2 className="text-xl">Delete DAO member</h2>
        <form
          onSubmit={onSubmitDeleteMemberForm}
        >
          <FormInputText
            label='Member Address'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="memberAddress"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Related Proposal Id'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="relatedProposalId"
            handleOnChangeInput={onChangeInput}
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
                Delete Member
              </button>
            </div>
          </div>

        </form>
        {memberDeleted ? (
          <div className='mt-10'>
            <p className="text-lg">
              Member Successfully deleted!
            </p>
          </div>
        ) : ""}
      </div>
    </>

  )
}
MintMemberNFT.Layout = Layout
export default MintMemberNFT
