import React, { useState } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Input, 
    Label,
    FormGroup,
    Row,
    Container,
    Col
} from 'reactstrap';
import {Info} from "react-feather";

function ViewResults({ obj }) {
  const [modal, setModal] = useState(false);
  const [ isHover, setHover] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Info size={20} onClick={toggle} style={isHover ? {color: '#0d6efd', margin: '10px'} : {color: 'black', margin: '10px'}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}/>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Plan Details</ModalHeader>
        <ModalBody>
            
            <Row style={{ textAlign: 'center'}}>
                <h5>{obj.name}</h5>
            </Row>
            <Container>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>User</strong>
                    <Input
                        value={obj.user}
                        type='text'
                        readOnly={true}
                    />
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Group</strong>
                    <Input
                        value={obj.user_group}
                        type='text'
                        readOnly={true}
                    />
                </Row>
                {obj.hasOwnProperty('result') && <><Row style={{ marginTop: '10px', marginBottom: '10px'}}>
                    <Col>
                        <strong>Start Time</strong> <Input
                            value={obj.result.time_start}
                            type='text'
                            readOnly={true}
                        />
                    </Col>
                    <Col>
                        <strong>Stop Time</strong> <Input
                            value={obj.result.time_stop}
                            type='text'
                            readOnly={true}
                        />
                    </Col>
                </Row> 
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Exit Status</strong>
                        <Input
                            value={obj.result.exit_status}
                            type='text'
                            readOnly={true}
                        />
                    
                </Row>
        
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Run uids</strong>
                    <Input
                        value={obj.result.run_uids.length === 0 ? 'None': JSON.stringify(obj.result.run_uids)}
                        type='text'
                        readOnly={true}
                    />
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Scan ids</strong>
                    <Input
                        value={obj.result.scan_ids.length === 0 ? 'None': JSON.stringify(obj.result.scan_ids)}
                        type='text'
                        readOnly={true}
                    />
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Message</strong> <Input
                        value={obj.result.msg === '' ? 'None' : obj.result.msg}
                        type='textarea'
                        readOnly={true}
                    />
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Traceback</strong> 
                    <Input
                        value={obj.result.traceback === '' ? 'None' : obj.result.traceback}
                        type='textarea'
                        readOnly={true}
                    />
                    
                </Row></>}
            </Container>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewResults;