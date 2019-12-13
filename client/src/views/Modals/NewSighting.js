import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class NewSighting extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { show, onHide, onSubmit } = this.props
        const { location, sighted } = this.state
        
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                <Modal.Title>Add a New Sighting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Location" onChange={(e) => this.setState({location: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="date" placeholder="Sighted" onChange={(e) => this.setState({sighted: e.target.value})} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onSubmit(location, sighted)}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default NewSighting