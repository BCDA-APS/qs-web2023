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
    InputGroupText,
    FormGroup,
    Col
 } from 'reactstrap';
import { Check, X } from 'react-feather';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from '../../redux/serverSlice';

function Devices() {
    //When selecting a dectetor have a multi select where users can select one or more dectors from the list of devices
    //parse it into the list
    const dispatch = useDispatch(); 
    const [modal, setModal] = useState(false);
    
    const { devices } = useSelector(state => state.server);
    const [ currentList, setCurrentList ] = useState([]);
    const initialSearch = {
        search: '',
        module: '',
        classN: '',
        is_flyable: 'both',
        is_movable: 'both',
        is_readable: 'both',
    };
    const [ filterValues, setFilterValues ] = useState(initialSearch);
    const toggle = () => {
        setCurrentList(devices.deviceList);
        setFilterValues(initialSearch);
        setModal(!modal);
    };
    useEffect(() => {
        const filteredItems = devices.deviceList.filter((item) => {
            let check = {
                search: false,
                module: false,
                classN: false,
                is_flyable: false,
                is_movable: false,
                is_readable: false,
            };
            if (item.name.toLowerCase().includes(filterValues.search.toLowerCase())) {
                check.search = true;
            }

            if (item.classname.toLowerCase().includes(filterValues.classN.toLowerCase())) {
                check.classN = true;
            }

            if (item.module.toLowerCase().includes(filterValues.module.toLowerCase())) {
                check.module = true;
            }

            if ((filterValues.is_flyable === 'true') && (item.is_flyable === true)){
                check.is_flyable = true;
            }

            if ((filterValues.is_flyable === 'false') && (item.is_flyable === false)){
                check.is_flyable = true;
            }

            if (filterValues.is_flyable === 'both'){
                check.is_flyable = true;
            }

            if ((filterValues.is_movable === 'true') && (item.is_movable === true)){
                check.is_movable  = true;
            }

            if ((filterValues.is_movable  === 'false') && (item.is_movable  === false)){
                check.is_movable  = true;
            }

            if (filterValues.is_movable  === 'both'){
                check.is_movable = true;
            }

            if ((filterValues.is_readable === 'true') && (item.is_readable === true)){
                check.is_readable  = true;
            }

            if ((filterValues.is_readable  === 'false') && (item.is_readable  === false)){
                check.is_readable  = true;
            }

            if (filterValues.is_readable  === 'both'){
                check.is_readable = true;
            }

            const valuesArray = Object.values(check);
            //console.log("arr: ", valuesArray);

            if (!valuesArray.includes(false)){
                return item;
            }
        });
        setCurrentList([...filteredItems]); 
    }, [filterValues]);

    //add modules and classname, search by modules and classname
    //Inlcude check marks and red x's to symbolize the true and false, add a search section to search for names
    useEffect(() => {
        if (devices.length === 0) {
            //Checks to see if the devices state in redux is empty, if it is then we call the function to populate state with devices data
            dispatch(getDevices());
        } else {
            if (devices.devices.success) {
                setCurrentList(devices.deviceList);
            }
        }
    }, []);
    //Inlcude a section in filter to list devices that are readable and that arent
    const filterByName = (e) => {
        const { value, id } = e.target;
        setFilterValues({...filterValues, [id]: value});
    };

    const handleChecked = (e) => {
        const { name, id } = e.target;
        setFilterValues({...filterValues, [name]: id});
    };
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
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    
                                    <Button onClick={() => {
                                                    setFilterValues(initialSearch);
                                                    setCurrentList(devices.deviceList);
                                                    }} size='sm' style={{ marginBottom: '10px'}}>Reset Filter
                                    </Button>
                                </div>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                           <Label>
                                                <strong>
                                                    Search For a Device Name
                                                </strong>
                                            </Label>
                                            
                                            <Input 
                                                id={'search'}
                                                value={filterValues?.search}
                                                onChange={filterByName}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>
                                                <strong>
                                                    Search For a Device Class Name
                                                </strong>
                                            </Label>
                                        
                                            <Input 
                                                id={'classN'}
                                                value={filterValues?.classN}
                                                onChange={filterByName}
                                            />
                                        </FormGroup>            
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>
                                                <strong>
                                                    Search For a Device Module
                                                </strong>
                                            </Label>
                                        
                                            <Input 
                                                id={'module'}
                                                value={filterValues?.module}
                                                onChange={filterByName}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p style={{ textAlign: 'center'}}><strong>is_flyable</strong></p>
                                        <hr/>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_flyable'
                                                    id='true'
                                                    type="radio"
                                                    onChange={handleChecked}
                                                    checked={filterValues.is_flyable === 'true'}
                                                />
                                                {' '}
                                                <Label check>
                                                True
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_flyable'
                                                    id='false'
                                                    type="radio" 
                                                    onChange={handleChecked}
                                                    checked={filterValues.is_flyable === 'false'}
                                                />
                                                {' '}
                                                <Label check>
                                                    False
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_flyable'
                                                    id='both'
                                                    type="radio" 
                                                    onChange={handleChecked}
                                                    checked={filterValues.is_flyable === 'both'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Both
                                                </Label>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                
                                    <Col style={{ textAlign: 'center'}}>
                                        <strong>is_movable</strong>
                                        <hr/>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_movable'
                                                    id='true'
                                                    type="radio" 
                                                    onChange={handleChecked}
                                                    checked={filterValues.is_movable === 'true'}
                                                />
                                                {' '}
                                                <Label check>
                                                True
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_movable'
                                                    id='false'
                                                    type="radio" 
                                                    onChange={handleChecked}
                                                    checked={filterValues.is_movable === 'false'}
                                                />
                                                {' '}
                                                <Label check>
                                                    False
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_movable'
                                                    id='both'
                                                    type="radio" 
                                                    onChange={handleChecked} 
                                                    checked={filterValues.is_movable === 'both'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Both
                                                </Label>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col style={{ textAlign: 'center'}}>
                                        <strong>is_readable</strong>
                                        <hr/>
                                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_readable'
                                                    id='true'
                                                    type="radio" 
                                                    onChange={handleChecked}
                                                    checked={filterValues.is_readable === 'true'}
                                                />
                                                {' '}
                                                <Label check>
                                                True
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_readable'
                                                    id='false'
                                                    type="radio" 
                                                    onChange={handleChecked} 
                                                    checked={filterValues.is_readable === 'false'}
                                                />
                                                {' '}
                                                <Label check>
                                                    False
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Input 
                                                    name='is_readable'
                                                    id='both'
                                                    type="radio" 
                                                    onChange={handleChecked} 
                                                    checked={filterValues.is_readable === 'both'}
                                                />
                                                {' '}
                                                <Label check>
                                                    Both
                                                </Label>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                        
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='shadow' body>
                        <CardBody style={{ maxHeight: '500px', overflowY: 'scroll', height: '100%'}}>
                        {currentList.length > 0 ? <Table striped>
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
                                {currentList.map((item) => {
                                    return (
                                        <tr style={{ textAlign: 'center'}}>
                                            <td>
                                                <strong>
                                                    {item.name}
                                                </strong>
                                                
                                            </td>
                                            <td>
                                                {item?.classname}
                                            </td>
                                            <td>
                                                {item?.module}
                                            </td>
                                            <td>
                                                {item?.is_flyable? <Check color={'green'}/> : <X color={'red'}/>}
                                            </td>
                                            <td>
                                                {item?.is_movable? <Check color={'green'}/> : <X color={'red'}/>}
                                            </td>
                                            <td>
                                                {item?.is_readable? <Check color={'green'}/> : <X color={'red'}/>}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>  : <div style={{ width: '100%', textAlign: 'center'}}><p>No matching devices found for the provided search criteria.</p></div>}
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
    </div>
    );
};

export default Devices;