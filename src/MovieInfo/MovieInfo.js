import React, { Component } from 'react';

import { fireauth } from '../base.js';

import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Alert, Row, Col} from 'reactstrap';
import './MovieInfo.css';
import imdb from 'imdb-api';

//Ideas
//Recent History

class MovieInfo extends Component
{
    constructor(props)
    {
        super(props);

        const imdb = require('imdb-api');

        this.state = { };

        console.log(props.id);

        let self = this;
        let MovieInfo = imdb.getById( this.props.imdbid , {apiKey: '32978a97', timeout: 30000}).then(movie => {
           self.setState( { title:          movie.title         ,
                            _year_data:     movie._year_data    ,
                            rated:          movie.rated         ,
                            released:       movie.released      ,
                            runtime:        movie.runtime       ,
                            genres:         movie.genres        ,
                            director:       movie.director      ,
                            writer:         movie.writer        ,
                            actors:         movie.actors        ,
                            plot:           movie.plot          ,
                            languages:      movie.languages     ,
                            country:        movie.country       ,
                            poster:         movie.poster        ,
                            metascore:      movie.metascore     ,
                            rating:         movie.rating        ,
                            votes:          movie.votes         ,
                            imdbid:         movie.imdbid        ,
                            type:           movie.type          ,
                            imdburl:        movie.imdburl       ,

           });
        });

    }

    render() {
        return (

            <Row>
                <Col m='4'>
                    <img src={this.state.poster} />
                </Col>
                <Col m='7'>
                    <h1> {this.state.title} </h1>
                    <h5> {this.state.plot} </h5>
                    <h3> Additional Info </h3>
                    <h5> Rating: {this.state.rating} </h5>
                    <h5> Runtime: {this.state.runtime} </h5>
                    <h5> Actors: {this.state.actors} </h5>
                    <h5> Directors: {this.state.director} </h5>
                </Col>
                <Col m='1'>
                    <a href={this.state.imdburl}> Visit IMDB Page </a>
                </Col>
            </Row>


        )
    };
}

export default MovieInfo;