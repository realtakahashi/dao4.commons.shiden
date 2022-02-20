import type { InferGetStaticPropsType, NextPage } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { listSubDAO } from '@/contracts/SubDAO'
import { useEffect, useState } from 'react';

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

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [DAOList, setDAOList] = useState([""])
  useEffect(() => {
    const getSubDAOList = async () => {
      const response = await listSubDAO()
      setDAOList(
        response
      )
    }
    getSubDAOList()
  }, [])

  return (
    <>
      <div>
        {

          topLinks.map((link) => {
            if (link.type === "button") {
              return (
                <button
                  key={link.label}
                  className="m-2 py-2 px-4 border border-black-700 rounded"
                  onClick={loginDAO}
                >
                  {link.label}
                </button>
              )
            }
            return (
              <Link
                href={link.path}
                key={link.path}>
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
              DAOList.map((daoAddress) => {
                return (
                  <li
                    className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                    key={daoAddress}
                  >
                    {daoAddress}
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
