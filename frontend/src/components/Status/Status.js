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
import axios from 'axios';

function Status() {
    //Need to constantly update according to whether environment is created or closed and if queue starts or something or if history or queue is cleared
    //const [status, setStatus] = useState({});
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.server);

    useEffect(() => {
        dispatch(getStatus());
    }, []);

    useEffect(() => {
        (async () => {
        console.log("herein ");
        if (status.length !== 0 && status?.status?.running_item_uid !== null) {
            const val = await getItem(status?.status?.running_item_uid);
            console.log("valid: ", val);
        }
        })();
    }, [status?.status?.running_item_uid]);

    const getItem = async (id) => {
        try {
            console.log("status id: ", id);
            const url = 'http://localhost:3001/queue/get/item';
            const response = await axios.get(url, {id});
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <Card className='shadow'>
                <CardHeader style={{ background: 'unset', border: 'unset', textAlign: 'center'}} tag='h5'>
                    Status
                </CardHeader>
                <CardBody style={{ fontSize: '.875rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Row>
                        <Col
                            xs="6"
                        >
                            RE Environment: {status.status?.worker_environment_state === 'idle' ? 'OPEN' : status.status?.worker_environment_state}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue is Running: {status.status?.running_item_uid ? 'YES' : 'NO'}
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
                    
    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Status;