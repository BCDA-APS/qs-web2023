import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, getStatus } from '../../redux/serverSlice';
import axios from 'axios';

function RunningPlan() {
    const dispatch = useDispatch();
    const { status, queue } = useSelector(state => state.server);
    const [ currentRunPlan, setRunCurrentPlan] = useState(null);

    const [valuerun, setValueRun] = useState('');
    useEffect(() => {
        if (status.length === 0) {
            dispatch(getStatus());
        }

        if (queue.length === 0) {
            dispatch(getQueue());
        }
        printRuns();
    }, []);

    const printRuns = async () => {
        try {
            const url = 'http://localhost:3001/queue/runs/active';
            const response = await axios.get(url);
            console.log("responseRunning: ", response);
        } catch (error) {
            console.log("error: ", error);
        }
        
    };

    const findItem = (id) => {
        const queueItem = queue?.queue?.items?.filter((item) => item.item_uid === id);
        if (queueItem.length > 0) {

            let result = `Plan Name: ${queueItem[0].name}\nParameters:\n`;

            for (const key in queueItem[0].kwargs) {
                result += `  ${key}: ${queueItem[0].kwargs[key]}\n`;
            }
            setValueRun(result);
            setRunCurrentPlan(queueItem[0]);
        }
        //console.log("correctITem: ", queueItem);
    };

    useEffect(() => {
        /*
        if (status?.length !== 0 && status?.status?.running_item_uid !== null) {
            findItem(status?.status?.running_item_uid);
        }
        //console.log("went in hereconsta")
        if (status?.status?.running_item_uid === null) {
            setRunCurrentPlan(null);
            setValueRun('');
        }*/
        if (queue?.queue?.running_item) {
            if (Object.keys(queue?.queue?.running_item).length > 0) {
                let result = `Plan Name: ${queue?.queue?.running_item.name}\nParameters:\n`;
                for (const key in queue?.queue?.running_item.kwargs) {
                    result += `  ${key}: ${queue?.queue?.running_item.kwargs[key]}\n`;
                }
                setValueRun(result);
                setRunCurrentPlan(queue?.queue?.running_item);
            } else {
                setRunCurrentPlan(null);
                setValueRun('');
            }
        }
        
    }, [queue?.queue?.running_item]);
    //dont update the running plan if queue is running if the rm is idle
    //include a configuration modal in sidebar to ask user to customize the amount of seconds to check for new information
    
    const copyToQueue = async () => {
        if (queue?.queue?.running_item !== null) {
            try {
                const url = 'http://localhost:3001/queue/add';
    
                const items = {
                    pos: 'back',
                    item: queue?.queue?.running_item
                };
                const response = await axios.post(url, items);
                if (response.status === 200) {
                    dispatch(getQueue());
                    dispatch(getStatus());
                }
                console.log("Response: ", response); 
            } catch (error) {
                console.log("error: ", error);
            }
        }
        
    }

    return (
        <div>
            <Card body className='shadow' style={{ minHeight: '300px'}}>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                        <h5>
                            Running Plan
                        </h5>
                        <Button onClick={copyToQueue} disabled={false}>Copy to Queue</Button>
                    </div>
                    <Row>
                        <Col>
                            <Input
                                type='textarea'
                                readOnly={true}
                                value={valuerun}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default RunningPlan;