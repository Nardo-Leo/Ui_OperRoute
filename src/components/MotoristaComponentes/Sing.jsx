import { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./sigCanvas.css";
import { Box, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../AppContext";

function Sing(props) {


    //Para salvar a imagem no Context
    ///--------------------------------------
    let { sing } = useContext(AppContext)

    ///--------------------------------------

    const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

    const sigCanvas = useRef({});

    /* a function that uses the canvas ref to clear the canvas 
    via a method given by react-signature-canvas */
    const clear = () => sigCanvas.current.clear();

    //***************************** */
    const [previewURL, setPreviewURL] = useState(null);

    const gerarPreview = (blob) => {
        // Cria uma string como: blob:http://localhost:3000/uuid
        const url = URL.createObjectURL(blob);
        setPreviewURL(url);
    };

    const verEmTelaCheia = () => {
        if (imageURL) {
            const novaAba = window.open();
            // Para Base64 longo, às vezes é melhor injetar a imagem via HTML na nova aba
            novaAba.document.write(`<img src="${imageURL}" alt="Assinatura" />`);
        }
    };

    const limparTudo = () => {
        sigCanvas.current.clear();
        setImageURL(null);
    };
    /******************************************************/



    /* a function that uses the canvas ref to trim the canvas 
    from white spaces via a method given by react-signature-canvas
    then saves it in our state */

    const save = () => {
        if (sigCanvas.current.isEmpty()) {
            alert("Por favor, forneça uma assinatura primeiro.");
            return;
        }

        // --- INÍCIO DA CORREÇÃO ---
        // 1. Pega o canvas original
        const originalCanvas = sigCanvas.current.getCanvas();

        // 2. Cria um novo canvas temporário com as mesmas dimensões
        const newCanvas = document.createElement('canvas');
        newCanvas.width = originalCanvas.width;
        newCanvas.height = originalCanvas.height;
        const ctx = newCanvas.getContext('2d');

        // 3. Pinta o fundo do novo canvas de BRANCO
        ctx.fillStyle = '#FFFFFF'; // Cor branca
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // 4. Desenha a assinatura original (que tem fundo transparente) por cima do fundo branco
        ctx.drawImage(originalCanvas, 0, 0);

        // 5. Gera o Base64 a partir do NOVO canvas (agora com fundo branco)
        const signatureDataWithWhiteBackground = newCanvas.toDataURL("image/png");
        // --- FIM DA CORREÇÃO ---

        // Salva no estado e envia para o componente pai
        setImageURL(signatureDataWithWhiteBackground);

        if (props.onSave) {
            props.onSave(signatureDataWithWhiteBackground);
        }
    };


    useEffect(() => {
        if (imageURL) {
            console.log("O estado imageURL finalmente mudou para:", imageURL);
            sing = imageURL
            console.log('Aqui a Vossa Assinatura é: ' + sing)
            /*
             const blob1 =  base64ToBlob(imageURL, 'im')
            
             console.log('No formato Blob: ' + blob1)
                       */

        }
    }, [imageURL])




    return (
        <div className="App">
            {/** 
            <Button colorScheme="yellow" onClick={limparTudo}>
                Limpar
            </Button>
*/}

            {/**       <Text>Assinatura Digital</Text> */}

            <Button bg='blue.700' >
                <Popup
                    modal
                    trigger={<h3>Abrir campo de assinatura</h3>}
                    closeOnDocumentClick={false}
                >
                    {close => (
                        <>
                            <Box w={{ base: '95vw', md: '50vw' }}>
                                <SignaturePad
                                    ref={sigCanvas}
                                    canvasProps={{
                                        className: "signatureCanvas"
                                    }}

                                />
                            </Box>
                            {/* Button to trigger save canvas image */}
                            <Button bg='green.600' onClick={save}>Salvar</Button  >
                            <Button bg='yellow.600' onClick={clear}>Limpar</Button  >
                            <Button bg='red.600' onClick={close}>Fechar</Button  >
                        </>
                    )}
                </Popup>
            </Button>

            <br />
            <br />
            {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
            {imageURL ? (
                <img
                    src={imageURL}
                    alt="my signature"
                    style={{
                        display: "block",
                        margin: "0",
                        border: "1px solid black",
                        width: "150px"
                    }}
                />
            ) : null}

            {/** 
            {imageURL && (
                <Button
                    mt={4}
                    colorScheme="teal"
                    onClick={verEmTelaCheia}
                >
                    Ver em Tela Cheia
                </Button>
            )}
                */}
        </div>
    );
}

export default Sing;
