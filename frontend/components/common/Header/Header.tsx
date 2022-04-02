import React, { FC, ReactElement, useEffect, useState } from "react"
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import cn from "classnames"
import HeaderNav from '../HeaderNav/HeaderNav';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
      const chainId = await web3.eth.getChainId()
      const accounts = await web3.eth.requestAccounts();
      setAddress(accounts[0]);
      setWalletConnected(true)
      if (chainId !== 81 && chainId !== 31337) {
        alert("Network wrong, use shibuya network.")
      }      
    } else {
      setWalletConnected(false)
      console.log("failed to connect")
      alert("Failed to Connect Metamask")
    }
  }

  const ConnectButton: FC = (): ReactElement => {
    const router = useRouter();
    router.events?.on('routeChangeStart', () => {
      setheaderMenuOpen(false)
    });
    let button: ReactElement = <></>
    if (address !== "") {
      <>
        <div>{address}</div>
      </>
    }
    return button
  }


  useEffect(() => {
    connectWallet()
  }, [])

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-black p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="text-xl tracking-tight">
            <Link href="/">
              Shiden DAO
            </Link>
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-white border-white-400 hover:text-white hover:border-white"
            onClick={onClickHeaderIcon}
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div className={headerMenuClassName}>
          <HeaderNav />
          <div>
            if (address !== "") {
              <>                
                <span className="text-white">{address}</span>                
              </>
            }
          </div>
        </div>
      </nav>
    </>
  )
}
export default Header
