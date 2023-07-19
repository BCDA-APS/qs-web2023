import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label,
    Table,
    FormGroup
} from 'reactstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, getHistory, getStatus } from '../../redux/serverSlice';
import ViewResults from '../ViewResults/ViewResults';

function History() {
    //TODO: find a better way simiutanously update web client
    const dispatch = useDispatch(); 
    const [historyList, setHistory] = useState([]);
    const [currentPlan, setCurrentPlan] = useState(null);
    const { queue, history, status } = useSelector(state => state.server);
    const [checkedList, setCheckList] = useState([]);
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
          //check error message
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };

    const handleChecked = (e) => {
        const { checked, name, id } = e.target;
        let arr = [...checkedList];
        if (checked) {
            arr.push(history?.history?.items[name]);
        } else {
            const index = arr.indexOf(history?.history?.items[name]);
            if (index !== -1) {
                arr.splice(index, 1);
            }
        }
        setCheckList([...arr]);
    };

    const copyToQueue = async () => {
        //item:='{"name":"count", "args":[["det1", "det2"]], "item_type": "plan"}'
        //['user_group', 'user', 'item', 'pos', 'before_uid', 'after_uid', 'lock_key']
        console.log("curr: ", checkedList);
        const url = 'http://localhost:3001/queue/add/batch';
        /*
        const newArr = checkedList.map(((item) => ({
            user: item.user,
            user_group: item.user_group,
            pos: 'back',
            item
        })));*/
        //console.log("new: ", newArr);
        //const args = Object.entries(currentPlan.kwargs).map(([key, value]) => ({ [key]: value }));
        //console.log("new: ", args);
        //should check the success of requests if its false then we need to show an error message
        /*
        Failed to add an item: API request contains unsupported parameters: 'item'. Supported parameters: ['user_group', 'user', 'items', 'pos', 'before_uid', 'after_uid', 'lock_key']
        */
        //
        const items = {
            pos: 'back',
            items: checkedList
        };
        /*const item = {
            name: currentPlan.name,
            item_type: currentPlan.item_type,
            args
        }*/
        const response = await axios.post(url, checkedList);
        if (response.status === 200) {
            dispatch(getQueue());
            dispatch(getStatus());
        }
        console.log("Response: ", response); 
    }

    const isInArr = (item) => {
        const isIncluded = checkedList.includes(item);
        return isIncluded;
    };

    const printParama = (args) => {
        return Object.entries(args)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(", ");
    };


    return (
        <div /*style={{ maxWidth: '580px'}}*/>
            <Card className='shadow' style={{ maxHeight: '80%', }}>
                <CardBody>
                    <h5 style={{ textAlign: 'center'}}>History <span style={{ fontSize: '.875rem', fontStyle: 'italic'}}>(# of items: {status.status?.items_in_history})</span></h5>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <Button size='sm' onClick={copyToQueue} disabled={checkedList.length === 0}>Copy to Queue</Button>
                        <Button size='sm' onClick={() => setCheckList([])} disabled={checkedList.length === 0}>Deselect All</Button>
                        <Button size='sm' onClick={clearHistory}>Clear History</Button>
                        {/*<Button onClick={() => console.log("list: ", checkedList)}>Click</Button>*/}
                    </div>
                    <Row style={{ maxHeight: '450px', overflowY: 'scroll'}}>
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
                                <th style={{ width: '300px'}}>
                                    Parameters
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
                                            className={isInArr(item) ? "table-primary" : ''}
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
                                            <th style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                {item.name}
                                                <ViewResults obj={item}/>
                                            </th>
                                            <th>
                                                {item.result.exit_status}
                                            </th>
                                            <th style={{ overflowY: 'auto', maxHeight: '50px', maxWidth: '300px', fontSize: '.875rem'}}>
                                                {
                                                 printParama(item.kwargs)
                                                }
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