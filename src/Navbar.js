import React, { useState } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";

export default props => {
  const { handleSystem, system } = props;
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">Weather App</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => toggleCollapse()} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            {system === 'metric'
              ? <div className="text-white">
                <span className="border-bottom">C</span>
                <span> / </span>
                <span onClick={() => handleSystem('imperial')} style={{ color: 'white', cursor: "pointer" }}>
                  <strong>F</strong>
                </span>
              </div>
              : <div className="text-white ">
                <span onClick={() => handleSystem('metric')} style={{ color: 'white', cursor: "pointer" }}>
                  <strong>C</strong></span>
                <span> / </span>
                <span className="border-bottom">F</span>
              </div>
            }
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}
