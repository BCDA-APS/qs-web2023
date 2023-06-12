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

function QueueConsole() {
    return (
        <div>
            <Card>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <p>
                            Queue
                        </p>
                        <Button size='sm'>Up</Button>
                        <Button size='sm'>Down</Button>
                        <Button size='sm'>Top</Button>
                        <Button size='sm'>Bottom</Button>
                        <Button size='sm'>Deselect</Button>
                        <Button size='sm'>Clear</Button>
                        <Button size='sm'>Loop</Button>
                        <Button size='sm'>Delete</Button>
                        <Button size='sm'>Duplicate</Button>
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

export default QueueConsole;