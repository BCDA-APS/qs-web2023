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

function History() {
    return (
        <div>
            <Card>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <p>
                            History
                        </p>
                        <Button>Copy to Queue</Button>
                        <Button>Deselect All</Button>
                        <Button>Clear All</Button>
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

export default History;