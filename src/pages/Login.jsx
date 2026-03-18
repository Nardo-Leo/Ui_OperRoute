
import { Input, Center, Box, Button, Text, Field } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/UserContext'
import { useContext } from 'react'



export const Login = () => {

    const navigate = useNavigate();

    const { setIsLogedin, setUserName, setUserRole} = useContext(UserContext)


    const acesso = {
        login: '',
        senha: ''
    }

    const getLogin = (e) => {
        acesso.login = e.target.value
        console.log('login: ' + acesso.login)
    }

    const getSenha = (e) => {
        acesso.senha = e.target.value
        console.log('senha: ' + acesso.senha)
    }


    const acessar = async () => {
        console.log('enviando acesso:' + acesso.login + acesso.senha)

        try {

            const response = await fetch('https://api-operroute.onrender.com/usuarios/acesso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(acesso)
            })
            console.log('enviando acesso para logar: ' + JSON.stringify(acesso))

            const data = await response.json()



            if (response.ok && data.auth) { 

                console.log('Entrou')
                
                const name = data.nome
                const role = data.funcao

                console.log('role:' + role)

                // Gravando os dados que você recebeu do backend
                localStorage.setItem('isAuth', data.auth);       // Grava o true
                localStorage.setItem('userName', name);     // Grava 'User Teste'
                localStorage.setItem('userRole', role);   // Grava 'Gestor' ou 'Motorista'

                setIsLogedin(true)
                setUserName(name)
                setUserRole(role)

                navigate(role.toLowerCase() == 'gestor'? '/gestor' : '/motorista')


            } else{
                alert(data.message || 'Erro ao realizar Login')
            }

        } catch (err) {
            console.log('Erro no processamento do login:', err)
            alert('Não foi possivel validar credenciais.')
        }
    }


    return (
        <>

            <Box h='100vh'  userSelect="none">

                <Center h={{ md: '80vh', base: '90vh' }} w='100vw'  >
                    <Box bg='white' h={{ md: '60vh', base: '80%' }} w={{ md: '30vw', base: '90vw' }}
                        display='flex' flexDirection='column' alignItems='center'
                        justifyContent='center'
                    >

                        <Text marginBottom='20px'
                            color='blue.600' fontWeight='black' fontSize="xl"
                        >Acesse seu perfil</Text>

                        <Center w='70%' >
                            <Field.Root>
                                <Field.Label padding='3px' fontSize='1.0em'>Login</Field.Label>
                                <Input bg='white' placeholder='Seu Login' type='email'
                                    onChange={(e) => getLogin(e)} />
                            </Field.Root>
                        </Center>


                        <Center marginTop='10px' w='70%' >
                            <Field.Root >
                                <Field.Label padding='3px' fontSize='1.0em' >Senha</Field.Label>
                                <Input bg='white' placeholder='Sua Senha' type='password'
                                    onChange={(e) => getSenha(e)} />
                            </Field.Root>
                        </Center>
                        <Button w='40%' bg='blue.800' fontSize='1.0em'
                            marginTop='20px' cursor='pointer'
                            onClick={() => acessar(acesso)}
                        >Entrar</Button>

                    </Box>

                </Center>
            </Box>
        </>
    )
}