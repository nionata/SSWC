import React from 'react'
import Moment from 'moment'

const Sighting = ({ sighting, className }) => {    
    return (
        <div className={"Sighting " + className}>
            <p>{sighting.PERSON}</p>
            <p>{sighting.LOCATION}</p>
            <p>{sighting.SIGHTED}</p>
        </div>
    )
}

export default Sighting