// window.onload = function(){

    function funcaoPrincipal(){

        let frutas = [    //OPÇÕES DE FRUTAS                             
            {fruta:'Melância', preco:5.00},
            {fruta:'Maçã', preco:3.00},
            {fruta:'Laranja', preco:1.50},
            {fruta:'Abacate', preco:4.50},
            {fruta:'Uva', preco:9.00},
        ]
    
        let ulPaiProdutos = document.querySelector('#produtos');

    (()=>{ //lista interativa
    
            for(let produto of frutas){   
                let liProdutos = document.createElement('li');
                for(let frt in produto){
                    if(frt == 'preco'){
                        ulPaiProdutos.appendChild(liProdutos).setAttribute('data-preco', produto[frt]);  //ATRIBUIR TUDO QUE TEM PREÇO COM UM DATASET
                    }else{  
                        ulPaiProdutos.appendChild(liProdutos).textContent = produto[frt]; //CRIA NOME DAS FRUTAS NA LISTA
                    }
                }
            }
    
    })();
        let cestaDoCliente = document.querySelector('#cestaDoCliente');
        let ulPaiProdutosAll = document.querySelectorAll('#produtos');
        let mostraTotalCompra = document.querySelector('#mostraTotalCompra');
        let soma = 0;
    
        let armazen = []
    
        ulPaiProdutosAll.forEach(function(list){

            ulPaiProdutos.addEventListener('click', function(elemento){ //CLICK
    
            if(armazen.indexOf(elemento.target) != -1){  //ANALISE E MSG DE ERRO
                alert(`O produto "${elemento.target.textContent.toUpperCase()}" já está na cesta`);
            }
    
            else{//END MSG DE ERRO     //ADICIONA ITEM NA CESTA
                
                let liProdutosCesta = document.createElement('li');
                cestaDoCliente.appendChild(liProdutosCesta).textContent = elemento.target.textContent;
                armazen.push(elemento.target);//ADICIONA NO ARMAZEM PRA N ARMAZENAR DNV
    
                                                                    //SOMA
    
                soma += Number(elemento.target.dataset.preco);
                console.log(soma);
                mostraTotalCompra.value = soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
                }
            })
        })
        
    }
    // }
    
    export {funcaoPrincipal};