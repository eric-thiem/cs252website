import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import CreateAccount from './SignIn/CreateAccount';
import {fireauth} from "./base";
import MovieSearch from "./MovieSearch/MovieSearch";

class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      user: null,
    }
  }

  componentWillMount() {
    let user = this.getUser();
    this.setState({
      user: user,
    });

    if(this.state.user == null){
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
  }

  getUser(){
    return sessionStorage.getItem('user');
  }

  isSignedIn(){
    return this.state.user;
  }

  render(){
    return(
      <Switch>

        <Route path='/home' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user}/>
            : <SignIn/>
        )}/>

        <Route path='/sign-in' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user}/>
            : <SignIn/>
        )}/>

        <Route path='/create-account' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user}/>
            : <CreateAccount/>
        )}/>

          <Route path='/movie-search' render={() => (
              this.isSignedIn()
                  ? <Home user={this.state.user}/>
                  : <MovieSearch/>
          )}/>

        <Route path='/profile' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user} page='profile'/>
            : <SignIn/>
        )}/>

        <Route path='/connections' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user} page='connections'/>
            : <SignIn/>
        )}/>

        <Route path='/my-reviews' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user} page='my-reviews'/>
            : <SignIn/>
        )}/>

        <Route path='/watchlist' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user} page='watchlist'/>
            : <SignIn/>
        )}/>

        <Route path='/my-favorites' render={() => (
          this.isSignedIn()
            ? <Home user={this.state.user} page='my-favorites'/>
            : <SignIn/>
        )}/>

      </Switch>
    );
  }
}



export default Main;