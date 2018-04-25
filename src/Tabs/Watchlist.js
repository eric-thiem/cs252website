import React, { Component } from 'react';
import {Row, Col, Jumbotron} from 'reactstrap';
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
            <Jumbotron>
              <div className='text-center'>

                {Object.keys(this.state.watchlist).map((key, index) => {
                  return (
                    <div key={key} className='text-center'>
                      <h3>{this.state.connections[index]}</h3>
                    </div>
                  );
                })}

              </div>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }

}

export default Watchlist;