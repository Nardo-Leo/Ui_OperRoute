


import { Box, Text, Input, Button, Center, Heading, Spacer } from '@chakra-ui/react'
import { useState } from 'react'

import { IoSearchSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";



export const EditaViagem = () => {

    const [listagem, setListagem] = useState('')


    ////BUSCA DA VIAGEM
    const [viagem, setViagem] = useState('')  //variavel para o numero da viagem a ser buscada
    const [motorista, setMotorista] = useState('')  //variavel para atualizar o nome do motorista na viagem
    const [placa, setPlaca] = useState('')  //variavel para atualizar o nome do motorista na viagem

    let cod_viagem = (e) => {
        setViagem(e.target.value)   
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    /////Funcção para buscar as informações da viagem
    const buscar = () => {
        //console.log('A viagem buscada será: ' + viagem)

        try {

            fetch('https://api-operroute.onrender.com/viagem/busca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ num_viagem: viagem })
            })
                .then(data => data.json())
                .then(data => setListagem(data))

        } catch (err) {
            alert('Viagem não encontrada, confira numero da viagem ')
            console.log('Viagem não encontrada: ', err)
        }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    //Função para atualizar o nome do motorista da viagem
    const updtMotorista = (v, m) => {
        let viagemAtt = {
            cod: v,
            motorista: m
        }

        try {

            fetch('https://api-operroute.onrender.com/viagem/editaMotorista', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ viagem: viagemAtt })
            })
                /*.then(data => data.json())
                .then(data => setListagem(data))*/
                .then(alert('Motorista alterado com sucesso.'))

        } catch (err) {
            console.log(err)
            alert('Não foi possivel alterar o motorista da viagem')
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    //Função para atualizar a placa do veiculo da viagem
    const updtPlaca = (v, p) => {
        let viagemAtt = {
            cod: v,
            placa: p
        }

        try {

            fetch('https://api-operroute.onrender.com/viagem/editaPlaca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ viagem: viagemAtt })
            })
                /*.then(data => data.json())
                .then(data => setListagem(data))*/
                .then(alert('Placa alterada com sucesso.'))

        } catch (err) {
            console.log(err)
            alert('Não foi possivel alterar a placa da viagem')
        }
    }


    return (

        <>
            <Box    >

                <Box display='flex' padding='5px 15px' bg='blue.600' color='white'
                    borderRadius='20px 20px 0px 0px'>
                    <Heading>Editar Viagem</Heading>
                    <Spacer />
                    <FaEdit size='30px' />
                </Box>

                <Box w={{ md: '30vw', base: '80vw' }} padding='8px'
                    display='flex'  >

                    <Input w={{ md: '50%', base: '70%' }} type='number' marginRight='10px'
                        border='2px solid black' placeholder='Nº da viagem'
                        color='black' fontWeight='bolder' fontSize='1.2em'
                        onChange={(e) => { cod_viagem(e) }}
                    />

                    <Button onClick={buscar} fontWeight='bolder' fontSize='xl' bg='blue.900'>
                        <IoSearchSharp />
                        <Text>Buscar</Text></Button> 
                </Box>

                {listagem &&
                    <>
                        <Box marginTop='30px' h='300px' padding='8px'
                            display='flex' flexDirection='column'
                        >
                            <form>

                                <Box display='flex' flexDirection={{ md: 'column', base: 'column' }}
                                    w='100%' justifyContent='baseline'
                                >

                                    <Box w='100%'

                                    >
                                        <Text fontSize='xl'
                                            margin='10px 0px'
                                        >Motorista: {listagem[0].motorista}</Text>


                                        <Box display='flex' justifyContent='baseline'
                                            w='100%'
                                        >

                                            <Input w={{ md: '70%', base: '65%' }}
                                                border='2px solid black' placeholder='Novo Motorista'
                                                onChange={(e) => setMotorista(e.target.value)} />

                                            <Button marginLeft='10px' w='100px'
                                                fontWeight='bolder'
                                                onClick={() => updtMotorista(viagem, motorista)}
                                                bg='red.600'
                                            >Alterar<br></br> Motorista</Button>

                                        </Box>
                                    </Box>


                                    <Box w='100%'>
                                        <Text fontSize='xl'
                                            margin='10px 0px'
                                        >Placa: {listagem[0].placa}</Text>

                                        <Box display='flex' justifyContent='baseline'
                                            w='100%' >

                                            <Input w={{ md: '70%', base: '65%' }}
                                                border='2px solid black' placeholder='Nova Placa'
                                                onChange={(e) => setPlaca(e.target.value)} />

                                            <Button marginLeft='10px' w='100px'
                                                fontWeight='bolder'
                                                onClick={() => updtPlaca(viagem, placa)}
                                                bg='red.600'
                                            >Alterar <br></br> Veiculo</Button>
                                        </Box>
                                    </Box>

                                </Box>
                                
                            </form>
                        </Box>
                    </>}
            </Box>
        </>
    )
}