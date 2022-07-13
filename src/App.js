import './App.css';
import React from "react"
//import react router dom
import {Route, Switch} from "react-router-dom"
//importp pages
import User from './pages/User';

class App extends React.Component{
  render(){
    return (
      <Switch>
        {/* admin */}
        <Route exact path="/"     component={User} />
      </Switch>  
    );
  }
}

export default App;