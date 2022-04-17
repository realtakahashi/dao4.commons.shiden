import { Layout } from "@/components/common";
import { useState } from "react";
import { FormInputText } from "@/components/ui";
import { MemberNFTMintFormData } from "@/types/MemberNFT";
import { checkNFTMinted, mintMemberNFT } from "@/contracts/MemberNFT";

const MintMemberNFT = () => {
  const [memberNFTTokenID, setMemberNFTTokenID] = useState("");
  const [checkMemberNFTId, setCheckMemberNFTId] = useState("");

  const [formValue, setFormValue] = useState<MemberNFTMintFormData>({
    token_address: "",
  });
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmitMemberNFTForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const checkId = await checkNFTMinted(formValue.token_address);
    setCheckMemberNFTId(checkId);
    if (checkId == "") {
      const id = await mintMemberNFT(formValue.token_address);
      console.log(id);
      if (id) {
        setMemberNFTTokenID(id);
      }
    }
  };
  return (
    <>
      <div className="w-full form-container">
        <h2 className="text-xl">Signup with Token address</h2>
        <form
          onSubmit={onSubmitMemberNFTForm}>
          <FormInputText
            label="Memeber NFT Contrat Address"
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            name="token_address"
            handleOnChangeInput={onChangeInput}
          />
          <div className="">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="button-dao-default px-4 py-2 m-2"
                type="submit"
              >
                Mint
              </button>
            </div>
          </div>
        </form>
        {memberNFTTokenID !== "" ? (
          <div className="mt-10">
            <p className="text-lg">Mint Succeeded!!</p>
            <p className="text-lg">
              Your Member NFT TokenID: {memberNFTTokenID}
            </p>
          </div>
        ) : (
          ""
        )}
        {checkMemberNFTId !== "" ? (
          <div className="mt-10">
            <p className="text-lg">You have already minted.</p>
            <p className="text-lg">
              Your Member NFT TokenID: {checkMemberNFTId}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

MintMemberNFT.Layout = Layout;
export default MintMemberNFT;
