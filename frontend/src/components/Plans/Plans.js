import React, { useState } from 'react';
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
    TabPane
} from 'reactstrap';

function Plans() {
    const [ tab, setTab ] = useState('viewer');
    const toggleTabs = (newTab) => {
        if (tab !== newTab) {
            setTab(newTab);
        }
    }

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
                            Editor
                        </CardBody>
                    </Card>
                </TabPane>
            </TabContent>
            
        </div>
    );
};

export default Plans;