import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../redux/serverSlice';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function DestroyEnvironment() {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const destroyEnvironment = async () => {
        try {
        const url = 'http://localhost:3001/environment/destroy';
    
        const response = await axios.post(url);
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
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
        </ModalBody>
        <ModalFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button color="danger" onClick={() => console.log("destroy")}>
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