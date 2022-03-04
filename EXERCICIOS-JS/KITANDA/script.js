window.onload = function(){

    let produtos = [
        {descricao:"Mamão Papaia", preco:2.20},
        {descricao:"Laranja", preco:3.20},
        {descricao:"Manga", preco:7.90},
        {descricao:"Melão", preco:1.90},
        {descricao:"Melancia", preco:3.50},
    ]
  
    const listaProdutos = document.querySelector("#listaProdutos");
    
    ( ()=>{
          for( let pro of produtos ){
              const filhoLi = document.createElement("li");
  
              for( listaP in pro){
                if ( listaP == "preco" ){
                     listaProdutos.appendChild(filhoLi).setAttribute("data-preco", pro[listaP] );
                } else {
                    listaProdutos.appendChild(filhoLi).textContent = `${pro[listaP]}`;
                }
              }
          }
    } )(produtos)
  
    let cestaDoCliente = [];
      let selecionarItem = document.querySelectorAll("#listaProdutos > li")
      let compraDoCliente = document.querySelector('#cestaDoCliente')
      let valorTotalCompra = document.querySelector("#mostraTotalCompra")
      let total=0;
      selecionarItem.forEach(function(item){
              item.addEventListener('click', function(){
    if(cestaDoCliente.indexOf(item.textContent) != -1){
                      alert("Este item já está na sua lista")
                  }else{
                      total += Number(item.dataset.preco)
                      cestaDoCliente.push(item.textContent);
                      let itemCesta = document.createElement('li');
                      compraDoCliente.appendChild(itemCesta).textContent = item.textContent;
                      valorTotalCompra.value = total.toFixed(2);
  }
   })
   })
  }