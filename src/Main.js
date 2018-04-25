import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import CreateAccount from './SignIn/CreateAccount';
import MovieSearch from "./MovieSearch/MovieSearch";
import {fireauth, firestore} from "./base";
import './App.css';

class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: null,
      username: null,
    }
  }

  componentWillMount() {
    let uid = sessionStorage.getItem('user');

    this.setState({
      uid: uid,
    });

    if(this.state.uid == null) {
      let self = this;
      fireauth.onAuthStateChanged((user) => {
        if (user) {
          sessionStorage.setItem('user', user.uid);
          let username = sessionStorage.getItem('username');
          if(!username) {
            this.getUsername();
          }
          self.setState({
            uid: user.uid,
          });
        } else {
          self.setState({
            uid: null,
            username: null,
          });
        }
      });
    }
  }

  getUsername = () => {
    let uid = sessionStorage.getItem('user');
    let self = this;
    firestore.collection('users').doc(uid).get().then((doc) => {
      self.setState({
        username: doc.data().username,
      }, function () {
        sessionStorage.setItem('username', this.state.username);
      });
    }).catch((error) => {
      console.log('Error getting username: ', error);
    });
  };

  isSignedIn(){
    return this.state.uid;
  }

  render(){
    return(
      <Switch>

        <Route path='/home' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid}/>
            : <SignIn/>
        )}/>

        <Route path='/sign-in' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid}/>
            : <SignIn/>
        )}/>

        <Route path='/create-account' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid}/>
            : <CreateAccount/>
        )}/>

        <Route path='/movie-search' render={() => (
          this.isSignedIn()
            ? <MovieSearch/>
            : <SignIn/>
        )}/>

        <Route path='/profile' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='profile'/>
            : <SignIn/>
        )}/>

        <Route path='/connections' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='connections'/>
            : <SignIn/>
        )}/>

        <Route path='/my-reviews' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='my-reviews'/>
            : <SignIn/>
        )}/>

        <Route path='/watchlist' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='watchlist'/>
            : <SignIn/>
        )}/>

        <Route path='/my-favorites' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='my-favorites'/>
            : <SignIn/>
        )}/>

      </Switch>
    );
  }
}



export default Main;