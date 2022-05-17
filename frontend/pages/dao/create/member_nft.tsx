import { Layout } from '@/components/common';
import { useState } from 'react';
import { FormInputSelect, FormInputText } from '@/components/ui';
import { MemberNFTDeployFormData } from "@/types/MemberNFT"
import { deployMemberNFT, mintMemberNFT, updateNftAddressAndOwnerTokenId } from '@/contracts/MemberNFT';
import { useSubDAOList } from '@/hooks';

const DeployMemberNFT = () => {
  const [memberNFTAddress, setmemberNFTAddress] = useState("")
  const [formValue, setFormValue] = useState<MemberNFTDeployFormData>({
    name: "",
    symbol: "",
    tokenURI: "",
    subdaoAddress: ""
  })
  const subDAOList = useSubDAOList()
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })    
  }
  const onSubmitMemberNFTForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nftContractAddress = await (await deployMemberNFT(formValue))
    if (nftContractAddress !== "") {
      setmemberNFTAddress(nftContractAddress)
    }
    await mintMemberNFT(nftContractAddress)
    // await updateNftAddressAndOwnerTokenId(formValue.subdaoAddress,nftContractAddress,1)
  }
  return (
    <>
      <div className="w-full form-container">
        <h2 className="text-xl">Deploy Your MemberNFT</h2>
        <form
          onSubmit={onSubmitMemberNFTForm}
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
            label='Token URI'
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="tokenURI"
            handleOnChangeInput={onChangeInput}
          />
          <div className="">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="button-dao-default px-4 py-2 m-2"
                type="submit"
              >
                Deploy & Mint
              </button>
            </div>
          </div>

        </form>
        {
          memberNFTAddress !== "" ? (
            <div className='mt-10'>
              <p className="text-lg">
                Deploy Succeeded!!
              </p>
              <p className="text-lg">
                Your Member NFT Contract Address: {memberNFTAddress}
              </p>
            </div>
          ) : ""
        }
      </div >
    </>
  )
}

DeployMemberNFT.Layout = Layout
export default DeployMemberNFT
