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
import { Plus, PlusCircle } from 'react-feather';

function AddPlanModal() {
    //Add Error checking to make sure that all required fields are filled out and if they aren't disable add button
    const dispatch = useDispatch(); 
    const [currentPlan, setCurrentPlan] = useState(null);
    const [modal, setModal] = useState(false); //Open modal
    const [ planNames, setPlanNames ] = useState([]); //Get Plan names for select dropdown
    const toggle = () => setModal(!modal);
    const [ currentPlanName, setCurrentPlanName] = useState(null); //set the current plan name
    const { plans, devices } = useSelector(state => state.server);
    const [check, setCheck] = useState({}); //lists which parameters are edited and which ones arent
    const [placeHolderValue , setPlaceHolderValues] = useState({}); //sets the placeholder values for the dealt params
    const [planValues, setPlanValues] = useState({});
    const [ isHover, setHover] = useState(false);
    const [deviceNames, setDevicesNames] = useState([]); //gets devices names for the dectors section
    const initialError = {
        status: false,
        message: ''
    };
    const [error, setError] = useState(initialError);
    const [planError, setPlanError] = useState({});
//TODO: Not everything is a default <= args is not default
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
    //TODO: if detector classname does have catalog in the name do not include it in the list of detectors to add to plan
    useEffect(() => {
        (async () => {
        if (plans.length === 0) {
            //Checks to see if the plans state in redux is empty, if it is then we call the function to populate state with devices data
            const val = await dispatch(getPlans());
            if (val.payload.plans.success) {
                const newVal = Object.keys(val.payload.plans.plans_allowed).map(key => ({ id: key }));
                setPlanNames(newVal);
            }
        } else {
            if (plans?.plans?.success) {
                //const propertyNames = Object.keys(plans.plans.plans_allowed);
                const newVal = Object.keys(plans.plans.plans_allowed).map(key => ({ id: key }));
                setPlanNames(newVal);
                //console.log("proper: ", newVal);
            }
        }

        if (devices.length === 0) {
            const valDevices = await dispatch(getDevices());
            if (valDevices.payload.devices.success) {
                const newDevices = Object.keys(valDevices.payload.devices.devices_allowed).map(key => ({ id: key }));
                //console.log("new: ", newDevices);
                setDevicesNames(newDevices);
            }
        } else {
            if (devices?.devices?.success) {
                const newDevices = Object.keys(devices.devices.devices_allowed).map(key => ({ id: key }));
                //console.log("new: ", newDevices);
                setDevicesNames(newDevices);
            }
        }
        })();
    }, []);

    const handleSelect = (e) => {
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
            setError(initialError);
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
        if (e !== null && e.length !== 0) {
            const arr = e.map((item) => item.id);
            //If the detector list has at least one value unset any error
            setPlanError({...planError, detectors: false});
            setPlanValues({...planValues, detectors: arr});
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
            if (check[key].check) {
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

    const addToQueue = async () => {
        const canSubmit = errorChecker();
        if (canSubmit) {
            //item:='{"name":"count", "args":[["det1", "det2"]], "item_type": "plan"}'
            //['user_group', 'user', 'item', 'pos', 'before_uid', 'after_uid', 'lock_key']
            
            const url = 'http://localhost:3001/queue/add';
            let tempArgs = {};
            //getting rid of the parameters that aren't checked anymore
            Object.entries(planValues).forEach(([key, value]) => {
                if (check[key].check) {
                    if (isNaN(value)) {
                        tempArgs[key] = value;
                    } else {
                        //turn value into a number
                        tempArgs[key] = Number(value);
                    }
                    
                }
            });
            //console.log("tem: ", tempArgs);
            const item = {
                pos: 'back',
                item: {name: currentPlanName, kwargs: {...tempArgs}, item_type: 'plan'}
            };
            
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
    }
    
    const errorDropDown = {
        control: (base) => ({
            ...base,
            border: '1px solid #dc3545 !important'
        })
    };

    return (
        <div>
            
            <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', /* Adjust the size as needed */
    height: '40px', /* Adjust the size as needed */
    borderRadius: '50%',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', /* Customize the shadow as desired */
  }}><Plus size={20} style={isHover ? {color: '#0d6efd'} : {color: 'black'}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={toggle}/></div>
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