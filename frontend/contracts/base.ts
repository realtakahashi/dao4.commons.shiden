import {Contract, ethers} from 'ethers'

export interface ContractCallOption {
  contractAddress: string
  contractArtifact: ContractArtifact
  data?: {[key: string]: string | undefined}
}

export interface callContractResults<T> {
  result?: T
  errors?: any
}

export interface ContractArtifact {
  _format: string
  contractName: string
  sourceName: string
  abi: unknown
  bytecode: string
  deployedBytecode: string
  linkReferences: object
  deployedLinkReferences: object
}

export const callContract = async <R>(
  callOption: ContractCallOption
): Promise<callContractResults<R>> => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error("Ethereum is not defined")
  }
  if (!callOption.contractAddress) {
    throw new Error("Contract Address is not defined")
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(
    callOption.contractAddress,
    callOption.contractArtifact.abi as string,
    signer
  )
  const result:R = await contract.getDaoList().catch((errors: any) => {
    if (errors) {
      return {errors}
    }    
  })
  return {result}
}

export interface contractDeployOption {  
  contractArtifact: ContractArtifact
  data: string[]
}

export interface deployContractResults {
  result?: any
  errors?: any
}

export const deployContract = async <R>(
  deployOption: contractDeployOption,
): Promise<deployContractResults> => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error("Ethereum is not defined")
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const factory = new ethers.ContractFactory(
    deployOption.contractArtifact.abi as string,
    deployOption.contractArtifact.bytecode,
    signer
  )
  const result = await factory.deploy(...deployOption.data)
    .catch((errors: any) => {
      if (errors) {
      console.log(errors)
      return {errors}
    }    
    })
  console.log(result)
  return {result}
}

