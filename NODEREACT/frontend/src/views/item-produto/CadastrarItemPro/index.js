import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../configuracao";

export const CadastrarItemPro = () => {

    const [item, setItem] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    });

    const cadItem = async e => {
        console.log("Cadastrar");
        e.preventDefault();
        console.log(item);

        const headers = {
            'Content-Type': "application/json"
        }

        await axios.post(api + "/itemcompra", item, { headers })
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
                    <h1>Cadastrar Item-Produto</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-item-produto" className="btn btn-outline-primary btn-sm">Itens-Produtos</Link>
                </div>

            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadItem}>
                <FormGroup className="p-2">
                    <Label>Compra Id</Label>
                    <Input type="text" name="CompraId" placeholder="Id da compra que será cadastrado"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Produto Id</Label>
                    <Input type="text" name="ProdutoId" placeholder="Id do produto que será necessário "
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do produto"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade de produtos"
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