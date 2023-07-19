import React from 'react';
import {
    Button,
    Row,
    Card,
    CardBody,
} from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../redux/serverSlice';
import DestroyEnvironment from '../DestroyEnvironment/DestroyEnvironment';

function Environment() {
    const { status } = useSelector(state => state.server);
    

    const openEnvironment = async () => {
        try {
          const url = 'http://localhost:3001/environment/open';
      
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const closeEnvironment = async () => {
        try {
          const url = 'http://localhost:3001/environment/close';
      
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div>
            <Card style={{ marginBottom: '10px'}} className='shadow'>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h5>
                        Run Engine (RE)
                    </h5>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={openEnvironment} color='success' disabled={status.status?.worker_environment_state === 'idle' || status.status?.worker_environment_state === 'initializing'}>Start</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={closeEnvironment} color='warning' disabled={status.status?.worker_environment_state === 'closed' || status.status?.worker_environment_state === 'initializing'}>Stop</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <DestroyEnvironment />
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Environment;