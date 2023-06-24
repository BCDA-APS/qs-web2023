import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import SideBar from '../SideBar/SideBar';

function NavBar({children}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color={'light'} className="d-flex justify-content-between align-items-center">
        <NavbarText>LOGO</NavbarText> 
        <NavbarText style={{ textAlign: 'center'}}>BlueSky Queue Monitor</NavbarText>
        <SideBar />
      </Navbar>
      {children}
    </div>
  );
}

export default NavBar;