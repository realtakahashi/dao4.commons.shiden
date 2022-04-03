import {ethers} from 'ethers'

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
  if (typeof window.ethereum === 'undefined' || !callOption.contractAddress) {
    throw new Error("Ethereum is not defined")
  }
  if (callOption.contractAddress === "") {
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

