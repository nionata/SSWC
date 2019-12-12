import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './views/Header/Header'
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound/NotFound"

const App = () => {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
