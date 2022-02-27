import type { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { Layout } from '@/components/common';
import { useState } from 'react';
import { FormInputText, FormText } from '@/components/ui';
import { AddMemberFormData } from "@/types/MemberNFT"
import { addMemberToSubDAO } from '@/contracts/SubDAO';
import { Loading } from '@/components/common/Loading';
import { useSubDAOData } from '@/hooks';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (typeof params !== "undefined"
    && typeof params.address === "string") {
    return {
      props: {
        address: params.address
      }
    }
  }
  return {
    props: {
      address: ""
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
  if (typeof props.address === "undefined") {
    return (
      <Loading />
    )
  }
  const targetSubDAO = useSubDAOData(props.address)
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
