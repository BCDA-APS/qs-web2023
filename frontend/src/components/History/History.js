import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Tooltip
} from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, getHistory, getStatus } from '../../redux/serverSlice';
import ViewResults from '../ViewResults/ViewResults';
import { Trash, Copy, XSquare } from 'react-feather';
import ServerCalls from "../../redux/serverCalls";
import HistoryItem from '../HistoryItem/HistoryItem';

function History() {
    const dispatch = useDispatch(); 
    const { history, status } = useSelector(state => state.server);
    const [checkedList, setCheckList] = useState([]);
    const [ hoverButtons, setHoverButtons ] = useState({
        deselect: false,
        clear: false,
        copy: false,
    });

    const [tooltipOpen, setTooltipOpen] = useState({
        clear: false, 
        deselect: false,
        copy: false,
    });
    const [error, setError] = useState(null);
    const toggleTooltip = (name) => {
        setTooltipOpen({...tooltipOpen, [name]: !tooltipOpen[name]});
    };
    //Get the history once the page loads
    useEffect(() => {
        dispatch(getHistory());
    }, []);

    //Function to clear history
    const clearHistory = async () => {
        const { data, error } = await ServerCalls.clearHistory();
        setError(error);
    };

    //Function to copy list of items to the queue
    const copyToQueue = async () => {
        const { data, error } = await ServerCalls.batchToQueue(checkedList);
        if (data?.queue?.success) {
            dispatch(getQueue());
            dispatch(getStatus());
            setCheckList([]);
        }
        setError(error);
    }

    return (
        <div>
                    <h5 style={{ textAlign: 'center'}}>History <span style={{ fontSize: '.875rem', fontStyle: 'italic'}}>(# of items: {status.status?.items_in_history})</span></h5>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <Button disabled={checkedList.length === 0} onClick={copyToQueue} onMouseEnter={() => setHoverButtons({...hoverButtons, copy: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, copy: false})} id='copyQueueTooltip' style={hoverButtons.copy ? {
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
  }}><Copy size='20'  style={hoverButtons.copy ? {color: 'rgb(51,153,255)'} : {color: 'black'}} /></Button>
                    <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen.copy}
                        target={'copyQueueTooltip'}
                        toggle={() => toggleTooltip('copy')}
                    >
                        Copy to Queue
                    </Tooltip>              
                     <Button disabled={checkedList.length === 0} onClick={() => setCheckList([])} id='deselectTooltip' onMouseEnter={() => setHoverButtons({...hoverButtons, deselect: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, deselect: false})} style={hoverButtons.deselect ? {
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
                        <XSquare  size='20' style={hoverButtons.deselect ? {color: 'rgb(204,0,0)'} : {color: 'black'}} />
                    </Button>
                    <Tooltip
                        placement={'bottom'}
                        isOpen={tooltipOpen.deselect}
                        target={'deselectTooltip'}
                        toggle={() => toggleTooltip('deselect')}
                    >
                        Deselect All
                    </Tooltip>
                        <Button disabled={history?.history?.items.length === 0} onClick={clearHistory} id='clearHistoryTooltip' onMouseEnter={() => setHoverButtons({...hoverButtons, clear: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, clear: false})} style={hoverButtons.clear ? {
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
                        target={'clearHistoryTooltip'}
                        toggle={() => toggleTooltip('clear')}
                    >
                        Clear History
                    </Tooltip>
                    </div>
                    <Row style={{ maxHeight: '450px', overflowY: 'auto'}}>
                        
                        {
                            history?.history?.items?.map((item, index) => {
                                return (
                                    <HistoryItem item={item} index={index} checkedList={checkedList} setCheckList={setCheckList}/>
                                );
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

export default History;