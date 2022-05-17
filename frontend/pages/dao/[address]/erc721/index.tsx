import { Layout } from '@/components/common'
import { buyERC721Token, controlERC721TokenSale, withdrawERC721Token, getDAOERC721TokenList } from '@/contracts/daoErc721'
import { useSubDAOData } from '@/hooks'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DaoErc721 } from "@/types/Token"
const ListErc721Tokens = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const targetSubDAO = useSubDAOData(subDAOaddress)
  const [daoErc721TokenList, setDaoErc721TokenList] = useState<Array<DaoErc721>>([])
  const listTokens = async () => {
    const tokenList = await getDAOERC721TokenList(subDAOaddress)
    setDaoErc721TokenList(tokenList)
    console.log(tokenList)
  }
  useEffect(() => {
    listTokens()
  }, [])
  const changeDaoErc721TokenSaleStatus = async (tokenAddress: string, saleStatus: boolean) => {
    await controlERC721TokenSale(tokenAddress, saleStatus)
    listTokens()
  }

  const buy = async (price: number, tokenAddress: string) => {
    await buyERC721Token(price, tokenAddress)
  }

  const withdraw = async (tokenAddress: string) => {
    await withdrawERC721Token(tokenAddress)
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
            href={`/dao/${subDAOaddress}/erc721/add`}
          >
            <a
              className="button-dao-default px-4 py-2 m-2"
            >
              {
                typeof targetSubDAO !== "undefined" ?
                  (<p>
                    Add {targetSubDAO.daoName} ERC721 Token
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
              daoErc721TokenList.length > 0 ? (
                daoErc721TokenList.map((token) => {
                  return (
                    <tr
                      key={token.tokenAddress}
                      className="cursor-pointer px-6 py-2 border-b border-gray-7210 w-full rounded-t-lg"
                    >
                      <td className="border px-4 py-2">{token.name}</td>
                      <td className="border px-4 py-2">{token.symbol}</td>
                      <td className="border px-4 py-2">
                        {token.price}
                        {token.onSale ? (
                          <div>
                            <button className='button-dao-default'
                              onClick={() => buy(token.price, token.tokenAddress)}>
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
                          onClick={() => changeDaoErc721TokenSaleStatus(token.tokenAddress, !token.onSale)}>
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

ListErc721Tokens.Layout = Layout
export default ListErc721Tokens
