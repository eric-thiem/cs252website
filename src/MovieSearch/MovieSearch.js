import React, { Component } from 'react';
import imdb from 'imdb-api';

import {Row,
        Col,
        Jumbotron,
        Container,
        Button,
        Form,
        FormGroup,
        Label,
        Input,
        InputGroup,
        InputGroupAddon,
        Table} from 'reactstrap';

class MovieSearch extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            showComponent: false,
            searchName: '',

        };

        this._onButtonClick = this._onButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    _onButtonClick(){


        let imdb = require('imdb-api');

        imdb.search({
            title: 'Toxic Avenger'
        }, {
            apiKey: '32978a97'
        }).then(console.log).catch(console.log);


        let self = this;
        let MovieInfo = imdb.search( {title: this.state.searchName} , {apiKey: '32978a97', timeout: 30000}).then(SearchResults => { self.setState( {

                r1_title:       SearchResults.results[0].title,
                results:        SearchResults,

            }) })

        console.log(this.state.results);
        console.log(this.state.r1_title);
    }

    handleChange(event)
    {
        this.setState({searchName: event.target.value });
    }

    render ()
    {
        return (

            <Row>
            <Col xs='12' md={{ size:8, offset:2}} >
                <Jumbotron>
                    <h1 className="display-3"><strong>Movie Search</strong></h1>
                    <p className="lead">This is a simple movie search.</p>
                    <hr className="my-2" />
                    <Form>
                        <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                                <Button onClick = {this._onButtonClick}>Search</Button>
                            </InputGroupAddon>
                            <Input type='text' onChange={this.handleChange} value={this.state.searchName} />
                        </InputGroup>
                    </Form>
                    {this.state.showComponent ?
                        <Table hover>
                            <thread>
                                <tr>
                                    <th>Title</th>
                                    <th>Year</th>
                                </tr>
                            </thread>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{this.state.search1title}</td>
                                    <td>{this.state.search1year}</td>
                                </tr>
                            </tbody>
                        </Table> :
                        null
                    }
                </Jumbotron>
            </Col>
            </Row>
        )
    };
}

export default MovieSearch;