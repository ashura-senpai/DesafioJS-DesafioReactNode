import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../configuracao";

export const EditarCliente = (props) => {

    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    const [nome, SetNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setclienteDesde] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCliente = async e => {
        e.preventDefault();
        console.log("Editar");

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/atualizaclientes", {id, nome, endereco, cidade, uf, nascimento, clienteDesde}, {headers})
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
        const getCliente = async () => {
            await axios.get(api + "/clientes/" + id)
                .then((response) => {
                    SetNome(response.data.cli.nome);
                    setEndereco(response.data.cli.endereco);
                    setCidade(response.data.cli.cidade);
                    setUf(response.data.cli.uf);
                    setNascimento(response.data.cli.nascimento);
                    setclienteDesde(response.data.cli.clienteDesde);

                })
                .catch(() => {
                    console.log("Erro: Não foi possivel conexao")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Editar Cliente</h1>
                </div>

                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtCliente}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome"
                            placeholder="Nome do cliente" value={nome}
                            onChange={e => SetNome(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Endereço</Label>
                        <Input type="text" name="descricao"
                            placeholder="Endereço do cliente" value={endereco}
                            onChange={e => setEndereco(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Cidade</Label>
                        <Input type="text" name="descricao"
                            placeholder="Endereço do cliente" value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Uf</Label>
                        <Input type="text" name="descricao"
                            placeholder="Endereço do cliente" value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Nascimento</Label>
                        <Input type="date" name="descricao"
                            placeholder="Endereço do cliente" value={nascimento}
                            onChange={e => setNascimento(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Cliente Desde</Label>
                        <Input type="date" name="descricao"
                            placeholder="Endereço do cliente" value={clienteDesde}
                            onChange={e => setclienteDesde(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" outline color="warning">Salvar</Button>

                </Form>
            </Container>
        </div>
    )
}