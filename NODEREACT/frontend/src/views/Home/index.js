import { Card, CardBody, CardSubtitle, CardTitle, Container, Button, Col } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                </div>
                <hr className="m-1" />

                <div className="d-flex">
                    <div className="m-auto">
                        <div className="p-2">
                            <Card body color="success" outline>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Clientes
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Listar todos os Clientes
                                    </CardSubtitle>
                                    <Button href="/listar-clientes" color="success">
                                        Listar
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    <div className="m-auto">
                        <div className="p-2">
                            <Card body color="success" outline>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Pedidos
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Listar todos os Pedidos
                                    </CardSubtitle>
                                    <Button href="/listar-pedidos" color="success" >
                                        Listar
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    <div className="m-auto">
                        <div className="p-2">
                            <Card body color="success" outline>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Itens
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Listar todos os Itens
                                    </CardSubtitle>
                                    <Button href="/listar-item" color="success" >
                                        Listar
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    <div className="m-auto">
                        <div className="p-2">
                            <Card body color="success" outline>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Serviços
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Listar todos os Serviços
                                    </CardSubtitle>
                                    <Button href="/listar-servicos" color="success">
                                        Listar
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="d-flex">
                    <div className="m-auto">
                        <div className="p-2">
                            <Card body color="primary " outline>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Compras
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Listar todos as compras
                                    </CardSubtitle>
                                    <Button href="/listar-compra" color="primary ">
                                        Listar
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    
                    <div className="m-auto">
                        <div className="p-2">
                            <Card body color="primary " outline>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Itens-Produtos
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Listar todos os itens-produtos
                                    </CardSubtitle>
                                    <Button href="/listar-item-produto" color="primary ">
                                        Listar
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    <div className="m-auto">
                        <div className="p-2">
                            <Card body color="primary " outline>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Produtos
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6">
                                        Listar todos os produtos
                                    </CardSubtitle>
                                    <Button href="/listar-produto" color="primary ">
                                        Listar
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};