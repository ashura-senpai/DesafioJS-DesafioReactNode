function identificadorDeCep(){

    const cep_ = document.querySelector("#cep");
    const bairro_ = document.querySelector("#bairro");
    const rua_ = document.querySelector("#logradouro");
    const cidade_ = document.querySelector("#localidade");
    const estado_ = document.querySelector("#uf");
    const buscar_ = document.querySelector("#buscar");


    let dadosCep = async function(cep){

    let url = `https://viacep.com.br/ws/${cep}/json/`

        try{
            let dadosFetch = await fetch(url);

            let dadosJson = await dadosFetch.json();
            resultadoPesquisa(dadosJson);
        }catch(error){
            alert(error);
            
        }
    }
    
    function resultadoPesquisa(dados){

        for(let valor in dados){

            if(document.querySelector(`#${valor}`)){
                document.querySelector(`#${valor}`).value = dados[valor];
            }
        }
    }




    buscar_.addEventListener("click", function(){
    
        dadosCep(cep_.value);

    })

}
export{identificadorDeCep};