

import { Box } from '@chakra-ui/react'
import { Header } from './Header'


export const Layout = ({ children }) => {

    return(
        
    <Box minH='100vh' minW='100vw' bg='gray.200'>
        <Header />
        {children}
    </Box>

    )
}