import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import CreateAccount from './SignIn/CreateAccount';
import {fireauth} from "./base";

class Main extends Component {

  constructor(props){
    super(props);

    this.state ={
      user: null,
    }
  }

  componentWillMount() {
    let self = this;
    fireauth.onAuthStateChanged((user) => {
      if(user){
        sessionStorage.setItem('user', user.uid);
        self.setState({
          user: user.uid,
        });
      } else {
        self.setState({
          user: null,
        });
      }
    });
  }

  isSignedIn(){
    console.log(this.state.user);
    return this.state.user;
  }

  render(){

    return(
      <Switch>

        <Route path='/home' render={() => (
          this.isSignedIn()
            ? <Home/>
            : <SignIn/>
        )}/>

        <Route path='/sign-in' render={() => (
          this.isSignedIn()
            ? <Home/>
            : <SignIn/>
        )}/>

        <Route path='/create-account' render={() => (
          this.isSignedIn()
            ? <Home/>
            : <CreateAccount/>
        )}/>

      </Switch>
    );
  }
}



export default Main;