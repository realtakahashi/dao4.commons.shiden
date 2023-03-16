import AddMemberForDao from "@/components/AddMemberForDao";
import { BackTopButton } from "@/components/BackTopButton";
import { DfCFooter } from "@/components/DfCFooter";
import { DfCHeader } from "@/components/DfCHeader";
import MintNFT from "@/components/MintNFT";
import { AppShell, Footer, Group, Navbar } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

const Join = () => {
    const [showMintNft, setShowMintNft] = useState(true);
    const [showAddMember, setShowAddMember] = useState(false);
    const [checkMintNft,setCheckMintNft] = useState(false);
    const [checkAddMember,setCheckAddMember] = useState(false);
    const [tokenAddress,setTokenAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
  
    return (
      <>
      <AppShell className="bg-black min-h-screen"
        navbar={<Navbar className="bg-black max-h-[75vh]" width={{ sm: 500 }} p="md">
          {<>
          <Navbar.Section className="flex flex-col">
          <td className="text-orange-300 text-40px" style={{"fontFamily":"Gill sans"}}>
        Follow Steps Below
        </td>
        <td className="text-orange-300 text-40px" style={{"fontFamily":"Gill sans"}}>
        TO Join The DAO
        </td>
            <tr className="text-30px">
              {checkMintNft == false && (
                <td className="text-center">
                  <p className="text-yellow-200">&nbsp; &nbsp; 1.&nbsp; Mint your own NFT.</p>
                </td>
              )}
              {checkMintNft == true && (
                <td className="text-center">
                  <p className="text-white">&nbsp; &nbsp; 1.&nbsp; Mint your own NFT.</p>
                </td>
              )}
              {checkMintNft == true && (
                <td>
                  <p className="px-5 text-blue-500">Finished</p>
                </td>
              )}
              {checkMintNft == false && (
                <td>
                  <p className="px-5 text-red-500">Yet</p>
                </td>
              )}
            </tr>

            <tr className="text-30px">
              {showAddMember == true && checkAddMember == false && checkMintNft == true &&(
                <td className="text-center">
                  <p className="text-yellow-500">&nbsp; &nbsp; 2.&nbsp; Add You 2 Member.</p>
                </td>
              )}
              {((showAddMember== false && checkMintNft == false ) || checkAddMember == true || checkMintNft == false) && (
                <td className="text-center">
                  <p className="text-white">&nbsp; &nbsp; 2.&nbsp; Add You 2 Member.</p>
                </td>
              )}
              {checkAddMember == true && (
                <td>
                  <p className="px-5 text-blue-500">Finished</p>
                </td>
              )}
              {checkAddMember == false && (
                <td>
                  <p className="px-5 text-red-500">Yet</p>
                </td>
              )}
            </tr>
          </Navbar.Section>
          <BackTopButton/>
          </>}
        </Navbar>}
         header={<DfCHeader/>}
         footer={<DfCFooter/>}>

         <table className="w-[100%]">
         <div className="bg-black flex flex-col min-h-[75vh]">
          <div className="text-50px text-center text-yellow-300 leading-none tracking-tight">
            <p>Attention!</p>
            <p>You need the following steps beforehand</p>
            <div className="p-3"></div>
          </div>
          <div className="m-1"></div>
          <div className="flex flex-col justify-center m-5 leading-none tracking-tight">
            <table>
            <tr className="text-30px">
                <td className=" text-orange-200 text-center">
                &nbsp; &nbsp; ## &nbsp; Contact DAO for additional member approval.
                </td>
              </tr>
              <div className="p-2"></div>
              <tr className="text-30px">
                <td className=" text-orange-200 text-center">
                &nbsp; &nbsp; ## &nbsp; Get The Member NFT Address.
                </td>
              </tr>
              <div className="p-2"></div>
              <tr className="text-30px">
                <td className=" text-orange-200 text-center">
                &nbsp; &nbsp; ## &nbsp; Get The DAO Address.
                </td>
              </tr>
              <div className="p-8"></div>
              {/* <tr className="text-30px">
                <td className="text-center">
                  <button
                    className="m-2 text-white hover:text-orange-200"
                    onClick={() => setShowMintNft(true)}
                  >
                    &nbsp; &nbsp; 1.&nbsp; Mint your own NFT.
                  </button>
                </td>
                {checkMintNft == true && (
                  <td>
                    <p className="px-5 text-blue-500">Finished</p>
                  </td>
                )}
                {checkMintNft == false && (
                  <td>
                    <p className="px-5 text-red-500">Yet</p>
                  </td>
                )}
              </tr> */}
              <div>
                {(showMintNft == true && checkMintNft == false) && (
                  <>
                  <p className="text-white text-center text-[50px]" style={{"fontFamily":"Gill sans"}}>&nbsp; &nbsp; 1.&nbsp; Mint your own NFT.</p>
                  <div className="m-3"></div>
                    <MintNFT
                    setCheckMintNft={setCheckMintNft}
                    nftAddress={""}
                    setTokenId={setTokenId}
                    setTokenAddress={setTokenAddress}
                    setShowNextStep={setShowAddMember}
                  ></MintNFT>
                  </>
                )}
              </div>
              <div className="text-20px text-blue-300 text-center">
                    Your Token Id of Member NFT is [ {tokenId} ]
              </div>
              <div className="p-5"></div>
              {/* <tr className="text-30px">
                <td className="text-center">
                  <button
                    className="m-2 text-white hover:text-orange-200"
                    onClick={() => setShowAddMember(true)}
                  >
                    &nbsp; &nbsp; 2.&nbsp; Add You 2 Member.
                  </button>
                </td>
                {checkAddMember == true && (
                  <td>
                    <p className="px-5 text-blue-500">Finished</p>
                  </td>
                )}
                {checkAddMember == false && (
                  <td>
                    <p className="px-5 text-red-500">Yet</p>
                  </td>
                )}
              </tr> */}
              <div>
                {(checkMintNft==true && showAddMember == true && checkAddMember == false) && (
                  <>
                    <p className="text-white text-center text-[50px]" style={{"fontFamily":"Gill sans"}}>&nbsp; &nbsp; 2.&nbsp; Add You 2 Member.</p>
                    <div className="p-5"></div>
                    <AddMemberForDao setCheckAddMember={setCheckAddMember} tokenAddress={tokenAddress}></AddMemberForDao>
                  </>
                )}
              </div>
              <div>
              {checkAddMember == true && (
                <div className="bg-clip-text text-transparent text-center bg-gradient-to-r from-yellow-300 to-red-500 flex flex-col" style={{"fontFamily":"Gill sans"}}>
                <td className="text-100px">
                congratulations!
               </td>
               <td className="text-50px">
                You are approved to the DAO!
                </td>
                <td className="text-50px">
                Please press "Back to Top" to go back home.
                </td>
                </div>
              )}
            </div>
            </table>
          </div>
        </div>
            
          </table>

        </AppShell>

      </>
    );
  
};

export default Join;
