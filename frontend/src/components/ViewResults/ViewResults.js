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
    Container
} from 'reactstrap';

function ViewResults({result, name}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="light" onClick={toggle}>
        View
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>View Results</ModalHeader>
        <ModalBody>
            
            <Row style={{ textAlign: 'center'}}>
                <h5>{name}</h5>
            </Row>
            <Container>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Exit Status</strong>
                    <Input
                        value={result.exit_status}
                        type='text'
                        readOnly={true}
                    />
                </Row>
        
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Run uids</strong>
                    <Input
                        value={result.run_uids.length === 0 ? 'None': JSON.stringify(result.run_uids)}
                        type='text'
                        readOnly={true}
                    />
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Scan ids</strong>
                    <Input
                        value={result.scan_ids.length === 0 ? 'None': JSON.stringify(result.scan_ids)}
                        type='text'
                        readOnly={true}
                    />
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Message</strong> <Input
                        value={result.msg === '' ? 'None' :result.msg}
                        type='textarea'
                        readOnly={true}
                    />
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Start Time</strong> <Input
                        value={result.time_start}
                        type='text'
                        readOnly={true}
                    />
                    
                </Row> 
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Stop Time</strong> <Input
                        value={result.time_stop}
                        type='text'
                        readOnly={true}
                    />
                    
                </Row>
                <Row style={{ margin: '10px 0px'}}>
                    <strong>Traceback</strong> 
                    <Input
                        value={result.traceback === '' ? 'None' : result.traceback}
                        type='textarea'
                        readOnly={true}
                    />
                    
                </Row>
            </Container>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewResults;