import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../configuracao";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const InfoPed = (props) => {

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getPed = async () => {
        await axios.get(api + "/pedidos/" + id + "/servico")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };
    const apagarItem = async (PedidoId, ServicoId) => {

        const headers = {
            'Content-type': 'application/json'
        };

        await axios.get(api + '/excluiritem/' + PedidoId + '/' + ServicoId, { headers })
            .then((response) => {
                console.log(response.data.item);
                getPed();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };


    useEffect(() => {
        getPed();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex p-2">
                    <h1>Visualizar informações dos Pedidos do Cliente</h1>
                    <div className="m-auto p-2">
                        <Link to="/cadastraritem/" className="btn btn-outline-primary btn-sm">Cadastrar Item</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}   </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Serviço</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.PedidoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/editaritem/" + item.PedidoId + '/' + item.ServicoId}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarItem(item.PedidoId, item.ServicoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};