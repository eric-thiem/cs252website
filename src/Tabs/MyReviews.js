import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'reactstrap';
import {firestore} from "../base";
import history from "../history";
import './Tabs.css';

class MyReviews extends Component {

  constructor(props){
    super(props);

    this.state = {
      myRef: null,
      reviews: [],

      doneLoading: false,
    };
  }

  componentWillMount(){
    this.getReference();
  }

  getReference(){
    let self = this;
    let myRef = null;

    if(!history.location.search){

      myRef = firestore.collection('users').doc(sessionStorage.getItem('user'));
      self.setState({
        myRef: myRef,
      }, function () {
        self.getReviews();
      });

    } else {
      let myRef = null;
      let username = history.location.search.slice(1);
      firestore.collection('users').get().then((snapshot) => {
        snapshot.forEach(doc => {
          if(doc.data().username === username){
            myRef = firestore.collection('users').doc(doc.id);
            self.setState({
              myRef: myRef,
            }, function () {
              self.getReviews();
            });
          }
        });
      }).catch((error) => {
        console.log("Error getting user collection: " + error);
      });

    }
  };

  getReviews(){
    let self = this;
    let myReviews = [];
    this.state.myRef.onSnapshot(function (doc){
      myReviews = doc.data().reviews;
      self.setState({
        reviews: myReviews,
        doneLoading: true,
      });
    });
  }

  removeFromReviews = (index) => {
    let self = this;
    this.state.reviews.splice(index, 1);
    this.state.myRef.update({
      reviews: self.state.reviews,
    }).catch(function(error){
      console.log('Error deleting from reviews', (error));
    })
  };

  render(){

    if(!this.state.doneLoading){
      return(
        <div className='text-center'>
          <h3>Loading Reviews...</h3>
        </div>
      );
    }

    return (
      <div>
        <Row>
          <Col md={{size: '8', offset: '2'}}>

            <div className='text-center'>
              <h1>My Reviews</h1>
            </div>

            <div className='space'/>

            {Object.keys(this.state.reviews).map((key, index) => {
              return (

                <Jumbotron key={key}>
                  <Row>
                    <Col md='4'>
                      <img src={this.state.reviews[index].poster}/>
                    </Col>

                    <Col md='6'>

                      <h1> {this.state.reviews[index].title} </h1>

                      <div className='reviewSpace'/>

                      <h5> {this.state.reviews[index].content} </h5>

                      <div className='reviewSpace'/>
                      <Button size='lg' onClick={() => this.removeFromReviews(index)}> Remove Review </Button>

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

export default MyReviews;