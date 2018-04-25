import React, { Component } from 'react';
import {Row, Col, Jumbotron } from 'reactstrap';

class MoviePage extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col md={{size:8, offset:2}}>
            <Jumbotron>
              <h2>Welcome to the movie page!</h2>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }

}

export default MoviePage;