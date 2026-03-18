

import { Text, Box, Button } from '@chakra-ui/react'
import { BuscaViagem } from '../components/MotoristaComponentes/BuscaViagem'

export const Motorista = () => {

    return (
       
            <Box  color='black' minH='100vh' w='100vw' padding='30px' 
                display='flex' flexDirection='column' userSelect='none'
            >
                <Text fontSize='25px' fontWeight='bolder'>Pagina Motorista</Text>
                
                <Box>
                    <BuscaViagem />
                </Box>
             
            </Box>
       
    )
}