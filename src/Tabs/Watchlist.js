import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'reactstrap';
import {firestore} from "../base";

class Watchlist extends Component {

  constructor(props){
    super(props);

    this.state = {
      doneLoading: false,
    }
  }

  componentWillMount(){
    this.getWatchlist();
  }

  getWatchlist(){
    let self = this;
    let myWatchlist = [];
    let myRef = firestore.collection('users').doc(sessionStorage.getItem('user'));
    myRef.get().then(function (doc){
      myWatchlist = doc.data().watchlist;
      self.setState({
        watchlist: myWatchlist,
        doneLoading: true,
      });
    });
  }

  render(){

    if(!this.state.doneLoading){
      return(
        <div className='text-center'>
          <h3>Loading Watchlist...</h3>
        </div>
      );
    }

    return (
      <div>
        <Row>
          <Col md={{size: '8', offset: '2'}}>

            <div className='text-center'>
              <h1>Watchlist</h1>
            </div>

            <div className='space'/>

            {Object.keys(this.state.watchlist).map((key, index) => {
              return (

                <Jumbotron>
                  <Row>
                    <Col md='4'>
                      <img src={this.state.watchlist[index].poster}/>
                    </Col>

                    <Col md='6'>

                      <h1> {this.state.watchlist[index].title} </h1>

                      <h3> Rating: {this.state.watchlist[index].rating} </h3>

                      <a href={this.state.watchlist[index].imdburl}> Visit IMDB Page </a>

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