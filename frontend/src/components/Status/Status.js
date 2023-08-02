import React, { useEffect } from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    CardHeader
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../redux/serverSlice';

function Status() {
    const dispatch = useDispatch();
    //Grabs the status from the redux store
    const { status } = useSelector(state => state.server);

    //Calls the function to get the status from the api
    useEffect(() => {
        dispatch(getStatus());
    }, []);

    return (
        <div>
            <Card style={{ border: 'unset'}}>
                <CardHeader style={{ background: 'unset', border: 'unset', textAlign: 'center'}} tag='h5'>
                    Status
                </CardHeader>
                <CardBody style={{ fontSize: '.875rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Row>
                        <Col
                            xs="6"
                        >
                            <strong>RE Environment:</strong> {status.status?.worker_environment_state === 'idle' ? 'OPEN' : status.status?.worker_environment_state}
                        </Col>
                        <Col
                            xs="6"
                        >
                            <strong>Queue is Running:</strong> {status.status?.running_item_uid ? 'YES' : 'NO'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            <strong>Manager State:</strong> {status.status?.manager_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            <strong>Queue STOP Pending:</strong> {status.status?.queue_stop_pending ? 'YES' : 'NO'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            <strong>RE State:</strong> {status.status?.re_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            <strong>Queue LOOP Mode:</strong> {status.status?.plan_queue_mode?.loop ? 'ON' : 'OFF'}
                        </Col>
                    </Row>
                    <Row>
                    
                </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Status;