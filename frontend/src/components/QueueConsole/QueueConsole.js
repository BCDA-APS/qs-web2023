import React, {useState, useEffect} from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label,
    Table
} from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditQueueModal from '../EditQueueModal/EditQueueModal';
import { getQueue } from '../../redux/serverSlice';
import QueueItem from '../QueueItem/QueueItem';

function QueueConsole() {
    const dispatch = useDispatch();
    const [queueInfo, setQueue] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const { queue } = useSelector(state => state.server);
    const [ refresh, setRefresh] = useState(false);
    useEffect(() => {
        dispatch(getQueue());
        /*
        (async () => {
            const value = await axios.get('http://localhost:3001/queue');
            if (value.status === 200) {
                if (value.data.queue.success) {
                    setQueue(value.data.queue.items);
                }
                //console.log("stuff: ", value.data);
                //const propertyNames = Object.keys(value.data?.devices);
                //setNames(propertyNames);
                //console.log("proper: ", propertyNames);
            }
            //console.log("value: ", value);
        })();*/
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

    const removeQueueItem = async (uid) => {
        try {
          const url = 'http://localhost:3001/queue/delete';
          const requestData = {
            uid
          };
      
          const response = await axios.post(url, requestData);
          console.log(response.data);
          setCurrentPlan(null);
          setRefresh(!refresh);
        } catch (error) {
          console.error(error);
        }
    };

    const moveQueueItem = async (item, moveType) => {
        try {
            const url = 'http://localhost:3001/queue/move';
            let index = null;
            if (moveType === 'UP') {
                index = item.index - 1;
            } else if (moveType === 'DOWN') {
                index = item.index + 1;
            } else if (moveType === 'TOP') {
                index = 'front';
            } else if (moveType === 'BOTTOM') {
                index = 'back';
            }

            const payload = {
                uid: item.item.item_uid,
                pos_dest: index
            };
        
            const response = await axios.post(url, payload);
            console.log(response.data);
            setRefresh(!refresh);
            setCurrentPlan(null);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div>
            <Card className='shadow' body style={{ height: '650px'}}>
                <CardBody>
                    <h3 style={{ textAlign: 'center'}}>Queue</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <Button size='sm' disabled={currentPlan === null ? true : currentPlan?.index === 0 ? true : false} onClick={() => moveQueueItem(currentPlan, 'UP')}>Up</Button>
                        <Button size='sm' disabled={currentPlan === null ? true : currentPlan?.index === (queue?.queue?.items?.length - 1) ? true : false} onClick={() => moveQueueItem(currentPlan, 'DOWN')}>Down</Button>
                        <Button size='sm' disabled={currentPlan === null ? true : currentPlan?.index === 0 ? true : false} onClick={() => moveQueueItem(currentPlan, 'TOP')}>Top</Button>
                        <Button size='sm' disabled={currentPlan === null ? true : currentPlan?.index === (queue?.queue?.items?.length - 1) ? true : false} onClick={() => moveQueueItem(currentPlan, 'BOTTOM')}>Bottom</Button>
                        <Button size='sm' disabled={currentPlan === null} onClick={() => setCurrentPlan(null)}>Deselect</Button>
                        <Button size='sm' onClick={clearQueue}>Clear</Button>
                        <Button size='sm' onClick={() => console.log("currentPlan: ", currentPlan)}>Loop</Button>
                        <Button size='sm' disabled={currentPlan === null} onClick={() => removeQueueItem(currentPlan?.item.item_uid)}>Delete</Button>
                        <Button size='sm' disabled={currentPlan === null}>Duplicate</Button>
                    </div>
                    <Row style={{ maxHeight: '500px', overflowY: 'scroll'}}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Parameters
                                    </th>
                                    <th>
                                        User
                                    </th>
                                    <th>
                                        Group
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    queue?.queue?.items?.map((item, index) => {
                                        return (
                                            <tr 
                                                onClick={() => setCurrentPlan({item, index})} 
                                                key={item.item_uid}
                                                
                                                className={item.item_uid === currentPlan?.item.item_uid ? "table-primary" : ''}
                                            >
                                                <th>
                                                    {index + 1}
                                                </th>
                                                <th>
                                                    {item.name}
                                                </th>
                                                <th>
                                                    PlaceHolder
                                                </th>
                                                <th>
                                                    {item.user}
                                                </th>
                                                <th>
                                                    {item.user_group}
                                                </th>
                                                <th>
                                                    <EditQueueModal item={item}/>
                                        </th>
                        
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                            </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default QueueConsole;