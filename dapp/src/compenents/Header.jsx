import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, NavbarBrand } from 'react-bootstrap'
import { getUserAdress } from '../Web3Client';
import { useState,useEffect } from 'react';




function Header() {

  
  return (
    <>
   <Navbar
    className="navbar"
    style={{
          height: 100,
          backgroundColor: "#efefef"
        }}
  >
       <NavbarBrand href="/">
      <img
        alt="logo"
        src="./logo-white.png"
        style={{
          height: 100,
          width: 300,
          marginLeft: 100
        }}
      />
    </NavbarBrand>
    <h1 style={{
          marginLeft: 2000
        }}>wallet address</h1>
    </Navbar>
    </>
  );
}

export default Header;