import DeployNFT from "@/components/DeployNFT";
import MintNFT from "@/components/MintNFT";
import Link from "next/link";
import { useState } from "react";

const CreateDAO = () => {
  const [showDeployNft, setShowDeployNft] = useState(false);
  const [showMintNft, setShowMintNft] = useState(false);
  const [checkDeployNft, setCheckDeployNft] = useState(false);
  const [checkMintNft, setCheckMintNft] = useState(false);
  const [checkDeployDao, setCheckDeployDao] = useState(false);
  const [checkRegisterDAO, setCheckRegisterDAO] = useState(false);
  const [nftAddress,setNftAddress] = useState("");
  return (
    <>
      <div className="bg-black flex flex-col min-h-screen">
        <div className="m-5 text-25px text-left text-white underline leading-none tracking-tight">
          <Link href="/">Back to Top</Link>
        </div>
        <div className="text-50px text-center text-orange-200 leading-none tracking-tight">
          <p>You need the following steps to create a DAO. </p>
          <p>Click each step.</p>
        </div>
        <div className="m-3"></div>
        <div className="flex justify-center m-5 leading-none tracking-tight">
          <table>
            <tr className="text-30px">
              <td className="text-left">
                <button
                  className="m-2 text-white"
                  onClick={() => setShowDeployNft(true)}
                >
                  &nbsp; &nbsp; 1.&nbsp; Deploy NFT as your DAO membership card.
                </button>
              </td>
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
            <div>
              {showDeployNft == true && (
                <>
                  <div className="m-3"></div>
                  <DeployNFT setCheckDeployNft={setCheckDeployNft} setNftAddress={setNftAddress}></DeployNFT>
                </>
              )}
            </div>
            <tr className="text-30px">
              <td className="text-left">
                <button 
                  className="m-2 text-white "
                  onClick={()=>setShowMintNft(true)}
                >
                  &nbsp; &nbsp; 2.&nbsp; Mint your own NFT.
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
            </tr>
            <div>
              { showMintNft == true && (
                <MintNFT setCheckMintNft={setCheckMintNft} nftAddress={nftAddress} ></MintNFT>
              )
              }
            </div>
            <tr className="text-30px">
              <td>
                <p className="m-2 text-white">
                  &nbsp; &nbsp; 3.&nbsp; Deploy your DAO.
                </p>
              </td>
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
              <td>
                <p className="m-2 text-white">
                  &nbsp; &nbsp; 4.&nbsp; Register your DAO with MasterDAO.
                </p>
              </td>
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
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateDAO;

// import type { InferGetStaticPropsType, NextPage } from "next";
// import { Layout } from "@/components/common";
// import Link from "next/link";

// const topLinks = [
//   { path: "/dao/create/member_nft", label: "Deploy MemberNFT" },
//   { path: "/dao/create/subdao", label: "Deploy SubDAO" },
//   { path: '/dao/create/CheckMintedNFT', label: "Check MemberNFT Address" },
// ];

// const CreateDAO = () => {
//   return (
//     <>
//       {topLinks.map((link) => {
//         return (
//           <div
//             key={link.path}
//           >
//             <a
//               className="button-dao-default block p-4 m-3"
//               href={link.path}

//             >
//               {link.label}
//             </a>
//           </div>
//         );
//       })}

//     </>
//   );
// };

// CreateDAO.Layout = Layout;
// export default CreateDAO;
