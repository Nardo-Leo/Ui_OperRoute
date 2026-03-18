

import WebcamComponent from "./WebcamComponent"
import { useState, useEffect } from "react"
import { Box, Button } from "@chakra-ui/react"



export const CamThree = () => {

    const [stateCam, setStateCam] = useState(false)



    const OnCam = () => {
        console.log(stateCam)
        setStateCam(!(stateCam))
    }




    useEffect(() => {

        console.log(stateCam)

    },)



    return (
        <>


        
                <Box bg='chartreuse' h='20vh' w='20vw' marginTop='2px'>

                    {stateCam && <WebcamComponent />}

                    { stateCam ?
                    <Button onClick={OnCam}>Fechar Camera</Button>: 
                    <Button onClick={OnCam}>Ligar Camera</Button> 
                    
                    }
                    


                </Box>


        </>
    )
}