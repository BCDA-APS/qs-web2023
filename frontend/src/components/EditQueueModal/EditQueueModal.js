import React, { useState, useEffect } from 'react';
import {
    Modal,
    Button,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Rol,
    Col,
    Table,
    FormGroup, 
    Input
} from 'reactstrap';
import axios from 'axios';

function EditQueueModal(props) {
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState(props.item);
    const [parameters, setParameters] = useState(props.item?.kwargs);
    const [check, setCheck] = useState({});

    const [plan, setPlan] = useState({});
    const toggle = () => setModal(!modal);
    //Figure out which parameter to submit based on checked parameter
    useEffect(() => {
        (async () => {
            const value = await axios.get('http://localhost:3001/plans');
            if (value.status === 200) {
                if (value.data.plans.success) {
                    setPlan(value.data.plans.plans_allowed[props.item?.name]);
                    let obj = {};
                    //const attributeNames = Object.getOwnPropertyNames(value.data.plans.plans_allowed[props.item?.name]?.parameters);
                    //console.log("attri: ", attributeNames);
                    let tempParameters = {...parameters};
                    value.data.plans.plans_allowed[props.item?.name]?.parameters.forEach(item => {
                        //If no default then its locked
                        
                        if (item.hasOwnProperty('default')) {
                            obj[item.name] = {check: false, default: false};
                            if (!parameters.hasOwnProperty(item.name)) {
                                //if the plan hasnt used this property but theres a defult val
                                tempParameters[item.name] = item.default;
                            }
                        } else {
                            obj[item.name] = {check: true, default: true};
                        }
                        
                    });
                    setParameters({...tempParameters});
                    setCheck(obj);
                }
            }
        })();
    }, []);

    const handleChecked = (e) => {
        const { checked, name } = e.target;
        let obj = {...check};
        obj[name] = {...obj[name], check: checked};
        setCheck({...obj});
    };

    return (
        <div>
            <Button color="primary" onClick={toggle}>
                Edit
            </Button>
            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <ModalHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>Edit Plan</ModalHeader>
                <ModalBody>
                    <p style={{ textAlign: 'center'}}><strong>Description:</strong> {plan?.description}</p>
                    {/* <Button onClick={() => {console.log("obj: ", check); console.log("para: ", parameters);}}>Click</Button> */}
                    <Table striped>
                            <thead style={{ textAlign: 'center'}}>
                                <tr>
                                    <th>
                                        Parameter
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                    <th>
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    plan?.parameters?.map((item) => {
                                        return (
                                            <tr>
                                                <th>
                                                    {item.name}
                                                </th>
                                                <th>
                                                    <FormGroup check>
                                                        <Input 
                                                            type="checkbox" 
                                                            id={item.name}
                                                            name={item.name}
                                                            checked={check[item.name].check}
                                                            readOnly={check[item.name].default}
                                                            onChange={handleChecked}
                                                        />
                                                    </FormGroup>
                                                </th>
                                                <th>
                                                    <Input 
                                                        value={parameters[item.name]} //Fix so that it shows array
                                                        readOnly={check[item.name].default ? true : !check[item.name].check}
                                                    />
                                                </th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                </ModalBody>
                <ModalFooter style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button color="primary" onClick={toggle}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default EditQueueModal;