import { SubDAODeployFormData } from "../../../dao4.frontend.common/types/SubDaoType"
import AddFirstMember from "@/components/AddFirstMember";
import DeployDAO from "@/components/DeployDAO";
import DeployNFT from "@/components/DeployNFT";
import MintNFT from "@/components/MintNFT";
import RegisterToMasterDao from "@/components/RegisterToMasterDao";
import Link from "next/link";
import { useState } from "react";
import { DfCHeader } from "../../../components/DfCHeader";
import { DfCFooter } from "../../../components/DfCFooter";
import { BackTopButton } from "@/components/BackTopButton";

import { AppShell, Navbar, Group} from '@mantine/core';


const CreateDAO = () => {
  const [showDeployNft, setShowDeployNft] = useState(true);
  const [showMintNft, setShowMintNft] = useState(false);
  const [showDeployDao, setShowDeployDao] = useState(false);
  const [showRegisterDao, setShowRegisterDao] = useState(false);
  const [showAddFirstMember, setShowAddFirstMember] = useState(false);

  const [checkDeployNft, setCheckDeployNft] = useState(false);
  const [checkMintNft, setCheckMintNft] = useState(false);
  const [checkDeployDao, setCheckDeployDao] = useState(false);
  const [checkRegisterDAO, setCheckRegisterDAO] = useState(false);
  const [checkAddFirstMember, setCheckAddFirstMember] = useState(false);
  
  const [nftAddress, setNftAddress] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [daoValue, setDaoValue] = useState<SubDAODeployFormData>({
    name: "",
    githubUrl: "",
    memberNFTAddress: "",
    ownerName: "",
    description: "",
  });

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
        TO Create Your DAO
        </td>
        <tr className="text-30px">
              {checkDeployNft == false && (
                <td className="text-center">
                  <p className="text-orange-200">&nbsp; &nbsp; 1.&nbsp; Deploy NFT as your DAO membership card.</p>
                </td>
              )}
              {checkDeployNft == true && (
                <td className="text-center">
                  <p className="text-white">&nbsp; &nbsp; 1.&nbsp; Deploy NFT as your DAO membership card.</p>
                </td>
              )}
              {checkDeployNft == true && (
                <td>
                  <p className="px-5 text-blue-500">Finished</p>
                </td>
              )}
              {checkDeployNft == false && (
                <td>
                  <p className="px-5 text-red-500">Yet</p>
                </td>
              )}
          </tr>
        
      <tr className="text-30px">
              {showMintNft == true && checkMintNft == false && (
                <td className="text-center">
                  <p className="text-orange-300">&nbsp; &nbsp; 2.&nbsp; Mint your own NFT.</p>
                </td>
              )}
              {((showMintNft == false && checkMintNft == false ) || checkMintNft == true) && (
                <td className="text-center">
                  <p className="text-white">&nbsp; &nbsp; 2.&nbsp; Mint your own NFT.</p>
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
              {showDeployDao == true && checkDeployDao == false && (
                <td className="text-center">
                  <p className="text-orange-400">&nbsp; &nbsp; 3.&nbsp; Deploy your DAO.</p>
                </td>
              )}
              {((showDeployDao == false && checkDeployDao == false ) || checkDeployDao == true) && (
                <td className="text-center">
                  <p className="text-white">&nbsp; &nbsp; 3.&nbsp; Deploy your DAO.</p>
                </td>
              )}
              {checkDeployDao == true && (
                <td>
                  <p className="px-5 text-blue-500">Finished</p>
                </td>
              )}
              {checkDeployDao == false && (
                <td>
                  <p className="px-5 text-red-500">Yet</p>
                </td>
              )}
            </tr>

      <tr className="text-30px">
              {showRegisterDao == true && checkRegisterDAO == false && (
                <td className="text-center">
                  <p className="text-orange-500">4.&nbsp; Register your DAO with MasterDAO.</p>
                </td>
              )}
              {((showRegisterDao == false && checkRegisterDAO == false ) || checkRegisterDAO == true) && (
                <td className="text-center">
                  <p className="text-white">4.&nbsp; Register your DAO with MasterDAO.</p>
                </td>
              )}
              {checkRegisterDAO == true && (
                <td>
                  <p className="px-5 text-blue-500">Finished</p>
                </td>
              )}
              {checkRegisterDAO == false && (
                <td>
                  <p className="px-5 text-red-500">Yet</p>
                </td>
              )}
            </tr>

      <tr className="text-30px">
              {showAddFirstMember == true && checkAddFirstMember == false && (
                <td className="text-center">
                  <p className="text-orange-500">&nbsp; &nbsp; 5.&nbsp; Register you to the DAO as the owner.</p>
                </td>
              )}
              {((showAddFirstMember == false && checkAddFirstMember == false ) || checkAddFirstMember == true) && (
                <td className="text-center">
                  <p className="text-white">&nbsp; &nbsp; 5.&nbsp; Register you to the DAO as the owner.</p>
                </td>
              )}
              {checkAddFirstMember == true && (
                <td>
                  <p className="px-5 text-blue-500">Finished</p>
                </td>
              )}
              {checkAddFirstMember == false && (
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
            <div>
              {(showDeployNft == true || (showDeployNft == false && checkDeployNft == false)) && (
                <>
                <p className="text-white text-center text-[50px]" style={{"fontFamily":"Gill sans"}}>&nbsp; &nbsp; 1.&nbsp; Deploy NFT as your DAO membership card.</p>
                  <div className="m-3"></div>
                  <DeployNFT
                    setCheckDeployNft={setCheckDeployNft}
                    setNftAddress={setNftAddress}
                    setShowDeployNft={setShowDeployNft}
                    setShowMintNft={setShowMintNft}
                  ></DeployNFT>
                </>
              )}
            </div>
            
            <div>
              {(checkDeployNft == true && showMintNft == true && checkMintNft == false) && (
                <>
                <p className="text-white text-center text-[50px]" style={{"fontFamily":"Gill sans"}}>&nbsp; &nbsp; 2.&nbsp; Mint your own NFT.</p>
                <MintNFT
                  setCheckMintNft={setCheckMintNft}
                  nftAddress={nftAddress}
                  setTokenId={setTokenId}
                  setTokenAddress={setTokenAddress}
                  setShowNextStep={setShowDeployDao}
                ></MintNFT>
                </>
              )}
            </div>
            
            <div>
              {(checkMintNft == true && showDeployDao == true && checkDeployDao == false) && (
                <>
                <p className="text-white text-center text-[50px]" style={{"fontFamily":"Gill sans"}}>&nbsp; &nbsp; 3.&nbsp; Deploy your DAO.</p>
                <DeployDAO
                  setCheckDeployDao={setCheckDeployDao}
                  memberNFTAddress={nftAddress}
                  setDaoAddress={setDaoAddress}
                  setDaoValue={setDaoValue}
                  setShowRegisterDao={setShowRegisterDao}
                ></DeployDAO>
                </>   
              )}
            </div>
            
            <div>
              {(checkDeployDao == true && showRegisterDao == true && checkRegisterDAO == false) && (
                <>
                <p className="text-white text-center text-[50px]" style={{"fontFamily":"Gill sans"}}>4.&nbsp; Register your DAO with MasterDAO.</p>
                <RegisterToMasterDao
                  setCheckRegisterDAO={setCheckRegisterDAO}
                  dataToBeRegisterd={daoValue}
                  subDaoAddress={daoAddress}
                  setShowAddFirstMember={setShowAddFirstMember}
                ></RegisterToMasterDao>
                </>
              )}
            </div>
            
            <div>
              {(checkRegisterDAO == true && showAddFirstMember == true && checkAddFirstMember == false) && (
                <>
                <p className="text-white text-center text-[50px]" style={{"fontFamily":"Gill sans"}}>&nbsp; &nbsp; 5.&nbsp; Register you to the DAO as the owner.</p>
                <AddFirstMember
                setCheckAddFirstMember={setCheckAddFirstMember}
                subDaoAddress={daoAddress}
                tokenId={tokenId}
                ></AddFirstMember>
                </>     
              )}
            </div>
            <div>
              {checkAddFirstMember == true && (
                <div className="bg-clip-text text-transparent text-center bg-gradient-to-r from-yellow-300 to-red-500 flex flex-col" style={{"fontFamily":"Gill sans"}}>
                <td className="text-100px">
                congratulations!
               </td>
               <td className="text-50px">
                You've successfully created DAO!
                </td>
                <td className="text-50px">
                Please press "Back to Top" to see Your DAO!
                </td>
                </div>
              )}
            </div>
              {checkAddFirstMember!==false
                }
            <div className="">
              <p className="m-5 text-center text-orange-400 text-20px">Your NFT Address is : {nftAddress}</p>
              <p className="m-5 text-center text-orange-400 text-20px">Your DAO Address is : {daoAddress}</p>
            </div>
          </table>
        </AppShell>
    </>
  )
};

export default CreateDAO;

