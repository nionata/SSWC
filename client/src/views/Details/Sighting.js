import React from 'react'

const Sighting = ({ sighting, className }) => {    
    return (
        <div className={"Sighting " + className}>
            <p>{sighting.NAME}</p>
            <p>{sighting.PERSON}</p>
            <p>{sighting.LOCATION}</p>
            <p>{sighting.SIGHTED}</p>
        </div>
    )
}

export default Sighting