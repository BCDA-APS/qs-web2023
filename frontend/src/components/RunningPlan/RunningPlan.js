import React from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label
} from 'reactstrap';

function RunningPlan() {
    //dont update the running plan if queue is running if the rm is idle
    //include a configuration modal in sidebar to ask user to customize the amount of seconds to check for new information
    return (
        <div>
            <Card body className='shadow' style={{ minHeight: '300px'}}>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                        <h5>
                            Running Plan
                        </h5>
                        <Button>Copy to Queue</Button>
                    </div>
                    <Row>
                        <Col>
                            <Input
                                type='textarea'
                                readOnly={true}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default RunningPlan;