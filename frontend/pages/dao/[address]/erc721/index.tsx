import { Layout } from '@/components/common'
import { deployDaoErc721, getDAOERC721TokenList } from '@/contracts/daoErc721'
import { useSubDAOData } from '@/hooks'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DaoErc20, DaoErc20DeployFormData } from "@/types/Token"
const ListErc721Tokens = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const targetSubDAO = useSubDAOData(subDAOaddress)
  const [daoErc20TokenList, setDaoErc20TokenList] = useState<Array<DaoErc20>>([])
  useEffect(() => {
    const listTokens = async () => {
      const tokenList = await getDAOERC721TokenList(subDAOaddress)
      setDaoErc20TokenList(tokenList)
      console.log(tokenList)
    }
    listTokens()
  }, [])
  const controlERC20TokenSale = (saleStatus: boolean) => {
    return
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
            href={`/dao/${subDAOaddress}/tokens/add`}
          >
            <a
              className="button-dao-default px-4 py-2 m-2"
            >
              {
                typeof targetSubDAO !== "undefined" ?
                  (<p>
                    Add {targetSubDAO.daoName} Token
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
              <th className="border px-4 py-2">Owned Amount</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              daoErc20TokenList.length > 0 ? (
                daoErc20TokenList.map((token) => {
                  return (
                    <tr
                      key={token.tokenAddress}
                      className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                    >
                      <td className="border px-4 py-2">{token.name}</td>
                      <td className="border px-4 py-2">{token.symbol}</td>
                      <td className="border px-4 py-2">{token.price}</td>
                      <td className="border px-4 py-2">{token.tokenAddress}</td>
                      <td className="border px-4 py-2">{token.totalBalance}</td>
                      <td className="border px-4 py-2">{token.salesAmount}</td>
                      <td className="border px-4 py-2">{token.onSale ? "Now on sale" : "Not on sale"}
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