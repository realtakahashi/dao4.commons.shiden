import { Layout } from '@/components/common'
import Link from "next/link"


const Tokens = () => {
return (
  <>
    <p className="p-2 text-3xl">It's still unfinished now.</p>
    <div className="p-2"></div>
    <p className="p-2 text-xl">You can use this feature to deploy ERC20 and ERC721.</p>
    <p className="p-2 text-xl">You can sell those tokens.</p>
    <p className="p-2 text-xl">However, the sales revenue of those tokens can only be received by the DAO contract address.</p>
    <div className="p-5"></div>
    <Link href="/">
      <a className="underline text-3xl">
        Back to Top
      </a>
    </Link>
  </>
)
}

Tokens.Layout = Layout
export default Tokens
