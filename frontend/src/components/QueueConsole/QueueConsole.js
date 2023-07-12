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
    Table
} from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditQueueModal from '../EditQueueModal/EditQueueModal';
import { getQueue } from '../../redux/serverSlice';
import QueueItem from '../QueueItem/QueueItem';
import EditItem from '../EditItem/EditItem';

function QueueConsole() {
    const dispatch = useDispatch();
    const [queueInfo, setQueue] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const { queue } = useSelector(state => state.server);
    const [ refresh, setRefresh] = useState(false);
    const [checkedList, setCheckList] = useState([]);
    useEffect(() => {
        dispatch(getQueue());
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

    const removeQueueItem = async () => {
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
        setCheckList([]);
        setRefresh(!refresh);
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

    return (
        <div>
            <Card className='shadow' body style={{ height: '650px'}}>
                <CardBody>
                    <h3 style={{ textAlign: 'center'}}>Queue</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <Button size='sm' /*disabled={currentPlan === null ? true : currentPlan?.index === 0 ? true : false}*/ onClick={() => moveQueueItem('UP')}>Up</Button>
                        <Button size='sm' /*disabled={currentPlan === null ? true : currentPlan?.index === (queue?.queue?.items?.length - 1) ? true : false}*/ onClick={() => moveQueueItem('DOWN')}>Down</Button>
                        <Button size='sm' /*disabled={currentPlan === null ? true : currentPlan?.index === 0 ? true : false}*/ onClick={() => moveQueueItem('TOP')}>Top</Button>
                        <Button size='sm' /*disabled={currentPlan === null ? true : currentPlan?.index === (queue?.queue?.items?.length - 1) ? true : false}*/ onClick={() => moveQueueItem('BOTTOM')}>Bottom</Button>
                        <Button size='sm' onClick={() => setCheckList([])} disabled={checkedList.length === 0}>Deselect</Button>
                        <Button size='sm' onClick={clearQueue}>Clear</Button>
                        <Button size='sm' onClick={() => console.log("checkedList: ", checkedList)}>Loop</Button>
                        <Button size='sm' disabled={checkedList.length < 1 ? true : false} onClick={removeQueueItem}>Delete</Button>
                        <Button size='sm' disabled={checkedList.length < 1 ? true : false}>Duplicate</Button>
                    </div>
                    <Row style={{ maxHeight: '500px', overflowY: 'scroll'}}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th></th>
                                    <th>
                                        Name
                                    </th>
                                    <th style={{maxWidth: '100px'}}>
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
                                                key={item.item_uid}
                                                className={isInArr(item) ? "table-primary" : ''}
                                                //className={item.item_uid === currentPlan?.item.item_uid ? "table-primary" : ''}
                                            >
                                                <th>
                                                    <FormGroup check>
                                                        <Input 
                                                            type="checkbox" 
                                                            id={item.name}
                                                            name={index}
                                                            onChange={handleChecked}
                                                            checked={isInArr(item)}
                                                        />
                                                    </FormGroup>
                                                </th>
                                                <th>
                                                    {index + 1}
                                                </th>
                                                <th>
                                                    {item.name}
                                                </th>
                                                {/*<th style={{maxWidth: '150px', overflowX: 'scroll', whiteSpace: 'nowrap'}}>*/}
                                                <th>
                                                    {printParama(item.kwargs)}
                                                </th>
                                                {/*<th style={{maxWidth: '150px', overflowX: 'scroll', whiteSpace: 'nowrap'}}>*/}
                                                <th>
                                                    {item.user}
                                                </th>
                                                <th>
                                                    {item.user_group}
                                                </th>
                                                <th>
                                                    <EditItem queueItem={item}/>
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