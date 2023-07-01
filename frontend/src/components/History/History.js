import React, { useState, useEffect } from 'react';
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
import { getQueue, getHistory } from '../../redux/serverSlice';

function History() {
    const dispatch = useDispatch(); 
    const [historyList, setHistory] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const { queue, history } = useSelector(state => state.server);
    useEffect(() => {
        dispatch(getHistory());
        (async () => {
            const value = await axios.get('http://localhost:3001/history');
            if (value.status === 200) {
                if (value.data.history.success) {
                    setHistory(value.data.history.items);
                }
                
                //console.log("stuff: ", value.data);
                //const propertyNames = Object.keys(value.data?.devices);
                //setNames(propertyNames);
                //console.log("proper: ", propertyNames);
            }
            //console.log("value: ", value);
        })();
    }, []);

    const regularTableRowStyle = {
        control: (base) => ({
            ...base,
        })
    };

    //
    const highlightedTableRowStyle = {
        control: (base) => ({
            ...base,
            border: '1px solid blue'
        })
    };

    const clearHistory = async () => {
        try {
          const url = 'http://localhost:3001/history/clear';
      
          const response = await axios.post(url);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const copyToQueue = async () => {
        //item:='{"name":"count", "args":[["det1", "det2"]], "item_type": "plan"}'
        //['user_group', 'user', 'item', 'pos', 'before_uid', 'after_uid', 'lock_key']
        console.log("curr: ", currentPlan);
        const url = 'http://localhost:3001/queue/add';
        const args = Object.entries(currentPlan.kwargs).map(([key, value]) => ({ [key]: value }));
        console.log("new: ", args);
        const item = {
            user: currentPlan.user,
            user_group: currentPlan.user_group,
            pos: 'back',
            item: currentPlan
        };
        /*const item = {
            name: currentPlan.name,
            item_type: currentPlan.item_type,
            args
        }*/
        const response = await axios.post(url, item);
        if (response.status === 200) {
            dispatch(getQueue());
        }
        console.log("Response: ", response);
    }

    return (
        <div>
            <Card className='shadow' body style={{ height: '650px'}}>
                <CardBody>
                    <h3 style={{ textAlign: 'center'}}>History</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <Button size='sm' onClick={copyToQueue} disabled={currentPlan === null}>Copy to Queue</Button>
                        <Button size='sm' onClick={() => setCurrentPlan(null)} disabled={currentPlan === null}>Deselect All</Button>
                        <Button size='sm' onClick={clearHistory}>Clear History</Button>
                    </div>
                    <Row style={{ maxHeight: '500px', overflowY: 'scroll', height: '100%'}}>
                        <Table hover>
                        <thead>
                            <tr>
                                <th>
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Status
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history?.history?.items?.map((item, index) => {
                                    return (
                                        <tr 
                                            onClick={() => setCurrentPlan(item)} 
                                            key={item?.item_uid}
                                            /*style={item.item_uid === currentPlan.item_uid ? {border: '1px solid black', borderTop: '1px solid black'} : null}*/
                                            className={item.item_uid === currentPlan?.item_uid ? "table-primary" : ''}
                                        >
                                            <th>
                                                {index + 1}
                                            </th>
                                            <th>
                                                {item.name}
                                            </th>
                                            <th>
                                                {item.result.exit_status}
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

export default History;