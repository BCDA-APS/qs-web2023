import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Row,
    Col,
    Tooltip
} from 'reactstrap';
import ServerCalls from "../../redux/serverCalls";
import ViewResults from '../ViewResults/ViewResults';
import { useDispatch, useSelector } from 'react-redux';
import { getConsole, getHistory, getQueue, getStatus } from '../../redux/serverSlice';
import EditItem from '../EditItem/EditItem';
import { MoreVertical, Copy, ArrowDown, ArrowUp, Play, Trash, ChevronsUp, ChevronsDown } from 'react-feather';

function QueueItem(props) {
    const dispatch = useDispatch();
    //Get data from redux regarding the queue and plans
    const { queue, plans } = useSelector(state => state.server);
    //Value to handle the state of when a tooltip is open or closed
    const [tooltipOpen, setTooltipOpen] = useState(false);
    //Function to open or close the tooltip
    const toggleTooltop = () => setTooltipOpen(!tooltipOpen);
    //Gets list of parameter names for the plan
    const parameterNames = plans?.plans?.plans_allowed[props.item.name]?.parameters.map(item => item.name);
    //Value to handle state of hover for buttons
    const [ hoverButtons, setHoverButtons ] = useState({
        up: false,
        down: false,
        top: false,
        bottom: false,
        delete: false,
        copy: false,
        play: false,
    });
    //Value to handle errors
    const [ error, setError ] = useState(null);

    const replacer = (key, value) => {
        if (typeof value === 'string' && value.startsWith("'") && value.endsWith("'")) {
          // If the value is a string enclosed in single quotes, remove the quotes
          return value.slice(1, -1) === null ? 'None' : value.slice(1, -1);
        } else {
          return value === null ? 'None' : value;
        }
    };

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

    //Updates the redux store, by getting new api data regarding the queue, console, status, and history
    const refreshEverything = () => {
        dispatch(getQueue());
        dispatch(getConsole());
        dispatch(getStatus());
        dispatch(getHistory());
    };

    //Function to move items within a queue
    const moveQueueItem = async (item, index, moveType) => {
        try {
            let newindex = null;
            if (moveType === 'UP') {
                newindex = index - 1;
            } else if (moveType === 'DOWN') {
                newindex = index + 1;
            } else if (moveType === 'TOP') {
                newindex = 'front';
            } else if (moveType === 'BOTTOM') {
                newindex = 'back';
            }
            const payload = {
                uid: item.item_uid,
                pos_dest: newindex
            };
        
            const { data, error } = await ServerCalls.movePlanInQueue(payload);
            if (data?.queueMove?.success) {
                refreshEverything();
            }
            setError(error);
        } catch (err) {
          setError(err);
        }
    };

    //Function to remove item from the queue
    const removeQueueItem = async (item) => {
        try {
            const requestData = {
              uid: item.item_uid
            };
            const { data, error } = await ServerCalls.deletePlanFromQueue(requestData);

            if (data?.queueDelete?.success) {
                refreshEverything();
            }
            setError(error);
          } catch (err) {
            setError(err);
          }
    };

    //Function to copy items in the queue
    const duplicateItem = async (obj) => {
        try {
            //defining item to be added to the queue
            const item = {
                name: obj.name,
                item_type: obj.item_type,
                kwargs: obj?.kwargs,
                args: obj?.args,
            };
            //Want duplicated item to be added after the original item
            const { data, error } = await ServerCalls.addToQueue({after_uid: obj.item_uid, item});
            if (data?.queue?.success) {
                refreshEverything();
            }
            setError(error);
        } catch (err) {
            setError(err);
        }
        
    };

    //Function to execute the item
    const executeItem = async (item) => {
        try {
            const { data, error } = await ServerCalls.executeItemInQueue({item});
            if (data?.execute?.success) {
                refreshEverything();
            }
            setError(error);
        } catch (err) {
            setError(err);
        }
        
    };

    return (
        <Card style={{ margin: '5px 0px', maxWidth: '500px', maxHeight: '100px', minHeight: '80px', height: '80px'}} className='shadow'>
            <CardBody style={{ width: '100%', height: '100%'}}>
                <Row style={{ display: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <Col style={{ fontSize: '.875rem', display: 'flex', flexDirection: 'row', alignItems: 'center', maxWidth: '160px', overflowX: 'auto', whiteSpace: 'nowrap', margin: '0px 5px'}}>
                        <strong>{props.item?.name}</strong>
                        <ViewResults obj={props.item}/>
                    </Col>
                    <Col xs='5' style={{ overflowY: 'auto', maxHeight: '50px', maxWidth: '300px', fontSize: '.875rem'}}>
                        {printParama(props.item.kwargs)}
                    </Col>
                    <Col xs='1'>
                        {props.index > 0 && <ArrowUp style={hoverButtons.up ? {color: '#0d6efd'} : {color: 'black'}} onClick={() => moveQueueItem(props.item, props.index, 'UP')} onMouseEnter={() => setHoverButtons({...hoverButtons, up: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, up: false})}/>}
                    </Col>
                    <Col xs='1'>
                        {props.index < (queue?.queue?.items?.length - 1) && <ArrowDown style={hoverButtons.down ? {color: '#0d6efd'} : {color: 'black'}} onClick={() => moveQueueItem(props.item, props.index, 'DOWN')} onMouseEnter={() => setHoverButtons({...hoverButtons, down: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, down: false})} />}
                    </Col>
                    <Col xs='1'>
                        <EditItem queueItem={props.item} />
                    </Col>
                    <Col xs='1'>
                    <MoreVertical id={`menuControls2${props.index}`}/>
                    <Tooltip
                        isOpen={tooltipOpen}
                        target={`menuControls2${props.index}`}
                        toggle={toggleTooltop}
                        autohide={false}
                        placement={'bottom'}
                        style={{boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', border: '1px solid black', backgroundColor: 'white', color: 'black', minWidth: '150px', maxWidth: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                    >
                        
                        <Copy onClick={() => {duplicateItem(props.item); toggleTooltop()}} style={hoverButtons.copy ? {color: '#0d6efd'} : {color: 'black'}} onMouseEnter={() => setHoverButtons({...hoverButtons, copy: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, copy: false})}/>
                        <Trash onClick={() => {removeQueueItem(props.item); toggleTooltop()}} style={hoverButtons.delete ? {color: 'rgb(204,0,0)'} : {color: 'black'}} onMouseEnter={() => setHoverButtons({...hoverButtons, delete: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, delete: false})}/>
                        <Play onClick={() => {executeItem(props.item); toggleTooltop() }} style={hoverButtons.play ? {color: 'rgb(0,204,0)'} : {color: 'black'}} onMouseEnter={() => setHoverButtons({...hoverButtons, play: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, play: false})}/>
                        {props.index > 0 && <ChevronsUp style={hoverButtons.top ? {color: '#0d6efd'} : {color: 'black'}} onClick={() => {moveQueueItem(props.item, props.index, 'TOP'); toggleTooltop()} } onMouseEnter={() => setHoverButtons({...hoverButtons, top: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, top: false})}/>}
                        {props.index < (queue?.queue?.items?.length - 1) && <ChevronsDown style={hoverButtons.bottom ? {color: '#0d6efd'} : {color: 'black'}} onClick={() => {moveQueueItem(props.item, props.index, 'BOTTOM'); toggleTooltop()}} onMouseEnter={() => setHoverButtons({...hoverButtons, bottom: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, bottom: false})}/>}
                    </Tooltip>
                    </Col>
                </Row>
                {error !== null && <Row>
                <Col>
                    <p style={{ color: 'red'}}>
                        Error: {error}
                    </p>
                </Col>
                </Row>}
            </CardBody>
        </Card>
    )
};

export default QueueItem;