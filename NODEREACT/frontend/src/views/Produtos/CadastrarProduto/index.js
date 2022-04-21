import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../configuracao";

export const CadastrarProduto = () => {

    const [produto, setProduto] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setProduto({
        ...produto, [e.target.name]: e.target.value
    });

    const cadProduto = async e => {
        console.log("Cadastrar");
        e.preventDefault();
        console.log(produto);

        const headers = {
            'Content-Type': "application/json"
        }

        await axios.post(api + "/produtos", produto, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: 'Erro: Sem conexão com a API.'
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    })
                }
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            })
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Produto</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-produto" className="btn btn-outline-primary btn-sm">Produtos</Link>
                </div>

            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadProduto}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do produto"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do produto"
                        onChange={valorInput} />
                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar</Button>
                <Button type="reset" outline color="success">
                    Limpar
                </Button>

            </Form>
        </Container>
    );
};