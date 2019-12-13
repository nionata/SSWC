import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import './Header.css'

const auth = (user) => {
    if (user === "") {
        return (
            <Nav className="">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        )
    } else {
        return (
            <Nav className="">
                <Nav.Item className="user">{user}</Nav.Item>
            </Nav>
        )
    }
}

const Header = ({ user }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Southern Sierra Wildflower Club</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            {auth(user)}
        </Navbar>
    )
}

export default Header;