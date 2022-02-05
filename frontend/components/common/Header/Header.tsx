import { FC, useEffect, useState } from "react"
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';


const Header:FC = () => {
  const [address, setAddress] = useState("");
  useEffect(() => {
    

    var web3: Web3;
    
    const enable = async () => {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider && window.ethereum?.isMetaMask) {
        console.log('Welcome to MetaMask User🎉');
        
        web3 = new Web3(Web3.givenProvider);
        web3.eth.defaultChain = "ropsten";
        
        const accounts = await web3.eth.requestAccounts();
        setAddress(accounts[0]);
      } else {
        console.log('Please Install MetaMask🙇‍♂️')
      }
    }
  
    enable();
  })

  
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Shiden DAO</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="/dao/create" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Create DAO
            </a>
          </div>
          <div>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">                          
              {address? address : "Connect"}
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Header
