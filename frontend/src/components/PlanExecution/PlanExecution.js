import React from 'react';
import {
    Button,
    Row,
    Card,
    CardBody,
    Col,
    CardHeader
} from 'reactstrap';
import axios from 'axios';

function PlanExecution() {
    const pausePlan = async (type) => {
        try {
          const url = 'http://localhost:3001/plans/pause';
          const response = await axios.post(url, { option: type });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const resumePlan = async () => {
        try {
          const url = 'http://localhost:3001/plans/resume';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const stopPlan = async () => {
        try {
          const url = 'http://localhost:3001/plans/stop';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const abortPlan = async () => {
        try {
          const url = 'http://localhost:3001/plans/abort';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const haltPlan = async () => {
        try {
          const url = 'http://localhost:3001/plans/halt';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };
    //http://localhost:60610/api/manager/stop option="safe_on"
    const stopManager = async () => {
        try {
            const url = 'http://localhost:3001/plans/stop/manager';
            const response = await axios.post(url);
            console.log(response.data);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    return (
        <div>
            <Card className='shadow' body>
                <CardBody>
                        <h5 style={{ textAlign: 'center'}}>Plan Execution</h5>
                    <Row style={{ margin: '10px'}}>
                        <Col>
                            <Button onClick={() => pausePlan("deferred")} style={{width: '100%'}}>Pause: Deferred</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => pausePlan("immediate")} style={{width: '100%'}}>Pause: Immediate</Button>
                        </Col>
                    </Row>
                    
                    <Row style={{ margin: '10px'}}>
                        <Col>
                            <Button onClick={resumePlan} style={{width: '100%'}}>Resume</Button>
                        </Col>
                    </Row>
                    <Row style={{ margin: '10px'}}>
                        <Col>
                            <Button onClick={stopPlan} style={{width: '100%'}}>Stop</Button>
                        </Col>
                        <Col>
                            <Button onClick={abortPlan} style={{width: '100%'}}>Abort</Button>
                        </Col>
                        <Col>
                            <Button onClick={haltPlan} style={{width: '100%'}}>Halt</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default PlanExecution;