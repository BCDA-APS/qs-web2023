import React, {useState} from 'react';
import {
    Row,
    Col,
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
    return (
        <div>
            {/*<Row>
                <Status />
            </Row>
            <Row>
                <Col>
                    <Queue />
                </Col>
                <Col>
                    <PlanExecution />
                </Col>
            </Row>
            <Row>
                
                <Col>
                    <RunningPlan />
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <QueueConsole />
                </Col>
                <Col>
                    <History />
                </Col>
    </Row>*/}
            <Row>
                <ConsoleOutput />
            </Row>
        </div>
    );
};

export default Layout;