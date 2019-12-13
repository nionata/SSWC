import React from 'react'
import Moment from 'moment'
import Sightings from './Sightings'

const Sighting = ({ sighting, className, del, onDelete }) => {
    const { PERSON, LOCATION, SIGHTED } = sighting    

    console.log(onDelete);
    

    return (
        <div className={"Sighting " + className}>
            <p>{PERSON}</p>
            <p>{LOCATION}</p>
            <p>{SIGHTED}</p>
            {del && <i className="fas fa-times" onClick={() => onDelete(PERSON, LOCATION, SIGHTED)} />}
        </div>
    )
}

export default Sighting