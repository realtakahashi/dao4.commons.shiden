import { FC } from "react"
import Link from 'next/link';

const HeaderNav: FC = () => {
  return (
    <>
      <div className="text-sm lg:flex-grow">
        <Link href="/">
          <a
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Top
          </a>
        </Link>

      </div>
    </>
  )
}

export default HeaderNav