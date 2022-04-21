import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../configuracao";

export const EditarItemProduto = (props) => {
    
    const [data, setData] = useState([]);
    const [CompraId] = useState(props.match.params.CompraId);
    const [ProdutoId] = useState(props.match.params.ProdutoId);
    const [valor, SetValor] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtItemPro = async e => {
        e.preventDefault();
        console.log("Editar");

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/atualizaitensproduto", {CompraId, ProdutoId, valor, quantidade}, {headers})
        .then((response)=>{
            // console.log(response.data.error);
            // console.log(response.data.message);
            if(response.data.error){
                setStatus({
                    type:'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type:'success',
                    message:response.data.message
                });
            }
            
        })
        .catch(()=>{
            setStatus({
                type:'error',
                message: 'Erro: Não foi possível conectar com a API.'
            });
        });
        
    }

    useEffect(() => {
        const getItemPro = async () => {
            console.log(CompraId)
            console.log(ProdutoId)
            await axios.get(api + "/itemproduto/" + CompraId + "/" + ProdutoId)
                .then((response) => {
                    console.log(response);
                    console.log(response.data.item);
                    SetValor(response.data.item.valor);
                    setQuantidade(response.data.item.quantidade);
                })
                .catch(() => {
                    console.log("Erro: Não foi possivel conexao")
                })
        }
        getItemPro();
    }, [CompraId, ProdutoId]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Editar item-produto</h1>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtItemPro}>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor"
                            placeholder="Valor do item" value={valor}
                            onChange={e => SetValor(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade"
                            placeholder="Quantidade de itens" value={quantidade}
                            onChange={e => setQuantidade(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" outline color="warning">Salvar</Button>

                </Form>
            </Container>
        </div>
    )
}