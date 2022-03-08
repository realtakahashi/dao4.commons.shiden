import Link from "next/link";
import { useState } from "react";
import { getBalance } from "../contracts/MasterDaoApi";
import { useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

function Header() {
  const [masterDaoBalance, setMasterDaoBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false)

  const connectWallet = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider && window.ethereum?.isMetaMask) {
      const web3 = new Web3(Web3.givenProvider);
      web3.eth.defaultChain = "kovan";
      const accounts = await web3.eth.requestAccounts();
      setAddress(accounts[0]);
      setWalletConnected(true)
      // console.log("connected")
    } else {
      setWalletConnected(false)
      console.log("failed to connect")
    }
  }

  useEffect(() => {
    connectWallet();
    const _getBalance = async () => {
      setMasterDaoBalance(await getBalance());
    };
    _getBalance();
  }, []);
  return (
    <>
      <nav className="flex justify-center flex-wrap bg-blue-900 p-4">
        <div className="w-1/5">
          <p className="flex justify-start text-blue-300 text-3xl">
            Master DAO
          </p>
        </div>
        <div className="w-4/5 flex justify-start p-1">
          <ul>
            <li>
              <Link href="/">
                <a className="m-5 text-white underline">Home</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/members">
                <a className="m-5 text-white underline">Members</a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/proposals">
                <a className="m-5 text-white underline">Proposals</a>
              </Link>
            </li>
          </ul>
          <p className="px-20 flex justify-end text-blue-100 ">
            Balance:{ethers.utils.formatEther(masterDaoBalance)} ETH
          </p>

        </div>
      </nav>
    </>
  );
}

export default Header;
