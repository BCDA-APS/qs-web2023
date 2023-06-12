import React from 'react';
import {
    Button,
    Container,
    Row,
    Col
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

function Layout() {
    return (
        <Container>
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
                    <Plans />
                </Col>
                <Col xs="6">
                    <RunningPlan />
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <QueueConsole />
                </Col>
                <Col xs="6">
                    <History />
                </Col>
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