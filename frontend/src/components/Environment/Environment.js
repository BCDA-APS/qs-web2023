import React, { useState } from 'react';
import {
    Button,
    Row,
    Card,
    CardBody,
    Col
} from 'reactstrap';
import { useSelector } from 'react-redux';
import DestroyEnvironment from '../DestroyEnvironment/DestroyEnvironment';
import ServerCalls from "../../redux/serverCalls";

function Environment() {
    //Gets data about status from redux store
    const { status } = useSelector(state => state.server);
    const [ error, setError ] = useState(null);

    //Function to open the environment
    const openEnvironment = async () => {
        const { data, error } = await ServerCalls.openEnvironment();
        setError(error);
    };

    //Function to close the environment
    const closeEnvironment = async () => {
        const { data, error } = await ServerCalls.closeEnvironment();
        setError(error);
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
                    {error !== null && 
                    <Row>
                    <Col>
                        <p style={{ color: 'red', textAlign: 'center'}}>
                            Error: {error}
                        </p>
                    </Col>
                </Row>}
                </CardBody>
            </Card>
        </div>
    );
};

export default Environment;