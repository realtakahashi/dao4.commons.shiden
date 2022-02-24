import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common';
import { useState } from 'react';
import { FormInputText } from '@/components/ui';
import { AddMemberFormData } from "@/types/MemberNFT"
import { deployMemberNFT, mintMemberNFT } from '@/contracts/MemberNFT';
import { addMemberToSubDAO } from '@/contracts/SubDAO';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      address: params?.address
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/dao/[address]/members/add"],
    fallback: true
  }
}

const MintMemberNFT = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [memberAdded, setMemberAdded] = useState(false)
  const [formValue, setFormValue] = useState<AddMemberFormData>({
    subDaoAddress: "",
    tokenID: 0,
    nftContractAddress: "",
    name: "",
    memberAddress: ""
  })
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
    console.log(formValue)
  }
  const onSubmitAddMemberForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await addMemberToSubDAO(formValue.subDaoAddress, formValue)
    setMemberAdded(true)


  }
  return (
    <>
      <div>
        <h2 className="text-xl">Add DAO member</h2>
        <form className="w-full max-w-sm"
          onSubmit={onSubmitAddMemberForm}
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Member Address
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="memberAddress"
                handleOnChange={onChangeInput}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="name"
                handleOnChange={onChangeInput}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                NFT contract address
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="nftContractAddress"
                handleOnChange={onChangeInput}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                TokenID
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="tokenID"
                handleOnChange={onChangeInput}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Sub DAO Address
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="subDaoAddress"
                handleOnChange={onChangeInput}
              />
            </div>
          </div>
          <div className="">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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