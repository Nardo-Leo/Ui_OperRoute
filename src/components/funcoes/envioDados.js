export const envioDados = async (array) => {


    try{
        const response = await fetch('https://api-operroute.onrender.com/viagem/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(array)
    })

    const result = await response.json();
    if (result.success) {
        alert('Vaigem Cadastrada')
    };

    /*
    console.log('Abaixo está o que foi enviado')
     console.log({array})
    
     */
    }catch (err){
        alert('Erro ao cadastrar viagem', err)
    }

}
