import React from 'react'
import Card from 'react-bootstrap/Card'
import './Flowers.css'

class Flowers extends React.Component {
    render() {
        const { flowers, onFlowerClick } = this.props

        return (
            <div className="Flowers">
                {flowers.map((flower, i) => {
                    return (
                        <Card style={{ width: '18rem' }} key={i} onClick={() => onFlowerClick(i)}>
                            <Card.Img variant="top" src={flower.IMAGE || "https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500"}/>
                            <Card.Body>
                                <Card.Title>{flower.COMNAME}</Card.Title>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default Flowers