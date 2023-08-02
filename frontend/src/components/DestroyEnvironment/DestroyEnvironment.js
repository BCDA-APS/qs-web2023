import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../redux/serverSlice';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import ServerCalls from "../../redux/serverCalls";

function DestroyEnvironment() {
    const [modal, setModal] = useState(false);
    const [ error, setError] =  useState(null);
    const toggle = () => setModal(!modal);

    //Function to destroy environment
    const destroyEnvironment = async () => {  
      const { data, error } = await ServerCalls.destroyEnvironment();
      setError(error); 
    };

  return (
    <>
      <Button color="danger" onClick={toggle} style={{ width: '100%', height: '100%'}}>
        Kill RE
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>Confirmation</ModalHeader>
        <ModalBody style={{ textAlign: 'center'}}>
            <strong>Warning</strong>: This action will terminate the run engine completely. Are you sure you want to proceed?
            {error !== null && <Row>
                <Col>
                    <p style={{ color: 'red', textAlign: 'center'}}>
                        Error: {error}
                    </p>
                </Col>
            </Row>}
        </ModalBody>
        <ModalFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button color="danger" onClick={destroyEnvironment}>
            Proceed
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DestroyEnvironment;