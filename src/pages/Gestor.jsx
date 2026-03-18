
import { Box, Text, Center, Flex, Heading } from '@chakra-ui/react'
import { ExcelTableImporter } from "../components/GestorComponentes/ExcelTableImporter"
import { EditaViagem } from '../components/GestorComponentes/EditaViagem'

export const Gestor = () => {


    return (
        <>

            <Box  w='100vw' h='100vh' 
            padding={{md:'30px 30px', base:'15px'}}
                
                userSelect="none"
            >
                <Heading fontSize='1.5em' marginBottom='20px' fontWeight='bold'>Gestão de Viagens</Heading>

                <Box w='90vw' display='flex' flexDirection={{md:'row', base:'column'}} gap='20px'>

                    <Box bg='white' borderRadius='20px 20px 20px 20px'
                    w={{md:'40%', base:'100%'}} h='200px' 
                    >
                        <ExcelTableImporter />
                    </Box>
                    
                    <Box bg='white' borderRadius='20px 20px 20px 20px'
                     w={{md:'40%', base:'100%'}} 
                     >
                        <EditaViagem />
                    </Box>
                </Box>

            </Box>

        </>
    )
}