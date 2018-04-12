import React, {Component} from 'react';
import firebase from './base.js';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

import SignIn from './SignIn/SignIn';

class App extends Component {

  constructor() {
    super();

    this.state = {
      uid: null,
    };
  }

  componentWillMount() {
    this.getUserFromLocalStorage();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // Once the user has finished signing in
          this.authHandler(user);
        } else {
          // Signing out
          this.setState({
            uid: null,
          });
        }
      }
    )
  };

  getUserFromLocalStorage(){
    const uid = localStorage.getItem('uid');
    console.log("uid is " + uid);
    if(uid == null || !uid) return;
    this.setState({
      uid: uid,
    });
  };

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid);

    this.setState({
      uid: user.uid,
    });
  };

  isSignedIn = () => {
    return (this.state.uid != null);
  };

  render() {
    return (

      <Switch>

        <Route exact path='/sign-in' render={() => (
          !this.isSignedIn()
            ? <SignIn/>
            : <Redirect to='/home'/>
        )}/>

      </Switch>
    );
  }
}

export default App;