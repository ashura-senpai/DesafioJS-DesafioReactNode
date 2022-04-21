import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../configuracao";

export const EditarProduto = (props) => {

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    const [nome, SetNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtProduto = async e => {
        e.preventDefault();
        console.log("Editar");

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/atualizaproduto", {id, nome, descricao}, {headers})
        .then((response)=>{
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
        const getProduto = async () => {
            await axios.get(api + "/listaprodutos/" + id)
                .then((response) => {
                    SetNome(response.data.produto.nome);
                    setDescricao(response.data.produto.descricao);
                })
                .catch(() => {
                    console.log("Erro: Não foi possivel conexao")
                })
        }
        getProduto();
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Editar serviço</h1>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtProduto}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            placeholder="Nome do Produto" value={nome}
                            onChange={e => SetNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao"
                            placeholder="Des do Produto" value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" outline color="warning">Salvar</Button>

                </Form>
            </Container>
        </div>
    )
}