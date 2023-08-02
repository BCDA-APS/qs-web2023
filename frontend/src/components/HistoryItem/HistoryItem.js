import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Tooltip,
    Input,
    FormGroup
} from 'reactstrap';
import { useSelector } from 'react-redux';
import ViewResults from '../ViewResults/ViewResults';

function HistoryItem(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [currentCheckList, setCurrentCheck] = useState([...props.checkedList]);
    const { history, plans } = useSelector(state => state.server);
    const parameterNames = plans?.plans?.plans_allowed[props.item.name]?.parameters.map(item => item.name);
    
    useEffect(() => {
        setCurrentCheck([...props.checkedList]);
    }, [props.checkedList])

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const replacer = (key, value) => {
        if (typeof value === 'string' && value.startsWith("'") && value.endsWith("'")) {
          // If the value is a string enclosed in single quotes, remove the quotes
          return value.slice(1, -1) === null ? 'None' : value.slice(1, -1);
        } else {
          return value === null ? 'None' : value;
        }
    };

    //Print parameters
    const printParama = (args) => {
        let result = [];
        if (props.item.args?.length > 0) {
            //uses args
            const indexArgs = parameterNames?.indexOf('args');
            const firstPart = parameterNames?.slice(0, indexArgs); // Elements from index 0 to splitIndex - 1
            const slicedQueueArgs = props.item.args.slice(0, indexArgs);
            const argsValues = props.item.args.slice(indexArgs);
            let resultArr = firstPart?.map((planI, indexI) => {
                return `${planI}: ${JSON.stringify(slicedQueueArgs[indexI])}`;
            });
            
            const resultVal = `*args: (${argsValues.map(item => JSON.stringify(item, replacer)).join(', ')})`;
            if (resultArr) {
                resultArr?.push(resultVal);
                result = [...result, ...resultArr];
            }
            
        }
        
        const other = Object.entries(args)
        .map(([key, value]) => `${key}: ${JSON.stringify(value, replacer)}`);
        
        result = [...result, ...other].join(', '); 
        
        return result;
    };

    //Check if history item is in the checklist
    const isInArr = (item) => {
        const isIncluded = currentCheckList.includes(item);
        return isIncluded;
    };

    //Function to handle when item is checked
    const handleChecked = (e) => {
        const { checked, name } = e.target;
        let arr = [...currentCheckList];
        
        if (checked) {
            arr.push(history?.history?.items[name]);
        } else {
            const index = arr.indexOf(history?.history?.items[name]);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        props.setCheckList([...arr]);
        setCurrentCheck([...arr]);
    };

    return (
        <Card style={{ margin: '5px 0px', maxWidth: '500px', maxHeight: '100px', minHeight: '80px', height: '80px'}} className='shadow'>
            <CardBody style={{ width: '100%', height: '100%'}}>
                <Row style={{ display: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <Col xs='1'>
                    <FormGroup check>
                        <Input
                            type="checkbox" 
                            id={props.item.name}
                            name={props.index}
                            onChange={handleChecked}
                            checked={isInArr(props.item)}
                        />
                    </FormGroup>
                    </Col>
                    <Col style={{ fontSize: '.875rem', display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '160px', overflowX: 'auto', whiteSpace: 'nowrap', margin: '0px 5px'}}>
                        <strong>{props.item?.name}</strong>
                        <ViewResults obj={props.item}/>
                    </Col>
                    <Col style={{ fontSize: '.875rem', display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '160px', overflowX: 'auto', whiteSpace: 'nowrap', margin: '0px 5px'}}>
                        <strong id={`exitStatus${props.index}`}>{props.item?.result.exit_status}</strong>
                        <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen}
                        target={`exitStatus${props.index}`}
                        toggle={toggle}
                        >
                            Exit Status
                        </Tooltip>
                    </Col>
                    <Col xs='5' style={{ overflowY: 'auto', maxHeight: '50px', maxWidth: '300px', fontSize: '.875rem'}}>
                        {printParama(props.item.kwargs)}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default HistoryItem;