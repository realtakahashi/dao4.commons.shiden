import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common';
import { useState, useEffect } from 'react';
import { FormInputText, FormText } from '@/components/ui';
import { AddMemberFormData } from "@/types/MemberNFT"
import { addMemberToSubDAO } from '@/contracts/SubDAO';
import { Loading } from '@/components/common/Loading';
import { useSubDAOData } from '@/hooks';
import { useRouter } from 'next/router';


const MintMemberNFT = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string  
  const [memberAdded, setMemberAdded] = useState(false)
  const [formValue, setFormValue] = useState<AddMemberFormData>({
    tokenID: 0,
    nftContractAddress: "",
    name: "",
    memberAddress: ""
  })

  const targetSubDAO = useSubDAOData(subDAOaddress)
  if (typeof targetSubDAO === "undefined") { 
    return <Loading/>
  }

  



  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <div>
        {
          typeof targetSubDAO !== "undefined" ?
            (<h2>
              DAO: {targetSubDAO.daoName}
            </h2>) : ''
        }
        <h2 className="text-xl">Add DAO member</h2>
        <form className="w-full max-w-sm"
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
            label='NFT contract address'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="nftContractAddress"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='TokenID'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="tokenID"
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
