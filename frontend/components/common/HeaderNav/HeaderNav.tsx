import { FC } from "react"
import Link from 'next/link';

const HeaderNav: FC = () => {
  return (
    <>
      <div className="text-sm lg:flex-grow">
        <Link href="/dao/login">
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Login DAO
          </a>
        </Link>
      </div>
      <div className="text-sm lg:flex-grow">
        <Link href="/dao/create">
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Create DAO
          </a>
        </Link>

      </div>
      <div className="text-sm lg:flex-grow">
        <Link href="/marketplace">
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            MarketPlace
          </a>
        </Link>
      </div>
    </>
  )
}

export default HeaderNav