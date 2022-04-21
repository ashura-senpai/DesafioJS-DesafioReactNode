import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../configuracao";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getCompra = async () => {
        await axios.get(api + "/listacompras")
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
    const apagarCompra = async (id) => {

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.get(api + '/excluircompras/' + id, { headers })
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
    }, [])

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações das Compras </h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="cadastrarcompra" className="btn btn-outline-primary btn-sm">Cadastrar Compra</Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}   </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>ClienteId</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compra => (
                            <tr key={compra.id}>
                                <td>{compra.id}</td>
                                <td>{compra.data}</td>
                                <td>{compra.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/listarcompra/" + compra.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <Link to={"/editarcompra/" + compra.id}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarCompra(compra.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};