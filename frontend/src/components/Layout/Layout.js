import React, {useState, useEffect} from 'react';
import {
    Row,
    Col,
    Container
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
            <Row>
                <Container style={{ maxWidth: '550px'}}>
                    <QueueConsole />
                </Container>
                <Container style={{ maxWidth: '400px'}}>
                    <Status />
                    <RunningPlan />
                </Container>
                <Container style={{ maxWidth: '550px'}}>
                    <History />
                </Container>
            </Row>
            <Row>
                <Container>
                    <ConsoleOutput />
                </Container>
            </Row>
            
            
            {/*<Row style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Col>
                    <QueueConsole />
                </Col>
                <Col>
                    <History />
                </Col>
            </Row>
            <Row>
                <ConsoleOutput />
    </Row>*/}

            {/*<Row>
                <Col>
                    <Status />
                </Col>
                <Col>
                <PlanExecution />
                </Col>
               
            </Row>
            <Row style={{ margin: '10px'}}>
                <Col>
                    
                    <RunningPlan />

                </Col>
                <Col>
                    <QueueConsole />
                </Col>
                <Col>
                    <History />
                </Col>
                
            </Row>
            <Row style={{ margin: '10px'}}>
            <ConsoleOutput />
</Row>*/}
        </div>
    );
};

export default Layout;