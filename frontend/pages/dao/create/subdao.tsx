import { Layout } from '@/components/common';
import { useState } from 'react';
import { FormInputText } from '@/components/ui';
import { deploySubDAO, registerSubDAO } from '@/contracts/SubDAO';
import { SubDAODeployFormData } from "@/types/SubDAO"
const DeploySubDAO = () => {
  const [sudDAOAddress, setSubDAOAddress] = useState("")
  const [formValue, setFormValue] = useState<SubDAODeployFormData>({
    githubUrl: "",
    ownerName: "",
    name: ""
  })
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
    console.log(formValue)
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
      <div className="w-full form-container">
        <h2 className="text-xl">Deploy Your SubDAO</h2>
        <form 
          onSubmit={onSubmitSubDAOForm}
        >
          <FormInputText
            label='Name'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="name"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='GithubURL'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="githubUrl"
            handleOnChangeInput={onChangeInput}
          />
          <FormInputText
            label='Owner Name'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="ownerName"
            handleOnChangeInput={onChangeInput}
          />
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="button-dao-default px-4 py-2 m-2"
                type="submit"
              >
                Deploy
              </button>
            </div>
        </form>
        {sudDAOAddress !== "" ? (
          <div className='mt-10'>
            <p className="text-lg">
              Deploy Succeeded!!
            </p>
            <p className="text-lg">
              Your DAO Contract Address: 0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1
            </p>
          </div>
        ) : ""}

      </div>
    </>
  )
}

DeploySubDAO.Layout = Layout
export default DeploySubDAO
