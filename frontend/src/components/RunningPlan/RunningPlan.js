import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label,
    Tooltip
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, getStatus } from '../../redux/serverSlice';
import ServerCalls from "../../redux/serverCalls";
import { Copy, Pause, Play } from 'react-feather';

function RunningPlan() {
    const dispatch = useDispatch();
    //Gets the status and queue information from the redux store
    const { status, queue } = useSelector(state => state.server);

    //Value for the error 
    const [ error, setError ] = useState(null);

    //Value that will be displayed in running plan
    const [valuerun, setValueRun] = useState('');

    //Values to control hover state of the button
    const [ hoverButtons, setHoverButtons ] = useState({
        copy: false,
        pause: false,
    });

    //Values to control when tooltip is open
    const [tooltipOpen, setTooltipOpen] = useState({
        copy: false,
        pause: false,
    });
    //Function to set the tooltip open or close
    const toggleTooltip = (name) => {
        setTooltipOpen({...tooltipOpen, [name]: !tooltipOpen[name]});
    };

    //Function to pause plan
    const pausePlan = async (type) => {
        const { data, error } = await ServerCalls.pausePlans({ option: type });
        
        if (data?.re?.success) {
            dispatch(getStatus());
        }
        setError(error);
    
    };

    //Function to resume plan
    const resumePlan = async () => {
        const { data, error } = await ServerCalls.resumePlans();
        
        if (data?.reResume?.success) {
            dispatch(getStatus());
        }
        setError(error);
    };

    //Function to stop plan
    const stopPlan = async () => {
        const { data, error } = await ServerCalls.stopPlans();
        
        if (data?.reStop?.success) {
            dispatch(getStatus());
        }
        setError(error);
    };

    //Function to abort plan
    const abortPlan = async () => {
        const { data, error } = await ServerCalls.abortPlans();
        
        if (data?.reAbort?.success) {
            dispatch(getStatus());
        }
        setError(error);
    };

    //Function to halt plan
    const haltPlan = async () => {
        const { data, error } = await ServerCalls.haltPlans();
        
        if (data?.reHalt?.success) {
            dispatch(getStatus());
        }
        setError(error);
    };

    //If the status and queue has not been populated with data yet, call the function to get the data from the api
    useEffect(() => {
        if (status.length === 0) {
            dispatch(getStatus());
        }

        if (queue.length === 0) {
            dispatch(getQueue());
        }
    
    }, []);


    useEffect(() => {
        (async () => {
        //If a item is running within the queue, then print out the parameters or the plan and the runs
        if (queue?.queue?.running_item) {
            if (Object.keys(queue?.queue?.running_item).length > 0) {
                let result = `Plan Name: ${queue?.queue?.running_item.name}\nParameters:\n`;
                for (const key in queue?.queue?.running_item.kwargs) {
                    result += `  ${key}: ${queue?.queue?.running_item.kwargs[key]}\n`;
                }
                
                    const { data, error } = await ServerCalls.getActiveRuns();
                    
                    const formattedOutput = data?.runsActive.run_list.map((run) => {
                        const { uid, exit_status, scan_id } = run;
                        if (exit_status === "success") {
                          return `  ${scan_id? `Scan ID (${scan_id})`: uid} success`;
                        } else if (run.is_open) {
                          return `  ${scan_id? `Scan ID (${scan_id})`: uid} in progress...`;
                        } else {
                          return `  ${scan_id? `Scan ID (${scan_id})`: uid} unknown status`;
                        }
                      }).join(', \n');
                      if (data.runsActive.run_list.length > 0 ) {
                        result += 'Runs: \n';
                        result += formattedOutput;
                      }
                setError(error);
                setValueRun(result);
            } else {
                setValueRun('');
            }
        }
    })();
    }, [queue?.queue?.running_item]);
   
    //Function to copy running item to queue
    const copyToQueue = async () => {
        if (queue?.queue?.running_item !== null) {
            
                const items = {
                    pos: 'back',
                    item: queue?.queue?.running_item
                };
                
                const { data, error } = await ServerCalls.addToQueue(items);
                if (data?.queue?.success) {
                    dispatch(getQueue());
                    dispatch(getStatus());
                }
                setError(error);
        }
        
    }

    return (
        <div>
            <h5 style={{ textAlign: 'center'}}>Running Plan <Button disabled={status.status?.running_item_uid === null} onClick={copyToQueue} onMouseEnter={() => setHoverButtons({...hoverButtons, copy: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, copy: false})} id='copyQueueTooltipRP' style={hoverButtons.copy ? {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px', 
                height: '40px',
                borderRadius: '50%',
                boxShadow: '0 .5rem 1rem rgba(51,153,255,.25)', 
                background: 'white', border: 'unset', padding: 'unset', marginLeft: '10px'
            }: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', 
                background: 'white', border: 'unset',
                padding: 'unset', marginLeft: '10px'
            }}><Copy size='20'  style={hoverButtons.copy ? {color: 'rgb(51,153,255)'} : {color: 'black'}} /></Button></h5>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px', alignItems: 'center'}}>
            
                    <Tooltip
                        placement={'right'}
                        isOpen={tooltipOpen.copy}
                        target={'copyQueueTooltipRP'}
                        toggle={() => toggleTooltip('copy')}
                    >
                        Copy to Queue
                    </Tooltip>
                    <Button size='sm' onClick={() => pausePlan("deferred")} style={{width: '120px', fontSize: '.875rem'}} disabled={status.status?.manager_state === 'paused' || status.status?.running_item_uid === null}><Pause size='15' color='white'/> Deferred</Button>
                    <Button size='sm' onClick={() => pausePlan("immediate")} style={{width: '120px', fontSize: '.875rem'}} disabled={status.status?.manager_state === 'paused' || status.status?.running_item_uid === null}><Pause size='15' color='white'/> Immediate</Button>
                    <Button size='sm' onClick={resumePlan} style={{width: '120px', fontSize: '.875rem'}} disabled={status.status?.re_state === 'running' || status.status?.running_item_uid === null}><Play size='15' color='white'/> Resume</Button>
                
            </div>        
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px', alignItems: 'center'}}>
                <Button size='sm' onClick={stopPlan} style={{width: '120px', fontSize: '.875rem'}} disabled={status.status?.re_state === 'running' || status.status?.running_item_uid === null}>Stop</Button>
                <Button size='sm' onClick={abortPlan} style={{width: '120px', fontSize: '.875rem'}} disabled={status.status?.re_state === 'running' || status.status?.running_item_uid === null}>Abort</Button>
                <Button size='sm' onClick={haltPlan} style={{width: '120px', fontSize: '.875rem'}} disabled={status.status?.re_state === 'running' || status.status?.running_item_uid === null}>Halt</Button>
                     
            </div>
                    <Row>
                        <Col>
                            <Input
                                type='textarea'
                                readOnly={true}
                                value={valuerun}
                                style={{ minHeight: '180px'}}
                            />
                        </Col>
                    </Row>
            {error !== null && <Row>
                <Col>
                    <p style={{ color: 'red', textAlign: 'center'}}>
                        Error: {error}
                    </p>
                </Col>
            </Row>}
        </div>
    );
};

export default RunningPlan;