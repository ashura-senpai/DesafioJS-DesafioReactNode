import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../configuracao";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const InfoCompra = (props) => {

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getCompra = async () => {
        await axios.get(api + "/compras/" + id + "/produtos")
            .then((response) => {
                console.log(response.data.compra);
                setData(response.data.compra);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };
    const apagarItem = async (CompraId, ProdutoId) => {

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.get(api + '/excluiritemcompra/' + CompraId + '/' + ProdutoId, { headers })
            .then((response) => {
                console.log(response.data.compra);
                getCompra();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };


    useEffect(() => {
        getCompra();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <h1>Visualizar informações das Compras do Cliente</h1>
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
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.CompraId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/editaritemproduto/" + item.CompraId + '/' + item.ProdutoId}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarItem(item.CompraId, item.ProdutoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};