import {ethers} from 'ethers'
import {
  SubDAOContractConstruct,
  MasterDAOContractConstruct,
} from '@/contracts/construct'

import {SubDAODeployFormData} from '@/types/SubDAO'

export const listSubDAO = async (): Promise<Array<string>> => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS
  const contractConstract = MasterDAOContractConstruct
  let response: string[] = []
  if (typeof window.ethereum !== 'undefined' && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    )
    await contract
      .getDaoList()
      .then((r: any) => {
        console.log(r)
        response = r
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to list SubDAO')
      })
  }
  return response
}

export const getSubDAO = async (address: string) => {
  const subDAOAddress = address
  const contractConstract = MasterDAOContractConstruct
  let response: string[] = []
  if (typeof window.ethereum !== 'undefined' && subDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      subDAOAddress,
      contractConstract.abi,
      signer
    )
    // await contract
    //   .getDaoList()
    //   .then((r: any) => {
    //     console.log(r)
    //     response = r
    //   })
    //   .catch((err: any) => {
    //     console.log(err)
    //     alert('failed to get SubDAO')
    //   })
    return contract
  }
  return
}

export const deploySubDAO = async (
  inputData: SubDAODeployFormData
): Promise<string> => {
  let subDAOContractAddess = ''
  const contractConstract = SubDAOContractConstruct
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const factory = new ethers.ContractFactory(
      contractConstract.abi,
      contractConstract.bytecode,
      signer
    )
    await factory
      .deploy(inputData.name, inputData.github_url, inputData.owner_url)
      .then((res: any) => {
        console.log(res)
        subDAOContractAddess = res.address
        registerSubDAO(subDAOContractAddess, inputData)
        alert('Succeeeded to deploy SubDAO')
      })
      .catch((err: any) => {
        console.log(err)
        alert('Failed to deploy SubDAO')
      })
  }
  return subDAOContractAddess
}

export const registerSubDAO = async (
  subDAOContractAddess: string,
  inputData: SubDAODeployFormData
) => {
  const masterDAOAddress = process.env.MASTERDAO_CONTRACT_ADDRESS
  const contractConstract = MasterDAOContractConstruct
  if (typeof window.ethereum !== 'undefined' && masterDAOAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      masterDAOAddress,
      contractConstract.abi,
      signer
    )
    await contract
      .registerDAO(subDAOContractAddess, inputData.name, inputData.github_url)
      .then((r: any) => {
        console.log(r)
        alert('Succeeded to connect SubDAO and MasterDAO')
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('failed to connect SubDAO and MasterDAO')
        return
      })
  }
  return
}
