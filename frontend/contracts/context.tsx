
import { createContext, FC, useContext } from 'react'

// TODO: reactive with connect button
export interface State { }

const WalletContext = createContext<State>({})

export const useSubDAO = () => {
  const context = useContext(WalletContext)
  return context
}

export const WalletProvider: FC = ({ children }) => {

  return (
    <WalletContext.Provider value={""}>
      {children}
    </WalletContext.Provider>
  )
}

