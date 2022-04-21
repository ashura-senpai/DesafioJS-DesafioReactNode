const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models=require('./models');

const app =express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido=models.ItemPedido;
let pedido=models.Pedido;
let servico=models.Servico;

let compra=models.Compra;
let itemcompra=models.ItemCompra;
let produto=models.Produto;

app.get('/', function(rec, res){
    res.send('Olá Mundo!')
})

app.post('/clientes', async(req,res)=>{
    // await aguardar(3000);
    // function aguardar(ms){
    //     return new Promise((resolve)=>{
    //         setTimeout(resolve.ms);
    //     });
    // };

    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Foi impossivel se conectar."
        });
    });
});

app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Foi impossivel se conectar."
        });
    });
});

app.post('/pedidos', async(req,res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});

app.post('/itempedidos', async(req,res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});

app.get('/listaclientes', async(req, res)=>{
    await cliente.findAll({
        raw: true,
        order:[["nome", "ASC"]]
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/numeroclientes', async(req, res)=>{
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});

app.get('/clientes/:id', async(req, res)=>{
    await cliente.findByPk(req.params.id,{include:[{all: true}]})
    .then(cli=>{
        return res.json({cli});
    })
} )

app.get('/listapedidos', async(req, res)=>{
    await pedido.findAll({
        //raw: true
        // order:[['clienteDesde', 'ASC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

app.get('/pedidos/:id', async(req, res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(pedido=>{
        return res.json({pedido});
    })
} )
app.get('/pedidos/cliente/:ClienteId', async(req, res)=>{
    await pedido.findAll({where: {ClienteId: req.params.ClienteId}})
    .then(ped=>{
        return res.json({ped});
    })
} )

app.get('/servicos/:id', async(req, res)=>{
    await servico.findByPk(req.params.id,{include:[{all: true}]})
    .then(servico=>{
        return res.json({servico});
    })
} )

app.get('/listaservicos', async(req, res)=>{
    await servico.findAll({
        //raw: true
        order:[['id', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/ofertaservicos', async(req, res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/pedidos/:id/servico', async(req, res)=>{
    await itempedido.findAll({where: {PedidoId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});

app.get('/listaitem', async(req, res)=>{
    await itempedido.findAll({
        order:[['PedidoId', 'ASC']]
        //raw: true
    }).then(function(item){
        res.json({item})
    });
});

app.get('/servico/:id/pedidos', async(req, res)=>{
    await itempedido.findAll({where: {ServicoId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});
app.get('/itempedido/:PedidoId/:ServicoId', async(req, res)=>{
    await itempedido.findAll({where: {PedidoId: req.params.PedidoId, ServicoId: req.params.ServicoId}})
    .then(item =>{
        return res.json({item});

    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});


// app.get('/item/:id', async(req, res)=>{ //lista item por Pedidoid
//     await itempedido.findByPk(req.params.PedidoId,{include:[{all: true}]})
//     .then(item=>{
//         return res.json({item});
//     })
// } )


app.put('/atualizaservico', async(req, res)=>{
    await servico.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Serviço alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });


app.put('/atualizaclientes', async(req, res)=>{
    await cliente.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Cliente alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

app.put('/atualizapedidos', async(req, res)=>{
    await pedido.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Pedido alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

app.put('/pedidos/:id/editaritem', async(req, res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'pedido não encontrado.'
        });
    };

    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Pedido alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi preciso alterar"
        });
    });
});


app.put('/atualizaitem', async(req, res)=>{
    await itempedido.update(req.body,{
        where: {PedidoId: req.body.PedidoId}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Item alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

    app.put('/atualizaitens', async(req, res)=>{
        await itempedido.update(req.body,{
            where: {PedidoId: req.body.PedidoId, ServicoId: req.body.ServicoId}
            }).then(function(){
                return res.json({
                    error: false,
                    message: 'Item alterado com sucesso!'
                });
            }).catch(function(erro){
                return res.status(400).json({
                    error: true,
                    message:"Erro na alteração"
                });
            });
        });

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});

app.get('/excluirpedido/:id', async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});

app.get('/excluirservico/:id', async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});

app.get('/excluiritem/:PedidoId/:ServicoId', async(req, res)=>{
    await itempedido.destroy({
        where: {PedidoId:req.params.PedidoId, ServicoId:req.params.ServicoId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});

app.post('/compras', async(req,res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra cadastrada com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});

app.post('/produtos', async(req,res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto criado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Foi impossivel se conectar."
        });
    });
});

app.post('/itemcompra', async(req,res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});

app.get('/listacompras', async(req, res)=>{
    await compra.findAll({
        //raw: true
        // order:[['clienteDesde', 'ASC']]
    }).then(function(compra){
        res.json({compra})
    });
});

app.get('/compras/:id', async(req, res)=>{
    await compra.findByPk(req.params.id,{include:[{all: true}]})
    .then(compra=>{
        return res.json({compra});
    })
} )

app.get('/compras/cliente/:ClienteId', async(req, res)=>{
    await compra.findAll({where: {ClienteId: req.params.ClienteId}})
    .then(compra=>{
        return res.json({compra});
    })
} )

app.get('/compras/:id/produtos', async(req, res)=>{
    await itemcompra.findAll({where: {CompraId: req.params.id}})
    .then(compra =>{
        return res.json({
            error: false,
            compra
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});

app.get('/listaprodutos', async(req, res)=>{
    await produto.findAll({
        //raw: true
        order:[['id', 'ASC']]
    }).then(function(produtos){
        res.json({produtos})
    });
});
app.get('/listaprodutos/:id', async(req, res)=>{
    await produto.findByPk(req.params.id,{include:[{all: true}]})
    .then(produto=>{
        return res.json({produto});
    })
})

app.get('/produtos/:id/compra', async(req, res)=>{
    await itemcompra.findAll({where: {ProdutoId: req.params.id}})
    .then(pro =>{
        return res.json({
            error: false,
            pro
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});

app.get('/listaitemcompra', async(req, res)=>{
    await itemcompra.findAll({
        order:[['CompraId', 'ASC']]
        //raw: true
    }).then(function(item){
        res.json({item})
    });
});
app.get('/itemproduto/:CompraId/:ProdutoId', async(req, res)=>{
    await itemcompra.findAll({where: {CompraId: req.params.CompraId, ProdutoId: req.params.ProdutoId}})
    .then(item =>{
        return res.json({item});

    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});

// app.get('/itemcompra/:id', async(req, res)=>{ //lista item por compraid
//     await itemcompra.findByPk(req.params.CompraId,{include:[{all: true}]})
//     .then(item=>{
//         return res.json({item});
//     })
// } )

app.put('/atualizacompra', async(req, res)=>{
    await compra.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Compra alterada com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

app.put('/compra/:id/editaritem', async(req, res)=>{
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'compra não encontrado.'
        });
    };

    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não encontrado.'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Compra alterada com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi preciso alterar"
        });
    });
});

app.put('/atualizaproduto', async(req, res)=>{
    await produto.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Produto alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

    app.put('/atualizaitensproduto', async(req, res)=>{
        await itemcompra.update(req.body,{
            where: {CompraId: req.body.CompraId, ProdutoId: req.body.ProdutoId}
            }).then(function(){
                return res.json({
                    error: false,
                    message: 'Item alterado com sucesso!'
                });
            }).catch(function(erro){
                return res.status(400).json({
                    error: true,
                    message:"Erro na alteração"
                });
            });
        });

app.get('/excluircompras/:id', async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra excluida com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir compra!'
        });
    });
});

app.get('/excluirproduto/:id', async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir produto!'
        });
    });
});

app.get('/excluiritemcompra/:CompraId/:ProdutoId', async(req, res)=>{
    await itemcompra.destroy({
        where: {CompraId: req.params.CompraId, ProdutoId: req.params.ProdutoId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir item!'
        });
    });
});

app.get('/excluiritemcompras/:ProdutoId', async(req, res)=>{
    await itemcompra.destroy({
        where: {ProdutoId: req.params.ProdutoId}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir item!'
        });
    });
});

let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})