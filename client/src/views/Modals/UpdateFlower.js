import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class UpdateFlower extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { show, onHide, onSubmit } = this.props
        const { genus, species, name } = this.state
        
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                <Modal.Title>Update a Flower</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Name" onChange={(e) => this.setState({name: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Genus" onChange={(e) => this.setState({genus: e.target.value})} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Species" onChange={(e) => this.setState({species: e.target.value})} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onSubmit(genus, species, name)}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default UpdateFlower