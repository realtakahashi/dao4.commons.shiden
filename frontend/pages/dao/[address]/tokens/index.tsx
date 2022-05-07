import { Layout } from '@/components/common'
import { useSubDAOData } from '@/hooks'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Tokens = () => {
  const router = useRouter()
  const subDAOaddress = router.query.address as string
  const targetSubDAO = useSubDAOData(subDAOaddress)
  useEffect(() => {
    const getTokenList = async (): TokenList => {

    }
  }, [])


  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Token Name</th>
            <th className="border px-4 py-2">Symbol</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Mintable Amount</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="cursor-pointer px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
          >
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">

            </td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

Tokens.Layout = Layout
export default Tokens
