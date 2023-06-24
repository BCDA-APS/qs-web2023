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
            <Card>
                <CardHeader style={{ textAlign: 'center'}}>
                    Plan Execution
                </CardHeader>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                        <Button onClick={() => pausePlan("deferred")}>Pause: Deferred</Button>
                        <Button onClick={() => pausePlan("immediate")}>Pause: Immediate</Button>
                    </div>
                    <Row>
                        <Col>
                            <Button onClick={resumePlan}>Resume</Button>
                        </Col>
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