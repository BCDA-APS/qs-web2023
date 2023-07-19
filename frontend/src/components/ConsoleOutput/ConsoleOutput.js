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
import ServerCalls from '../../redux/serverCalls';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getConsole, getConsoleOutputUID, getQueue, getStatus, getHistory } from '../../redux/serverSlice';
import { useConsoleConfig } from '../../redux/configContext';

function ConsoleOutput() {
    //TODO: if something in the console changes update the entire site too
    const [consoleInfo, setConsole ] = useState("");
    const [consoleUid, setConsoleUid] = useState(null);
    
    const dispatch = useDispatch(); 
    const { consoleOutput } = useSelector(state => state.server);
    const { consoleConfig } = useConsoleConfig();
    const [timerValue, setTimerValue] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const inputRef = useRef();

    const scrollToBottom = () => {
        // Scroll to the bottom of the input element
        const inputElement = inputRef.current;
        inputElement.scrollTop = inputElement.scrollHeight;
    };
    

    useEffect(() => {
        console.log("here console sec");
        scrollToBottom();
    }, [consoleOutput]);

    useEffect(() => {

        (async () => {
        
        if (Object.keys(consoleOutput).length === 0) {
            dispatch(getConsole());
        }
        let currentVal = consoleUid;
        if (consoleUid === null) {
            console.log("goingst in here");
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            console.log("data3: ", data);
            if (data?.consoleUid?.success) {
                currentVal = data?.consoleUid?.console_output_uid;
                setConsoleUid(currentVal);
            }
            //console.log("value: ", value);
        }

        const checkId = async () => {
            console.log("hey: ", consoleConfig.console);
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            if (data?.consoleUid?.success) {
                if (data.consoleUid?.console_output_uid !== currentVal) {
                    currentVal = data.consoleUid?.console_output_uid;
                    setConsoleUid(currentVal);
                    //console.log("is not the same: ", newValue.payload?.consoleUid?.console_output_uid);
                    dispatch(getConsole());
                }
            }
        };

        if (intervalId) {
            console.log("inter: ", intervalId);
            clearInterval(intervalId);
        }

        const timer = setInterval(async () => {
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            if (data?.consoleUid?.success) {
                if (data.consoleUid?.console_output_uid !== currentVal) {
                    currentVal = data.consoleUid?.console_output_uid;
                    setConsoleUid(currentVal);
                    //console.log("is not the same: ", newValue.payload?.consoleUid?.console_output_uid);
                    dispatch(getConsole());
                    dispatch(getQueue());
                    dispatch(getHistory());
                    dispatch(getStatus());
                }
            }
            console.log("hey: ", consoleConfig.console);
          
        }, consoleConfig.console * 1000); 

        setIntervalId(timer);
        return () => {
            clearInterval(timer);
        };

        /*
        //checkId();
        let interval = inter;
        if (timerValue !== consoleConfig.console) {
            console.log("here: ", timerValue);
            console.log("inter: ", interval);
            clearInterval(interval);
            interval = setInterval(checkId, consoleConfig.console * 1000);
            console.log("interv: ", interval);
            setInter(interval);
            setTimerValue(consoleConfig.console)
        }*/
        /*
        let interval = setInterval(checkId, consoleConfig.console * 1000);
        //const interval = setInterval(checkId, consoleConfig.console * 1000); // Convert seconds to milliseconds
        //console.log("here");
        // Clean up the intervifal when the component unmounts
        if (consoleConfig.console !== timerValue) {
            console.log("here :" , consoleConfig.console);
            clearInterval(interval);
            interval = setInterval(checkId, consoleConfig.console * 1000);

            setTimerValue(consoleConfig.console);
        }*/
        
        
        /*
        
        const timer = setInterval(async () => {
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            if (data?.consoleUid?.success) {
                if (data.consoleUid?.console_output_uid !== currentVal) {
                    currentVal = data.consoleUid?.console_output_uid;
                    setConsoleUid(currentVal);
                    //console.log("is not the same: ", newValue.payload?.consoleUid?.console_output_uid);
                    dispatch(getConsole());
                }
            }
            console.log("hey: ", consoleConfig.console);
          
        }, consoleConfig.console * 1000); // 3000 milliseconds = 3 seconds
      
          // Clean up the timer when the component unmounts
          return () => clearInterval(timer);*/
    })();
    }, [consoleConfig]);



    return (
        <div>
            <Card className='shadow'>
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
                                ref={inputRef}
                                type='textarea'
                                readOnly={true}
                                value={consoleOutput?.console?.text}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default ConsoleOutput;