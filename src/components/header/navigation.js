import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import './navigation.css';


const Navigation = () => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" id="upmost" style={{fontSize: '120%'}}>
            <Container>
                <Navbar.Brand style={{fontSize: '130%'}}><NavLink to='/' className='NavBrand'>GreenVille Sports</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><NavLink to='/book' className='NavLink'>Book</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/services' className='NavLink'>Our Services</NavLink></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;