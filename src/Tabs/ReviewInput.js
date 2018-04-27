import React, { Component } from 'react';
import {Input, Button, Alert} from 'reactstrap';
import './Tabs.css';
import {firestore} from "../base";

class ReviewInput extends Component {

  constructor(props){
    super(props);

    this.state = {
      myRef: firestore.collection('users').doc(sessionStorage.getItem('user')),
      movie: this.props.movie,
      reviewText: '',
      success_open: false,
    }
  }

  onChange = (ev) => {
    this.setState({
      reviewText: ev.target.value,
    });
  };

  onSubmit = () => {
    let self = this;
    let reviews = [];
    this.state.myRef.get().then(function(doc){
      reviews = doc.data().reviews;

      let newReview = {
        title: self.state.movie.title,
        content: self.state.reviewText,
        poster: self.state.movie.poster,
        //year: self.state.movie._year_data,
        imdbid: self.state.movie.imdbid,
      };
      reviews.push(newReview);

      self.state.myRef.update({
        reviews: reviews,
      }).then(function () {
        self.setState({
          success_open: true,
        });
      }).catch(function (error) {
        console.log('Error updating reviews', (error));
      });

    }).catch(function (error) {
      console.log('Error submitting review', (error));
    })
  };

  render () {
    return (
      <div>
        <div className='space'/>
        <Input type='textarea' placeholder='Enter your review' onChange={this.onChange}/>
        <div className='space'/>
        <Button onClick={this.onSubmit}>Submit Review</Button>
        <div className='space'/>
        {this.state.success_open ?
          <div>
            <Alert color='success' isOpen={this.state.success_open}>Successfully submitted review!</Alert>
            <div className = 'space'/>
          </div>
          :null
        }
      </div>
    );
  }

}

export default ReviewInput;