import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label,
    Table
} from 'reactstrap';
import axios from 'axios';

function Status() {
    //Need to constantly update according to whether environment is created or closed and if queue starts or something or if history or queue is cleared
    const [status, setStatus] = useState({});
    useEffect(() => {
        (async () => {
            const value = await axios.get('http://localhost:3001/status');
            if (value.status === 200) {
                setStatus(value.data.status);
            }
        })();
    }, []);

 
    return (
        <div>
            <Card>
                <CardBody>
                    <Row>
                        <Col
                            xs="6"
                        >
                            RE Environment: {status?.worker_environment_state === 'idle' ? 'OPEN' : status?.worker_environment_state}
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
                            Manager State: {status?.manager_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue STOP Pending: {status?.queue_stop_pending ? 'YES' : 'NO'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            RE State: {status?.re_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue LOOP Mode: {status?.plan_queue_mode?.loop ? 'ON' : 'OFF'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            Items in History: {status?.items_in_history}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Items in Queue: {status?.items_in_queue}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Status;