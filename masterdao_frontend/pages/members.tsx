// import Layout from "../components/Layout";
// import React, { useState, useEffect } from "react";
// import { MemberInfo, MemberFormData } from "../types/MasterDaoType";
// import {
//   addMember,
//   getMemberList,
//   deleteMember,
// } from "../contracts/MasterDaoApi";
// import { stringify } from "querystring";

// interface Modal1Props{
//   show:boolean
//   setShow:(flg:boolean)=>void
// }

// function Modal1( props:Modal1Props ) {
//   const [formValue, setFormValue] = useState<MemberFormData>({
//     name: "",
//     memberAddress: "",
//     proposalId: 0,
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
//     await addMember(formValue);
//     props.setShow(false);
//   };

//   if (props.show) {
//     return (
//       <div id="overlay">
//         <div id="content">
//           <div className="flex justify-center">
//             <form className="" onSubmit={onSubmitForm}>
//               <h1 className="text-3xl">Add the member</h1>
//               <div className="p-3"></div>
//               <table className="table-auto">
//                 <thead></thead>
//                 <tbody>
//                   <tr>
//                     <th className="border px-4 py-2">Name</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="name"
//                         type="text"
//                         onChange={onChangeInput}
//                       ></input>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Member EOA Address</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="memberAddress"
//                         type="text"
//                         onChange={onChangeInput}
//                       ></input>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Proposal Id</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="proposalId"
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

// interface Moddal2Propos {
//   show:boolean
//   setShow:(flg:boolean)=>void
//   selectData:MemberInfo
// }

// function Modal2(props:Moddal2Propos) {

//     const [_proposalId, _setProposalId] = useState("")
 
//     const onInputProposalId = (event: React.ChangeEvent<HTMLInputElement>): void => _setProposalId(event.target.value);
//   const doDeleteFunction = async () => {
//     console.log("#### delete Submit 1");
//     await deleteMember(props.selectData,Number(_proposalId));
//     props.setShow(false);
//   };

//   if (props.show && props.selectData!==null) {
//     return (
//       <div id="overlay">
//         <div id="content">
//           <div className="">
//               <h1 className="text-3xl">Delete the member</h1>
//               <div className="p-3"></div>
//               <table className="table-auto">
//                 <thead></thead>
//                 <tbody>
//                   <tr>
//                     <th className="border px-4 py-2">Name</th>
//                     <td className="border px-4 py-2">{props.selectData.name}</td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Member EOA Address</th>
//                     <td className="border px-4 py-2">{props.selectData.eoaAddress}</td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Member Id</th>
//                     <td className="border px-4 py-2">{String(props.selectData.memberId)}</td>
//                   </tr>
//                   <tr>
//                     <th className="border px-4 py-2">Proposal Id</th>
//                     <td className="border px-4 py-2">
//                       <input
//                         className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
//                         leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                         name="proposalId"
//                         type="text"
//                         onChange={onInputProposalId}
//                       ></input>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="flex items-center justify-end mt-4">
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 
//                       active:bg-gray-200 disabled:opacity-50 mr-4"
//                   onClick={doDeleteFunction}
//                 >
//                   Ok
//                 </button>
//                 <button
//                   className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 
//                       active:bg-gray-200 disabled:opacity-50"
//                   onClick={() => props.setShow(false)}
//                 >
//                   Chancel
//                 </button>
//               </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return null;
//   }
// }

const tmpMembers = () => {
  return(<div>test</div>);
//   const [dataList, setDataList] = useState<Array<MemberInfo>>();
//   const [showDialog1, setShowDialog1] = useState(false);
//   const [showDialog2, setShowDialog2] = useState(false);
//   const [selectData, setSelectData] = useState<MemberInfo>({name:"",eoaAddress:"", memberId:0});

//   useEffect(() => {
//     const getDataList = async () => {
//       const response = await getMemberList();
//       console.log("getDataList:", response);
//       setDataList(response);
//     };
//     getDataList();
//   }, []);

//   return (
//     <>
//       <div className="p-2 flex justify-center">
//         <h1 className="text-3xl">Member List</h1>
//       </div>
//       <div className="p-2 flex justify-center">
//         <button
//           className="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
// 				      font-bold px-4 m-5 rounded"
//           type="button"
//           onClick={() => setShowDialog1(true)}
//         >
//           Add a member
//         </button>
//         <Modal1 show={showDialog1} setShow={setShowDialog1} />

//         <button
//           className="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
// 				      font-bold py-2 px-4 m-5 rounded"
//           type="button"
//           onClick={() => setShowDialog2(true)}
//         >
//           Delete the member
//         </button>
//         <Modal2 show={showDialog2} setShow={setShowDialog2} selectData={selectData}/>
//       </div>
//       <div className="flex justify-center">
//         <table className="table-auto">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">EOA Address</th>
//               <th className="border px-4 py-2">Member Id</th>
//             </tr>
//           </thead>
//           <tbody>
//             {typeof dataList !== "undefined"
//               ? dataList.map((data) => {
//                   return (
//                     <tr
//                       className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
//                       key={data.name}
//                       style={
//                         selectData !== null && data.name === selectData.name
//                           ? { background: "#ffe4e1" }
//                           : {}
//                       }
//                       onClick={() => setSelectData(data)}
//                     >
//                       <td className="border px-4 py-2">{data.name}</td>
//                       <td className="border px-4 py-2">{data.eoaAddress}</td>
//                       <td className="border px-4 py-2">
//                         {String(data.memberId)}
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
};

// Members.Layout = Layout;
export default tmpMembers;
