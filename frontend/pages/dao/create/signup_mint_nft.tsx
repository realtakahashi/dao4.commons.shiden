import { Layout } from '@/components/common';
import { useState } from 'react';
import { FormInputText } from '@/components/ui';
import { MemberNFTMintFormData } from "@/types/MemberNFT"
import { deployMemberNFT, mintMemberNFT } from '@/contracts/MemberNFT';

const MintMemberNFT = () => {
  const [memberNFTTokenID, setmemberNFTTokenID] = useState("")

  const [formValue, setFormValue] = useState<MemberNFTMintFormData>({
    token_address: ""
  })
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }
  const onSubmitMemberNFTForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await mintMemberNFT(formValue.token_address)
  }
  return (
    <>
      <div>
        <h2 className="text-xl">Signup with Token address</h2>
        <form className="w-full max-w-sm"
          onSubmit={onSubmitMemberNFTForm}
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Token Address
              </label>
            </div>
            <div className="md:w-2/3">
              <FormInputText
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="token_address"
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
                Mint
              </button>
            </div>
          </div>

        </form>
        {memberNFTTokenID !== "" ? (
          <div className='mt-10'>
            <p className="text-lg">
              Mint Succeeded!!
            </p>
            <p className="text-lg">
              Your Member NFT TokenID:
            </p>
          </div>
        ) : ""}
      </div>
    </>
  )
}

MintMemberNFT.Layout = Layout
export default MintMemberNFT