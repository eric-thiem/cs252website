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
        Table,}
        from 'reactstrap';

class MovieSearch extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            showComponent: false,
            searchName: '',
            redirect: false,
            element: 0,

        };

        this._onButtonClick = this._onButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    _onButtonClick(){

        let imdb = require('imdb-api');

        imdb.search({
            title: this.state.searchName
        }, {
            apiKey: '32978a97'
        }).then(console.log).catch(console.log);


        let self = this;
        let Moviesearch = imdb.search(  { title: this.state.searchName,  },
                                        { apiKey: '32978a97', timeout: 30000, }
                                        ).then( SearchResults => {
                self.setState({ r1_title:   SearchResults.results[0].title      ,
                                r1_year:    SearchResults.results[0].year       ,
                                r1_id:      SearchResults.results[0].imdbid     ,
                                r2_title:   SearchResults.results[1].title      ,
                                r2_year:    SearchResults.results[1].year       ,
                                r2_id:      SearchResults.results[1].imdbid     ,
                                r3_title:   SearchResults.results[2].title      ,
                                r3_year:    SearchResults.results[2].year       ,
                                r3_id:      SearchResults.results[2].imdbid     ,
                                r4_title:   SearchResults.results[3].title      ,
                                r4_year:    SearchResults.results[3].year       ,
                                r4_id:      SearchResults.results[3].imdbid     ,
                                r5_title:   SearchResults.results[4].title      ,
                                r5_year:    SearchResults.results[4].year       ,
                                r5_id:      SearchResults.results[4].imdbid     ,
                                r6_title:   SearchResults.results[5].title      ,
                                r6_year:    SearchResults.results[5].year       ,
                                r6_id:      SearchResults.results[5].imdbid     ,
                                r7_title:   SearchResults.results[6].title      ,
                                r7_year:    SearchResults.results[6].year       ,
                                r7_id:      SearchResults.results[6].imdbid     ,
                                r8_title:   SearchResults.results[7].title      ,
                                r8_year:    SearchResults.results[7].year       ,
                                r8_id:      SearchResults.results[7].imdbid     ,
                                r9_title:   SearchResults.results[8].title      ,
                                r9_year:    SearchResults.results[8].year       ,
                                r9_id:      SearchResults.results[8].imdbid     ,
                                r10_title:  SearchResults.results[9].title      ,
                                r10_year:   SearchResults.results[9].year       ,
                                r10_id:     SearchResults.results[9].imdbid     ,
                });
        });

        this.state.showComponent = true;
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
                                    <td>Title</td>
                                    <td>Year</td>
                                </tr>
                            </thread>
                            <tbody>
                                <tr onClick={() => {}} >
                                    <td>{this.state.r1_title}</td>
                                    <td>{this.state.r1_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r2_title}</td>
                                    <td>{this.state.r2_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r3_title}</td>
                                    <td>{this.state.r3_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r4_title}</td>
                                    <td>{this.state.r4_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r5_title}</td>
                                    <td>{this.state.r5_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r6_title}</td>
                                    <td>{this.state.r6_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r7_title}</td>
                                    <td>{this.state.r7_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r8_title}</td>
                                    <td>{this.state.r8_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r9_title}</td>
                                    <td>{this.state.r9_year}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.r10_title}</td>
                                    <td>{this.state.r10_year}</td>
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