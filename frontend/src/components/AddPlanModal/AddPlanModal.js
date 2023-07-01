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
    FormGroup
 } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans, getDevices, getQueue } from '../../redux/serverSlice';
import Select from 'react-select';
import axios from 'axios';

function AddPlanModal() {
    //Add Error checking to make sure that all required fields are filled out and if they aren't disable add button
    const dispatch = useDispatch(); 
    const [currentPlan, setCurrentPlan] = useState(null);
    const [modal, setModal] = useState(false); //Open modal
    const [ planNames, setPlanNames ] = useState([]); //Get Plan names for select dropdown
    const toggle = () => setModal(!modal);
    const [ currentPlanName, setCurrentPlanName] = useState(null); //set the current plan name
    const { plans, devices } = useSelector(state => state.server);
    const [parameters, setParameters] = useState({});
    const [check, setCheck] = useState({}); //lists which parameters are edited and which ones arent
    const [placeHolderValue , setPlaceHolderValues] = useState({}); //sets the placeholder values for the dealt params
    const [planValues, setPlanValues] = useState({});
    const [deviceNames, setDevicesNames] = useState([]); //gets devices names for the dectors section
    const initialError = {
        status: false,
        message: ''
    };
    const [error, setError] = useState(initialError);
    const [planError, setPlanError] = useState({});

    const handleClose = () => {
        setModal(!modal);
        setCurrentPlan(null);
        setError(initialError);
        setCurrentPlanName(null);
        setCheck({});
        setPlaceHolderValues({});
        setPlanValues({});
        setPlanError({});
    };
    //if detector classname does have catalog in the name do not include it in the list of detectors to add to plan
    useEffect(() => {
        if (plans.length === 0) {
            //Checks to see if the plans state in redux is empty, if it is then we call the function to populate state with devices data
            dispatch(getPlans());
        } else {
            if (plans?.plans?.success) {
                //const propertyNames = Object.keys(plans.plans.plans_allowed);
                const newVal = Object.keys(plans.plans.plans_allowed).map(key => ({ id: key }));
                setPlanNames(newVal);
                //console.log("proper: ", newVal);
            }
        }

        if (devices.length === 0) {
            dispatch(getDevices());
        } else {
            if (devices?.devices?.success) {
                const newDevices = Object.keys(devices.devices.devices_allowed).map(key => ({ id: key }));
                //console.log("new: ", newDevices);
                setDevicesNames(newDevices);
            }
        }
    }, []);

    const handleSelect = (e) => {
        //Handle the changes being made when a plan is selected
        console.log("E: ", e?.id);
        if (e !== null) {
            let obj = {};
            let tempPlace = {};
            let tempValue = {};
            let tempError = {};
            plans.plans.plans_allowed[e?.id].parameters.forEach(item => {
                //If no default then its locked
                
                if (item.hasOwnProperty('default')) {
                    obj[item.name] = {check: false, default: false};
                    tempPlace[item.name] = `${item.default} (Default Value)`;
                } else {
                    obj[item.name] = {check: true, default: true};
                    tempPlace[item.name] = `Enter a Value`;
                    tempValue[item.name] = '';
                }
                tempError[item.name] = false;
            });
            setPlanError({...tempError});
            setPlanValues({...tempValue});
            setPlaceHolderValues(tempPlace);
            setCheck(obj);
            setCurrentPlanName(e?.id);
            setCurrentPlan(plans.plans.plans_allowed[e?.id]);
        } else {
            setCurrentPlanName(null);
            setCurrentPlan(null);
        }
    };

    const handleChecked = (e) => {
        const { checked, name, id } = e.target;
        let tempValue = {...planValues}; //current plan values
        let tempError = {...planError};
        const val = plans.plans.plans_allowed[currentPlanName].parameters[id].default;
        if (checked) {  
            tempValue[name] = val === 'None' ? '' : val;
            tempError[name] = false;
        } else {
            tempValue[name] = '';
        }
        console.log("temp: ", tempValue);
        setPlanValues({...tempValue});
        setCheck({...check, [name]: {...check[name], check: checked}});
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setPlanValues({...planValues, [name]: value});
    };

    const handleSelectDetectors = (e) => {
        console.log("e select: ", e);
        console.log("ch: ", check);
        if (e !== null) {
            const arr = e.map((item) => item.id);
            setPlanValues({...planValues, detectors: arr});
        } else {
            setPlanValues({...planValues, detectors: []});
        }
    };

    const addToQueue = async () => {
        //item:='{"name":"count", "args":[["det1", "det2"]], "item_type": "plan"}'
        //['user_group', 'user', 'item', 'pos', 'before_uid', 'after_uid', 'lock_key']
        const url = 'http://localhost:3001/queue/add';
        let tempArgs = {};
        //getting rid of the parameters that aren't checked anymore
        Object.entries(planValues).forEach(([key, value]) => {
            if (check[key].check) {
                tempArgs[key] = value;
            }
        });
        //console.log("tem: ", tempArgs);
        const item = {
            pos: 'back',
            item: {name: currentPlanName, kwargs: {...tempArgs}, item_type: 'plan'}
        };
        console.log("item: ", item);
        /*const item = {
            name: currentPlan.name,
            item_type: currentPlan.item_type,
            args
        }*/
        
        const response = await axios.post(url, item);
        if (response.data.queue.success) {
            dispatch(getQueue());
            handleClose();
        } else {
            setError({
                message: response.data.queue.msg,
                error: true,
            });
        }
        if (response.status === 200) {
            dispatch(getQueue());
        }
        console.log("Response: ", response);
        
    }

    return (
        <div>
            <Card style={{ marginBottom: '10px'}} className='shadow'>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={toggle}>
                        Add Plan to Queue
                    </Button>
                </CardBody>
            </Card>
        <Modal isOpen={modal} toggle={toggle} size={'lg'} backdrop={'static'}>
            <ModalHeader toggle={toggle}>Add Plan to Queue</ModalHeader>
            <ModalBody>
                <Card className='shadow'>
                    <CardBody>
                        <Label>
                            <strong>
                                Select a Plan to Preview/Add
                            </strong>
                        </Label>
                        <Select
                            options={planNames}
                            getOptionValue={(options) => options['id']}
                            getOptionLabel={(options) => options['id']}
                            isClearable={true}
                            onChange={handleSelect}
                        />
                    </CardBody>
                </Card>

                {currentPlan && 
                <Card style={{ marginTop: '20px'}} className='shadow'>
                    <CardBody>
                        <h5 style={{ textAlign: 'center', marginBottom: '10px', marginTop: '10px'}}>
                            <strong>{currentPlanName}</strong>
                        </h5>
                        {
                            currentPlan?.description ? 
                            <h6 style={{ textAlign: 'center', marginBottom: '10px', marginTop: '10px'}}>
                            <strong>Description:</strong> {currentPlan?.description}
                            </h6> : null
                        }
                        
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        Parameter
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                    <th>
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPlan?.parameters?.map((item, index) => {
                                        return (
                                            <tr>
                                                <th>
                                                    {item.name}
                                                </th>
                                                <th>
                                                    <FormGroup check>
                                                        <Input 
                                                            type="checkbox" 
                                                            checked={check[item.name].check}
                                                            disabled={check[item.name].default}
                                                            id={index}
                                                            name={item.name}
                                                            onChange={handleChecked}
                                                        />
                                                    </FormGroup>
                                                </th>
                                                <th>
                                                {item.name === 'detectors' ? 
                                                <Select
                                                    options={deviceNames}
                                                    getOptionValue={(options) => options['id']}
                                                    getOptionLabel={(options) => options['id']}
                                                    isClearable={true}
                                                    isMulti={true}
                                                    onChange={handleSelectDetectors}
                                                /> :
                                                    <Input 
                                                        value={planValues[item.name] === null? '' : planValues[item.name]} //Fix so that it shows array
                                                        readOnly={!check[item.name].check}
                                                        placeholder={check[item.name].check ? 'Enter a Value': placeHolderValue[item.name]}
                                                        onChange={handleChange}
                                                        name={item.name}
                                                        id={item.name}
                                                        invalid={planError[item.name]}
                                                    />}
                                                </th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        {error && <p style={{ color: 'red', textAlign: 'center'}}>
                            {error?.message}
                            </p>}
                    </CardBody>
                </Card>}
            </ModalBody>
            <ModalFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button color="primary" onClick={addToQueue}>
                Add Plan To Queue
            </Button>
            <Button color="secondary" onClick={handleClose}>
                Cancel
            </Button>
            </ModalFooter>
        </Modal>
        </div>
    );
}

export default AddPlanModal;