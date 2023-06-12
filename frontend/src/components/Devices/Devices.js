import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { ChevronUp, ChevronDown } from 'react-feather';

function Devices() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Button color="light" onClick={toggle} style={{ marginBottom: '1rem', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Devices {isOpen ? <ChevronUp /> : <ChevronDown />}
            </Button> 
            <Collapse isOpen={isOpen}>
                <Card>
                <CardBody>
                    Create Table For This Section
                </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};

export default Devices;