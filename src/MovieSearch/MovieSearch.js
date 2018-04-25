import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button, Form, Input, InputGroup, InputGroupAddon, Table } from 'reactstrap';

class MovieSearch extends Component {

  constructor(props){
    super(props);

    this.state = {
      searchName: '',
      searchResults: null,
      showComponent: false,
    };

    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onButtonClick(){
    const imdb = require('imdb-api');
    let self = this;
    imdb.search(  { title: this.state.searchName,  },
      { apiKey: '32978a97', timeout: 30000, }
    ).then( SearchResults  => {
      self.setState({
        searchResults: SearchResults,
      }, function(){
        self.setState({
          showComponent: true,
        })
      });
    });
  }

  handleChange(event) {
    this.setState({
      searchName: event.target.value
    });
  }

  render () {
    return (

      <Row>
        <Col xs='12' md={{ size:8, offset:2}} >
          <Jumbotron>
            <h1 className="display-3"><strong>Movie Search</strong></h1>
            <p className="lead">Enter a movie or television show</p>
            <hr className="my-2" />

            <Form>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>
                  <Button onClick = {this.onButtonClick}>Search</Button>
                </InputGroupAddon>
                <Input type='text' onChange={this.handleChange} value={this.state.searchName} />
              </InputGroup>
            </Form>

            {this.state.showComponent
              ?
              <Table hover>

                <thead>
                <tr>
                  <th>Total Results: {this.state.searchResults.totalresults}</th>
                </tr>
                </thead>

                {Object.keys(this.state.searchResults.results).map((key, index) => {
                  return (
                    <tbody key={key}>
                    <tr>
                      <td>{this.state.searchResults.results[index].title}</td>
                      <td>{this.state.searchResults.results[index].year}</td>
                    </tr>
                    </tbody>
                  );
                })}

              </Table>

              : null
            }
          </Jumbotron>
        </Col>
      </Row>
    )
  };
}

export default MovieSearch;