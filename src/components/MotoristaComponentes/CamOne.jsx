import WebcamComponent from "./WebcamComponent"
import { useState} from "react"
import { Box, Button } from "@chakra-ui/react"




export const CamOne = (props) => {

    const [stateCam, setStateCam] = useState(false)

    const OnCam = () => {
        console.log(stateCam)
        setStateCam(!(stateCam))
    }




    return (
        <>

            <Box w={{ md: '20vw', base: '100%' }} marginTop='2px' >

                {stateCam && <WebcamComponent
                    onCapture={(img) => {
                        props.onCapture(img); // Passa para o pai (FinalizarEntrega)
                        //setStateCam(false);    // Opcional: fecha a câmera após tirar a foto
                    }} />}

                {(!stateCam) && <Button onClick={OnCam} bg='blue.700'>Ligar Camera</Button>
                }

            </Box>


        </>
    )
}