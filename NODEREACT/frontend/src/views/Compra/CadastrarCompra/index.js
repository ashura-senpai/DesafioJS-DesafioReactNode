import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../configuracao";

export const CadastrarCompra = () => {

    const [compra, setCompra] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setCompra({
        ...compra, [e.target.name]: e.target.value
    });

    const cadCompra = async e => {
        console.log("Cadastrar");
        e.preventDefault();
        console.log(compra);

        const headers = {
            'Content-Type': "application/json"
        }

        await axios.post(api + "/compras", compra, { headers })
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
                    <h1>Cadastrar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compra" className="btn btn-outline-dark btn-sm">Compras</Link>
                </div>

            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCompra}>

                <FormGroup className="p-2">
                    <Label>Data da Compra</Label>
                    <Input type="date" name="data" placeholder="Data"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>ClienteId</Label>
                    <Input type="text" name="ClienteId" placeholder="Id da Compra"
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