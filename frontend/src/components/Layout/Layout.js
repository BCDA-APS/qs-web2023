import React, {useState} from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader
} from 'reactstrap';
import ConnectionControl from '../ConnectionControl/ConnectionControl';
import Devices from '../Devices/Devices';
import ConsoleOutput from '../ConsoleOutput/ConsoleOutput';
import RunningPlan from '../RunningPlan/RunningPlan';
import Environment from '../Environment/Environment';
import Queue from '../Queue/Queue';
import History from '../History/History';
import QueueConsole from '../QueueConsole/QueueConsole';
import Plans from '../Plans/Plans';
import Status from '../Status/Status';
import PlanExecution from '../PlanExecution/PlanExecution';

function Layout() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <Container>
            <Button
                color="primary"
                onClick={toggle}
            >
                Open
            </Button>
            <Offcanvas toggle={toggle}>
                <OffcanvasHeader toggle={toggle}>
                Offcanvas
                </OffcanvasHeader>
                <OffcanvasBody>
                <strong>
                    This is the Offcanvas body.
                </strong>
                </OffcanvasBody>
            </Offcanvas>
           {/* <Row>
                <Col
                    className="bg-light border"
                    xs="6"
                    >
                    .col-6
                </Col>
                <Col
                    className="bg-light border"
                    xs="6"
                    >
                    .col-6
                </Col>
            </Row>
            <Row>
                <Col>
                    <Environment />
                </Col>
                <Col>
                    <Queue />
                </Col>
                <Col className="bg-light border">
                .col
                </Col>
                <Col className="bg-light border">
                .col
                </Col>
    </Row>*/}
            <Row>
                <Col xs="6">
                    hey
                </Col>
                <Col xs="6">
                    <RunningPlan />
                </Col>
            </Row>
            <Row>
                <QueueConsole />y
            </Row>
            <Row>
                <Col>
                    <Environment />
                </Col>
                <Col>
                    <Queue />
                </Col>
                <Col>
                    <PlanExecution />
                </Col>
            </Row>
            <Row>
                <Status />
            </Row>
            <Row>
                <Plans />
            </Row>
            <Row>
                <History />
            </Row>
            <Row>
                <Col>
                    <ConsoleOutput />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Devices />
                </Col>
            </Row>
            {/*<Row>
                <Col className="bg-light border">
                .col
                </Col>
</Row>*/}
        </Container>
    );
};

export default Layout;