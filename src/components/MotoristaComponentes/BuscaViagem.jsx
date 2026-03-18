import {
    Box, Text, Button, Input,
    Field, NativeSelect, For,
    Stack,
    Heading,
    Center
} from '@chakra-ui/react'

import { Spinner } from "@chakra-ui/react"

import { AiFillSignature } from "react-icons/ai";



import { Accordion } from "@chakra-ui/react"
import { useState } from 'react'
import Sing from './Sing'
import { Card } from './Card'

import { IoSearchSharp } from "react-icons/io5"


export const BuscaViagem = () => {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    ////BUSCA DA VIAGEM
    let viagem //variavel para o numero da viagem a ser buscada

    let cod_viagem = (e) => {
        //console.log('o cod atual é: ' + e.target.value)
        viagem = e.target.value
    }


    //Para mostrar somente as cargas que não foram concluidas
    const filtro = (viagem)=>{
        const aux = []
        let count = 0
        viagem.map((v)=>{
            if(v.stts_viagem != 'Concluída'){
            aux.push(v)
            count = count + 1;
        }
        })
        setListagem(aux)
        if((count>0)&&(viagem.lenght == count)){
            alert('Todas as entregas foram concluidas.')
        }

        if(viagem.lenght == ''){
            alert('Viagem não Cadastrada.')
        }
        
    }


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
                .then(data => filtro(data))
                

            

        } catch (err) {
            console.log('Viagem não encontrada: ', err)
            alert('Não foi possivel encontrar a viagem')
        }

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////  

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////RENDERIZAÇÃO DA LISTAGEM

    const [listagem, setListagem] = useState('')
    const [verOpcao, setVerOpcao] = useState('none')

    const [fotoComprovante, setFotoComprovante] = useState(null);
    const [fotoID, setFotoID] = useState(null);
    const [assinatura, setAssinatura] = useState(null);
    const [formaPgto, setFormaPgto] = useState('')

    const [sttsSpinner, setSttsSpinner] = useState(false)

    const finalizarEntrega = async (item) => {

        setSttsSpinner(true)

        // ADICIONE ESTE LOG AQUI
        console.log("Dados que serão enviados:", {
            cod_viagem: item.cod_viagem,
            carga: item.carga,
            forma_pagamento: formaPgto,
            foto: item.fotoComprovante,
            destinatarioId: item.fotoID,
            assinatura: assinatura
        });

        const dadosParaEnviar = {
            cod_viagem: item.cod_viagem,
            carga: item.carga,
            forma_pagamento: formaPgto,
            foto: fotoComprovante, // String Base64 vinda do CamOne,
            destinatarioId: fotoID,
            assinatura: assinatura  // String Base64 vinda do Sing
        };

        try {
            const response = await fetch('https://api-operroute.onrender.com/viagem/finalizar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosParaEnviar)
            });
            const result = await response.json();
            if (result.success) {
                alert("Entrega Finalizada!")
                setSttsSpinner(false)
            };
        } catch (err) {
            console.error("Erro ao finalizar:", err);
            alert('Erro ao finalizar entrega da carga.')
        }
    };



    return (
        <>
            <form>
                <Box marginBottom='50px' userSelect='none' display='flex' alignItems='center'>
                <Input type='number' bg='white' w={{ md: '40vw', base: '50vw' }}
                    marginRight='10px'
                    onChange={(e) => { cod_viagem(e) }}
                />
                <Button onClick={buscar} fontWeight='bolder'
                    fontSize='xl' bg='blue.900' type='reset'
                >
                    <Text>Buscar</Text>
                    <IoSearchSharp size='10px' />
                </Button>
            </Box>
            </form>

            <Box userSelect='none' >

                <Box overflowY='scroll' bg='white'>

                    <Accordion.Root collapsible >

                        {listagem ? listagem.map((item, index) => (

                            <Accordion.Item key={index} value={item.carga}>
                                <Accordion.ItemTrigger px="3" _open={{ bg: "blue.500" }}>
                                    <Text fontSize='1.5em'>Carga #{item.carga}</Text>
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>

                                    <form>
                                        <Box overflowY='scroll' paddingBottom={{ md: '0px' }} padding='5px 0px'
                                            border='1px dashed black'
                                        >

                                            <Field.Root marginTop='10px' >
                                                <Box display='flex' w={{ md: '85%', base: '100%' }}
                                                    padding='10px'
                                                    flexDirection='column'
                                                >

                                                    <Field.Label name='cod_cliente'>
                                                        <Text fontSize='medium'>
                                                            Cod.Cliente: {item.cod_cliente}
                                                        </Text>

                                                    </Field.Label>
                                                    <Field.Label name='cliente'>
                                                        <Text fontSize='medium'>
                                                            Cliente: {item.cliente}
                                                        </Text>
                                                    </Field.Label>
                                                </Box>
                                            </Field.Root>

                                            {sttsSpinner ?
                                                <Center padding='10px' w='90vw' gap='5px'>
                                                    <Text fontSize='xl' fontWeight='black'>Finalizando...</Text>
                                                    <Spinner size='xl' borderWidth='4px' color='blue' />
                                                </Center > :

                                                <Box bg='gray.200' padding='0px 8px'>
                                                    <Field.Root marginTop='15px' >
                                                        <Field.Label>Forma de Pagamento:</Field.Label>
                                                        <NativeSelect.Root w={{ md: '50%' }}> {/**Para Selecionar a Forma de Pagamento */}
                                                            <NativeSelect.Field onChange={(e) => setFormaPgto(e.target.value)}
                                                                name="FormaPGTO" bg='white' fontWeight='lighter'>
                                                                <For each={["", "Cheque", "Cartão de Credito", "Cartão de Débito",
                                                                    "Pix", "Dinheiro"]}>
                                                                    {(item) => (
                                                                        <option key={item} value={item} >
                                                                            {item}
                                                                        </option>
                                                                    )}
                                                                </For>
                                                            </NativeSelect.Field>
                                                            <NativeSelect.Indicator />
                                                        </NativeSelect.Root>
                                                    </Field.Root>

                                                    <Box display='flex' flexDirection='column' justifyContent='space-around'
                                                        padding='10px 0px' gap='10px'
                                                    >

                                                        <Card titulo='Comprovante de Pagamento ' onCapture={(img) => setFotoComprovante(img)} />

                                                        <Card titulo='Identificação do Destinatário ' onCapture={(img) => setFotoID(img)} />

                                                        <Field.Root >
                                                            <Field.Label >
                                                                <Heading fontSize='xl' padding='5px'
                                                                >Assinatura Digital:</Heading>
                                                                <AiFillSignature size='25px' />
                                                            </Field.Label>
                                                            <Sing onSave={(sign) => setAssinatura(sign)} />

                                                        </Field.Root>




                                                    </Box>

                                                </Box>}
                                            <Box display='flex' alignItems='center' justifyContent='center'
                                                marginTop='10px'>
                                                <Button h='50px' w='150px' padding='10px' bg='blue.800' onClick={() => finalizarEntrega(item)}>
                                                    <Text fontWeight='bolder'>Finalizar Entrega</Text>
                                                </Button>
                                            </Box>
                                        </Box>

                                    </form>
                                </Accordion.ItemContent>
                            </Accordion.Item>

                        )) : ''}

                    </Accordion.Root>
                </Box>
            </Box>
        </>
    )
}