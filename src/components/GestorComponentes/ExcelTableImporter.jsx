import  { useState, useContext, useEffect } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import * as XLSX from 'xlsx';

import { Box, Button, Heading, Input, Spacer } from '@chakra-ui/react'
import { AppContext } from "../AppContext";

import { envioDados } from '../funcoes/envioDados';

import { BsTable } from "react-icons/bs";


export const ExcelTableImporter = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);


  /* Para armazenar os valores das rota na variavel de contexto viagem.rota */
  ////////////////////////////////////////////////////////////////////////////////////

  //const { rota, setRota } = useContext(AppContext)

  const { viagem, updateViagem } = useContext(AppContext);

  useEffect(() => {
    console.log('Rota Mudou para ' + viagem.rota)
  }, [viagem.rota])




  // Função para ler o arquivo Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    let fileName = 'Numero da viagem'

    fileName = file.name.replace(/\D/g, '')
    console.log('Nome é: ' + fileName)


    reader.onload = (event) => {
      //const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      // Pega a primeira planilha (sheet)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      // Converte para JSON
      const json = XLSX.utils.sheet_to_json(worksheet);
      //console.log('Aqui estão todos os dados' + json)

      const novaViagem = json.map(info => ({
        cod_viagem: fileName,
        carga: info.CARGA,
        data_cadastro: info.DATA,       
        placa: info.PLACA,
        motorista: info.MOTORISTA,
        cliente: info.CLIENTE,
        fone: info.FONE,
        municipio: info.MUNICIPIO,
        uf: info.UF,
        endereco: info.ENDERECO,
        bairro: info.BAIRRO,
        numero: info.NUMERO,
        valor: info.VALOR || null,
        formapgto: info.FORMAPGTO,
        observacoes: info.OBSERVACOES || null,
        stts_viagem: 'Cadastrada'
      }))
      
      updateViagem({ rota: novaViagem });
      //console.log('rota de Viagem: ' + viagem.rota)

      //console.log('PEDIDO : ' + rota)

      console.log('Primeira carga da lista: ', json[0]);

      if (json.length > 0) {
        // Define colunas automaticamente baseadas nas chaves do primeiro objeto
        const headerNames = Object.keys(json[0]);
        const cols = headerNames.map(key => ({
          header: key,
          accessorKey: key,
        }));
        setColumns(cols);
        setData(json); // Define os dados no estado
      }
    };

    //reader.readAsBinaryString(file); //Modo antigo
    reader.readAsArrayBuffer(file); //Modo Moderno
  };

  // Configuração do TanStack Table

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [onOff, setOnOff] = useState('none')

  const mostraTabela = () => {

    if (onOff == 'none') {
      setOnOff('block')
    } else {
      setOnOff('none')
    }
  }



  return (
    <>

      <Box borderRadius='20px 20px 20px 20px' display='flex' flexDirection='column' 
        h='200px'
      >

      <Box display='flex' padding='5px 15px' bg='blue.600' color='white'
              borderRadius='20px 20px 0px 0px'>
        <Heading>Nova Viagem - Importar Planilha</Heading>
            <Spacer />

            <BsTable size='30px' />
      </Box >

             <Input type="file" accept=".xlsx, .xls" onChange={handleFileUpload}
                 marginTop='8px' 
                 />

               <Box display='flex' justifyContent='center' alignItems='end'  
               h='45%'>
                {/** 
                <Button onClick={mostraTabela} bg='blue.600'
                  w='30%'
                >Visualizar</Button>
    */}
    
                <Button bg='green.600' w='50%' marginTop='20px' fontSize='xl'
                  onClick={() => envioDados(viagem.rota)}>Cadastar</Button>
              </Box>


      </Box>
    </>
  );
}


