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
import Status from '../Status/Status';

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
                    hey
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
                    Hey
                </Col>
            </Row>
            <Row>
                <Environment />
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