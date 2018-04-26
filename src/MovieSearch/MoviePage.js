import React, { Component } from 'react';
import {Row, Form, FormGroup, Label, Input, Col, Jumbotron, Button, Badge, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import './MoviePage.css'
import history from '../history';

class MoviePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      imdbID: history.location.search.slice(1),
      loaded: false,
      modal:  false,
      reviewBodyBody: '',
    };

    this.addReview = this.addReview.bind(this);
  }

  componentWillMount(){
    const imdb = require('imdb-api');
    let self = this;
    this.getReviews()
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

  addReview = () => {
    let self = this;
    this.setState({
        modal: !this.state.modal
    })
  }

  handleTextChange = (event) => {
    this.setState({
       reviewBody:  event.target.value
    })
  }

  handleRatingChange = (event) => {
    this.setState({
        reviewRating: event.target.value
    })
  }

  submitReview = () => {
    this.setState({
        modal: !this.state.modal
    });

      let self = this;
      let currentReviews = [];
      let myRef = firestore.collection('movies').doc(this.state.imdbID);

      console.log('myRef');
      console.log(myRef);

      myRef.get().then(function (doc){
          currentReviews = doc.data().reviews;

          let rat;
          if     (self.state.reviewRating == "★" )        { rat = 1 }
          else if(self.state.reviewRating == "★★" )        { rat = 2 }
          else if(self.state.reviewRating == "★★★" )       { rat = 3 }
          else if(self.state.reviewRating == "★★★★" )      { rat = 4 }
          else if(self.state.reviewRating == "★★★★★" )      { rat = 5 }


          let movieReview = {
              body: self.state.reviewBody,
              rating: rat,
              user: sessionStorage.getItem('username'),
          };
          currentReviews.push(movieReview);

          myRef.update({
              reviews: currentReviews
          }).catch(function (error) {
              console.error("Error updating reviews" + (error));
          });
      });

  };

  getReviews()
  {
      let self = this;
      let movieReviews = [];
      let myRef = firestore.collection('movies').doc('tt0076759');
      myRef.get().then(function (doc){
          console.log(doc.data());
          movieReviews = doc.data().reviews;
          self.setState({
              reviews: movieReviews,
              loaded: true,
          }, function(){
              console.log(this.state.reviews);
          });
      }).catch(function(error){
          console.log('error gettting reviews' + (error));
      });
    }

  render() {

      if(this.state.loaded === false)
      {
          return(
              <div className='text-center'>
                  <h3>Loading Connections...</h3>
              </div>
          )
      }
    console.log(this.state.reviews);
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.getReviews} className={this.props.className}>
            <ModalHeader toggle={this.getReviews}><strong>Write a Review</strong></ModalHeader>
            <ModalBody>

              <Form>
                <FormGroup>
                    <Label for="reviewBody">Review:</Label>
                    <Input onChange={this.handleTextChange} value={this.state.reviewBody} type="textarea" bsSize='lg' name="text" id="reviewBody" />
                    <Label for="exampleSelect">Rating:</Label>
                    <Input onChange={this.handleRatingChange} value={this.state.reviewRating} type="select" name="select" id="exampleSelect">
                        <option>★</option>
                        <option>★★</option>
                        <option>★★★</option>
                        <option>★★★★</option>
                        <option>★★★★★</option>
                    </Input>
                </FormGroup>
              </Form>

            </ModalBody>
            <ModalFooter>
                <Button onClick={this.submitReview} color="secondary" size="lg" block><strong>SUBMIT</strong></Button>
            </ModalFooter>
        </Modal>
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
                  <div className='space'/>
                  <Button onClick={this.addReview} size='lg'> Add Review </Button>

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