import React, {Component} from 'react';
import {fireauth} from './base.js';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

import SignIn from './SignIn/SignIn';
import CreateAccount from './SignIn/CreateAccount';
import Home from './Home/Home';

class App extends Component {

  componentWillUpdate(){
    console.log(this.isSignedIn());
  }

  isSignedIn = () => {
    fireauth.onAuthStateChanged(function(user) {
      return user;
    });
  };

  render() {
    return (

      <Switch>

        <Route exact path='/sign-in' render={() => (
          !this.isSignedIn()
            ? <SignIn/>
            : <Redirect to='/home'/>
        )}/>

        <Route exact path='/create-account' render={() => (
          this.isSignedIn()
            ? <Redirect to='/home'/>
            : <CreateAccount isSignedIn={this.isSignedIn}/>
        )}/>

        <Route exact path='/home' render={() => (
          this.isSignedIn()
            ? <Home/>
            : <Redirect to='/sign-in'/>
        )}/>

      </Switch>
    );
  }
}

export default App;