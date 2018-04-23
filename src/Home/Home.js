import React, { Component } from 'react';
import {Row, Col} from 'reactstrap'
import Header from './Header'

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <Row>
          <Col md='2'/>
          <Col md='8'>
            <Header/>
          </Col>
        </Row>

        <div>
          <Row>
            <Col md='2'/>
            <Col md='8'>
              <div className='text-center'>
                <h3> Welcome to SliverScreen! </h3>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;