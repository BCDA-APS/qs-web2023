import React, { useEffect } from 'react';
import {
    Button,
    Row,
    Card,
    CardBody,
    Col
} from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../redux/serverSlice';

function Queue() {
    const dispatch = useDispatch();
    const { queue, status } = useSelector(state => state.server);
    useEffect(() => {
        if (status.length === 0) {
            dispatch(getStatus());
        }
    }, []);
    const startQueue = async () => {
        try {
          const url = 'http://localhost:3001/queue/start';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const stopQueue = async () => {
        try {
          const url = 'http://localhost:3001/queue/stop';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const cancelQueue = async () => {
        //DEletes everythign in queue
        try {
          const url = 'http://localhost:3001/queue/cancel';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div>
            <Card className='shadow'>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h5>
                        Queue
                    </h5>
                    <Row>
                        <Col>
                            <Button onClick={startQueue} disabled={status.status?.running_item_uid}>Start</Button>
                        </Col>
                        <Col>
                            <Button onClick={stopQueue} disabled={!status.status?.running_item_uid}>Stop</Button>
                        </Col>
                        
                    </Row>
                    {/*<Row style={{ width: '100px', margin: '5px'}}>
                        <Button onClick={startQueue}>Start</Button>
                    </Row>
                    <Row style={{ width: '100px', margin: '5px'}}>
                        <Button onClick={stopQueue}>Stop</Button>
                    </Row>
                    <Row style={{ width: '100px', margin: '5px'}}>
                        <Button onClick={cancelQueue}>Cancel</Button>
    </Row>*/}
                </CardBody>
            </Card>
        </div>
    );
};

export default Queue;