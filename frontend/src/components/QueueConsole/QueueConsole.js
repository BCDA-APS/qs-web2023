import React, {useState, useEffect} from 'react';
import {
    Button,
    Row,
    Tooltip,
    Col
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getConsole, getQueue, getStatus } from '../../redux/serverSlice';
import QueueItem from '../QueueItem/QueueItem';
import AddPlanModal from '../AddPlanModal/AddPlanModal';
import Devices from '../Devices/Devices';
import { Repeat, PlayCircle, StopCircle, Trash, XCircle } from 'react-feather';
import ServerCalls from "../../redux/serverCalls";

function QueueConsole() {
    const dispatch = useDispatch();
    //Get the data for the queue and status from the redux store
    const { queue, status } = useSelector(state => state.server);
    const [ error, setError] = useState(null);

    //Value to control hover state of the buttons
    const [ hoverButtons, setHoverButtons ] = useState({
        play: false,
        stop: false,
        clear: false,
        loop: false,
        cancel: false,
    });
    //Value to control when the tooltip is open 
    const [tooltipOpen, setTooltipOpen] = useState({
        clear: false, 
        play: false,
        stop: false,
        cancel: false,
        loop: false,
        cancel: false,
    });
    //Function to set the tooltip open or close
    const toggleTooltip = (name) => {
        setTooltipOpen({...tooltipOpen, [name]: !tooltipOpen[name]});
    };

    //Whenthis function is called, it updates the redux store with the new information from the api regarding the console, status, queue
    const refreshEverything = () => {
        dispatch(getQueue());
        dispatch(getStatus());
        dispatch(getConsole());
    };

    //Function to clear the queue
    const clearQueue = async () => {

        const { data, error } = await ServerCalls.clearQueue();
        
        if (data?.queueClear?.success) {
            refreshEverything();
        }
        setError(error);
        
    };

    //Function to toggle the toop
    const switchLoop = async (e) => {
        const { data, error } = await ServerCalls.switchLoopQueue({mode: {loop: !status?.status?.plan_queue_mode?.loop}});
        
        if (data?.loop?.success) {
            refreshEverything();
        }
        setError(error);
    };

    //Function to start the queue
    const startQueue = async () => {
        const { data, error } = await ServerCalls.startQueue();
        
        if (data?.queueStart?.success) {
            refreshEverything();
        }
        setError(error);
    };

    //Function to stop the queue
    const stopQueue = async () => {
        const { data, error } = await ServerCalls.stopQueue();
        
        if (data?.queueStop?.success) {
            refreshEverything();
        }
        setError(error);
    };

    //Function to cancel the stop request for the queue
    const cancelStopQueue = async () => {
        const { data, error } = await ServerCalls.cancelQueue();
        
        if (data?.queueCancel?.success) {
            refreshEverything();
        }
        setError(error);
    };

    return (
        <div>
            
                    <h5 style={{ textAlign: 'center'}}>Queue <span style={{ fontSize: '.875rem', fontStyle: 'italic'}}>(# of items: {status.status?.items_in_queue})</span></h5>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px', alignItems: 'center'}}>
                    <AddPlanModal />
                    <Button disabled={queue?.queue?.items.length === 0} onClick={clearQueue} id='clearTooltip' onMouseEnter={() => setHoverButtons({...hoverButtons, clear: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, clear: false})} style={hoverButtons.clear ? {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        boxShadow: '0 .5rem 1rem rgba(204,0,0,.25)',
                        background: 'white',
                        border: 'unset',
                        padding: 'unset'
                    } : {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'white',
                        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
                        border: 'unset',
                        padding: 'unset'
                    }}>
                        <Trash  size='20' style={hoverButtons.clear ? {color: 'rgb(204,0,0)'} : {color: 'black'}} />
                    </Button>
                    <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen.clear}
                        target={'clearTooltip'}
                        toggle={() => toggleTooltip('clear')}
                    >
                        Clear Queue
                    </Tooltip>
                        <Devices />
                        
                        <Button disabled={status.status?.running_item_uid} id='startQueueTooltip' onMouseEnter={() => setHoverButtons({...hoverButtons, play: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, play: false})} onClick={startQueue} 
                        style={hoverButtons.play ? {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px', 
                        height: '40px',
                        borderRadius: '50%',
                        boxShadow: '0 .5rem 1rem rgba(0,204,0,.25)',
                        background: 'white',
                        border: 'unset',
                        padding: 'unset'
                    }: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px', 
                        height: '40px',
                        borderRadius: '50%',
                        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
                        background: 'white',
                        border: 'unset',
                        padding: 'unset'
                    }}><PlayCircle size='20' style={hoverButtons.play ? {color: 'rgb(0,204,0)'} : {color: 'black'}} /></Button>
                        <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen.play}
                        target={'startQueueTooltip'}
                        toggle={() => toggleTooltip('play')}
                    >
                        Start Queue
                    </Tooltip>
                        <Button onClick={stopQueue} disabled={!status.status?.running_item_uid} onMouseEnter={() => setHoverButtons({...hoverButtons, stop: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, stop: false})} id='stopQueueTooltip' 
                        style={hoverButtons.stop ? {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            boxShadow: '0 .5rem 1rem rgba(204,0,0,.25)',
                            background: 'white',
                            border: 'unset',
                            padding: 'unset'
                        } : {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'white', border: 'unset',
                            boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
                            padding: 'unset'
                        }}><StopCircle  size={20} style={hoverButtons.stop ? {color: 'rgb(204,0,0)'} : {color: 'black'}} /></Button>
                        <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen.stop}
                        target={'stopQueueTooltip'}
                        toggle={() => toggleTooltip('stop')}
                    >
                        Stop Queue
                    </Tooltip>
                    <Button onClick={cancelStopQueue} disabled={!status.status?.running_item_uid} onMouseEnter={() => setHoverButtons({...hoverButtons,cancel: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, cancel: false})} id='cancelQueueTooltip' 
                        style={hoverButtons.cancel ? {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            boxShadow: '0 .5rem 1rem rgba(102,102,0,.25)',
                            background: 'white',
                            border: 'unset',
                            padding: 'unset'
                        } : {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'white', border: 'unset',
                            boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
                            padding: 'unset'
                        }}><XCircle  size={20} style={hoverButtons.cancel ? {color: 'rgb(102,102,0)'} : {color: 'black'}} /></Button>
                        <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen.cancel}
                        target={'cancelQueueTooltip'}
                        toggle={() => toggleTooltip('cancel')}
                    >
                        Cancel Stop Request
                    </Tooltip>
                        <Button onClick={switchLoop} onMouseEnter={() => setHoverButtons({...hoverButtons, loop: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, loop: false})} id='loopQueueTooltip' style={hoverButtons.loop || status?.status?.plan_queue_mode?.loop ? {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', 
    height: '40px',
    borderRadius: '50%',
    boxShadow: '0 .5rem 1rem rgba(51,153,255,.25)', 
    background: 'white', border: 'unset', padding: 'unset'
  }: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', 
    height: '40px', 
    borderRadius: '50%',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', 
    background: 'white', border: 'unset',
    padding: 'unset'
  }}><Repeat size='20'  style={hoverButtons.loop || status?.status?.plan_queue_mode?.loop ? {color: 'rgb(51,153,255)'} : {color: 'black'}} /></Button>
                    <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen.loop}
                        target={'loopQueueTooltip'}
                        toggle={() => toggleTooltip('loop')}
                    >
                        Enable Queue Loop
                    </Tooltip>              
                    </div>
                    <Row style={{ maxHeight: '450px', overflowY: 'auto'}}>
                        
                        {
                                    queue?.queue?.items?.map((item, index) => {
                                        return (
                                            <QueueItem item={item} index={index} />
                                        )
                                    })
                        }
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

export default QueueConsole;