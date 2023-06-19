import React from 'react';
import {
    Button,
    Row,
    Card,
    CardBody,
    Col
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
            <Card>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Row>Plan Execution</Row>
                    <Row>
                        <Col>
                            <Button onClick={() => pausePlan("deferred")}>Pause: Deferred</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => pausePlan("immediate")}>Pause: Immediate</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={stopManager}>Stop MAnager</Button>
                        <Button onClick={resumePlan}>Resume</Button>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={stopPlan}>Stop</Button>
                        </Col>
                        <Col>
                            <Button onClick={abortPlan}>Abort</Button>
                        </Col>
                        <Col>
                            <Button onClick={haltPlan}>Halt</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default PlanExecution;