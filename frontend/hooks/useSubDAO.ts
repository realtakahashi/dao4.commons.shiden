import { useEffect, useState } from "react"
import { SubDAOData } from "@/types/SubDAO"
import { listSubDAO } from "@/contracts/SubDAO"

export const useSubDAOList = () => {
  const [subDAOList, setSubDAOList] = useState<Array<SubDAOData>>()
  useEffect(() => {
    const getSubSubDAOList = async () => {
      const response = await listSubDAO()
      if (response.errors) {
      setSubDAOList(response.result)
      }
      setSubDAOList([])
    }
    getSubSubDAOList()
  }, [])
  return subDAOList
}

export const useSubDAOData = (subDAOaddress: string) => {
  const [targetSubDAO, setTargetSubDAO] = useState<SubDAOData>()
  useEffect(() => {
    const setAddress = async () => {
      const subDAOList = await listSubDAO()  
      if (typeof subDAOList.result !== 'undefined') {
        const target = subDAOList.result.find(
          (list) => list.daoAddress === subDAOaddress
        )
        if (typeof target !== 'undefined') {
          setTargetSubDAO(target)
        }
      }        
    }
    setAddress()
  }, [])

  return targetSubDAO
}
