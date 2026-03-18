//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Rotas } from '../src/Rotas'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { AppContextProvider, } from './components/AppContext'
import { Layout } from './components/Layout'
import { UserContextProvider } from './components/UserContext'

function App() {


  return (
    <>

      <BrowserRouter >
        <ChakraProvider value={defaultSystem} >
          <UserContextProvider>
            <AppContextProvider>
              <Layout>
                <Rotas />
              </Layout>
            </AppContextProvider>
          </UserContextProvider>
        </ChakraProvider>
      </BrowserRouter>


    </>
  )
}

export default App
