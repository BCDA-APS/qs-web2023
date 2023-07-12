import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label,
    Table,
    CardHeader,
    CardTitle
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../redux/serverSlice';


function Status() {
    //Need to constantly update according to whether environment is created or closed and if queue starts or something or if history or queue is cleared
    //const [status, setStatus] = useState({});
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.server);

    useEffect(() => {
        dispatch(getStatus());
    }, []);

 
    return (
        <div>
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} className='shadow' body>
                <CardHeader style={{ background: 'unset', border: 'unset', textAlign: 'center'}} tag='h5'>
                    Status
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col
                            xs="6"
                        >
                            RE Environment: {status.status?.worker_environment_state === 'idle' ? 'OPEN' : status.status?.worker_environment_state}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue is Running:
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            Manager State: {status.status?.manager_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue STOP Pending: {status.status?.queue_stop_pending ? 'YES' : 'NO'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            RE State: {status.status?.re_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue LOOP Mode: {status.status?.plan_queue_mode?.loop ? 'ON' : 'OFF'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            Items in History: {status.status?.items_in_history}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Items in Queue: {status.status?.items_in_queue}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Status;