import React from 'react'
import Moment from 'moment'
import Sightings from './Sightings'

const Sighting = ({ sighting, className }) => {    
    return (
        <div className={"Sighting " + className}>
            <p>{sighting.PERSON}</p>
            <p>{sighting.LOCATION}</p>
            <p>{sighting.SIGHTED}</p>
            {Sightings.del && <p>x</p>}
        </div>
    )
}

export default Sighting