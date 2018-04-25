import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'reactstrap';
import {firestore} from "../base";
import './MoviePage.css'
import history from '../history';

class MoviePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      imdbID: history.location.search.slice(1),
    };
  }

  componentWillMount(){
    const imdb = require('imdb-api');
    let self = this;
    imdb.getById( self.state.imdbID , {apiKey: '32978a97', timeout: 30000}).then(movie => {
      self.setState( {
        title:          movie.title         ,
        _year_data:     movie._year_data    ,
        rated:          movie.rated         ,
        released:       movie.released      ,
        runtime:        movie.runtime       ,
        genres:         movie.genres        ,
        director:       movie.director      ,
        writer:         movie.writer        ,
        actors:         movie.actors        ,
        plot:           movie.plot          ,
        languages:      movie.languages     ,
        country:        movie.country       ,
        poster:         movie.poster        ,
        metascore:      movie.metascore     ,
        rating:         movie.rating        ,
        votes:          movie.votes         ,
        imdbid:         movie.imdbid        ,
        type:           movie.type          ,
        imdburl:        movie.imdburl       ,
      });
    });
  }

  addToFavorites = () => {
    let self = this;
    let currentFavorites = [];
    let myRef = firestore.collection('users').doc(sessionStorage.getItem('user'));

    myRef.get().then(function (doc){
      currentFavorites = doc.data().favorites;

      let movieData = {
        title: self.state.title,
        poster: self.state.poster,
        rating: self.state.rating,
        type: self.state.type,
      };
      currentFavorites.push(movieData);

      myRef.update({
        favorites: currentFavorites
      }).catch(function (error) {
        console.error("Error updating favorites" + (error));
      });
    });
  };

  addToWatchlist = () => {
    let self = this;
    let currentWatchlist = [];
    let myRef = firestore.collection('users').doc(sessionStorage.getItem('user'));

    myRef.get().then(function (doc){
      currentWatchlist = doc.data().watchlist;

      let movieData = {
        title: self.state.title,
        poster: self.state.poster,
        rating: self.state.rating,
        type: self.state.type,
      };
      currentWatchlist.push(movieData);

      myRef.update({
        watchlist: currentWatchlist
      }).catch(function (error) {
        console.error("Error updating watchlist" + (error));
      });
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={{size:8, offset:2}}>
            <Jumbotron>

              <Row>

                <Col md='4'>
                  <img src={this.state.poster} />
                </Col>

                <Col md='6'>

                  <h1> {this.state.title} </h1>

                  <h5> {this.state.plot} </h5>

                  <div className='space'/>
                  <h3> Additional Info </h3>

                  <h5> Rating: {this.state.rating} </h5>
                  <h5> Runtime: {this.state.runtime} </h5>

                  <h5> Actors: {this.state.actors} </h5>
                  <h5> Director: {this.state.director} </h5>

                  <a href={this.state.imdburl}> Visit IMDB Page </a>

                  <div className='space'/>
                  <Button onClick={this.addToFavorites} size='lg'> Add to Favorites </Button>
                  <div className='space'/>
                  <Button onClick={this.addToWatchlist} size='lg'> Add to Watchlist </Button>

                </Col>

              </Row>

            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }

}

export default MoviePage;
/*
<Row>
    <Col md={{size:6, offset:3 }}>
        {Object.keys(this.state.reviews).map((key, index) => {
            return (
                <Jumbotron>
                    <h3> \"{this.state.plot.substr(0,50)}\"... </h3>
                    <hr className="my-2" />
                    <h5> {this.state.</h5>
                        </Jumbotron>
                        );
                        })}
                    </Col>
                </Row>
*/