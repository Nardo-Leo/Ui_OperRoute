


import  { useRef, useCallback, useState} from "react";
import Webcam from "react-webcam";
import { Button, Box, Text, Image } from '@chakra-ui/react'

import { FaCheckCircle } from "react-icons/fa";



// 1. Adicione (props) aqui para receber a função do pai
const WebcamComponent = (props) => {

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const [fotoSalva, setFotoSalva] = useState(false)

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };

  let [direcao, setDirecao] = useState('column')

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setDirecao('row')
    // Aqui ele apenas salva localmente para mostrar o preview na tela
    {/**
  
  
    if (props.onCapture) {
            props.onCapture(imageSrc);
        }
            */}


  }, [webcamRef, props]);

  // 2. Crie uma função para o botão "Enviar"
  const handleSend = () => {
    if (imgSrc && props.onCapture) {
      props.onCapture(imgSrc); // Passa o Base64 para o CamOne
      setFotoSalva(true)
      
    }
  };

  const tirarOutra = () => {
    setImgSrc(null)
    setDirecao('column')
  }

  return (
    <div>
      <Box display='flex' flexDir={direcao} w='95%' padding='10px 0px'  >
        {(!imgSrc) && <>
          <Box h='50%'>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
          </Box>
          <Button onClick={capture} w='80%'>Capturar Foto</Button> </>
        }




        {imgSrc && <>
          <Box display='flex' w='100%' gap='5px' >
            <Box w='50%'>
              <Image  src={imgSrc} alt="Foto capturada" />
            </Box>
            {
              (!fotoSalva) ? <>
              <Box display='flex' flexDirection='column' h='100%' w='50%' gap='10px'  >
                <Button onClick={tirarOutra} w='85%' fontSize='xl' h='20%'>Refazer</Button>
                <Button w='85%' bg='green' fontSize='xl' h='20%' onClick={handleSend}>Salvar</Button>
              </Box>
              </> :
              <Box h='100%' w='60%' display='flex' alignItems='center' justifyContent='center' gap='5px'
              
               >
                <FaCheckCircle color="blue"/>
                <Text >Foto Capturada</Text></Box>
            }
            
          </Box>



          <Box display='flex' flexDir='column' >

            {/* 3. Adicione o onClick aqui para chamar o handleSend */}
            {/*(!fotoSalva) ? <>
              <Box display='flex' flexDirection='column' h='100%' justifyContent='space-between' >
                <Button onClick={tirarOutra} w='100%' fontSize='xl' h='40%'>Refazer</Button>
                <Button w='100%' bg='green' fontSize='xl' h='40%' onClick={handleSend}>Salvar</Button>
              </Box>
            </> : '' */}

          </Box>
        </>}
      </Box>
    </div>
  );
};


export default WebcamComponent;



/*
//////////////PRIMEIRA VERSÃO ////////////////////////////////////

const WebcamComponent = () => {

  //Para salvar a imagem no Context
  ///--------------------------------------
  let { fotoUm } = useContext(AppContext)
  let { sing } = useContext(AppContext)

  ///--------------------------------------


  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment" // Aqui você diz qual camera quer, nesse caso a traseira
  };




  // Função para capturar foto
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log('a imagem é: ' + imageSrc)
    //fotoUm = imageSrc


    console.log('So pra mostrar a sing aqui ' + sing)

    //console.log('A foto um ficou: ' + fotoUm)
  }, [webcamRef]);



  const tirarOutra = () => {
    setImgSrc(null)
  }



  return (
    <div>
      <Box display='flex' flexDir='column' gap='8px'  >
        {(!imgSrc) && <>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
          <Button onClick={capture}>Capturar Foto</Button> </>
        }
        {imgSrc && <>
          <img src={imgSrc} alt="Foto capturada" />
          <Box display='flex' flexDir='column' gap='5px' justifyContent='space-between' >
            <Button onClick={tirarOutra}>Tirar outra foto</Button>
            <Button bg='green'>Enviar</Button>
          </Box>
        </>}
      </Box>



    </div>
  );
};

export default WebcamComponent;


*/

