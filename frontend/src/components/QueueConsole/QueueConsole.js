import React, {useState, useEffect} from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label,
    FormGroup,
    Table,
    Tooltip
} from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditQueueModal from '../EditQueueModal/EditQueueModal';
import { getQueue, getStatus } from '../../redux/serverSlice';
import QueueItem from '../QueueItem/QueueItem';
import EditItem from '../EditItem/EditItem';
import ViewResults from '../ViewResults/ViewResults';
import AddPlanModal from '../AddPlanModal/AddPlanModal';
import Devices from '../Devices/Devices';
import { Copy, ArrowDown, ArrowUp, Trash2, Repeat, PlayCircle, Play, StopCircle, Trash, Plus } from 'react-feather';
import '../Scrollbar/secscroll.css';

function QueueConsole() {
    const dispatch = useDispatch();
    const [currentPlan, setCurrentPlan] = useState(null);
    const { queue, status } = useSelector(state => state.server);
    const [ refresh, setRefresh] = useState(false);
    const [checkedList, setCheckList] = useState([]);
    const [isHover, setIsHover] = useState([]);

    const [ hoverButtons, setHoverButtons ] = useState({
        play: false,
        stop: false,
        clear: false,
        loop: false,
    });

    const [tooltipOpen, setTooltipOpen] = useState({
        clear: false, 
        play: false,
        stop: false,
        cancel: false,
        loop: false,
    });

    const toggleTooltip = (name) => {
        setTooltipOpen({...tooltipOpen, [name]: !tooltipOpen[name]});
    };

    useEffect(() => {
        (async () => {
        const val = await dispatch(getQueue());
        if (val.payload.queue.success) {
            const arr = val.payload.queue.items.map(() => {
                return {copyHover: false, upHover: false, downHover: false, deleteHover: false, playHover: false};
            });

            setIsHover([...arr]);
        }
         })();
    }, [refresh]);


    const clearQueue = async () => {
        try {
          const url = 'http://localhost:3001/queue/clear';
      
          const response = await axios.post(url);
          console.log(response.data);
          setRefresh(!refresh);
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
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        setRefresh(!refresh);
    };

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
      };
    const printParama = (args) => {
        return Object.entries(args)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(", ");
    };
    const isInArr = (item) => {
        const isIncluded = checkedList.includes(item);
        return isIncluded;
    };

    const handleChecked = (e) => {
        const { checked, name, id } = e.target;
        let arr = [...checkedList];
        //let val = {...queue?.queue?.items[name], index: name};
        if (checked) {
            arr.push(queue?.queue?.items[name]);
        } else {
            const index = arr.indexOf(queue?.queue?.items[name]);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        setCheckList([...arr]);
    };

    const handleIsHover = (index, value, type) => {
        let arr = [...isHover];
        arr[index][type] = value;
        setIsHover([...arr]);
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
        if (response.status === 200) {
            dispatch(getQueue());
        }
    };

    const switchLoop = async (e) => {
        console.log("loop: ", e);
        //const { checked } = e.target;
        const url = 'http://localhost:3001/queue/loop';
        const response = await axios.post(url, {mode: {loop: !status?.status?.plan_queue_mode?.loop}});
        if (response.status === 200) {
            dispatch(getStatus());
        }
    };

    const startQueue = async () => {
        try {
          const url = 'http://localhost:3001/queue/start';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const stopQueue = async () => {
        try {
          const url = 'http://localhost:3001/queue/stop';
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div /*style={{ maxWidth: '580px'}}*/>
            
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
                    <Row className="scrollbox" style={{ maxHeight: '450px', overflowY: 'scroll'}}>
                        
                        {
                                    queue?.queue?.items?.map((item, index) => {
                                        return (
                                            <QueueItem item={item} index={index} />
                                        )
                                    })
                        }
                            </Row>
                
        </div>
    );
};

export default QueueConsole;