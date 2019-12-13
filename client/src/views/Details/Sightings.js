import React from 'react'
import Sighting from './Sighting'
import './Sightings.css'

const Sightings = ({ sightings, authed, onDelete }) => {
    const header = {"PERSON": "PERSON", "LOCATION": "LOCATION", "SIGHTED": "SIGHTED"}

    return (
        <div className="Sightings">
            <Sighting sighting={header} className="Sightings-Header" />
            <div className="Sightings-Body">
                {sightings.map((sighting, i) => <Sighting key={i} sighting={sighting} del={authed} onDelete={onDelete} />)}
            </div>
        </div>
    )
}

export default Sightings