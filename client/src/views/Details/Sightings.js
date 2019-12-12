import React from 'react'
import Sighting from './Sighting'
import './Sightings.css'

const Sightings = ({ sightings }) => {
    const header = {"NAME": "NAME", "PERSON": "PERSON", "LOCATION": "LOCATION", "SIGHTED": "SIGHTED"}

    return (
        <div className="Sightings">
            <Sighting sighting={header} className="Sightings-Header" />
            <div className="Sightings-Body">
                {sightings.map((sighting, i) => <Sighting key={i} sighting={sighting} />)}
            </div>
        </div>
    )
}

export default Sightings