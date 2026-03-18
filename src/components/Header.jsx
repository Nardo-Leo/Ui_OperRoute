
import { Box, Heading, Button, Spacer, Text, Menu, Portal } from '@chakra-ui/react'
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';

/*Imports dos Icones */

//import { PiTruckFill } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { LuArrowRightToLine } from "react-icons/lu";
import { HiOutlineMenu } from "react-icons/hi";

export const Header = () => {

    const { isLogedin, userName, userRole, logout } = useContext(UserContext)
    const navigate = useNavigate()

    const fazerLogout = () => {
        logout()
        navigate('/')
    }


    const Logout = () => {
        try {
            // 1. Remova em vez de setar como null string
            localStorage.removeItem('isAuth');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');

            // 2. Atualize o estado para vazio explicitamente
            setNomeUsuario('');
            setFuncaoUsuario('');

            navigate('/')
        } catch (err) {
            alert('Erro ao sair da aplicação')
        }


    }

    return (
        <Box userSelect='none'>

            <Box h='3vh' bg='blue.600'></Box>
            <Box display='flex' padding={{ md: '20px 70px', base: '10px 10px' }} bg='white' alignItems='center'
                gap='10px'   >
                <FaTruckFast color='blue' size='50px' />
                <Heading color='blue.600' fontSize='xl' display='flex' alignItems='center'
                >OperRoute</Heading>

                <Spacer />

                { /* {
                    (!isLogedin) && <Box><Text>Bem Vindo!</Text></Box>
                } */}

                {
                    userRole == 'Gestor' &&
                    <Box display='flex' gap='30px'>
                        <Box display={{md:'flex', base:'none'}} alignItems='center' gap='10px'
                        
                        >
                            <FaCircleUser size='30px'/>
                            <Text>{userName}</Text>
                        </Box>
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button bg='blue.800' color='white'
                                    variant="outline" >
                                    <HiOutlineMenu />
                                </Button>

                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Menu.Item value="redrect_viagens">
                                            <Button as={Link} to='/gestor'
                                                bg='blue.800' >
                                                <Text>Viagens</Text>
                                                <LuArrowRightToLine /></Button>
                                        </Menu.Item>
                                        <Menu.Item value="redirect_usuarios">
                                            <Button as={Link} to='/addusuario' bg='blue.800'
                                            >
                                                <Text>Usuários</Text>
                                                <LuArrowRightToLine />
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item value="new-win">
                                            <Button bg='red.600'
                                                onClick={() => fazerLogout()}>
                                                <Text>Sair</Text>
                                                <RxExit />
                                            </Button>
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </Box>
                }


                {userRole == 'Motorista' &&
                    <Button bg='red.600'
                        onClick={() => fazerLogout()}>
                        <Text>Sair</Text>
                        <RxExit />
                    </Button>
                }

            </Box>

        </Box>
    )
}