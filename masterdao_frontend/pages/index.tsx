import { NextPage } from "next";
import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { useEffect } from "react";
import { ethers } from "ethers";
import Member from "../dao4.frontend.common/components/Member";
import Proposal from "../dao4.frontend.common/components/Proposal";
import SubDaoList from "../components/SubDaoList";
import Donate from "../dao4.frontend.common/components/Donate";
import DaoBalance from "../dao4.frontend.common/components/DaoBalance";
import { TargetDaoKind } from "../dao4.frontend.common/types/MasterDaoType";

const Home: NextPage = () => {
  const [showSubDaoList, setShowSubDaoList] = useState(false);
  const [showMemberList, setShowMemberList] = useState(false);
  const [showProposalList, setShowProposalList] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [address, setAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  const MasterDaoAddress =
    process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS ?? "";

  useEffect(() => {
    const connectWallet = async () => {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider && window.ethereum?.isMetaMask) {
        const web3 = new Web3(Web3.givenProvider);
        web3.eth.defaultChain = "kovan";
        const accounts = await web3.eth.requestAccounts();
        setAddress(accounts[0]);
        setWalletConnected(true);
        // console.log("connected")
      } else {
        setWalletConnected(false);
        console.log("failed to connect");
      }
    };

    connectWallet();
  }, []);

  const setShow = (
    _showSubDao: boolean,
    _showMember: boolean,
    _showPropsal: boolean,
    _showDonate: boolean
  ) => {
    console.log("### showSubDao:", _showSubDao);
    setShowSubDaoList(_showSubDao);
    setShowMemberList(_showMember);
    setShowProposalList(_showPropsal);
    setShowDonate(_showDonate);
  };

  return (
    <>
      <div className="bg-black flex flex-col min-h-screen">
        <div className="text-center text-150px font-extrabold leading-none tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Master DAO
          </span>
        </div>
        <div className="p-4 text-center">
          <DaoBalance isMasterDao={true} daoAddress={""}></DaoBalance>
        </div>
        <div className="p-1 text-center text-25px">
          <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-green-500"
            onClick={() => setShow(!showSubDaoList, false, false, false)}
          >
            Sub DAOs
          </button>
          <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-green-500"
            onClick={() => setShow(false, !showMemberList, false, false)}
          >
            Members
          </button>
          <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-green-500"
            onClick={() => setShow(false, false, !showProposalList, false)}
          >
            Proposals
          </button>
          <button
            className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-green-500"
            onClick={() => setShow(false, false, false, !showDonate)}
          >
            Donate
          </button>
        </div>
        {showSubDaoList == true && (
          <div>
            <SubDaoList></SubDaoList>
          </div>
        )}
        {showMemberList == true && (
          <div>
            <Member daoAddress={MasterDaoAddress}></Member>
          </div>
        )}
        {showProposalList == true && (
          <div>
            <Proposal daoAddress={MasterDaoAddress}></Proposal>
          </div>
        )}
        {showDonate == true && (
          <div>
            <Donate
              daoAddress={String(MasterDaoAddress)}
              daoName={"Master DAO"}
              targetDaoKind={TargetDaoKind.MASTER_DAO}
            ></Donate>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

// import type { NextPage } from "next";
// import { useState, useEffect } from "react";
// import { listSubDAO, changeDaoReward, doDonateSelectedDao,doDonateMasterDao } from "../contracts/MasterDaoApi";
// import { SubDAOData, ApproveDaoData, DonateInfo } from "../types/MasterDaoType";

// interface DaoDonateMasterDaoModalPropos {
//   show: boolean;
//   setShow: (flg: boolean) => void;
// }

// function DaoDonateMasterDaoModal(props: DaoDonateMasterDaoModalPropos) {
//   const [formValue, setFormValue] = useState<DonateInfo>({
//     amount: 0,
//     relatedProposalId:0,
//   });

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue({
//       ...formValue,
//       [event.target.name]: event.target.value,
//     });
//     // console.log(formValue)
//   };

//   const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
//     console.log("#### Submit 1");
//     event.preventDefault();
//     await doDonateMasterDao(formValue);
//     props.setShow(false);
//   };

//   if (props.show) {
//     return (
//       <div id="overlay">
//         <div id="content">
//           <div className="flex justify-center">
//             <form className="" onSubmit={onSubmitForm}>
//               <h1 className="text-3xl">Donate 2 Selected DAO</h1>
//               <div className="p-3"></div>
//               <table className="table-auto">
//                 <thead></thead>
//                 <tbody>
//                   <tr>
//                     <th className="border px-4 py-2">Name</th>
//                     <td className="border px-4 py-2">
//                       Master Dao
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Amount</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="amount"
//                         type="text"
//                         onChange={onChangeInput}
//                       ></input>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="flex items-center justify-end mt-4">
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100
//                     active:bg-gray-200 disabled:opacity-50 mr-4"
//                   onClick={() => onSubmitForm}
//                 >
//                   Ok
//                 </button>
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100
//                     active:bg-gray-200 disabled:opacity-50"
//                   onClick={() => props.setShow(false)}
//                 >
//                   Chancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }

// interface DaoDonateModalPropos {
//   show: boolean;
//   setShow: (flg: boolean) => void;
//   selectDao: SubDAOData;
// }

// function DaoDonateModal(props: DaoDonateModalPropos) {
//   const [formValue, setFormValue] = useState<DonateInfo>({
//     amount: 0,
//     relatedProposalId: 0,
//   });

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue({
//       ...formValue,
//       [event.target.name]: event.target.value,
//     });
//     // console.log(formValue)
//   };

//   const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
//     console.log("#### Submit 1");
//     event.preventDefault();
//     await doDonateSelectedDao(formValue, props.selectDao);
//     props.setShow(false);
//   };

//   if (props.show) {
//     return (
//       <div id="overlay">
//         <div id="content">
//           <div className="flex justify-center">
//             <form className="" onSubmit={onSubmitForm}>
//               <h1 className="text-3xl">Donate 2 Selected DAO</h1>
//               <div className="p-3"></div>
//               <table className="table-auto">
//                 <thead></thead>
//                 <tbody>
//                   <tr>
//                     <th className="border px-4 py-2">Name</th>
//                     <td className="border px-4 py-2">
//                       {props.selectDao.daoName}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Address</th>
//                     <td className="border px-4 py-2">
//                       {props.selectDao.daoAddress}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Amount</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="amount"
//                         type="text"
//                         onChange={onChangeInput}
//                       ></input>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Related Proposal Id</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="relatedProposalId"
//                         type="text"
//                         onChange={onChangeInput}
//                       ></input>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="flex items-center justify-end mt-4">
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100
//                     active:bg-gray-200 disabled:opacity-50 mr-4"
//                   onClick={() => onSubmitForm}
//                 >
//                   Ok
//                 </button>
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100
//                     active:bg-gray-200 disabled:opacity-50"
//                   onClick={() => props.setShow(false)}
//                 >
//                   Chancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }

// interface DaoApproveModalPropos {
//   show: boolean;
//   setShow: (flg: boolean) => void;
//   selectDao: SubDAOData;
// }

// function DaoApproveModal(props: DaoApproveModalPropos) {
//   const [formValue, setFormValue] = useState<ApproveDaoData>({
//     relatedProposalId: 0,
//     doReward: false,
//   });

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue({
//       ...formValue,
//       [event.target.name]: event.target.value,
//     });
//     // console.log(formValue)
//   };
//   const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormValue({
//       ...formValue,
//       [event.target.name]: event.target.value,
//     });
//     // console.log(formValue)
//   };

//   const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
//     console.log("#### Submit 1");
//     event.preventDefault();
//     await changeDaoReward(formValue, props.selectDao);
//     props.setShow(false);
//   };

//   if (props.show) {
//     return (
//       <div id="overlay">
//         <div id="content">
//           <div className="flex justify-center">
//             <form className="" onSubmit={onSubmitForm}>
//               <h1 className="text-3xl">Change the reward</h1>
//               <div className="p-3"></div>
//               <table className="table-auto">
//                 <thead></thead>
//                 <tbody>
//                   <tr>
//                     <th className="border px-4 py-2">Name</th>
//                     <td className="border px-4 py-2">
//                       {props.selectDao.daoName}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Address</th>
//                     <td className="border px-4 py-2">
//                       {props.selectDao.daoAddress}
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Related Proposal Id</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="relatedProposalId"
//                         type="text"
//                         onChange={onChangeInput}
//                       ></input>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Reword?</th>
//                     <td className="border px-4 py-2">
//                       <select name="doReward" onChange={onChangeSelect}>
//                         <option value="0">No</option>
//                         <option value="1">Yes</option>
//                       </select>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="flex items-center justify-end mt-4">
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100
//                     active:bg-gray-200 disabled:opacity-50 mr-4"
//                   onClick={() => onSubmitForm}
//                 >
//                   Ok
//                 </button>
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100
//                     active:bg-gray-200 disabled:opacity-50"
//                   onClick={() => props.setShow(false)}
//                 >
//                   Chancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }

// const Home: NextPage = () => {
//   const [subDaoList, setSubDaoList] = useState<Array<SubDAOData>>();
//   const [selectDao, setSelectDao] = useState<SubDAOData>({
//     ownerAddress: "",
//     daoAddress: "",
//     daoName: "",
//     githubURL: "",
//     rewardApproved: false,
//   });
//   const [showDaoApproveModal, setShowDaoApproveModal] = useState(false);
//   const [showDonateModal, setShowDonateModal] = useState(false);
//   const [showDonateMasterDaoModal, setShowDonateMasterDaoModal] = useState(false);

//   useEffect(() => {
//     const getSubDaoList = async () => {
//       console.log("## getSubDaoList call 1");
//       const result = await listSubDAO();
//       setSubDaoList(result);
//     };

//     getSubDaoList();
//   }, []);

//   const _doDonate = () => {

//   }

//   return (
//     <>
//       <h1 className="flex justify-center  text-3xl p-3">Sub DAO List</h1>
//       <div className="flex justify-center">
//         <button
//           className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white
// 				      font-bold py-2 px-4 m-5 rounded"
//           type="button"
//           onClick={() => setShowDaoApproveModal(true)}
//         >
//           Approve Reward
//         </button>
//         <DaoApproveModal
//           show={showDaoApproveModal}
//           setShow={setShowDaoApproveModal}
//           selectDao={selectDao}
//         />
//         <button
//           className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white
// 				      font-bold py-2 px-4 m-5 rounded"
//           type="button"
//           onClick={() => setShowDonateModal(true)}
//         >
//           Donate 2 Selected DAO
//         </button>
//         <DaoDonateModal
//           show={showDonateModal}
//           setShow={setShowDonateModal}
//           selectDao={selectDao}
//         />
//         <button
//           className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white
// 				      font-bold py-2 px-4 m-5 rounded"
//           type="button"
//           onClick={() => setShowDonateMasterDaoModal(true)}
//         >
//           Donate 2 Master DAO
//         </button>
//         <DaoDonateMasterDaoModal
//           show={showDonateMasterDaoModal}
//           setShow={setShowDonateMasterDaoModal}
//         />
//       </div>
//       <div className="p-2 flex justify-center">
//         <table className="table-auto">
//           <thead>
//             <tr className="">
//               <th className="border px-4 py-2">DAO Name</th>
//               {/* <th className="border px-4 py-2">Owner Address</th> */}
//               <th className="border px-4 py-2">DAO Address</th>
//               <th className="border px-4 py-2">GithubURL</th>
//               <th className="border px-4 py-2">Reward Approved</th>
//             </tr>
//           </thead>
//           <tbody>
//             {typeof subDaoList !== "undefined"
//               ? subDaoList.map((subDao) => {
//                   return (
//                     <tr
//                       className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
//                       key={subDao.daoName}
//                       style={
//                         selectDao !== null &&
//                         subDao.daoName === selectDao.daoName
//                           ? { background: "#ffe4e1" }
//                           : {}
//                       }
//                       onClick={() => setSelectDao(subDao)}
//                     >
//                       <td className="border px-4 py-2">{subDao.daoName}</td>
//                       {/* <td className="border px-4 py-2">{subDao.ownerAddress}</td> */}
//                       <td className="border px-4 py-2">{subDao.daoAddress}</td>
//                       <td className="border px-4 py-2">{subDao.githubURL}</td>
//                       <td className="border px-4 py-2">
//                         {subDao.rewardApproved ? "Approved" : "Not Approved"}
//                       </td>
//                     </tr>
//                   );
//                 })
//               : ""}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Home;
