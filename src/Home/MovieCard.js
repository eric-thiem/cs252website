import React, {Component} from 'react';
import {firestore} from '../base';
import { Card, Button, CardImg, CardTitle, CardBody } from 'reactstrap';
import history from "../history";

class MovieCard extends Component {

  constructor(props){
    super(props);

    this.state = {
      index: this.props.index,
      movieData: null,

      doneLoading: false,
    }
  }

  componentWillMount(){
    this.getMovieData();
  }

  getMovieData(){
    let self = this;
    let movieRef = firestore.collection('movies').doc('homepage');
    movieRef.get().then(function(doc){
      let movieData = doc.data().movies[self.state.index];
      self.setState({
        movieData: movieData,
        doneLoading: true,
      }, function () {
        console.log(self.state.movieData);
      });
    }).catch(function(error){
      console.log("Error getting movie card data", (error));
    })
  }

  onClick = () => {
    history.push({
      pathname: '/cs252website/movie-page',
      search: this.state.movieData.imdbid,
    });
    window.location.reload();
  };

  render(){

    if(!this.state.doneLoading){
      return(
        <div className='text-center'>
          <h3>Loading Movie Data...</h3>
        </div>
      );
    }

    return (
      <Card>
        <CardImg top width='100%' src={this.state.movieData.poster}/>
        <CardBody>
          <div className='text-center'>
            <CardTitle>{this.state.movieData.title}</CardTitle>
            <Button onClick={this.onClick}>View Movie Page</Button>
          </div>
        </CardBody>
      </Card>
    );
  }

}

export default MovieCard;