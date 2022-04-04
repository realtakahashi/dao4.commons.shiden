import { MemberInfo, MemberInfoPlus } from "../types/MemberManagerType";
import MemberManagerContractConstruct from "./construct/MemberManager";
import { Contract, ethers } from "ethers";

export const getMemberList = async (): Promise<Array<MemberInfoPlus>> => {
  const memberManagerAddress =
    process.env.NEXT_PUBLIC_MEMBER_MANAGER_CONTRACT_ADDRESS;
  const masterDaoAddress = process.env.NEXT_PUBLIC_MASTERDAO_CONTRACT_ADDRESS;
  const contractConstract = MemberManagerContractConstruct;
  //console.log("memberManager Address:",memberManagerAddress);

  let response: MemberInfo[] = [];
  let result: MemberInfoPlus[] = [];
  if (typeof window.ethereum !== "undefined" && memberManagerAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      memberManagerAddress,
      contractConstract.abi,
      signer
    );
    await contract
      .getMemberList(masterDaoAddress)
      .then((r: any) => {
        //console.log(r);
        response = r;
      })
      .catch((err: any) => {
        console.log(err);
        alert(err.data.message);
      });

    console.log("## result:", result);
    console.log("## response:", response);
    for (var i = 0; i < response.length; i++) {
      const isElectionCommition = await contract.isElectionComission(
        masterDaoAddress,
        response[i].eoaAddress
      );
      result.push({
        eoaAddress: response[i].eoaAddress,
        memberId: response[i].memberId,
        name: response[i].name,
        tokenId: response[i].tokenId,
        isElectionCommition: isElectionCommition,
      });
    }
  }

  return result;
};
