import { Layout } from '@/components/common'
import { buyERC20Token, controlERC20TokenSale, withdrawERC20Token, getDAOERC20TokenList, mintERC20Token } from '@/contracts/daoErc20'
import { useSubDAOData } from '@/hooks'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DaoErc20 } from "@/types/Token"
const ListErc20Tokens = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const targetSubDAO = useSubDAOData(subDAOaddress)
  const [daoErc20TokenList, setDaoErc20TokenList] = useState<Array<DaoErc20>>([])
  const [inputAmount, setInputAmounts] = useState<{ key: string, amount: string }>({ key: "", amount: "0" })
  const listTokens = async () => {
    const tokenList = await getDAOERC20TokenList(subDAOaddress)
    setDaoErc20TokenList(tokenList)
  }
  useEffect(() => {
    listTokens()
  }, [])
  const changeDaoErc20TokenSaleStatus = async (tokenAddress: string, saleStatus: boolean) => {
    await controlERC20TokenSale(tokenAddress, saleStatus)
    listTokens()
  }

  const onClickBuyButton = async (tokenAddress: string) => {
    if (inputAmount.key === tokenAddress) {
      await buyERC20Token(Number(inputAmount.amount), tokenAddress)
    }
  }

  const withdraw = async (tokenAddress: string) => {
    await withdrawERC20Token(tokenAddress)
  }

  return (
    <>
      <div>
        <div className="flex justify-center">
          {
            typeof targetSubDAO !== "undefined" ?
              (<h2>
                DAO: {targetSubDAO.daoName}
              </h2>) : ''
          }
        </div>


        <div className="m-5 text-center">
          <Link
            href={`/dao/${subDAOaddress}/erc20/add`}
          >
            <a
              className="button-dao-default px-4 py-2 m-2"
            >
              {
                typeof targetSubDAO !== "undefined" ?
                  (<p>
                    Add {targetSubDAO.daoName} ERC20 Token
                  </p>)
                  : ''
              }

            </a>
          </Link>
        </div>

        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Token Name</th>
              <th className="border px-4 py-2">Symbol</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Token Address</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Sales Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Withdraw</th>
            </tr>
          </thead>
          <tbody>
            {
              daoErc20TokenList.length > 0 ? (
                daoErc20TokenList.map((token) => {
                  return (
                    <tr
                      key={token.tokenAddress}
                      className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                    >
                      <td className="border px-4 py-2">{token.name}</td>
                      <td className="border px-4 py-2">{token.symbol}</td>
                      <td className="border px-4 py-2">
                        {token.price}
                        {token.onSale ? (
                          <div>
                            <input type="number" className='text-black'
                              onChange={(event) => setInputAmounts({ key: token.tokenAddress, amount: event.target.value })}
                            />
                            <button className='button-dao-default'
                              onClick={() => onClickBuyButton(token.tokenAddress)}>
                              Buy
                            </button>
                          </div>
                        ) : ""}
                      </td>
                      <td className="border px-4 py-2">{token.tokenAddress}</td>
                      <td className="border px-4 py-2">{token.totalBalance}</td>
                      <td className="border px-4 py-2">{token.salesAmount}</td>
                      <td className="border px-4 py-2">
                        {token.onSale ? "On sale" : "Not on sale"}
                        <button className='button-dao-default p-1'
                          onClick={() => changeDaoErc20TokenSaleStatus(token.tokenAddress, !token.onSale)}>
                          Change Status
                        </button>
                      </td>
                      <td>
                        <button className='button-dao-default p-1'
                          onClick={() => withdraw(token.tokenAddress)}>
                          Withdraw
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : ""
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

ListErc20Tokens.Layout = Layout
export default ListErc20Tokens
