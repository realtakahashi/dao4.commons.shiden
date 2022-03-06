import type { InferGetStaticPropsType, NextPage } from 'next'
import { Layout } from '@/components/common'
import Link from "next/link"
import { ReactElement } from 'react';
import { FC } from 'react';

const CreateDAO = () => {
  return (
    <>
      <Link href="/">
        <a className="button-dao-default p-4 m-10">
          Back to Top
        </a>
      </Link>
    </>
  )
}

CreateDAO.Layout = Layout
export default CreateDAO
