import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getBalance } from "../contracts/MasterDaoApi";

const DaoBalance = () => {
  const [showBalance, setShowBalance] = useState(0);

  const _getBalance = async () => {
    let ret: number = await getBalance();
    console.log("### balance:", ret);
    if (typeof ret === "undefined") {
      ret = 0;
    }
    setShowBalance(ret);
  };

  useEffect(() => {
    _getBalance();
  });

  return (
    <label className="text-white text-50px">
      Balance: {ethers.utils.formatEther(showBalance)} SDN
    </label>
  );
};

export default DaoBalance;
