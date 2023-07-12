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
import InfoIcon from '../InfoIcon/InfoIcon';

function EditItem({ queueItem }) {
    //TODO: instead of disaptch the consoluid check just use the axios api call
    //Add Error checking to make sure that all required fields are filled out and if they aren't disable add button
    const dispatch = useDispatch(); 
    const [currentPlan, setCurrentPlan] = useState(null);
    const [modal, setModal] = useState(false); //Open modal
    const [ planNames, setPlanNames ] = useState([]); //Get Plan names for select dropdown
    
    const [ currentPlanName, setCurrentPlanName] = useState(null); //set the current plan name
    const { plans, devices } = useSelector(state => state.server);
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
        setCheck({});
        setPlaceHolderValues({});
        setPlanValues({});
        setPlanError({});
    };
    const toggle = () => {
        console.log("plans: ", plans.plans.success);
        console.log("mo: ", modal);
        if (!modal) {
            
            if (plans.plans.success) {
                console.log("here")
                //Gets the plan details of the current plan that is being edited
                setCurrentPlan(plans?.plans.plans_allowed[queueItem.name]);
                let obj = {};
                let tempPlace = {};
                let tempValue = {};
                let tempError = {};
                plans.plans.plans_allowed[queueItem.name].parameters.forEach(item => {
                    //console.log("item: ", item);
                    //If no default then its locked
                    if (item.hasOwnProperty('default')) {
                        obj[item.name] = {check: false, default: false};
                        tempPlace[item.name] = `${item.default} (Default Value)`;
                    } else {
                        obj[item.name] = {check: true, default: true};
                        tempPlace[item.name] = `Enter a Value`;
                        tempValue[item.name] = '';
                    }
                    if (queueItem.kwargs?.hasOwnProperty(item.name)) {
                        //get value thats already there
                        if (item.name === 'detectors') {
                            //console.log("val: ", queueItem.kwargs[item.name]);
                            const newDevices = queueItem.kwargs[item.name].map(key => ({ id: key }));
                            tempValue[item.name] = newDevices;
                        } else {
                            tempValue[item.name] = JSON.stringify(queueItem.kwargs[item.name]);
                        }
                        
                        
                        obj[item.name] = {...obj[item.name], check: true};
                    }
                    
                    tempError[item.name] = false;
                });
                //console.log("valuesf: ", tempValue);
                setPlanError({...tempError});
                setPlanValues({...tempValue});
                setPlaceHolderValues(tempPlace);
                setCheck(obj);
    
            }       
            
            if (devices?.devices?.success) {
                const newDevices = Object.keys(devices.devices.devices_allowed).map(key => ({ id: key }));
                //console.log("new: ", newDevices);
                setDevicesNames(newDevices);
            }
        
        }
        setModal(!modal)
    };
    //TODO: if detector classname does have catalog in the name do not include it in the list of detectors to add to plan
    /*useEffect(() => {
        if (plans.plans.success) {
            //Gets the plan details of the current plan that is being edited
            setCurrentPlan(plans?.plans.plans_allowed[queueItem.name]);
            let obj = {};
            let tempPlace = {};
            let tempValue = {};
            let tempError = {};
            plans.plans.plans_allowed[queueItem.name].parameters.forEach(item => {
                //If no default then its locked
                if (item.hasOwnProperty('default')) {
                    obj[item.name] = {check: false, default: false};
                    tempPlace[item.name] = `${item.default} (Default Value)`;
                } else {
                    obj[item.name] = {check: true, default: true};
                    tempPlace[item.name] = `Enter a Value`;
                    tempValue[item.name] = '';
                }
                if (queueItem.kwargs?.hasOwnProperty(item.name)) {
                    //get value thats already there
                    tempValue[item.name] = queueItem.kwargs[item.name];
                    obj[item.name] = {...obj[item.name], check: true};
                }
                
                tempError[item.name] = false;
            });
            setPlanError({...tempError});
            setPlanValues({...tempValue});
            setPlaceHolderValues(tempPlace);
            setCheck(obj);

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
    }, []);*/

    const handleChecked = (e) => {
        const { checked, name, id } = e.target;
        console.log("n: ", name);
        
        let tempValue = {...planValues}; //current plan values
        let tempError = {...planError};
        const val = plans.plans.plans_allowed[queueItem.name].parameters[id].default;
        //console.log("valPla: ", plans.plans.plans_allowed[]);
        
        if (checked) {  
            tempValue[name] = val === 'None' ? '' : val;
        } else {
            tempValue[name] = '';
        }
        //Unset the error for the property to false
        tempError[name] = false;
        setPlanError({...tempError});
        setPlanValues({...tempValue});
        setCheck({...check, [name]: {...check[name], check: checked}});
    };

    const handleChange = (e) => {
        //Gets the name and value of each input section for each parameter
        const { value, name } = e.target;
        //Once a input value is changed the parameters for the plan is updated
        //If the parameter is empty then set the error to true if not then set it to false
        if (value === '' || value === null) {
            setPlanError({...planError, [name]: true});
        } else {
            setPlanError({...planError, [name]: false});
        }
        setPlanValues({...planValues, [name]: value});
    };

    const handleSelectDetectors = (e) => {
        //Handles the selection of the detectors
        //if a detector is selected the detector list is updated
        console.log("goo: ", e);
        if (e !== null && e.length !== 0) {
            //const arr = e.map((item) => item.id);
            //console.log("arr: ", arr);
            //If the detector list has at least one value unset any error
            setPlanError({...planError, detectors: false});
            setPlanValues({...planValues, detectors: e});
        } else {
            //If there is no detectors selected then set the error for detectors true
            setPlanError({...planError, detectors: true});
            setPlanValues({...planValues, detectors: []});
        }
    };

    const errorChecker = () => {
        //Checks to see if all of the parameters that are checked have a value
        let tempError = {...planError};
        let submit = true;
        for (let key in planValues) {
            if (check[key]) {
                //Makes sure that were only checking for parameters that are checked and required to be filled out
                //Checks if the required parameters are filled out and if not set the error to true
                if (key === 'detectors' && (planValues['detectors'].length === 0 || planValues['detectors'] === '')) {
                    tempError['detectors'] = true;
                    submit = false;
                }

                if (planValues[key] === null || planValues[key] === '' || planValues[key] === undefined) {
                    tempError[key] = true;
                    submit = false;
                }
            }
        }
        if (!submit) {
            setError({
                status: true,
                message: 'Please fill out all required fields'
            });
        } else {
            setError(initialError);
        }

        setPlanError({...tempError});
        return submit;
    };

    const updateItem = async () => {
        const canSubmit = errorChecker();
        if (canSubmit) {
            const url = 'http://localhost:3001/queue/update';
            let tempArgs = {};
            //getting rid of the parameters that aren't checked anymore
            Object.entries(planValues).forEach(([key, value]) => {
                if (check[key].check) {
                    if (key === 'detectors') {
                        const arr = value.map((item) => item.id);
                        tempArgs[key] = arr;
                    } else {
                        if (isNaN(value)) {
                            tempArgs[key] = value;
                        } else {
                            //turn value into a number
                            tempArgs[key] = Number(value);
                        }
                    }
                }
            });
            const stuff = {...queueItem, kwargs: {...tempArgs}}
            const response = await axios.post(url, stuff);
            console.log("Response: ", response);
            setModal(!modal);
            dispatch(getQueue());
        }

        
    }

    
    const errorDropDown = {
        control: (base) => ({
            ...base,
            border: '1px solid #dc3545 !important'
        })
    };

    return (
        <div>
            <Button onClick={toggle} color='primary'>
                Edit
            </Button>
        <Modal isOpen={modal} toggle={toggle} size={'lg'} backdrop={'static'}>
            <ModalHeader toggle={toggle}>Edit Plan to Queue</ModalHeader>
            <ModalBody>

                        <h5 style={{ textAlign: 'center', marginBottom: '10px', marginTop: '10px'}}>
                            <strong>{queueItem.name}</strong>
                        </h5>
                        {
                            currentPlan?.description ? 
                            <h6 style={{ textAlign: 'center', marginBottom: '10px', marginTop: '10px'}}>
                            <strong>Description:</strong> {currentPlan?.description}
                            </h6> : null
                        }
                        {/*<Button onClick={() => console.log("it: ", queueItem)}>Click</Button>
                        <Button onClick={() => console.log("newitem: ", queueItem)}>ClickMe</Button>*/}
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
                                                <th style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                    {item.name}
                                                    <InfoIcon header={item.name} content={item.description} id={item.name.concat(`${index}`)}/>
                                            
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
                                                    value={planValues[item.name]}
                                                    options={deviceNames}
                                                    getOptionValue={(options) => options['id']}
                                                    getOptionLabel={(options) => options['id']}
                                                    isClearable={true}
                                                    isMulti={true}
                                                    onChange={handleSelectDetectors}
                                                    styles={planError['detectors'] && errorDropDown}
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
            </ModalBody>
            <ModalFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button color="primary" onClick={updateItem}>
                Update Plan
            </Button>
            <Button color="secondary" onClick={handleClose}>
                Cancel
            </Button>
            </ModalFooter>
        </Modal>
        </div>
    );
}

export default EditItem;