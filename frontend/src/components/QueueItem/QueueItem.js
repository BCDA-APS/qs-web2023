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
} from 'reactstrap';
import ViewResults from '../ViewResults/ViewResults';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EditItem from '../EditItem/EditItem';
import { Copy, ArrowDown, ArrowUp, Trash2, Repeat, PlayCircle, Play, StopCircle, Trash, Menu, Edit, ChevronsUp, ChevronsDown } from 'react-feather';
function QueueItem(props) {

    const { queue, status } = useSelector(state => state.server);
    const [isOpen, setIsOpen ] = useState(false);

    const printParama = (args) => {
        return Object.entries(args)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(", ");
    };
/*
    const moveQueueItem = async (item, index, moveType) => {
        console.log("here");
        try {
            const url = 'http://localhost:3001/queue/move';
            let newindex = null;
            if (moveType === 'UP') {
                newindex = index - 1;
            } else if (moveType === 'DOWN') {
                newindex = index + 1;
            }
            const payload = {
                uid: item.item_uid,
                pos_dest: newindex
            };
        
            const response = await axios.post(url, payload);
            console.log(response.data);
            setRefresh(!refresh);
            setCurrentPlan(null);
        } catch (error) {
          console.error(error);
        }
    };*/

    const removeQueueItem = async (item) => {
        try {
            const url = 'http://localhost:3001/queue/delete';
            const requestData = {
              uid: item.item_uid
            };
        
            const response = await axios.post(url, requestData);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        /*
        checkedList.map(async (item) => {
            try {
                const url = 'http://localhost:3001/queue/delete';
                const requestData = {
                  uid: item.item_uid
                };
            
                const response = await axios.post(url, requestData);
                console.log(response.data);
              } catch (error) {
                console.error(error);
              }
        });
        setCheckList([]);*/
        //setRefresh(!refresh);
    };

    const duplicateItem = async (obj) => {
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
                        {props.index > 0 && <ArrowUp /*onClick={() => moveQueueItem(item, index, 'UP')} style={isHover[index]?.upHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} onMouseEnter={() => handleIsHover(index, true, 'upHover')} onMouseLeave={() => handleIsHover(index, false, 'upHover')}*/ />}
                    </Col>
                    <Col xs='1'>
                        {props.index < (queue?.queue?.items?.length - 1) && <ArrowDown /*onClick={() => moveQueueItem(item, index, 'DOWN')} style={isHover[index]?.downHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} onMouseEnter={() => handleIsHover(index, true, 'downHover')} onMouseLeave={() => handleIsHover(index, false, 'downHover')}*/ />}
                    </Col>
                    <Col xs='1'>
                        <Menu onClick={() => setIsOpen(!isOpen)} id={`menuControls${props.index}`}/>
                        <UncontrolledPopover
                            placement="bottom"
                            target={`menuControls${props.index}`}
                            trigger="legacy"
                            isOpen={isOpen}
                            onMouseLeave={() => setIsOpen(!isOpen)}
                        >
                            <PopoverBody style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '200px'}}>

                                <EditItem queueItem={props.item} setIsOpen={setIsOpen} isOpen={isOpen}/>
                                <Copy onClick={() => {duplicateItem(props.item); setIsOpen(!isOpen)}}/>
                                <Trash onClick={() => {removeQueueItem(props.item); setIsOpen(!isOpen)}}/>
                                <Play />
                                {props.index > 0 && <ChevronsUp />}
                                {props.index < (queue?.queue?.items?.length - 1) && <ChevronsDown />}
                            </PopoverBody>
                        </UncontrolledPopover>
                    </Col>
                </Row>

            </CardBody>
        </Card>
    )
};

export default QueueItem;