import React, { useState, useEffect } from 'react';
import { 
    Button,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody
} from 'reactstrap';
import Environment from '../Environment/Environment';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from '../../redux/serverSlice';
import Devices from '../Devices/Devices';

function SideBar() {
    const dispatch = useDispatch();
    const [sidebar, setSideBar] = useState(false);
    const toggle = () => setSideBar(!sidebar);
    const { devices } = useSelector(state => state.server);
    
    useEffect(() => {
        if (devices.length === 0) {
            //Checks to see if the devices state in redux is empty, if it is then we call the function to populate state with devices data
            dispatch(getDevices());
        }
    }, []);
    return (
        <div>
            <Button
                color="light"
                onClick={toggle}
            >
                View Details
            </Button>
            <Offcanvas
                direction="end"
                toggle={toggle}
                isOpen={sidebar}
            >
                <OffcanvasHeader toggle={toggle}>
                Extra Details
                </OffcanvasHeader>

                <OffcanvasBody>
                    <Environment />
                    
                    <Devices />
                </OffcanvasBody>
            </Offcanvas>
        </div>
    );
}

export default SideBar;