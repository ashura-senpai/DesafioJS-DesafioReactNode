import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../configuracao";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarPedByClienteId = (props) => {

    const [data, setData] = useState([]);

    const [data2, setData2] = useState([]);


    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const [status2, setStatus2] = useState({
        type: '',
        message: ''
    });


    const getPed = async () => {
        await axios.get(api + "/pedidos/cliente/" + id)
            .then((response) => {
                console.log(response.data.ped);
                setData(response.data.ped);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };
    useEffect(() => {
        getPed();
    }, [])

    const getCompra = async () => {
        await axios.get(api + "/compras/cliente/" + id)
            .then((response) => {
                console.log(response.data.compra);
                setData2(response.data.compra);
            }).catch(() => {
                setStatus2({
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
                        <h1>Visualizar informações de Pedidos </h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarpedido" className="btn btn-outline-primary btn-sm">Cadastrar Pedido</Link>
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
                        {data.map(item => (
                            <tr key={item.ClienteId}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/listarpedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <Link to={"/editarpedido/" + item.id}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <hr className="m-5" />
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações de Compras </h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarcompra" className="btn btn-outline-primary btn-sm">Cadastrar Compras</Link>
                    </div>
                </div>
                {status2.type == 'error' ? <Alert className="text-center" color="danger"> {status2.message}   </Alert> : ""}
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
                        {data2.map(compra => (
                            <tr key={compra.ClienteId}>
                                <td>{compra.id}</td>
                                <td>{compra.data}</td>
                                <td>{compra.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/listarcompra/" + compra.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <Link to={"/editarcompra/" + compra.id}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

        </div>
    );
};