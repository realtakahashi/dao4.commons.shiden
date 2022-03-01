import React, { FC, ReactElement, useEffect, useState } from "react"
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import cn from "classnames"
import HeaderNav from '../HeaderNav/HeaderNav';
import Link from 'next/link';

const Header: FC = () => {
  const [address, setAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false)
  const [headerMenuOpen, setheaderMenuOpen] = useState(false)

  const headerMenuClassName = cn(
    "w-full block flex-grow lg:flex lg:items-center lg:w-auto",
    { "hidden": !headerMenuOpen }
  )

  const onClickHeaderIcon = (): void => {
    setheaderMenuOpen(!headerMenuOpen)
  }
  const connectWallet = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider && window.ethereum?.isMetaMask) {
      const web3 = new Web3(Web3.givenProvider);
      web3.eth.defaultChain = "kovan";
      const accounts = await web3.eth.requestAccounts();
      setAddress(accounts[0]);
      setWalletConnected(true)
      console.log("connected")
    } else {
      setWalletConnected(false)
      console.log("failed to connect")
    }
  }

  const disconnectWallet = async () => {
    const web3 = new Web3(Web3.givenProvider)
    await web3.eth.clearSubscriptions
    setWalletConnected(false)
    setAddress("")
    console.log("disconnected")
  }


  const ConnectButton: FC = (): ReactElement => {
    const buttonClass = "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
    let button: ReactElement
    if (address === "") {
      button = <button className={buttonClass} onClick={connectWallet}>
        Connect
      </button>
    } else {
      button = <button className={buttonClass} onClick={disconnectWallet}>
        {address}
      </button>
    }
    return button
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-black p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <Link href="/landing">
              Shiden DAO
            </Link>
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={onClickHeaderIcon}
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div className={headerMenuClassName}>
          <HeaderNav />
          <div>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </>
  )
}
export default Header
