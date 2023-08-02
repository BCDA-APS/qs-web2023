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
    Tooltip
 } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans, getDevices, getQueue } from '../../redux/serverSlice';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import InfoIcon from '../InfoIcon/InfoIcon';
import { Plus } from 'react-feather';
import ServerCalls from "../../redux/serverCalls";

function AddPlanModal() {
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
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const handleClose = () => {
        setModal(!modal);
        setCurrentPlan(null);
        setError(initialError);
        setCurrentPlanName(null);
        setCheck({});
        setPlaceHolderValues({});
        setPlanValues({});
        setPlanError({});
        setDevicesNames([]);
    };

    useEffect(() => {
        (async () => {
        if (plans.length === 0) {
            //Checks to see if the plans state in redux is empty, if it is then we call the function to populate state with devices data
            const val = await dispatch(getPlans());
            if (val?.payload?.plans.success) {
                const newVal = Object.keys(val?.payload?.plans.plans_allowed).map(key => ({ id: key }));
                setPlanNames(newVal);
            }
        } else {
            if (plans?.plans?.success) {
                const newVal = Object.keys(plans.plans.plans_allowed).map(key => ({ id: key }));
                setPlanNames(newVal);
            }
        }

        //create lists device names
        if (devices.length === 0) {
            const valDevices = await dispatch(getDevices());
            if (valDevices?.payload?.devices.success) {
                const deviceListNew = Object.entries(valDevices?.payload?.devices.devices_allowed).map(([name, obj]) => ({ name, ...obj }));
                const filteredList = deviceListNew?.filter(obj => !obj.classname.toLowerCase().includes('catalog'));
                const newArr = filteredList.map(item => { return {id: item.name}});
                setDevicesNames(newArr);
            }
        } else {
            if (devices?.devices?.success) {
                const filteredList = devices?.deviceList?.filter(obj => !obj.classname.toLowerCase().includes('catalog'));
                const newArr = filteredList.map(item => { return {id: item.name}});
                setDevicesNames(newArr);
            }
        }
        })();
    }, []);

    //function that handles selecting a plan to add
    const handleSelect = (e) => {
        if (e !== null) {
            let obj = {};
            let tempPlace = {};
            let tempValue = {};
            let tempError = {};
            plans.plans.plans_allowed[e?.id].parameters.forEach(item => {
                //If no default then its locked
                //sets the default value in placehold
                if (item.hasOwnProperty('default')) {
                    obj[item.name] = {check: false, default: false};
                    tempPlace[item.name] = `${item.default} (Default Value)`;
                } else {
                    if (item.name === 'args') {
                        obj[item.name] = {check: false, default: false};
                    } else {
                        obj[item.name] = {check: true, default: true};
                    }
                    tempPlace[item.name] = `Enter a Value`;
                    tempValue[item.name] = '';
                }
                tempError[item.name] = false;
            });
            if (devices?.devices?.success) {
                const filteredList = devices?.deviceList?.filter(obj => !obj.classname.toLowerCase().includes('catalog'));
                const newArr = filteredList.map(item => { return {id: item.name}});
                setDevicesNames(newArr);
            }
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
            setPlanError({});
            setPlanValues({});
            setPlaceHolderValues({});
            setCheck({});
        }
    };

    //function that handles checking edit section for parameter
    const handleChecked = (e) => {
        const { checked, name, id } = e.target;
        let tempValue = {...planValues}; //current plan values
        let tempError = {...planError}; //current error
        //get default value for parameter
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

    //function that handles changing the input within a parameter
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

    //Handles the selection of the detectors
    const handleSelectDetectors = (e) => {  
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

    //Checks to see if all of the parameters that are checked have a value
    const errorChecker = () => {
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
            let stuff = {};
            try {
                
                const parameterNames = plans?.plans?.plans_allowed[currentPlanName]?.parameters.map(item => item.name);
            
                //checks if args is a parameter and if its being used
                const argsChecker = plans.plans.plans_allowed[currentPlanName].parameters.filter(planItem => planItem.name === 'args');
                if (argsChecker?.length > 0 && check['args'].check) 
                {
                    //Finding the index of args 
                    const indexArgs = parameterNames.indexOf('args');
                    let tempArgsP = [];
                    let tempArgs = {};
                    if (argsChecker?.length > 0 && indexArgs !== -1) {
                        //There is an args
                        //Gets a array of parameters before the args parameter
                        const firstPart = parameterNames.slice(0, indexArgs);
                        //maps through the list of parameters and pushes it to a array, since the args parameter is a array
                        firstPart.map(item => {
                            if (item === 'detectors') {
                                //checks if the parameter is a detector
                                //const arr = planValues[item].map((item) => item.id);
                                tempArgsP.push(planValues[item]);
                            } else {
                                //if it isn't try parsing it and putting in the appropriate value
                                try {
                                    tempArgsP.push(JSON.parse(planValues[item]));
                                } catch (error) {
                                    try {
                                        tempArgsP.push(planValues[item]);
                                    } catch (errorAfter) {
                                        setError({
                                            status: true,
                                            message: `${errorChecker}`
                                        });
                                    }
                                }
                                
                            }
                        
                        })
                        let strValues = [];
                        const chars = planValues['args'].split('');
                        const openingParenthesesCount = chars.filter(char => char === '(').length;
                        const closingParenthesesCount = chars.filter(char => char === ')').length;
                        const openingBracketCount = chars.filter(char => char === '[').length;
                        const closingBracketCount = chars.filter(char => char === ']').length;


                        //for the values that may start with these characters, strip them then divide the string
                        if ((planValues['args'].startsWith("(") 
                        && planValues['args'].endsWith(")")
                        && openingParenthesesCount === 1 
                        && closingParenthesesCount === 1) 
                         ||
                        (planValues['args'].startsWith("[") 
                        && planValues['args'].endsWith("]")
                        && openingBracketCount === 1 
                        && closingBracketCount === 1)
                        ) {
                            strValues = planValues['args'].slice(1, -1).split(', ');
                        }
                         else {
                            strValues = planValues['args'].split(', ');
                        }
                        strValues.map((item) => {
                            //parse the values
                            try {
                                if ((item.startsWith('"') && item.endsWith('"'))) {
                                        tempArgsP.push(item.slice(1, -1));
                                    } else if (!isNaN(item)) {
                                        tempArgsP.push(parseFloat(item));
                                    } else {
                                        tempArgsP.push(JSON.parse(item));
                                    }
                            } catch (error) {
                                try {
                                    tempArgsP.push(item);
                                } catch (errorAfter) {
                                    setError({
                                        status: true,
                                        message: `${errorChecker}`
                                    });
                                }
                                
                            }
                            
                        });
                        //Parameters that come after the args
                        const secondPart = parameterNames.slice(indexArgs + 1);
                        
                        secondPart.map((itemName) => {
                            if (check[itemName].check) {
                                if (itemName === 'detectors') {
                                    //const arr = planValues[itemName].map((item) => item.id);
                                    tempArgs[itemName] = planValues[itemName];
                                } else {
                                    if (isNaN(planValues[itemName])) {
                                        try {
                                            tempArgs[itemName] = JSON.parse(planValues[itemName]);
                                        } catch (error) 
                                        {
                                            try {
                                                tempArgs[itemName] = planValues[itemName];
                                            } catch (secondError) {
                                                setError({
                                                    status: true,
                                                    message: `${secondError}`
                                                });
                                            }
                                        }
                                        
                                    } else {
                                        //turn value into a number
                                        tempArgs[itemName] = Number(planValues[itemName]);
                                    }
                                }
                            }
                        });
                        stuff = {name: currentPlanName, kwargs: {...tempArgs}, args: [...tempArgsP], item_type: 'plan'};
                    }      
                } else {
                    let tempArgs = {};
                    //getting rid of the parameters that aren't checked anymore
                    Object.entries(planValues).forEach(([key, value]) => {
                        if (check[key].check) {
                            if (key === 'detectors') {
                                //const arr = value.map((item) => item.id);
                                tempArgs[key] = planValues[key];
                            } else {
                                if (isNaN(value)) {
                                    try {
                                        tempArgs[key] = JSON.parse(value);
                                    } catch (error) {
                                        //const val = value.replace(/'/g, '"').replace(/`/g, '"');
                                        tempArgs[key] = value;
                                    }
                                
                                } else {
                                    //turn value into a number
                                    tempArgs[key] = Number(value);
                                }
                            }
                        }
                    });
                    stuff = {name: currentPlanName, kwargs: {...tempArgs}, args: [], item_type: 'plan'};
                }
                const item = {
                    pos: 'back',
                    item: stuff
                };

                const { data, error } = await ServerCalls.addToQueue(item);
        
                if (data.queue.success) {
                    dispatch(getQueue());
                    handleClose();
                } else {
                    setError({
                        message: `${data.queue.msg === '' ? error : data.queue.msg}`,
                        error: true,
                    });
                }
            } catch (err) {
                setError({
                    status: true, 
                    message: `Oops, an error occurred. Please review the form and try again. \n ${err}`});
           
            }
        }
    }
    
    const errorDropDown = {
        control: (base) => ({
            ...base,
            border: '1px solid #dc3545 !important'
        })
    };

    //Function to add on new device to list of devices
    const handleCreate = (e) => {
        let temp = [...deviceNames];
        temp.push({id: e});
        setDevicesNames([...temp]);
    };

    return (
        <div>
            
            <div onClick={toggle} id='addPlanTool' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={ isHover ? {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px', /* Adjust the size as needed */
            height: '40px', /* Adjust the size as needed */
            borderRadius: '50%',
            boxShadow: '0 .5rem 1rem rgba(0,0,255,.25)', /* Customize the shadow as desired */
        }: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px', 
            borderRadius: '50%',
            boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', 
        }}><Plus size={20} style={isHover ? {color: 'rgb(0,0,255)'} : {color: 'black'}} /></div>
        <Tooltip
        placement={'bottom'}
        isOpen={tooltipOpen}
        target={'addPlanTool'}
        toggle={toggleTooltip}
      >
        Add New Plan to Queue
      </Tooltip>
        
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
                                    <th style={{ Width: '450px'}}>
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
                                                    {item.name === 'args' ? `*${item.name}` : item.name}
                                                    {item.hasOwnProperty('description') && <InfoIcon header={item.name} content={item.description} id={item.name.concat(`${index}`)}/>}
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
                                                <th style={{ width: '450px'}}>
                                                {item.name === 'detectors' ? 
                                                <>{/*<Select
                                                    options={deviceNames}
                                                    getOptionValue={(options) => options['id']}
                                                    getOptionLabel={(options) => options['id']}
                                                    isClearable={true}
                                                    isMulti={true}
                                                    onChange={handleSelectDetectors}
                                                    styles={planError['detectors'] && errorDropDown}
                                        />*/}
                                                <CreatableSelect
                                                    options={deviceNames}
                                                    getOptionValue={(options) => options['id']}
                                                    getOptionLabel={(options) => options['id']}
                                                    isClearable={true}
                                                    isMulti={true}
                                                    onCreateOption={handleCreate}
                                                    getNewOptionData={inputValue => ({ id: inputValue })}
                                                    onChange={handleSelectDetectors}
                                                    styles={planError['detectors'] && errorDropDown}
                                                />
                                                </> :
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
            <Button color="primary" onClick={addToQueue} disabled={currentPlan === null}>
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