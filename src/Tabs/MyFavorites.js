import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'reactstrap';
import {firestore} from "../base";
import ReviewInput from './ReviewInput';
import './Tabs.css';

class MyFavorites extends Component {

  constructor(props){
    super(props);

    this.state = {
      myRef: firestore.collection('users').doc(sessionStorage.getItem('user')),
      favorites: [],

      reviewOpen: -1,
      doneLoading: false,
    }
  }

  componentWillMount(){
    this.getFavoritesList();
  }

  getFavoritesList(){
    let self = this;
    let myFavorites = [];
    this.state.myRef.onSnapshot(function (doc){
      myFavorites = doc.data().favorites;
      self.setState({
        favorites: myFavorites,
        doneLoading: true,
      });
    });
  }

  removeFromFavorites = (index) => {
    let self = this;
    this.state.favorites.splice(index, 1);
    this.state.myRef.update({
      favorites: self.state.favorites,
    }).catch(function(error){
      console.log('Error deleting from favorites', (error));
    })
  };

  openReview = (index) => {
    if(this.state.reviewOpen === index){
      this.setState({
        reviewOpen: -1,
      });
    } else {
      this.setState({
        reviewOpen: index,
      });
    }
  };

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

                <Jumbotron key={key}>
                  <Row>
                    <Col md='4'>
                      <img src={this.state.favorites[index].poster}/>
                    </Col>

                    <Col md='6'>

                      <h1> {this.state.favorites[index].title} </h1>

                      <h3> Rating: {this.state.favorites[index].rating} </h3>

                      <a href={this.state.favorites[index].imdburl}> Visit IMDB Page </a>

                      <div className='space'/>
                      <Button size='lg' onClick={() => {this.openReview(index)}}> Write Review </Button>

                      {this.state.reviewOpen === index
                        ? <ReviewInput movie={this.state.favorites[index]}/>
                        : null
                      }

                      <div className='space'/>
                      <Button size='lg' onClick={() => this.removeFromFavorites(index)}> Remove from Favorites </Button>

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

export default MyFavorites;