import React from 'react'
import Sightings from './Sightings'
import './Details.css'

class Details extends React.Component {
    render() {
        const { selected, flowers, sightings, onDeselect } = this.props

        return (
            <div className={selected !== -1 ? 'Details' : 'Hide-Details'}>
                <i className="fas fa-times" onClick={() => onDeselect()} />
                <div className="Details-Image-Holder">
                    <img className="Details-Image" src={flowers[selected] && flowers[selected].image ? flowers[selected].image : "https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500"} alt="flower" />
                </div>
                <div className="Details-Header">
                    <p><b>{selected !== -1 && flowers[selected].COMNAME}</b></p>
                    <p>{selected !== -1 && "Genus: " + flowers[selected].GENUS}</p>
                    <p>{selected !== -1 && "Species: " + flowers[selected].SPECIES}</p>
                </div>
                <Sightings sightings={sightings} />
            </div>
        )
    }
}

export default Details