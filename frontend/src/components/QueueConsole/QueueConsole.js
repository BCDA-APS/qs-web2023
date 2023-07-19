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

function QueueConsole() {
    const dispatch = useDispatch();
    const [queueInfo, setQueue] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const { queue, status } = useSelector(state => state.server);
    const [ refresh, setRefresh] = useState(false);
    const [checkedList, setCheckList] = useState([]);
    const [isHover, setIsHover] = useState([]);
    const [ hoverButtons, setHoverButtons ] = useState({
        play: false,
        stop: false,
        clear: false,
    });
    useEffect(() => {
        (async () => {
        const val = await dispatch(getQueue());
        if (val.payload.queue.success) {
            const arr = val.payload.queue.items.map(() => {
                return {copyHover: false, upHover: false, downHover: false, deleteHover: false, playHover: false};
            });

            setIsHover([...arr]);
            console.log("arr: ", arr);
        }

        console.log("val: ", val);
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

    /*
    http POST http://localhost:60610/api/queue/mode/set mode:='{"loop": true}'
http POST http://localhost:60610/api/queue/mode/set mode:='{"loop": false}'
    */
//http POST http://localhost:60610/api/queue/item/execute item:='{"name":"count", "args":[["det1", "det2"]], "kwargs":{"num":10, "delay":1}, "item_type": "plan"}'
    const executeItem = async (item) => {
        console.log("item: ", item);
        const url = 'http://localhost:3001/queue/execute';
        const response = await axios.post(url, {item});
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
            <Card className='shadow' style={{ maxHeight: '80%', }}>

                <CardBody>
                    <h5 style={{ textAlign: 'center'}}>Queue <span style={{ fontSize: '.875rem', fontStyle: 'italic'}}>(# of items: {status.status?.items_in_queue})</span></h5>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px', alignItems: 'center'}}>
                    <AddPlanModal />
                    <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', /* Adjust the size as needed */
    height: '40px', /* Adjust the size as needed */
    borderRadius: '50%',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', /* Customize the shadow as desired */
  }}><Trash onClick={clearQueue} size='20' style={hoverButtons.clear ? {color: 'blue'} : {color: 'black'}} onMouseEnter={() => setHoverButtons({...hoverButtons, clear: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, clear: false})}/></div>
                        <Devices />
                        
                        <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', /* Adjust the size as needed */
    height: '40px', /* Adjust the size as needed */
    borderRadius: '50%',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', /* Customize the shadow as desired */
  }}><Play onClick={startQueue} size='20' style={hoverButtons.play ? {color: 'green'} : {color: 'black'}} onMouseEnter={() => setHoverButtons({...hoverButtons, play: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, play: false})}/></div>
                        <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', /* Adjust the size as needed */
    height: '40px', /* Adjust the size as needed */
    borderRadius: '50%',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', /* Customize the shadow as desired */
  }}><StopCircle onClick={stopQueue} size={20} style={hoverButtons.stop ? {color: 'red'} : {color: 'black'}} onMouseEnter={() => setHoverButtons({...hoverButtons, stop: true})} onMouseLeave={() => setHoverButtons({...hoverButtons, stop: false})}/></div>
                        
                        <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px', /* Adjust the size as needed */
    height: '40px', /* Adjust the size as needed */
    borderRadius: '50%',
    boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', /* Customize the shadow as desired */
  }}><Repeat size='20' onClick={switchLoop} style={status?.status?.plan_queue_mode?.loop ? {color: 'blue'} : {color: 'black'}} /></div>
                    
                        {/*<FormGroup switch>
                            <Input 
                                type="switch" 
                                role="switch" 
                                onChange={switchLoop}
                                checked={status?.status?.plan_queue_mode?.loop}
                            />
                            <Label check>Loop</Label>
    </FormGroup>*/}
                    </div>
                    <Row style={{ maxHeight: '450px', overflowY: 'scroll'}}>
                        
                        {
                                    queue?.queue?.items?.map((item, index) => {
                                        return (
                                            <QueueItem item={item} index={index} />
                                        )
                                    })
                        }
                            </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default QueueConsole;