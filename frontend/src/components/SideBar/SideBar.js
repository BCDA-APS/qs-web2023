import React, { useState, useEffect } from 'react';
import { 
    Button,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody
} from 'reactstrap';
import Environment from '../Environment/Environment';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices, getPlans } from '../../redux/serverSlice';
import ConfigurationModal from '../ConfigurationModal/ConfigurationModal';

function SideBar() {
    const dispatch = useDispatch();
    const [sidebar, setSideBar] = useState(false);
    const toggle = () => setSideBar(!sidebar);
    const { devices, plans } = useSelector(state => state.server);
    
    useEffect(() => {
        if (devices.length === 0) {
            //Checks to see if the devices state in redux is empty, if it is then we call the function to populate state with devices data
            dispatch(getDevices());
        }

        if (plans.length === 0) {
            dispatch(getPlans());
        }
    }, []);
    return (
        <div>
            <Button
                color="light"
                onClick={toggle}
            >
                Settings
            </Button>
            <Offcanvas
                direction="end"
                toggle={toggle}
                isOpen={sidebar}
            >
                <OffcanvasHeader toggle={toggle}>
                
                </OffcanvasHeader>

                <OffcanvasBody>
                    <Environment />
                    
                    <ConfigurationModal />
                </OffcanvasBody>
            </Offcanvas>
        </div>
    );
}

export default SideBar;