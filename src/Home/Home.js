import React, { Component } from 'react';
import {Row, Col} from 'reactstrap'
import Header from './Header'

import Profile from "../Tabs/Profile";
import Connections from "../Tabs/Connections";
import MyReviews from "../Tabs/MyReviews";
import Watchlist from "../Tabs/Watchlist";
import MyFavorites from "../Tabs/MyFavorites";
import MovieSearch from "../MovieSearch/MovieSearch";
import MoviePage from "../MovieSearch/MoviePage";

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,

      page: props.page,
    };
  };

  isSignedIn(){
    return this.state.uid;
  }

  getHeader(){
    return (
      <div>
        <Row>
          <Col md='2'/>
          <Col md='8'>
            <Header />
          </Col>
        </Row>
      </div>
    );
  }

  render(){

    switch(this.state.page){

      case 'profile':
        return (
          <div>
            {this.getHeader()}
            <div className='space'/>
            <Profile/>
          </div>
        );

      case 'movie-search':
        return (
          <div>
            {this.getHeader()}
            <div className='space'/>
            <MovieSearch/>
          </div>
        );

      case 'movie-page':
        return (
          <div>
            {this.getHeader()}
            <div className='space'/>
            <MoviePage/>
          </div>
        );

      case 'connections':
        return (
          <div>
            {this.getHeader()}
            <div className='space'/>
            <Connections/>
          </div>
        );

      case 'my-reviews':
        return (
          <div>
            {this.getHeader()}
            <div className='space'/>
            <MyReviews/>
          </div>
        );

      case 'watchlist':
        return (
          <div>
            {this.getHeader()}
            <div className='space'/>
            <Watchlist/>
          </div>
        );

      case 'my-favorites':
        return (
          <div>
            {this.getHeader()}
            <div className='space'/>
            <MyFavorites/>
          </div>
        );

      default:
        return (
          <div>
            {this.getHeader()}
            <div/>
            <div className='space'/>
            <Row>
              <Col md='2'/>
              <Col md='8'>
                <div className='text-center'>
                  <h1> Welcome to SliverScreen! </h1>
                </div>
              </Col>
            </Row>
          </div>
        );
    }
  }
}

export default Home;