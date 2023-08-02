import React, {useState, useEffect, useRef} from 'react';
import {
    Button,
    Input,
    Row,
    Col,
    Label
} from 'reactstrap';
import ServerCalls from '../../redux/serverCalls';
import { useDispatch, useSelector } from 'react-redux';
import { getConsole, getQueue, getStatus, getHistory } from '../../redux/serverSlice';
import { useConsoleConfig } from '../../redux/configContext';

function ConsoleOutput() {
    const [consoleInfo, setConsole ] = useState("");
    const [consoleUid, setConsoleUid] = useState(null);
    const [maxLines, setMaxLines] = useState(1000);
    const [autoScroll, setAutoScroll] = useState(false);
    
    const dispatch = useDispatch(); 
    const { consoleOutput } = useSelector(state => state.server);
    const { consoleConfig } = useConsoleConfig();
    const [changeHeight, setChangeHeight] = useState('');
    const [error, setError] = useState(null);
    //values to connect with console input section
    const inputRef = useRef();
    var objDiv = document.getElementById("consoleSection");

    useEffect(() => {

        (async () => {
        //Gets the console output for the first time
        if (consoleOutput.length === 0) {
            const initConsoleVal = await dispatch(getConsole());
            if (initConsoleVal?.payload?.console.success) {
                const consoleVal = initConsoleVal?.payload?.console.text.split('\n');
                if (maxLines >= consoleVal.length) {
                    setConsole(initConsoleVal?.payload?.console.text);
                } else {
                    const diff = consoleVal.length - maxLines;
                    consoleVal.splice(0, diff);
                    const newConsoleString = consoleVal.join('\n');
                    setConsole(newConsoleString);
                }
            }
            
        }
       
        let currentVal = consoleUid;
        //Gets the first uid of the console
        if (consoleUid === null) {
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            if (data?.consoleUid?.success) {
                currentVal = data?.consoleUid?.console_output_uid;
                setConsoleUid(currentVal);
            }
        }

        //function to call api function
        const timer = setInterval(async () => {
            const { data, error } = await ServerCalls.getConsoleOutputUID();
            if (data?.consoleUid?.success) {
                if (data.consoleUid?.console_output_uid !== currentVal) {
                    currentVal = data.consoleUid?.console_output_uid;
                    setConsoleUid(currentVal);
                    const newConsoleUpdate = await dispatch(getConsole());
                    changeMax(newConsoleUpdate, null, data.consoleUid?.console_output_uid);
                    dispatch(getQueue());
                    dispatch(getHistory());
                    dispatch(getStatus());
                }
            }

            setError(error);

        }, consoleConfig.console * 1000); 

        return () => {
            clearInterval(timer);
        };
    })();
    }, [consoleConfig, maxLines]);

    //once the max change is decideded and the console changes, the console string has to be cut down to max lines
    const changeMax = (newConsoleUpdate, value, consoleID) => {
        if (newConsoleUpdate.payload.console.success) {
            //takes the console string and seperates it into an array of strings
            const consoleVal2 = newConsoleUpdate.payload.console.text.split('\n');
            //slices the array into the max number of lines, then concats the array of strings again
            if (value === null) {
                if (maxLines >= consoleVal2.length) {
                    setConsole(newConsoleUpdate.payload.console.text);
                } else {
                    const diff2 = consoleVal2.length - maxLines;
                    consoleVal2.splice(0, diff2);
                    const newConsoleString2 = consoleVal2.join('\n');
                    setConsole(newConsoleString2);
                }
            } else {
                if (value >= consoleVal2.length) {
                    setConsole(newConsoleUpdate.payload.console.text);
                } else {
                    const diff2 = consoleVal2.length - value;
                    consoleVal2.splice(0, diff2);
                    const newConsoleString2 = consoleVal2.join('\n');
                    setConsole(newConsoleString2);
                }
            }
            
        }
        //sets changeHeight value to the new console id
        setChangeHeight(consoleID);
    };

    //auto scroll functionality, each time the changeHeight value is changed the input height changes
    useEffect(() => {
        if (autoScroll) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [changeHeight]);

    //Function to change the amount of max lines
    const handleMaxLines = async (e) => {
        const { value } = e.target;
        const newConsoleUpdate = await dispatch(getConsole());

        if (value < 1 || value > 1000 || value === '' || value === null || value === undefined) {
            changeMax(newConsoleUpdate, 1, consoleUid);
            setMaxLines(1);
        } else {
            changeMax(newConsoleUpdate, Number(value), consoleUid);
            setMaxLines(Number(Math.floor(value)));
        }
    };

    //Function to turn on auto scroll
    const handleCheckedScroll = (e) => {
        const { checked } = e.target;
        
        if (checked) {
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    
        setAutoScroll(checked);
    };

    return (
        <div>
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
                                style={{ minHeight: '150px'}}
                            />
                        </Col>
                    </Row>
                    {error !== null && <Row>
                    <Col>
                        <p style={{ color: 'red', textAlign: 'center'}}>
                            Error: {error}
                        </p>
                    </Col>
                </Row>}
        </div>
    );
};

export default ConsoleOutput;