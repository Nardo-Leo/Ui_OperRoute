import { Navigate, Route, Routes } from 'react-router-dom'
import { Motorista } from './pages/Motorista'
import { Gestor } from './pages/Gestor'
import {Login} from './pages/Login'
import {AddUsuario} from './components/GestorComponentes/AddUsuario'


import { UserContext } from './components/UserContext'
import { useContext } from 'react'

export const Rotas = () => {


    const {isLogedin, userRole, userName} = useContext(UserContext)
    
 


    return (
        <>

   
            <Routes>
                
                <Route path='/' element={<Login />} />

                <Route path='/motorista' 
                element={(isLogedin && userRole=='Motorista') ? <Motorista />:<Navigate to='/' />} />


                <Route path='/gestor'
                 element={(isLogedin && userRole=='Gestor') ?<Gestor />:<Navigate to='/' />} />

                <Route path='/addusuario' 
                element={(isLogedin && userRole=='Gestor') ? <AddUsuario /> :<Navigate to='/' />} />

            </Routes>

        </>
    )
 
}