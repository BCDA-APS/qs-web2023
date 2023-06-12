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

function ConsoleOutput() {
    return (
        <div>
            <Card body>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                        <div>
                            <Input type="checkbox" />
                            {' '}
                            <Label check>
                            Autoscroll
                            </Label>
                        </div>
                        <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '300px', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <Label style={{ marginRight: '5px'}}>
                                    Max Lines:
                                </Label>
                                <Input 
                                type={'number'}
                                style={{ width: '100px'}}
                                size={'sm'}
                                />
                            </div>
                            <Button>
                            Clear
                            </Button>
                        </div>
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

export default ConsoleOutput;