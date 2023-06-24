import React from 'react';
import {
    Button,
    Row,
    Card,
    CardBody
} from 'reactstrap';
import axios from 'axios';

function Environment() {
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

    const destroyEnvironment = async () => {
        try {
          const url = 'http://localhost:3001/environment/destroy';
      
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
                    <h5>
                        Environment
                    </h5>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={openEnvironment}>Open</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={closeEnvironment}>Close</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button onClick={() => {console.log("destroyed")}}>Destroy</Button>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Environment;