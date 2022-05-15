import { Layout } from '@/components/common'
import { useState } from 'react'
import { FormInputSelect, FormInputText } from '@/components/ui'
import { DaoErc20DeployFormData } from "@/types/Token"

import { useSubDAOList } from '@/hooks'
import { deployDaoErc20 } from '@/contracts/daoErc20'
import { useRouter } from 'next/router'

const DeployDaoErc20 = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const [DaoErc20Address, setDaoErc20Address] = useState("")
  const [formValue, setFormValue] = useState<DaoErc20DeployFormData>({
    name: "",
    symbol: "",
    subDAOAddress: subDAOaddress,
    pricewei: 0,
    amount: 0,
  })
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitDaoErc20Form = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const daoErc20ContractAddress = await deployDaoErc20(formValue)
    console.log(daoErc20ContractAddress)
    if (daoErc20ContractAddress !== "") {
      setDaoErc20Address(daoErc20ContractAddress)
    }
  }
  return (
    <>
      <div className="w-full form-container">
        <h2 className="text-xl">Deploy Your DaoErc20</h2>
        <form
          onSubmit={onSubmitDaoErc20Form}
        >
          <FormInputText
            label="name"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="name"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Symbol'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="symbol"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Price'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="pricewei"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Amount'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="amount"
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
          DaoErc20Address !== "failed" && DaoErc20Address !== "" ? (
            <div className='mt-10'>
              <p className="text-lg">
                Deploy Succeeded!!
              </p>
              <p className="text-lg">
                Your ERC20 Contract Address: {DaoErc20Address}
              </p>
            </div>
          ) : ""
        }
      </div >
    </>
  )
}

DeployDaoErc20.Layout = Layout
export default DeployDaoErc20
