import React, { Component } from 'react';
import {Row, Col} from 'reactstrap'
import Header from './Header'
import Connections from "../Tabs/Connections";
import MyReviews from "../Tabs/MyReviews";
import Watchlist from "../Tabs/Watchlist";
import MyFavorites from "../Tabs/MyFavorites";

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: props.user,
      page: props.page,
    }
  }

  isSignedIn(){
    console.log(this.state.user);
    return this.state.user;
  }

  getHeader(){
    return (
      <div>
        <Row>
          <Col md='2'/>
          <Col md='8'>
            <Header/>
          </Col>
        </Row>
      </div>
    );
  }

  render(){

    switch(this.state.page){
      case 'connections':
        return (
          <div>
            {this.getHeader()}
            <div/>
            <Connections/>
          </div>
        );

      case 'my-reviews':
        return (
          <div>
            {this.getHeader()}
            <div/>
            <MyReviews/>
          </div>
        );

      case 'watchlist':
        return (
          <div>
            {this.getHeader()}
            <div/>
            <Watchlist/>
          </div>
        );

      case 'my-favorites':
        return (
          <div>
            {this.getHeader()}
            <div/>
            <MyFavorites/>
          </div>
        );

      default:
        return (
          <div>
            {this.getHeader()}
            <div/>
            <div>
              <Row>
                <Col md='2'/>
                <Col md='8'>
                  <div className='text-center'>
                    <h3> Welcome to SliverScreen! </h3>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        );
    }
  }
}

export default Home;