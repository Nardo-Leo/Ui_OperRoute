
import {Box,Heading, Spacer} from '@chakra-ui/react'
import { CamOne } from './CamOne'

import { BsFillCameraFill } from "react-icons/bs";

export const Card = (props)=>{


    return(
        <>
        <Box h='70%' w='100%'
       
        >
            <Box display='flex'  alignItems='center' gap='20px' >
                <Heading fontSize={{md:'xl', base:'0.7em'}}padding='5px' >{props.titulo}</Heading>
                
                <BsFillCameraFill size='30px'/>
            </Box>
            <CamOne onCapture={props.onCapture} />
        </Box>
        </>
    )
}