import React from 'react';
import {
    Button,
    Row,
    Card,
    CardBody
} from 'reactstrap';
import axios from 'axios';

function Queue() {
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
            <Card>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Row>
                        Queue
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        Status
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={startQueue}>Start</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={stopQueue}>Stop</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={cancelQueue}>Cancel</Button>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Queue;