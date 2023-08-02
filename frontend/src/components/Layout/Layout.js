import React, {useEffect} from 'react';
import {
    Row,
    Container,
    Card
} from 'reactstrap';
import ConsoleOutput from '../ConsoleOutput/ConsoleOutput';
import RunningPlan from '../RunningPlan/RunningPlan';
import History from '../History/History';
import QueueConsole from '../QueueConsole/QueueConsole';
import Status from '../Status/Status';
import { useDispatch } from 'react-redux';
import { getPlans, getDevices } from '../../redux/serverSlice';

function Layout() {
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(getDevices());
        dispatch(getPlans());
    }, []);
    return (
        <div>
            <Row>
            </Row>
            <Card style={{ margin: '10px', display: 'flex', flexDirection: 'row'}} body>
               
                <Container style={{ maxWidth: '500px'}}>
                    <QueueConsole />
                </Container>
                <Container style={{ maxWidth: '400px'}}>
                    <Status />
                    <hr/>
                    <RunningPlan />
                </Container>
                <Container style={{ maxWidth: '500px'}}>
                    <History />
                </Container>
                
            </Card>
            <Card style={{ margin: '10px'}} body>
                <ConsoleOutput />
           </Card>
        </div>
    );
};

export default Layout;