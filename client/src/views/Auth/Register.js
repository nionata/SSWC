import React from 'react';
import './Auth.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            err: ""
        }
    }

    onRegister() {
        axios.get('/login/' + this.state.name).then((res) => {
            if (res.data) {
                this.setState({err: "That user already exists"})
            } else {
                axios.post('/register/' + this.state.name).then((res) => {
                    if (res.data) {
                        this.setState({name: "", err: ""})
                        this.props.onUpdate()
                        window.location = "/"
                    }
                })
            }
        })
    }

    render() {        
        return (
            <div className="container">
                <Card style={{ width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        {this.state.err !== "" && <p>{this.state.err}</p>}
                        <input className="authInput" placeholder="Name" onChange={(e) => this.setState({name: e.target.value})} />
                        <Button variant="dark" onClick={() => this.onRegister()}>Register</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Register;
