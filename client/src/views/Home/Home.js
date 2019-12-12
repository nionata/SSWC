import React from 'react';
import './Home.css';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);

        axios.get('/api/flower').then((res) => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="Home">
                <div className="Home-Body">
                    Welcome
                </div>
            </div>
        )
    }
}

export default Home;
