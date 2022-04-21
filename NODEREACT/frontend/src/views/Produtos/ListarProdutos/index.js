import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../configuracao";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarProdutos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                })
            })
    }

    const apagarProduto = async (id) => {
        await axios.get(api + "/excluirproduto/" + id)
            .then((response) => {
                console.log(response.data.error);
                getProdutos();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getProdutos();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos Produtos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="cadastrarproduto" className="btn btn-outline-primary btn-sm ">Cadastrar Produtos</Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center/">
                                    <Link to={"/listarproduto/" + item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <Link to={"/editarproduto/"+item.id}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarProduto(item.id)}>Excluir</span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};