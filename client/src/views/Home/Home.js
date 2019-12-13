import React from 'react';
import './Home.css';
import axios from 'axios';
import Flowers from '../Flowers/Flowers';
import Details from '../Details/Details';
import NewSighting from '../Modals/NewSighting';
import UpdateFlower from '../Modals/UpdateFlower';

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flowers: [],
            selected: -1,
            sightings: [],
            modals: {
                sighting: false,
                flower: false
            }
        }

        this.selectFlower = this.selectFlower.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onNewSighting = this.onNewSighting.bind(this)
        this.onUpdateFlower = this.onUpdateFlower.bind(this)
        this.deleteFlower = this.deleteFlower.bind(this)

        this.getFlowers()
    }

    getFlowers() {
        axios.get('/api/flower').then((res) => {
            this.setState({
                flowers: res.data,
                selected: -1
            })
        })
    }

    selectFlower(i) {
        const { flowers }  = this.state

        axios.get('/api/flower/' + encodeURIComponent(flowers[i].COMNAME)).then((res) => {
            this.setState({
                selected: i,
                sightings: res.data
            })
        })
    }

    onClose() {
        this.setState({
            modals: {
                sighting: false,
                flower: false
            }
        })
    }
    
    onOpen(i) {
        this.setState({
            modals: {
                sighting: i === 0,
                flower: i === 1
            }
        })
    }

    onNewSighting(location, sighted) {
        const { flowers, selected } = this.state
        const { user } = this.props

        const query = encodeURIComponent(`${flowers[selected].COMNAME}#${user}#${location}#${sighted}`)
        console.log(query);

        axios.post('/api/sighting/' + query).then((res) => {
            console.log(res)
            this.onClose()
            this.selectFlower(selected)
        })
    }

    onUpdateFlower(genius, species, name) {
        const { flowers, selected } = this.state

        const query = encodeURIComponent(flowers[selected].COMNAME) + "/" + encodeURIComponent(`${genius}#${species}#${name}`)
        console.log(query);

        axios.put('/api/flower/' + query).then((res) => {
            console.log(res)
            this.onClose()
            this.getFlowers()
            this.selectFlower(selected)
        })
    }

    deleteFlower() {
        const { flowers, selected }  = this.state

        if (prompt("Type Yes To Confirm") === "Yes") {
            axios.delete('/api/flower/' + encodeURIComponent(flowers[selected].COMNAME)).then((res) => {
                this.getFlowers()
            })
        }
    }

    render() {
        const { flowers, selected, sightings, modals } = this.state
        const { user } = this.props
        
        return (
            <div className="Home">
                <NewSighting show={modals.sighting} onHide={this.onClose} onSubmit={this.onNewSighting} />
                <UpdateFlower show={modals.flower} onHide={this.onClose} onSubmit={this.onUpdateFlower} />
                <Flowers flowers={flowers} onFlowerClick={this.selectFlower} />
                <Details deleteFlower={this.deleteFlower} user={user} flowers={flowers} selected={selected} sightings={sightings} newSighting={() => this.onOpen(0)} updateFlower={() => this.onOpen(1)} onDeselect={() => this.setState({selected: -1, sightings: []})} />
            </div>
        )
    }
}

export default Home;
