import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Row,
    Col,
    Label,
    Nav,
    NavLink,
    NavItem,
    TabContent,
    TabPane,
    FormGroup,
} from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

function Plans() {
    const [ tab, setTab ] = useState('viewer');
    const [plansAllowed, setPlansAllowed] = useState({});
    const [planNames, setPlanName] = useState([]);
    const [planInstruction, setPlanInstruction] = useState(null);
    const toggleTabs = (newTab) => {
        if (tab !== newTab) {
            setTab(newTab);
        }
    }

    useEffect(() => {
        (async () => {
            const value = await axios.get('http://localhost:3001/plans');
            if (value.status === 200) {
                if (value.data.plans.success) {
                    setPlansAllowed(value.data.plans.plans_allowed);
                    //console.log("stuff: ", value.data.plans);
                    const propertyNames = Object.keys(value.data.plans.plans_allowed);
                    setPlanName(propertyNames);
                }
                
                //const propertyNames = Object.keys(value.data?.devices);
                //setNames(propertyNames);
                //console.log("proper: ", propertyNames);
            }
            //console.log("value: ", value);
        })();
    }, []);

    return (
        <div>
            <Nav pills style={{ marginBottom: '10px' }}>
                <NavItem key={'viewer'}>
                    <NavLink active={tab === 'viewer'} onClick={() => toggleTabs('viewer')}>
                        Plan Viewer
                    </NavLink>
                </NavItem>
                <NavItem key={'editor'}>
                    <NavLink active={tab === 'editor'} onClick={() => toggleTabs('editor')}>
                        Plan Editor
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={tab}>
                <TabPane tabId={'viewer'}>
                    <Card>
                        <CardBody>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '10px'}}>
                            <p>
                                Running Plan
                            </p>
                            <Button>Copy to Queue</Button>
                            </div>
                            <Row>
                                <Col>
                                    <Input
                                        type='textarea'
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '10px'}}>
                                    <Button>Copy to Queue</Button>
                                    <Button>Edit</Button>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane tabId={'editor'}>
                    <Card>
                        <CardBody>
                        <FormGroup check>
                            <Input
                                name="plan1"
                                type="radio"
                                id={'plan'}
                                onChange={(e) => setPlanInstruction(e.target.id)}
                            />
                            {' '}
                            <Label check>
                                Plan
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input
                                name="plan1"
                                type="radio"
                                id={'instruction'}
                            />
                            {' '}
                            <Label check>
                                Instruction
                            </Label>
                        </FormGroup>
                            <Select
                                
                            />
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>
            
        </div>
    );
};

export default Plans;