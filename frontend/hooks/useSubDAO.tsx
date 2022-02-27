import { useEffect, useState } from "react"
import { SubDAOData } from "@/types/SubDAO"
import { listSubDAO } from "@/contracts/SubDAO"

export const useSubDAOList = () => {
  const [subDAOList, setSubDAOList] = useState<Array<SubDAOData>>()
  useEffect(() => {
    const getSubSubDAOList = async () => {
      const response = await listSubDAO()
      setSubDAOList(
        response
      )
    }
    getSubSubDAOList()
  }, [])
  return subDAOList
}

export const useSubDAOData = (subDAOaddress: string) => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  useEffect(() => {
    console.log("test")
    const setAddress = async () => {
      const subDAOList = await listSubDAO()
      console.log(subDAOList, subDAOaddress)
      const target = subDAOList?.find(subDAOList => subDAOList.daoAddress === subDAOaddress)
      console.log(target)
      if (typeof target !== "undefined") {
        setTargetSubDAO(target)
        console.log(target)
      }
    }

    setAddress()

  }, [])

  return targetSubDAO
}
