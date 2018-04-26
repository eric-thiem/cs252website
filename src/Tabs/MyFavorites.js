import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'reactstrap';
import {firestore} from "../base";
import './Tabs.css';

class Watchlist extends Component {

  constructor(props){
    super(props);

    this.state = {
      doneLoading: false,
    }
  }

  componentWillMount(){
    this.getFavoritesList();
  }

  getFavoritesList(){
    let self = this;
    let myFavorites = [];
    let myRef = firestore.collection('users').doc(sessionStorage.getItem('user'));
    myRef.get().then(function (doc){
      myFavorites = doc.data().favorites;
      self.setState({
        favorites: myFavorites,
        doneLoading: true,
      });
    });
  }

  render(){

    if(!this.state.doneLoading){
      return(
        <div className='text-center'>
          <h3>Loading Favorites...</h3>
        </div>
      );
    }

    return (
      <div>
        <Row>
          <Col md={{size: '8', offset: '2'}}>

            <div className='text-center'>
              <h1>My Favorites</h1>
            </div>

            <div className='space'/>

            {Object.keys(this.state.favorites).map((key, index) => {
              return (

                <Jumbotron>
                  <Row>
                    <Col md='4'>
                      <img src={this.state.favorites[index].poster}/>
                    </Col>

                    <Col md='6'>

                      <h1> {this.state.favorites[index].title} </h1>

                      <h3> Rating: {this.state.favorites[index].rating} </h3>

                      <a href={this.state.favorites[index].imdburl}> Visit IMDB Page </a>

                      <div className='space'/>
                      <Button size='lg'> Write Review </Button>

                      <div className='space'/>
                      <Button size='lg'> Remove from Favorites </Button>

                    </Col>
                  </Row>
                </Jumbotron>

              );
            })}
          </Col>
        </Row>
      </div>
    );
  }

}

export default Watchlist;