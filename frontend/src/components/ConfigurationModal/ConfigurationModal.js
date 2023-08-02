import React, { useState } from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Card,
    CardBody,
    Input,
    FormGroup,
    Label
} from 'reactstrap';
import { useConsoleConfig } from '../../redux/configContext';
import InfoIcon from '../InfoIcon/InfoIcon';

function ConfigurationModal() {
  const [modal, setModal] = useState(false);
  const { consoleConfig, updateConsoleConfig } = useConsoleConfig();
  const [ consoleValue, setConsoleValue ] = useState(consoleConfig?.console);
  const initialError = {
    console: false,
  };
  const [ error, setError ] = useState(initialError);
  const consoleDescription = 'The server checks for any changes in console output every n seconds.';

  const toggle = () => setModal(!modal);

  const handleConsoleValue = (e) => {
    setConsoleValue(e.target.value);
    setError({...error, console: false});
  };

  const errorChecking = () => {
    let submit = true;
    let errorValue = {...error};
    if (consoleValue === '' || !Number.isInteger(Number(consoleValue)) || Number(consoleValue) < 1 || consoleValue === null || consoleConfig === undefined) {
        errorValue.console = true;
        submit = false;
    }
    setError({...errorValue});
    return submit;
  };

  const saveChanges = () => {
    const value = errorChecking();
    if (value) {
        updateConsoleConfig({console: Number(consoleValue)});
        setModal(!modal);
    }
  };

  const handleCancel = () => {
    setConsoleValue(consoleConfig?.console);
    setError(initialError);
    setModal(!modal);
  };

  return (
    <div>
        <Card style={{ marginBottom: '10px'}} className='shadow'>
            <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Button onClick={toggle}>
                    Open Configuration Settings
                </Button>
            </CardBody>
        </Card>
        <Modal isOpen={modal}>
            <ModalHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>Configuration Settings</ModalHeader>
                <ModalBody>
            
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end'}}>
                        <p>Console Output Refresh Timer: Every </p>
                        <Input
                            type={'number'}
                            value={consoleValue}
                            invalid={error.console}
                            onChange={handleConsoleValue}
                            min="1" 
                            step="1"
                            style={{ width: '100px'}}
                        />
                        <p>seconds</p>
                        <InfoIcon header={'Console Output Refresh Timer'} content={consoleDescription} id={'console'}/>
                    </div>
                    
                    {error.console && <p style={{ color: 'red', textAlign: 'center' }}>Please enter a valid whole number greater than 0</p>}
                </ModalBody>
            <ModalFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button color="primary" onClick={saveChanges}>
                    Save Changes
                </Button>{' '}
                <Button color="secondary" onClick={handleCancel}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    </div>
  );
}

export default ConfigurationModal;