import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import CreateAccount from './SignIn/CreateAccount';
import {fireauth} from "./base";

class Main extends Component {

  render(){

    /*if(Main.isSignedIn()){
      return(
        <Route path='/' component={Home}/>
      );
    }*/

    return(
      <Switch>
        <Route exact path='/create-account' component={CreateAccount}/>
        <Route exact path='/sign-in' component={SignIn}/>
        <Route exact path='/home' component={Home}/>
      </Switch>
    );
  }
}



export default Main;