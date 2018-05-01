import React, { Component } from 'react';
import {firestore} from "../base";
import {Alert, Row, Form, FormGroup, Label, Input, Col, Jumbotron, Button, Badge, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import './MoviePage.css'
import history from '../history';

class MoviePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      imdbID: history.location.search.slice(1),
      loaded: false,
      modal_open:  false,

      reviewBody: '',
      reviewRating: 5,
      reviews: [],

      favorites_message: '',
      watch_message: '',
      favorites_visible: false,
      watchlist_visible: false,
      review_message: '',
      review_visible: false,

      showAddToHomepageButton: false,
    };

    this.addReview = this.addReview.bind(this);
  }

  componentWillMount(){
    const imdb = require('imdb-api');
    let self = this;
    this.getReviews();
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
        year: self.state._year_data,
        imdbid: self.state.imdbid,
        imdburl: self.state.imdburl,
      };

      currentFavorites.push(movieData);

      myRef.update({
        favorites: currentFavorites
      }).then(function() {
        self.setState({
          favorites_message: `Successfully added ${self.state.title} to your favorite's list.`,
          favorites_visible: true,
        });
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
        year: self.state._year_data,
        imdbid: self.state.imdbid,
        imdburl: self.state.imdburl,
      };
      currentWatchlist.push(movieData);

      myRef.update({
        watchlist: currentWatchlist
      }).then(function() {
        self.setState({
          watch_message: `Successfully added ${self.state.title} to your watchlist.`,
          watchlist_visible: true,
        });
      }).catch(function (error) {
        console.error("Error updating watchlist" + (error));
      });
    });
  };

  addReview = () => {
    this.setState({
      modal_open: !this.state.modal_open
    });
  };

  handleTextChange = (event) => {
    this.setState({
      reviewBody:  event.target.value
    });
  };

  handleRatingChange = (event) => {
    this.setState({
      reviewRating: event.target.value.length,
    });
  };

  submitReview = () => {
    this.setState({
      modal_open: false,
    });

    let self = this;
    let currentReviews = [];
    let myRef = firestore.collection('movies').doc(this.state.imdbID);

    myRef.get().then(function (doc){

      let movieReview = {
        body: self.state.reviewBody,
        rating: self.state.reviewRating,
        user: sessionStorage.getItem('username'),
      };

      if(doc.exists){
        currentReviews = doc.data().reviews;
        currentReviews.push(movieReview);
        myRef.update({
          reviews: currentReviews
        }).then(function () {
          self.setState({
            review_message: 'Successfully added public review.',
            review_visible: true,
          });
        }).catch(function (error) {
          console.error("Error updating reviews" + (error));
        });
      } else {
        currentReviews.push(movieReview);
        myRef.set({
          reviews: currentReviews
        }).then(function () {
          self.setState({
            review_message: 'Successfully added public review.',
            review_visible: true,
          });
        }).catch(function (error) {
          console.error("Error updating reviews" + (error));
        });
      }
    });

  };

  getReviews() {
    let self = this;
    let movieReviews = [];
    let myRef = firestore.collection('movies').doc(this.state.imdbID);
    myRef.onSnapshot(function (doc){
      if(doc.exists){
        movieReviews = doc.data().reviews;
        self.setState({
          reviews: movieReviews,
          loaded: true,
        });
      } else {
        self.setState({
          reviews: [],
          loaded: true,
        });
      }
    });
  }

  addToHomepage = () => {
    let self = this;
    let currentMovieList = [];
    let movieRef = firestore.collection('movies').doc('homepage');
    movieRef.get().then(function (doc) {
      currentMovieList = doc.data().movies;
      let movieData = {
        title: self.state.title,
        poster: self.state.poster,
        imdbid: self.state.imdbid,
      };
      currentMovieList.push(movieData);

      movieRef.update({
        movies: currentMovieList,
      }).catch(function (error) {
        console.log('Error updating home page movie list', (error));
      });
    }).catch(function (error) {
      console.log('Error updaing homepage movies', (error));
    });
  };

  onFavoritesDismiss = () => {
    this.setState({
      favorites_visible: false,
      favorites_message: '',
    });
  };

  onWatchlistDismiss = () => {
    this.setState({
      watchlist_visible: false,
      watch_message: '',
    });
  };

  onReviewDismiss = () => {
    this.setState({
      review_visible: false,
      review_message: '',
    });
  };

  modalToggle = () => {
    this.setState({
      modal_open: !this.state.modal_open,
    });
  };

  render() {

    if(!this.state.loaded){
      return (
        <div className='text-center'>
          <h3>Loading Movie...</h3>
        </div>
      );
    }


    return (
      <div>
        <Row>
          <Modal isOpen={this.state.modal_open} className={this.props.className} toggle={this.modalToggle}>
            <ModalHeader toggle={this.modalToggle}><strong>Write a Review</strong></ModalHeader>
            <ModalBody>

              <Form>
                <FormGroup>
                  <Label for="reviewBody">Review:</Label>
                  <Input onChange={this.handleTextChange} type="textarea" bsSize='lg' name="text" id="reviewBody" />
                  <Label for="exampleSelect">Rating:</Label>
                  <Input onChange={this.handleRatingChange} type="select" name="select" id="exampleSelect">
                    <option>★★★★★</option>
                    <option>★★★★</option>
                    <option>★★★</option>
                    <option>★★</option>
                    <option>★</option>
                  </Input>
                </FormGroup>
              </Form>

            </ModalBody>
            <ModalFooter>
              <Button onClick={this.submitReview} color="secondary" size="lg" block><strong>SUBMIT</strong></Button>
            </ModalFooter>
          </Modal>
        </Row>

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

                  {this.state.favorites_visible
                    ? <div className='space'/>
                    : <div/>
                  }

                  <Alert color="success" isOpen={this.state.favorites_visible} toggle={this.onFavoritesDismiss}>
                    {this.state.favorites_message}
                  </Alert>

                  <div className='space'/>

                  <Button onClick={this.addToWatchlist} size='lg'> Add to Watchlist </Button>

                  {this.state.watchlist_visible
                    ? <div className='space'/>
                    : <div/>
                  }

                  <Alert color="success" isOpen={this.state.watchlist_visible} toggle={this.onWatchlistDismiss}>
                    {this.state.watch_message}
                  </Alert>

                  <div className='space'/>

                  <Button onClick={this.addReview} size='lg'> Add Public Review </Button>

                  {this.state.review_visible
                    ? <div className='space'/>
                    : <div/>
                  }

                  <Alert color="success" isOpen={this.state.review_visible} toggle={this.onReviewDismiss}>
                    {this.state.review_message}
                  </Alert>

                  <div className='space'/>

                  {this.state.showAddToHomepageButton
                    ?
                    <div>
                      <Button onClick={this.addToHomepage} size='lg'> Add to HomePage </Button>
                    </div>
                    : null
                  }

                </Col>

              </Row>

            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={{size:6, offset:3 }}>

            {Object.keys(this.state.reviews).map((key, index) => {
              let rating = this.state.reviews[index].rating;
              let ratingString = '';

              if      (rating > 4)  { ratingString = ' ★ ★ ★ ★ ★ '}
              else if (rating > 3)  { ratingString = ' ★ ★ ★ ★ '}
              else if (rating > 2)  { ratingString = ' ★ ★ ★ '}
              else if (rating > 1)  { ratingString = ' ★ ★ '}
              else                  { ratingString = ' ★ '}

              return(
                <Jumbotron key={key}>
                  <h2> &quot;{this.state.reviews[index].body}&quot;... </h2>
                  <div className='space'/>
                  <h1 align="middle">&emsp;<Badge>{ratingString}</Badge>&emsp;</h1>
                  <div className='space'/>
                  <hr className="my-2" />
                  <div className='space'/>
                  <h4> User: {this.state.reviews[index].user}</h4>
                </Jumbotron>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  }

}

export default MoviePage;