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
        //data_venda: info.DATA_VENDA,
        //data_faturamento: info.DATA_FATURAMENTO,
        placa: info.PLACA,
        motorista: info.MOTORISTA,
        //cod_cliente: info.COD_CLIENTE,
        cliente: info.CLIENTE,
        fone: info.FONE,
        //contato: info.CONTATO,
        municipio: info.MUNICIPIO,
        uf: info.UF,
        endereco: info.ENDERECO,
        bairro: info.BAIRRO,
        numero: info.NUMERO,
        //latitude: info.latitude || null,
        //longitude: info.longitude || null,
        //numero_do_pedido: info.NUMERO_DO_PEDIDO,
        //nf: info.NF,
        valor: info.VALOR || null,
        formapgto: info.FORMAPGTO,
        observacoes: info.OBSERVACOES || null,
        //cod_vendedor: info.COD_VENDEDOR,
        //vendedor: info.VENDEDOR,
        //peso: info.PESO || null,
        stts_viagem: 'Cadastrada'

        /**ORDEM NO BANCO DE DADOS 
         * 
         * 
         *  id_ped  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            viagem VARCHAR(10) NOT NULL ,
            carga VARCHAR(10) NOT NULL,
            data_cadastro DATE,
            data_venda DATE,
            data_faturamento DATE,
            placa VARCHAR(7) NOT NULL,
            motorista VARCHAR(100) NOT NULL,
            cod_cliente VARCHAR(10) NOT NULL,
            cliente VARCHAR(100) NOT NULL,
            fone VARCHAR(20) NOT NULL,
            contato VARCHAR(20),
            municipio VARCHAR(100) NOT NULL,
            uf char(2) NOT NULL,
            endereco VARCHAR(100) NOT NULL,
            bairro VARCHAR(50) NOT NULL,
            numero VARCHAR(10) NOT NULL,
            latitude DECIMAL(10,8),
            longitude DECIMAL(11,8),
            numero_do_pedido VARCHAR(10),
            nf VARCHAR(9),
            valor DECIMAL(10,2),
            formapgto VARCHAR(20),
            observacoes TEXT,
            cod_vendedor VARCHAR(10) NOT NULL,
            vendedor VARCHAR(100) NOT NULL,
            peso DECIMAL(10,3),	
            stts_viagem VARCHAR(15),
            ass_dest VARCHAR(150),
            url_img_um VARCHAR(250),
            url_img_dois VARCHAR(250),
            url_img_tres VARCHAR(250)
        */

      }))
      // ATUALIZAÇÃO CORRETA:
      // Chamamos a função do context passando apenas o que queremos mudar
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


