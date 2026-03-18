
import { Box, Text, Input, Field, Button, Heading } from '@chakra-ui/react'
import { useState } from 'react'



export const AddUsuario = () => {

    const usuario = {
        nome: '',
        cpf: '',
        funcao: '',
        ativo: true,
        senha: null
    }

    const passaNome = (e) => {
        usuario.nome = e.target.value
    }

    const passaCpf = (e) => {
        usuario.cpf = e.target.value
    }

    const passaFuncao = (e) => {

        usuario.funcao = e.target.value
    }

    const passaSenha = (e) => {

        usuario.senha = e.target.value
    }

    const mandaUser = async (usuario) => {

        if (usuario.funcao == 'Gestor' || usuario.funcao == 'gestor') {
            usuario.funcao = 'Gestor'
        } else if (usuario.funcao == 'Motorista' || usuario.funcao == 'motorista') {
            usuario.funcao = 'Motorista'
        } else {
            alert('Informe a função do usuario.')
            return 0;
        }

        try {

           const response = await fetch('https://api-operroute.onrender.com/usuarios/newuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })

            const result = await response.json()
            if(result.success){
                alert('Usuário cadastrado com sucesso.')
            }else{
                if(!result.success){
                    alert(result.message)
                }
            }





            console.log('enviando usuario:' + JSON.stringify(usuario))

        } catch (err) {
            console.log('erro a enviar usuario: ', err)
        }
    }


    const OffUser = async () => {


        try {
            console.log('enviando o cpf: ' + usuario.cpf)

            const response = await fetch('https://api-operroute.onrender.com/usuarios/offuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cpf: usuario.cpf })
            })
            
            const result = await response.json()
            if(result.success){
                alert('Usuário desativado com sucesso.')
            }

            

            console.log('enviando cpf:' + JSON.stringify(usuario.cpf))

        } catch (err) {
            console.log('Erro ao desativar usuario: ', err)
        }
    }

    const OnUser = async () => {


        try {
            console.log('enviando o cpf: ' + usuario.cpf)


            const response = await fetch('https://api-operroute.onrender.com/usuarios/onuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cpf: usuario.cpf })
            })

            const result = await response.json()
            if(result.success){
                alert('Usuário ativado com sucesso.')
            }
            console.log('enviando cpf:' + JSON.stringify(usuario.cpf))

        } catch (err) {
            console.log('erro ativar usuario: ', err)
        }
    }



    return (
        <>
            <Box h={{md:'100vh', base:'130vh'}} w='100vw'  display='flex' gap={{md:'100px', base: '20px'}}
                padding={{md:'50px 150px', base:'15px 8px'}} flexDirection={{md:'row', base:'column'}} userSelect='none'
            >



                <Box bg='white' gap='15px' display='flex' flexDirection='column'
                    w={{md:'50%', base:'100%'}} h={{md:'90%', base:'65%'}} borderRadius='25px 25px 0px 0px'
                >
                    <Box borderRadius='25px 25px 0px 0px' padding='15px 10px' bg='blue.600'>
                        <Heading fontSize='2xl' color='white'>Novo Usuário</Heading>
                    </Box>

                    <Box padding='10px 10px'>

                        <Field.Root >
                            <Field.Label padding='5px' fontSize='xl'>Nome:</Field.Label>
                            <Input border='1px solid black' type='text' placeholder='Informe o nome completo'
                                onChange={(e) => passaNome(e)}
                            />
                        </Field.Root>

                        <Field.Root marginTop='12px'>
                            <Field.Label padding='5px' fontSize='xl'>CPF:</Field.Label>
                            <Input border='1px solid black' type='number' placeholder='Informe o cpf'
                                onChange={(e) => passaCpf(e)}
                            />
                        </Field.Root>

                        <Field.Root marginTop='12px' >
                            <Field.Label padding='5px' fontSize='xl'>Função</Field.Label>
                            <Input border='1px solid black' type='text' placeholder='Informe o cargo'
                                onChange={(e) => { passaFuncao(e) }}
                            />
                        </Field.Root>

                        <Field.Root marginTop='12px' >
                            <Field.Label padding='5px' fontSize='xl'>Senha</Field.Label>
                            <Input border='1px solid black' type='password' placeholder='Informe a senha'
                                onChange={(e) => { passaSenha(e) }}
                            />
                        </Field.Root>


                        <Button onClick={() => mandaUser(usuario)}
                            bg='green.600' marginTop='30px' w='100%' fontSize='xl'
                        >Cadastrar Usuario</Button>

                    </Box>
                </Box>


                <Box display='flex' flexDirection='column' 
                    bg='white' borderRadius='25px 25px 0px 0px' h={{md:'50%', base:'30%'}} w={{md:'50%', base:'100%'}}


                >

                    <Box borderRadius='25px 25px 0px 0px' padding='15px 10px' bg='blue.600' >

                        <Heading color='white' fontSize='2xl'>Ativar/Desativar Funcionario</Heading>
                    </Box>

                    <Box padding='10px 10px' display='flex' flexDirection='column'>
                        <Field.Root marginTop='12px'>
                            <Field.Label padding='5px' fontSize='xl'>CPF:</Field.Label>
                            <Input border='1px solid black' placeholder='Cpf do Funcionario'
                                onChange={(e) => passaCpf(e)}
                            />
                        </Field.Root>

                        <Box marginTop='30px' display='flex' gap='15px' justifyContent='center'>
                            <Button w='40%' onClick={() => OnUser()} bg='green.600' fontSize='xl'
                                >Ativar</Button>

                            <Button w='40%' onClick={() => OffUser()} bg='red.600' fontSize='xl'
                                >Desativar</Button>
                            
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}