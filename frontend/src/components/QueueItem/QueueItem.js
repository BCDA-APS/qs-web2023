import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Row
} from 'reactstrap';

function QueueItem(props) {

    return (
        <Card style={{ margin: '5px'}}>
            <CardBody style={{ display: 'flex', flexDirection: 'row'}}>
                <p>{props.item?.name}</p>
                <p>{props.item?.user}</p>
                <p>{props.item?.user_group}</p>
            </CardBody>
        </Card>
    )
};

export default QueueItem;