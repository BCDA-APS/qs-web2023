import React from 'react';
import {
    Button,
    Row,
    Card,
    CardBody
} from 'reactstrap';

function Environment() {
    return (
        <div>
            <Card>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Row>
                        Environment
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button>Open</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button>Close</Button>
                    </Row>
                    <Row style={{ width: '200px', margin: '5px'}}>
                        <Button>Destroy</Button>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default Environment;