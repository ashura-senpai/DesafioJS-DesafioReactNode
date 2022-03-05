// window.onload = function(){
    function funcaoPrincipal(){

        let frutas = [                             
            {fruta:'Melância', preco:3.00},
            {fruta:'Maçã', preco:2.00},
            {fruta:'Laranja', preco:1.50},
            {fruta:'Abacate', preco:3.50},
            {fruta:'Uva', preco:8.50},
        ]
    
        let ulPaiProdutos = document.querySelector('#produtos');
    (()=>{
    
            for(let produto of frutas){   
                let liProdutos = document.createElement('li');
                for(let frt in produto){
                    if(frt == 'preco'){
                        ulPaiProdutos.appendChild(liProdutos).setAttribute('data-preco', produto[frt]);
                    }else{  
                        ulPaiProdutos.appendChild(liProdutos).textContent = produto[frt];
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
            ulPaiProdutos.addEventListener('click', function(elemento){
    
            if(armazen.indexOf(elemento.target) != -1){
                alert(`O produto "${elemento.target.textContent.toUpperCase()}" já está na cesta`);
            }
    
            else{
                let liProdutosCesta = document.createElement('li');
                cestaDoCliente.appendChild(liProdutosCesta).textContent = elemento.target.textContent;
                armazen.push(elemento.target);
    
                soma += Number(elemento.target.dataset.preco);
                console.log(soma);
                mostraTotalCompra.value = soma.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
                }
            })
        })
    }
    // }
    
    export {funcaoPrincipal};