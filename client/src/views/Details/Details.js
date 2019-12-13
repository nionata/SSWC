import React from 'react'
import Sightings from './Sightings'
import './Details.css'
import Button from 'react-bootstrap/Button'

class Details extends React.Component {
    render() {
        const { selected, flowers, sightings, onDeselect, user, newSighting, updateFlower, deleteFlower } = this.props

        return (
            <div className={selected !== -1 ? 'Details' : 'Hide-Details'}>
                {
                    selected !== -1 && (
                        <span className="Details-Body">
                            <i className="fas fa-times" onClick={() => onDeselect()} />
                            <div className="Details-Image-Holder">
                                <img className="Details-Image" src={flowers[selected] && flowers[selected].IMAGE ? flowers[selected].IMAGE : "https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="flower" />
                            </div>
                            <div className="Details-Header">
                                <p><b>{selected !== -1 && flowers[selected].COMNAME}</b></p>
                                <p>{selected !== -1 && "Genus: " + flowers[selected].GENUS}</p>
                                <p>{selected !== -1 && "Species: " + flowers[selected].SPECIES}</p>
                            </div>
                            <Sightings sightings={sightings} />
                            <div className="Details-Buttons">
                                <Button variant="light" onClick={newSighting}>Add Sighting</Button>
                                <Button variant="light" onClick={updateFlower}>Update Flower</Button>
                                <Button variant="danger" onClick={deleteFlower}>Delete Flower</Button>
                            </div>
                        </span>
                    )
                }
            </div>
        )
    }
}

export default Details