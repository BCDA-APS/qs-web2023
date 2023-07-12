import React, {useState, useEffect} from 'react';
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
import { useDispatch } from 'react-redux';
import { getPlans, getDevices, getQueue } from '../../redux/serverSlice';

function Layout() {
    const dispatch = useDispatch(); 
    // TODO: , FIXME: design idea: change the text in the queue buttons to shorten section, maybe add the section ontop of 
    //something else and add the running plan on the top bar
    useEffect(() => {
        dispatch(getDevices());
        dispatch(getPlans());
    }, []);
    return (
        <div>
            {/*<Row>
                <Col>
                    <Row>
                        <Col>
                            <Status />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Queue />
                        </Col>
                        <Col>
                            <PlanExecution />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <RunningPlan />
                </Col>
    </Row>*/}
            <Row style={{ margin: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Col>
                <Row>
                <Queue />
                </Row>
                    <Row>
                    <PlanExecution />
                    </Row>
                    
                    
                </Col>
                <Col>
                    <Status />
                </Col>
                <Col>
                    <RunningPlan />
                </Col>
            </Row>
            <Row style={{ margin: '10px'}}>
                <Col sm="6">
                    <QueueConsole />
                </Col>
                <Col sm="6">
                    <History />
                </Col>
            </Row>
            <Row style={{ margin: '10px'}}>
                <ConsoleOutput />
            </Row>
        </div>
    );
};

export default Layout;