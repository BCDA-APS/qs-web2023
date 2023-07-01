import React, { useState, useEffect } from 'react';
import { 
    Collapse, 
    Button, 
    CardBody, 
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
    Card, 
    Table,
    Row,
    Input,
    Label,
    InputGroup,
    InputGroupText
 } from 'reactstrap';
import { Check, X } from 'react-feather';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from '../../redux/serverSlice';

function Devices() {
    //When selecting a dectetor have a multi select where users can select one or more dectors from the list of devices
    //parse it into the list
    const dispatch = useDispatch(); 
    const [ deviceNameList, setDeviceNameList ] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { devices } = useSelector(state => state.server);
    //add modules and classname
    //Inlcude check marks and red x's to symbolize the true and false, add a search section to search for names
    useEffect(() => {
        if (devices.length === 0) {
            //Checks to see if the devices state in redux is empty, if it is then we call the function to populate state with devices data
            dispatch(getDevices());
        } else {
            if (devices.devices.success) {
                //const attributeArray = Object.entries(devices.devices.devices_allowed).map(([key, value]) => ({ [key]: value }));
                //console.log(attributeArray);
                const propertyNames = Object.keys(devices.devices.devices_allowed);
                setDeviceNameList(propertyNames);

            }
        }
    }, []);
    //Inlcude a section in filter to list devices that are readable and that arent
    return (
        <div>
            <Card style={{ marginBottom: '10px'}} className='shadow'>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={toggle}>
                        View Available Devices
                    </Button>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle} size={'xl'}>
                <ModalHeader toggle={toggle}>Devices</ModalHeader>
                <ModalBody>
                    <Card style={{ marginBottom: '20px'}} className='shadow' body>
                        <CardBody>
                            <Label>
                                <strong>
                                Search For a Device
                                </strong>
                            </Label>
                            <Input 
                            
                            />
                            {/*<InputGroup color={'primary'}>
                                <InputGroupText>
                                To the Left!
                                </InputGroupText>
                                <Input />
    </InputGroup>*/}
                        </CardBody>
                    </Card>
                    <Card className='shadow' body>
                        <CardBody style={{ maxHeight: '500px', overflowY: 'scroll', height: '100%'}}>
                        <Table striped>
                            <thead>
                                <tr style={{ textAlign: 'center'}}>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Class Name
                                    </th>
                                    <th>
                                        Module
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
                                {deviceNameList?.map((item) => {
                                    return (
                                        <tr style={{ textAlign: 'center'}}>
                                            <td>
                                                <strong>
                                                    {item}
                                                </strong>
                                                
                                            </td>
                                            <td>
                                                {devices?.devices?.devices_allowed[item]?.classname}
                                            </td>
                                            <td>
                                                {devices?.devices?.devices_allowed[item]?.module}
                                            </td>
                                            <td>
                                                {devices?.devices?.devices_allowed[item]?.is_flyable? <Check color={'green'}/> : <X color={'red'}/>}
                                            </td>
                                            <td>
                                                {devices?.devices?.devices_allowed[item]?.is_movable? <Check color={'green'}/> : <X color={'red'}/>}
                                            </td>
                                            <td>
                                                {devices?.devices?.devices_allowed[item]?.is_readable? <Check color={'green'}/> : <X color={'red'}/>}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
    </div>
    );
};

export default Devices;