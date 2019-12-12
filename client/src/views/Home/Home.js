import React from 'react';
import './Home.css';
import axios from 'axios';
import Flowers from '../Flowers/Flowers';
import Details from '../Details/Details';

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flowers: [],
            selected: -1,
            sightings: []
        }

        this.selectFlower = this.selectFlower.bind(this)

        this.getFlowers()
    }

    getFlowers() {
        axios.get('/api/flower').then((res) => {
            this.setState({
                flowers: res.data
            })
        })
    }

    selectFlower(i) {
        const { flowers }  = this.state

        axios.get('/api/flower/' + encodeURI(flowers[i].COMNAME)).then((res) => {
            this.setState({
                selected: i,
                sightings: res.data
            })
        })
    }

    render() {
        const { flowers, selected, sightings } = this.state
        
        return (
            <div className="Home">
                <Flowers flowers={flowers} onFlowerClick={this.selectFlower} />
                <Details flowers={flowers} selected={selected} sightings={sightings} onDeselect={() => this.setState({selected: -1})} />
            </div>
        )
    }
}

export default Home;
