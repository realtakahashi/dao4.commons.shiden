import { FC } from "react"
import Link from 'next/link';

const HeaderNav: FC = () => {
  return (
    <>
      <div className="text-sm lg:flex-grow">
        <Link href="/landing">
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Welcome
          </a>
        </Link>

      </div>
    </>
  )
}

export default HeaderNav