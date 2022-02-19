import {ethers} from 'ethers'
import {
  SubDAOContractConstruct,
  MasterDAOContractConstruct,
} from '@/contracts/construct'

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

export const deploySubDAO = async (inputData: any) => {
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
      .deploy('Name', 'Symbol', 'Gihub.com')
      .then((r: any) => {
        console.log(r)
        alert('デプロイに成功しました。')
      })
      .catch((err: any) => {
        console.log(err)
        alert('デプロイに失敗しました。')
      })
  }
  return
}

export const registerSubDAO = async () => {
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
      .registerDAO(
        '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        'MyDAO1',
        'https://github.com/keisukefunatsu'
      )
      .then((r: any) => {
        alert('register function called')
        return
      })
      .catch((err: any) => {
        console.log(err)
        alert('register function call failed')
        return
      })
  }
  return
}
