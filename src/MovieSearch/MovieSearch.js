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
            searchName: ' ',
        };

        this._onButtonClick = this._onButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    _onButtonClick(){
        const imdb = require('imbd-api');
        this.setState({ showComponent: true });
        imdb.search({ title: 'Toxic Avenger' },
                    { apiKey: 'foo' }).then(console.log).catch(console.log);
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
                                    <th>#</th>
                                </tr>
                            </thread>
                            <tbody>
                                <tr>
                                    <th scope='row'>{this.state.searchName}</th>
                                    <th scope='row'>Hello</th>
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