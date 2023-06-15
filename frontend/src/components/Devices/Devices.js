import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card, Table } from 'reactstrap';
import { ChevronUp, ChevronDown } from 'react-feather';
import axios from 'axios';

function Devices() {
    const [isOpen, setIsOpen] = useState(false);
    const [devices, setDevices] = useState({});
    const [names, setNames] = useState([]);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        (async () => {
            const value = await axios.get('http://localhost:3001/devices/allowed');
            if (value.status === 200) {
                if (value.data.devices.success) {
                    setDevices(value.data?.devices.devices_allowed);
                    //console.log("stuff: ", value.data?.devices);
                    const propertyNames = Object.keys(value.data?.devices.devices_allowed);
                    setNames(propertyNames);
                    //console.log("proper: ", propertyNames);
                }
                
            }
            //console.log("value: ", value);
        })();
        
    }, []);

    return (
        <div>
            <Button color="light" onClick={toggle} style={{ marginBottom: '1rem', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                Devices {isOpen ? <ChevronUp /> : <ChevronDown />}
            </Button> 
        
            <Collapse isOpen={isOpen}>
                <Card>
                <CardBody>
                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                is_flyable
                            </th>
                            <th>
                                is_movable
                            </th>
                            <th>
                                is_readable
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {names?.map((item) => {
                            return (
                                <tr>
                                    <td>
                                        {item}
                                    </td>
                                    <td>
                                        {devices[item]?.is_flyable.toString()}
                                    </td>
                                    <td>
                                        {devices[item]?.is_movable.toString()}
                                    </td>
                                    <td>
                                        {devices[item]?.is_readable.toString()}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </Table>
                </CardBody>
                </Card>
            </Collapse>
        </div>
    );
};

export default Devices;