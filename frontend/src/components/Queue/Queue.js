import React from 'react';
import {
    Button,
    Row,
    Card,
    CardBody
} from 'reactstrap';

function Queue() {
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
                        <Button>Start</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button>Stop</Button>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Queue;