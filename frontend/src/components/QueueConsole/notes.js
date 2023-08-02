{/*<Col xs='1'>
                        <Menu onClick={() => setIsOpen(!isOpen)} id={`menuControls${props.index}`}/>
                        <UncontrolledPopover
                            placement="bottom"
                            target={`menuControls${props.index}`}
                            trigger="legacy"
                            isOpen={isOpen}
                            onMouseLeave={() => setIsOpen(!isOpen)}
                        >
                            <PopoverBody style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '200px'}}>

                                <EditItem queueItem={props.item} setIsOpen={setIsOpen} isOpen={isOpen}/>
                                <Copy onClick={() => {duplicateItem(props.item); setIsOpen(!isOpen)}}/>
                                <Trash onClick={() => {removeQueueItem(props.item); setIsOpen(!isOpen)}}/>
                                <Play />
                                {props.index > 0 && <ChevronsUp />}
                                {props.index < (queue?.queue?.items?.length - 1) && <ChevronsDown />}
                            </PopoverBody>
                        </UncontrolledPopover>
    </Col>*/}

/*
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
        setCheckList([]);*/

<Table hover>
                            <thead>
                                <tr>
                                <th></th>
                                    <th>
                                        Name
                                    </th>
                                    
                                    <th style={{maxWidth: '100px'}}>
                                        Parameters
                                    </th>
                                    
                                    <th></th>
                                    <th></th>
                                    
                                    
                                    <th>
                                    </th>
                                    <th></th>
                                    <th></th>
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
                                                {/*<th>
                                                    <FormGroup check>
                                                        <Input 
                                                            type="checkbox" 
                                                            id={item.name}
                                                            name={index}
                                                            onChange={handleChecked}
                                                            checked={isInArr(item)}
                                                        />
                                                    </FormGroup>
                                        </th>*/}
                                            
                                                <th>
                                                    <PlayCircle onClick={() => executeItem(item)} style={isHover[index]?.playHover ? {color: 'green', margin: '10px'} : {color: 'black', margin: '10px'}} onMouseEnter={() => handleIsHover(index, true, 'playHover')} onMouseLeave={() => handleIsHover(index, false, 'playHover')}/>
                                                </th>
                                                <th style={{ fontSize: '.875rem', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                    {item.name}
                                                    <ViewResults obj={item}/>
                                                </th>
                                                {/*<th style={{maxWidth: '150px', overflowX: 'scroll', whiteSpace: 'nowrap'}}>*/}
                                                <th style={{maxWidth: '150px', overflow: 'auto', whiteSpace: 'nowrap'}}>
                                                    {printParama(item.kwargs)}
                                                </th>
                                                {/*<th style={{maxWidth: '150px', overflowX: 'scroll', whiteSpace: 'nowrap'}}>*/}
                                                
                                                <th>
                                                    
                                                    {index > 0 && <ArrowUp onClick={() => moveQueueItem(item, index, 'UP')} style={isHover[index]?.upHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} onMouseEnter={() => handleIsHover(index, true, 'upHover')} onMouseLeave={() => handleIsHover(index, false, 'upHover')}/>}
                                                </th>
                                                <th>{index < (queue?.queue?.items?.length - 1) && <ArrowDown onClick={() => moveQueueItem(item, index, 'DOWN')} style={isHover[index]?.downHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} onMouseEnter={() => handleIsHover(index, true, 'downHover')} onMouseLeave={() => handleIsHover(index, false, 'downHover')}/>}</th>
                                                <th><Copy onClick={() => duplicateItem(item)} style={isHover[index]?.copyHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} onMouseEnter={() => handleIsHover(index, true, 'copyHover')} onMouseLeave={() => handleIsHover(index, false, 'copyHover')}/></th>
                                                
                                                <th>
                                                    {/* <EditItem queueItem={item}/> */}
                                                </th>
                                                <th>
                                                <Trash2 onClick={() => removeQueueItem(item) } onMouseEnter={() => handleIsHover(index, true, 'deleteHover')} onMouseLeave={() => handleIsHover(index, false, 'deleteHover')} style={isHover[index]?.deleteHover ? {color: 'red', margin: '10px'} : {color: 'black', margin: '10px'}} />
                                                </th>
                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>



/*const addRunningInfo = async () => {
        if (Object.keys(queue?.queue?.running_item).length > 0) {
            let result = `Plan Name: ${queue?.queue?.running_item.name}\nParameters:\n`;
            for (const key in queue?.queue?.running_item.kwargs) {
                result += `  ${key}: ${queue?.queue?.running_item.kwargs[key]}\n`;
            }
            try {
                //after_uid
                const url = 'http://localhost:3001/queue/runs/active';
                
                //Want duplicated item to be added after the original item
                const response = await axios.get(url);
                console.log("Response: ", response.data)
            } catch (error) {
                console.log("error: ", error);
            }

            const formattedOutput = run_list.map((run) => {
                const { uid, exit_status } = run;
                if (exit_status === "success") {
                  return `${uid} success`;
                } else if (run.is_open) {
                  return `${uid} in progress...`;
                } else {
                  return `${uid} unknown status`;
                }
              }).join(', ');

            setValueRun(result);
            setRunCurrentPlan(queue?.queue?.running_item);
        } else {
            setRunCurrentPlan(null);
            setValueRun('');
        }
    }*/

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
                        {/*<Row>
                        <Col
                            xs="6"
                        >
                            RE Environment: {status.status?.worker_environment_state === 'idle' ? 'OPEN' : status.status?.worker_environment_state}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue is Running: {status.status?.running_item_uid ? 'YES' : 'NO'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            Manager State: {status.status?.manager_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue STOP Pending: {status.status?.queue_stop_pending ? 'YES' : 'NO'}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs="6"
                        >
                            RE State: {status.status?.re_state?.toUpperCase()}
                        </Col>
                        <Col
                            xs="6"
                        >
                            Queue LOOP Mode: {status.status?.plan_queue_mode?.loop ? 'ON' : 'OFF'}
                        </Col>
                    </Row>
                    <Row>
                    
    </Row>*/}