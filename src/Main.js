import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import CreateAccount from './SignIn/CreateAccount';
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
          if(username === 'null') {
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

        <Route path={'/cs252website/home'} render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid}/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/sign-in' render={() => (
          this.isSignedIn()
            ? <Redirect to='/cs252website/home'/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/create-account' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid}/>
            : <CreateAccount/>
        )}/>

        <Route path='/cs252website/movie-search' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='movie-search'/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/movie-page' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='movie-page'/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/profile' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='profile'/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/connections' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='connections'/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/my-reviews' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='my-reviews'/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/watchlist' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='watchlist'/>
            : <SignIn/>
        )}/>

        <Route path='/cs252website/my-favorites' render={() => (
          this.isSignedIn()
            ? <Home uid={this.state.uid} page='my-favorites'/>
            : <SignIn/>
        )}/>

        <Route render={() => (
          <Redirect to='/cs252website/sign-in'/>
        )}/>

      </Switch>
    );
  }
}



export default Main;