import { Layout } from '@/components/common'
import { useState } from 'react'
import { FormInputSelect, FormInputText } from '@/components/ui'
import { DaoErc721DeployFormData } from "@/types/Token"

import { useSubDAOList } from '@/hooks'
import { deployDaoErc721 } from '@/contracts/daoErc721'
import { useRouter } from 'next/router'

const DeployDaoErc721 = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const [DaoErc721Address, setDaoErc721Address] = useState("")
  const [formValue, setFormValue] = useState<DaoErc721DeployFormData>({
    name: "",
    symbol: "",
    subDAOAddress: subDAOaddress,
    priceWei: 0,
    tokenUri: ""
  })
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitDaoErc721Form = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const daoErc721ContractAddress = await deployDaoErc721(formValue)
    console.log(daoErc721ContractAddress)
    if (daoErc721ContractAddress !== "") {
      setDaoErc721Address(daoErc721ContractAddress)
    }
  }
  return (
    <>
      <div className="w-full form-container">
        <h2 className="text-xl">Deploy Your DaoErc721</h2>
        <form
          onSubmit={onSubmitDaoErc721Form}
        >
          <FormInputText
            label="name"
            className="appearance-none border-2 border-gray-7210 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="name"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Symbol'
            className="appearance-none border-2 border-gray-7210 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="symbol"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Price'
            className="appearance-none border-2 border-gray-7210 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="priceWei"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Amount'
            className="appearance-none border-2 border-gray-7210 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="amount"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Token Uri'
            className="appearance-none border-2 border-gray-7210 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="tokenUri"
            handleOnChangeInput={onChangeInput}
          />
          <div className="">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="button-dao-default px-4 py-2 m-2"
                type="submit"
              >
                Deploy & Add Token To List
              </button>
            </div>
          </div>

        </form>
        {
          DaoErc721Address !== "failed" && DaoErc721Address !== "" ? (
            <div className='mt-10'>
              <p className="text-lg">
                Deploy Succeeded!!
              </p>
              <p className="text-lg">
                Your ERC721 Contract Address: {DaoErc721Address}
              </p>
            </div>
          ) : ""
        }
      </div >
    </>
  )
}

DeployDaoErc721.Layout = Layout
export default DeployDaoErc721
