import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../configuracao";

export const EditarCompra = (props) => {

    const [dataD, setDataD] = useState([]);
    const [id] = useState(props.match.params.id);
    const [data, SetData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const edtCompra = async e => {
        e.preventDefault();
        console.log("Editar");
        console.log(status);
        

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/atualizacompra", {id, data, ClienteId}, {headers})
        .then((response)=>{
            // console.log(response.data.error);
            // console.log(response.data.message);
            if(response.data.error){
                setStatus({
                    type:'error',
                    message: response.data.message
                });
            }else{
                setStatus({
                    type:'success',
                    message:response.data.message
                });
            }
        })
        .catch(()=>{
            setStatus({
                type:'error',
                message: 'Erro: Não foi possível conectar com a API.'
            });
        });
    }

    useEffect(() => {
        const getCompra = async () => {
            await axios.get(api + "/compras/" + id)
                .then((response) => {
                    console.log(response.data.compra.data)
                    console.log(response.data.compra.ClienteId)
                    SetData(response.data.compra.data);
                    setClienteId(response.data.compra.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: Não foi possivel conexao")
                })
        }
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div>
                    <h1>Editar Compra</h1>
                </div>

                <hr className="m-1" />
                
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={edtCompra}>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="date" name="data"
                            placeholder="Data do pedido" value={data}
                            onChange={e => SetData(e.target.value)} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>ClienteId</Label>
                        <Input type="text" name="ClienteId"
                            placeholder="Id do cliente" value={ClienteId}
                            onChange={e => setClienteId(e.target.value)} />
                    </FormGroup>

                    <Button type="submit" outline color="warning">Salvar</Button>

                </Form>
            </Container>
        </div>
    )
}