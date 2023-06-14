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

function History() {
    const [history, setHistory] = useState([]);
    const [currentPlan, setCurrentPlan] = useState({});
    useEffect(() => {
        (async () => {
            const value = await axios.get('http://localhost:3001/history');
            if (value.status === 200) {
                setHistory(value.data.history);
                console.log("stuff: ", value.data);
                //const propertyNames = Object.keys(value.data?.devices);
                //setNames(propertyNames);
                //console.log("proper: ", propertyNames);
            }
            console.log("value: ", value);
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

    return (
        <div>
            <Card>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: '10px'}}>
                        <p>
                            History
                        </p>
                        <Button>Copy to Queue</Button>
                        <Button onClick={() => setCurrentPlan({})}>Deselect All</Button>
                        <Button>Clear All</Button>
                    </div>
                    <Row>
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
                                history?.map((item, index) => {
                                    return (
                                        <tr 
                                            onClick={() => setCurrentPlan(item)} 
                                            key={item.item_uid}
                                            /*style={item.item_uid === currentPlan.item_uid ? {border: '1px solid black', borderTop: '1px solid black'} : null}*/
                                            class={item.item_uid === currentPlan.item_uid ? "table-primary" : ''}
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