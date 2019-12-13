import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './views/Header/Header'
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound/NotFound"
import Login from './views/Auth/Login'
import Register from './views/Auth/Register'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }

    this.ping()
  }

  ping() {
    axios.get('/ping').then((res) => {
      this.setState({user: res.data})
    })
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <Switch>
          <Route exact path="/" component={() => <Home user={this.state.user} />} />
          <Route exact path="/login" component={() => <Login onUpdate={this.ping.bind(this)} />} />
          <Route exact path="/register" component={() => <Register onUpdate={this.ping.bind(this)} />} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
