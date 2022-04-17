import { useState } from "react";
import { getMemberNFTAddress , listSubDAO} from "@/contracts/SubDAO";
import { useRouter } from "next/router";
import { Layout } from "@/components/common";
import { useEffect } from "react";
import { SubDAOData } from "@/types/SubDAO";

const CheckMintedNFT = () => {
  const [memberNFTAddress, setMemberNFTAddress] = useState("");
  const [subDaoList, setSubDaoList] = useState<Array<SubDAOData>>();
  const [subDAOaddress,setSubDAOAddress] = useState("")

  useEffect(() => {
    const getSubDaoList = async () => {
      console.log("## getSubDaoList call 1");
      const result = await listSubDAO().then(res => res.result);
      setSubDaoList(result);
    };

    getSubDaoList();
  }, []);

  const _getMemberNFTAddress = async () => {
      console.log("## _getMemberNFTAddress")
      console.log("## subDAOaddress:",subDAOaddress)
    const result = await getMemberNFTAddress(subDAOaddress);
    setMemberNFTAddress(result);
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubDAOAddress(event.target.value);
  };


  return (
    <>
        <h1 className="p-10 text-xl">Check Member NFT Address that you belong...</h1>
        <select
            className="text-black"
            onChange={onChangeSelect}
            name="subDaoSelect"
          >
            <option value="">Please Choose </option>
            {
              typeof subDaoList!=="undefined" && subDaoList.length > 0 ?
              subDaoList.map((item) => {
                  return (
                    <option
                        key={item.daoAddress}
                        value={item.daoAddress}
                    >
                        {item.daoName}
                    </option>
                  )
                })
                : ("")
            }
          </select>
          <div className="p-5"></div>
        <button
          className="button-dao-default p-2 m-5"
          onClick={_getMemberNFTAddress}
        >
          Check Member NFT Address
        </button>
        <div className="p-5"></div>
        <label>Your Member NFT Address is : {memberNFTAddress}</label>
    </>
  );
};

CheckMintedNFT.Layout = Layout;
export default CheckMintedNFT;
