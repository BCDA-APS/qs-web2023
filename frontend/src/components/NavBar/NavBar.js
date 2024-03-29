import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
} from 'reactstrap';
import SideBar from '../SideBar/SideBar';

function NavBar({children}) {

  return (
    <div>
      <Navbar color={'light'} className="d-flex justify-content-between align-items-center">
        <NavbarBrand>
        <img
          alt="logo"
          src={`https://blueskyproject.io/_assets/bluesky-logo-dark.svg`}
          style={{
            height: 25,
            width: 100
          }}
        />
      </NavbarBrand>
        <NavbarText style={{ textAlign: 'center'}}>bluesky Queue Monitor</NavbarText>
        <SideBar />
      </Navbar>
      {children}
    </div>
  );
}

export default NavBar;