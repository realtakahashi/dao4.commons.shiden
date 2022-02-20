import { Layout } from '@/components/common';
import { useState } from 'react';
import { FormInputText } from '@/components/ui';
import { deploySubDAO, registerSubDAO } from '@/contracts/SubDAO';
import { SubDAODeployFormData } from "@/types/SubDAO"
const DeploySubDAO = () => {
  const [sudDAOAddress, setSubDAOAddress] = useState("")
  const [formValue, setFormValue] = useState<SubDAODeployFormData>({
    github_url: "",
    owner_url: "",
    name: ""
  })
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }
  const onSubmitSubDAOForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const address = await deploySubDAO(formValue)
    if (address !== "") {
      setSubDAOAddress(address)
    }
  }
  return (
    <>
      <div>
        <h2 className="text-xl">Deploy Your SubDAO</h2>
        <form className="w-full max-w-sm"
          onSubmit={onSubmitSubDAOForm}
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
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
                GithubURL
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="github_url"
                handleOnChange={onChangeInput}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Owner URL
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="owner_url"
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
                Deploy
              </button>
            </div>
          </div>

        </form>
        {sudDAOAddress !== "" ? (
          <div className='mt-10'>
            <p className="text-lg">
              Deploy Succeeded!!
            </p>
            <p className="text-lg">
              Your DAO Address: {sudDAOAddress}
            </p>
          </div>
        ) : ""}

      </div>
    </>
  )
}

DeploySubDAO.Layout = Layout
export default DeploySubDAO