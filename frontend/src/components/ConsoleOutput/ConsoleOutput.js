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
    const [maxLines, setMaxLines] = useState(1000);
    const [autoScroll, setAutoScroll] = useState(false);
    
    const dispatch = useDispatch(); 
    const { consoleOutput } = useSelector(state => state.server);
    const { consoleConfig } = useConsoleConfig();
    const [timerValue, setTimerValue] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const inputRef = useRef();
    var objDiv = document.getElementById("consoleSection");
    //split array by the value that is there

    useEffect(() => {

        (async () => {
        //Gets the console output for the first time
        if (consoleOutput.length === 0) {
            const initConsoleVal = await dispatch(getConsole());
            if (initConsoleVal.payload.console.success) {
                const consoleVal = initConsoleVal.payload.console.text.split('\n');
                console.log("maxLines: ", maxLines);
                if (maxLines >= consoleVal.length) {
                    setConsole(initConsoleVal.payload.console.text);
                } else {
                    const diff = consoleVal.length - maxLines;
                    consoleVal.splice(0, diff);
                    const newConsoleString = consoleVal.join('\n');
                    setConsole(newConsoleString);
                }
            }
            
        }
        console.log("stuffc");
        let currentVal = consoleUid;
        //Gets the first uid of the console
        if (consoleUid === null) {
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            if (data?.consoleUid?.success) {
                currentVal = data?.consoleUid?.console_output_uid;
                setConsoleUid(currentVal);
            }
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
        console.log("first: ", currentVal);
        
        const timer = setInterval(async () => {
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            if (data?.consoleUid?.success) {
                if (data.consoleUid?.console_output_uid !== currentVal) {
                    console.log("not in the same: ", currentVal);
                    console.log("sec: ", data.consoleUid?.console_output_uid);
                    currentVal = data.consoleUid?.console_output_uid;
                    setConsoleUid(currentVal);
                    //console.log("is not the same: ", newValue.payload?.consoleUid?.console_output_uid);
                    
                    const newConsoleUpdate = await dispatch(getConsole());
                    //console.log("updatC: ", newConsoleUpdate);
                    if (newConsoleUpdate.payload.console.success) {
                        const consoleVal2 = newConsoleUpdate.payload.console.text.split('\n');
                        //console.log("con: ", consoleVal2);
                        console.log("maxLines: ", maxLines);
                        if (maxLines >= consoleVal2.length) {
                            
                            //console.log("its okay: ", consoleVal2.length);
                            setConsole(newConsoleUpdate.payload.console.text);
                        } else {
                            const diff2 = consoleVal2.length - maxLines;
                            console.log("diff2: ", diff2);
                            consoleVal2.splice(0, diff2);
                            //console.log("consolenew2: ", consoleVal2);
                            const newConsoleString2 = consoleVal2.join('\n');
                            //console.log("newSt2: ", newConsoleString2);
                            setConsole(newConsoleString2);
                        }
                    }
                    dispatch(getQueue());
                    dispatch(getHistory());
                    dispatch(getStatus());
                }
            }
            console.log("hey: ", consoleConfig.console);
          
        }, consoleConfig.console * 1000); 

        setIntervalId(timer);
        return () => {
            console.log("went in here con");
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
    }, [consoleConfig, maxLines]);


    const handleMaxLines = (e) => {
        console.log("e: maxLines: ", e);
        const { value } = e.target;
        if (value < 10 || value > 1000 || value === '' || value === null || value === undefined) {
            setMaxLines(10);
        } else {
            setMaxLines(Number(value));
        }
    }

    const handleCheckedScroll = (e) => {
        const { checked } = e.target;
        
        if (checked) {
            
            objDiv.scrollTop = objDiv.scrollHeight;
        } else {
            objDiv.scrollTop = 0
        }
        setAutoScroll(checked);
    };

    return (
        <div>
            <Card className='shadow'>
                <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                        <div>
                            <Input 
                                type="checkbox"
                                checked={autoScroll}
                                onChange={handleCheckedScroll}
                            />
                            {' '}
                            <Label check>
                            Autoscroll
                            </Label>
                        </div>
                        <Button onClick={() => console.log("max: ", maxLines)}>Click</Button>
                        <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '300px', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <Label style={{ marginRight: '5px'}}>
                                    Max Lines:
                                </Label>
                                <Input 
                                type={'number'}
                                style={{ width: '100px'}}
                                size={'sm'}
                                value={maxLines}
                                min="10" 
                                step="1"
                                max='1000'
                                onChange={handleMaxLines}
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
                                id='consoleSection'
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