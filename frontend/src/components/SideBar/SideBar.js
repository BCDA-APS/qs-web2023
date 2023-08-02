import React, { useState } from 'react';
import { 
    Button,
    Offcanvas,
    OffcanvasHeader,
    OffcanvasBody
} from 'reactstrap';
import Environment from '../Environment/Environment';
import ConfigurationModal from '../ConfigurationModal/ConfigurationModal';

function SideBar() {
    //Used to open and close the side bar
    const [sidebar, setSideBar] = useState(false);
    const toggle = () => setSideBar(!sidebar);

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