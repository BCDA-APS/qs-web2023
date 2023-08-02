import React, { useState, useEffect } from 'react';
import { 
    Button,  
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
    Table,
    Input,
    FormGroup,
 } from 'reactstrap';
import ServerCalls from "../../redux/serverCalls";
import { useDispatch, useSelector } from 'react-redux';
import { getQueue } from '../../redux/serverSlice';
import Select from 'react-select';
import InfoIcon from '../InfoIcon/InfoIcon';
import { Edit } from 'react-feather';
import CreatableSelect from 'react-select/creatable';
function EditItem({ queueItem }) {
    const dispatch = useDispatch(); 
    const [currentPlan, setCurrentPlan] = useState(null);
    const [modal, setModal] = useState(false); //Open modal
    const [ isHover, setHover] = useState(false); //set the hover state for the buttons
    const { plans, devices } = useSelector(state => state.server); //gets the device and plan data from redux
    const [check, setCheck] = useState({}); //lists which parameters are edited and which ones arent
    const [placeHolderValue , setPlaceHolderValues] = useState({}); //sets the placeholder values for the dealt params
    const [planValues, setPlanValues] = useState({}); //Value which will hold the parameter values
    const [deviceNames, setDevicesNames] = useState([]); //gets devices names for the dectors section
    const parameterNames = plans?.plans?.plans_allowed[queueItem.name]?.parameters.map(item => item.name); //gets list of parameters for plan
    const initialError = {
        status: false,
        message: ''
    };
    const [error, setError] = useState(initialError);
    const [planError, setPlanError] = useState({});

    //if modal is closed reset everything
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
        if (!modal) {
            if (plans.plans.success) {
                //Gets the plan details of the current plan that is being edited
                setCurrentPlan(plans?.plans.plans_allowed[queueItem.name]);
                let obj = {};
                let tempPlace = {};
                let tempValue = {};
                let tempError = {};
                //loops through the list of parameters for plan
                plans.plans.plans_allowed[queueItem.name].parameters.forEach((item, index) => {
                    //If no default then its locked, set its value as its default
                    if (item.hasOwnProperty('default')) {
                        obj[item.name] = {check: false, default: false};
                        tempPlace[item.name] = `${item.default} (Default Value)`;
                    } else {
                        //if its not default then set the value to empty
                        if (item.name === 'args') {
                            obj[item.name] = {check: false, default: false};
                        } else {
                            obj[item.name] = {check: true, default: true};
                        }
                        tempPlace[item.name] = `Enter a Value`;
                        tempValue[item.name] = '';
                    }
                    

                    if (queueItem.kwargs?.hasOwnProperty(item.name)) {
                        //get value thats already there
                        if (item.name === 'detectors') {
                            const newDevices = queueItem.kwargs[item.name].map(key => ({ id: key }));
                            tempValue[item.name] = newDevices;
                        } else {
                            //const valueJ = JSON.stringify(queueItem.kwargs[item.name]);
                            tempValue[item.name] = JSON.stringify(queueItem.kwargs[item.name] === null ? 'None' : queueItem.kwargs[item.name]);
                            //tempValue[item.name] = queueItem.kwargs[item.name];
                            //tempValue[item.name] = JSON.parse(valueJ?.message);
                        }
                        
                        //if it already has a value check its edit box
                        obj[item.name] = {...obj[item.name], check: true};
                    }

                    //if the plan has args then check the box for args
                    if (queueItem?.args?.length > 0) {
                        obj['args'] = {...obj['args'], check: true};
                    }   
                    //set the error value to false
                    tempError[item.name] = false;
                });
                
                const argsChecker = plans.plans.plans_allowed[queueItem.name].parameters.filter(planItem => planItem.name === 'args');
                //Checking if args are a param
                //Finding the index of args 
                const indexArgs = parameterNames.indexOf('args');
                if (argsChecker?.length > 0 && indexArgs !== -1 && queueItem?.args?.length > 0) {
                    //gets list of parameters that are before the args
                    const firstPart = parameterNames.slice(0, indexArgs);
                    //gets the corresponding list of values in args list
                    const slicedQueueArgs = queueItem?.args.slice(0, indexArgs);
                    //gets the value for args
                    const argsValues = queueItem?.args.slice(indexArgs);
                
                    firstPart.map((planI, indexI) => {
                        //map the corresponding values to its respective parameter
                        if (planI === 'detectors') {
                            const newDevices = slicedQueueArgs[indexI].map(key => ({ id: key }));
                            tempValue[planI] = newDevices;
                        } else {
                            //tempValue[planI] = JSON.stringify(slicedQueueArgs[indexI])//.replace(/"/g, "");
                            //tempValue[planI] = slicedQueueArgs[indexI];
                            tempValue[planI] = JSON.stringify(slicedQueueArgs[indexI] === null ? 'None' : slicedQueueArgs[indexI]);
                        }
                    });
                    
                    // Convert the array to the desired string format
                    if (argsValues.length > 0) {
                        const result = `(${argsValues.map(item => JSON.stringify(item)).join(', ')})`;
                        tempValue['args'] = result;
                    } else {
                        obj['args'] = {...obj['args'], check: false};
                    }
                    
                }
                setPlanError({...tempError});
                setPlanValues({...tempValue});
                setPlaceHolderValues(tempPlace);
                setCheck(obj);
            }       
            
            if (devices?.devices?.success) {
                //filter through the devices and get rid of any devices that has a classname that includes catalog
                const filteredList = devices?.deviceList?.filter(obj => !obj.classname.toLowerCase().includes('catalog'));
                const newArr = filteredList.map(item => { return {id: item.name}});
                setDevicesNames(newArr);
            }
        
        }
        setModal(!modal);
    };
   
    //function to handle checking the edit 
    const handleChecked = (e) => {
        const { checked, name, id } = e.target;
    
        let tempValue = {...planValues}; //current plan values
        let tempError = {...planError}; //current error values

        //Checks whether a paramter has a default value
        const val = plans.plans.plans_allowed[queueItem.name].parameters[id].default;
        //Changes current value to default value when text input is enabled
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

    //function to handle changing the input section for the parameter
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
        //const tempVal = value.replace(/"/g, "");
        setPlanValues({...planValues, [name]: value});
    };

    //function that handles the selection of the detectors
    const handleSelectDetectors = (e) => {
        //if a detector is selected the detector list is updated
        if (e !== null && e.length !== 0) {
            //If the detector list has at least one value unset any error
            setPlanError({...planError, detectors: false});
            setPlanValues({...planValues, detectors: e});
        } else {
            //If there is no detectors selected then set the error for detectors true
            setPlanError({...planError, detectors: true});
            setPlanValues({...planValues, detectors: []});
        }
    };

    //function that checks to see if all of the parameters that are checked have a value
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

    //function to submit changes to the api
    const updateItem = async () => {
        const canSubmit = errorChecker();
        if (canSubmit) {
            try {
                let stuff = {};//Value we will be submitting to the api
                //checks if args is a parameter and if its being used
                const argsChecker = plans.plans.plans_allowed[queueItem.name].parameters.filter(planItem => planItem.name === 'args');
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
                                    const arr = planValues[item].map((item) => item.id);
                                    tempArgsP.push(arr);
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
                                        const arr = planValues[itemName].map((item) => item.id);
                                        tempArgs[itemName] = arr;
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
                            stuff = {...queueItem, kwargs: {...tempArgs}, args: [...tempArgsP]};
                        }
                    
                    
                } else {
                    let tempArgs = {};
                    //getting rid of the parameters that aren't checked anymore
                    Object.entries(planValues).forEach(([key, value]) => {
                        if (check[key].check) {
                            if (key === 'detectors') {
                                const arr = value.map((item) => item.id);
                                tempArgs[key] = arr;
                            } else {
                                if (isNaN(value)) {
                                    try {
                                        tempArgs[key] = JSON.parse(value);
                                    } catch (error) {
                                        //const val = value.replace(/'/g, '"').replace(/`/g, '"');
                                        tempArgs[key] = value
                                    }
                                
                                } else {
                                    //turn value into a number
                                    tempArgs[key] = Number(value);
                                }
                            }
                        }
                    });
                    stuff = {...queueItem, kwargs: {...tempArgs}, args: []};
                }
                
                
                const { data, error } = await ServerCalls.editItem(stuff);
                if (error) {
                    setError({
                        status: true,
                        message: `${error}`
                    });
                } else {
                    setModal(!modal);
                    setError(initialError);
                    dispatch(getQueue());
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
            <Edit style={isHover ? {color: '#0d6efd'} : {color: 'black'}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={toggle}/>
        <Modal isOpen={modal} toggle={toggle} size={'lg'} backdrop={'static'}>
            <ModalHeader toggle={toggle}>Edit Plan</ModalHeader>
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
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        Parameter
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                    <th style={{ width: '450px'}}>
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
                                                    
                                                    {item.hasOwnProperty('description') && <InfoIcon header={item.name} content={item.description} id={`tooltip${index}`} />}
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
                                                    value={planValues[item.name]}
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
                                                    value={planValues[item.name]}
                                                    onCreateOption={handleCreate}
                                                    getNewOptionData={inputValue => ({ id: inputValue })}
                                                    onChange={handleSelectDetectors}
                                                    styles={planError['detectors'] && errorDropDown}
                                                /></>
                                                 :
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