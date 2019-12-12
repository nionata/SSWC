import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null 
        }
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Southern Sierra Wildflower Club</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Nav className="">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;