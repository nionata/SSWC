import React from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

class Header extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         user: null 
    //     }
    // }

    auth = (user) => {
        if (user === "") {
            return (
                <Nav className="">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            )
        } else {
            return <p>{user}</p>
        }
    }

    render() {
        const { user } = this.props
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Southern Sierra Wildflower Club</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                {this.auth(user)}
            </Navbar>
        )
    }
}

export default Header;