import type { InferGetStaticPropsType, NextPage } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"

export const getStaticProps = async () => {
  return { props: {} }
}


const loginDAO = (): void => {
  console.log("login succeeded")
  alert("login succeeded")
}

// mock
const topLinks = [
  { type: "link", path: '/dao/create', label: "Create DAO", action: null },
  { type: "button", path: "", label: "Login DAO", action: loginDAO },
  { type: "link", path: '/dao/signup', label: "Signup DAO", action: null },
]

// mock
const DAOList = [
  { title: "some title1" },
  { title: "some title2" },
  { title: "some title3" }
]
const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div>
        {
          topLinks.map((link) => {
            if (link.type === "button") {
              return (

                <button
                  className="m-2 py-2 px-4 border border-black-700 rounded"
                  onClick={loginDAO}
                >
                  {link.label}
                </button>
              )
            }
            return (
              <Link href={link.path} key={link.path}>
                <a
                  className="m-2 py-2 px-4 border border-black-700 rounded"
                >
                  {link.label}
                </a>
              </Link>
            )
          })
        }
      </div>
      <div className='mt-5'>
        <h2>Your DAO</h2>
        <div className="flex justify-center">
          <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
            {
              DAOList.map((dao) => {
                return (
                  <li
                    className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                    key={dao.title}
                  >
                    {dao.title}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </>

  )
}
Home.Layout = Layout
export default Home
