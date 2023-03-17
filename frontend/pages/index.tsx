import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { useEffect } from "react";
import Link from "next/link";
import ListOfSubDAO from "../components/ListOfSubDAO";
import { DfCHeader } from "../components/DfCHeader";
import { DfCFooter } from "../components/DfCFooter";

const Home = () => {
  const connectWallet = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider && window.ethereum?.isMetaMask) {
      const web3 = new Web3(Web3.givenProvider);
      web3.eth.defaultChain = "kovan";
      const accounts = await web3.eth.requestAccounts();
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <div className="bg-black flex flex-col min-w-fit">
      <DfCHeader />
      <main className="min-h-[85vh]">
        <div className="text-center text-100px font-extrabold leading-none tracking-tight">
          <div className="p-3"></div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-red-500" style={{"fontFamily":"Gill sans"}}>
            Enpower Your Activities by DAO
          </span>
        </div>
        <div className="p-1 text-center text-25px">
          <button className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500">
            <Link href="dao/create/">Create Your DAO</Link>
          </button>
          <button className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500">
            <Link href="dao/join/">Join to the DAO</Link>
          </button>
          <button className="m-5 px-7 py-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500">
            <Link href="dao/burn/">Burn Member NFT</Link>
          </button>
        </div>
        <ListOfSubDAO/>
      </main>
      <DfCFooter/>
      </div>

    </>
  );
};
export default Home;
