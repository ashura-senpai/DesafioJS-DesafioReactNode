import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../configuracao";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarItemPro = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getItensPro = async () => {
        await axios.get(api + "/listaitemcompra")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                })
            })
    }

    const apagarItemPro = async (CompraId, ProdutoId) => {
        await axios.get(api + "/excluiritemcompra/" + CompraId + '/' + ProdutoId)
            .then((response) => {
                console.log(response.data.error);
                getItensPro();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getItensPro();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos Itens-Produtos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="cadastraritemproduto" className="btn btn-outline-primary btn-sm">Cadastrar Itens-Produtos</Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>CompraId</th>
                            <th>ProdutoId</th>
                            <th>Valor</th>
                            <th>Quantidade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.CompraId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.valor}</td>
                                <td>{item.quantidade}</td>
                                <td className="text-center/">
                                    <Link to={"/editaritemproduto/" + item.CompraId + '/' + item.ProdutoId}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarItemPro(item.CompraId, item.ProdutoId)}>Excluir</span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};