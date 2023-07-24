import React, { useState } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col,
    Collapse,
    Popover,
    PopoverBody,
    UncontrolledPopover,
    Tooltip
} from 'reactstrap';
import ViewResults from '../ViewResults/ViewResults';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getConsole, getHistory, getQueue, getStatus } from '../../redux/serverSlice';
import EditItem from '../EditItem/EditItem';
import { MoreVertical, Copy, ArrowDown, ArrowUp, Trash2, Repeat, PlayCircle, Play, StopCircle, Trash, Menu, Edit, ChevronsUp, ChevronsDown } from 'react-feather';
function QueueItem(props) {
    const dispatch = useDispatch();
    const { queue, status } = useSelector(state => state.server);
    const [isOpen, setIsOpen ] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleTooltop = () => setTooltipOpen(!tooltipOpen);
    const [ hoverButtons, setHoverButtons ] = useState({
        up: false,
        down: false,
        top: false,
        bottom: false,
        delete: false,
        copy: false,
        play: false,
    });

    const printParama = (args) => {
        return Object.entries(args)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(", ");
    };


    const refreshEverything = () => {
        dispatch(getQueue());
        dispatch(getConsole());
        dispatch(getStatus());
        dispatch(getHistory());
    };

    const moveQueueItem = async (item, index, moveType) => {
        try {
            const url = 'http://localhost:3001/queue/move';
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
        
            const response = await axios.post(url, payload);
            if (response.status === 200) {
                refreshEverything();
            }
        } catch (error) {
          console.error(error);
        }
    };

    const removeQueueItem = async (item) => {
        try {
            const url = 'http://localhost:3001/queue/delete';
            const requestData = {
              uid: item.item_uid
            };
        
            const response = await axios.post(url, requestData);
            if (response.status === 200) {
                refreshEverything();
            }
          } catch (error) {
            console.error(error);
          }
    };

    const duplicateItem = async (obj) => {
        try {
            //after_uid
            const url = 'http://localhost:3001/queue/add';
            //defining item to be added to the queue
            const item = {
                name: obj.name,
                item_type: obj.item_type,
                kwargs: obj?.kwargs,
                args: obj?.args,
            };
            //Want duplicated item to be added after the original item
            const response = await axios.post(url, {after_uid: obj.item_uid, item});
            if (response.status === 200) {
                refreshEverything();
            }
        } catch (error) {
            console.log("error: ", error);
        }
        
    };

    const executeItem = async (item) => {
        console.log("item: ", item);
        const url = 'http://localhost:3001/queue/execute';
        const response = await axios.post(url, {item});
        if (response.status === 200) {
            refreshEverything();
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

            </CardBody>
        </Card>
    )
};

export default QueueItem;