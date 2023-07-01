import React, {useState, useEffect, useRef} from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label
} from 'reactstrap';
import axios from 'axios';

function ConsoleOutput() {
    const [consoleInfo, setConsole ] = useState("");
    useEffect(() => {
        (async () => {
            const value = await axios.get('http://localhost:3001/console');
            if (value.status === 200) {
                if (value.data.console.success) {
                    setConsole(value.data?.console.text);
                }
                
            }
        })();
        /*
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
            console.log("info: ", textareaRef.current.scrollHeight);
          }*/
    }, []);

    return (
        <div>
            <Card body className='shadow'>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                        <div>
                            <Input type="checkbox" />
                            {' '}
                            <Label check>
                            Autoscroll
                            </Label>
                        </div>
                        <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '300px', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <Label style={{ marginRight: '5px'}}>
                                    Max Lines:
                                </Label>
                                <Input 
                                type={'number'}
                                style={{ width: '100px'}}
                                size={'sm'}
                                />
                            </div>
                            <Button onClick={() => setConsole("")}>
                            Clear
                            </Button>
                        </div>
                    </div>
                    <Row>
                        <Col>
                            <Input
                                type='textarea'
                                readOnly={true}
                                value={consoleInfo}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default ConsoleOutput;