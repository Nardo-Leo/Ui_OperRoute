 

import { createContext, useState } from "react"

export const AppContext = createContext({})


export const AppContextProvider = ({ children }) => {

  const [viagem, setViagem] = useState({
   
    rota: [1, 2]
  })


  const updateViagem = (newData) => {
    setViagem(prevViagem => ({
      ...prevViagem, // Mantém o que já existia (nome, fotos, etc)
      ...newData    // Sobrescreve apenas o que mudou (ex: rota)
    }));
  };

  return (
    <AppContext.Provider value={{ viagem, updateViagem }}>

      {children}

    </AppContext.Provider>
  )
}
