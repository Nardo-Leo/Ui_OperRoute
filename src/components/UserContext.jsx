

import { createContext, useState } from "react"

export const UserContext = createContext({})


export const UserContextProvider = ({ children }) => {

  const [isLogedin, setIsLogedin] = useState(() => {
    const savedAuth = localStorage.getItem('isAuth');
    return savedAuth === 'true'; // Retorna true se a string for 'true'
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || '';
  });


  const logout = () => {
    setIsLogedin(false);
    setUserName('');
    setUserRole('');
    localStorage.clear(); // Limpa o navegador de uma vez só
  };



  return (
    <UserContext.Provider value={
      { isLogedin, setIsLogedin, userName, setUserName, userRole, setUserRole, logout }
    }>
      {children}
    </UserContext.Provider>
  )
}
