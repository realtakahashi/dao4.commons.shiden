import { Layout } from '@/components/common'
import Link from "next/link"


const TokenSale = () => {
return (
  <>
    <p className="p-2 text-3xl">It's still unfinished now.</p>
    <div className="p-2"></div>
    <p className="p-2 text-xl">You can buy tokens sold by various DAOs here.</p>
    <p className="p-2 text-xl">Token revenue is not sent directly to any particular EOA.</p>
    <p className="p-2 text-xl">Token revenue is once placed in SubDAO's Tresury </p>
    <p className="p-2 text-xl">and cannot be distributed to individuals without submitting and voting Proposal within SubDAO.</p>
    <div className="p-5"></div>
    <Link href="/">
      <a className="underline text-3xl">
        Back to Top
      </a>
    </Link>
  </>
)
}

TokenSale.Layout = Layout
export default TokenSale
