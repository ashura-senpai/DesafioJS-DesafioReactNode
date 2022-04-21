import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../configuracao";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const InfoPro = (props) => {

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getPro = async () => {
        await axios.get(api + "/produtos/" + id + "/compra")
            .then((response) => {
                console.log(response.data.pro);
                setData(response.data.pro);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };
    const apagarItem = async (ProdutoId, CompraId) => {

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.get(api + '/excluiritemcompra/' + CompraId + "/" + ProdutoId, { headers })
            .then((response) => {
                console.log(response.data.item);
                getPro();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };


    useEffect(() => {
        getPro();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <h1>Visualizar informações dos Produtos</h1>
                    <div className="m-auto p-2">
                        <Link to="/cadastraritemproduto/" className="btn btn-outline-primary btn-sm">Cadastrar Item-Produto</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}   </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra</th>
                            <th>Produto</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ProdutoId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarItem(item.ProdutoId, item.CompraId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};