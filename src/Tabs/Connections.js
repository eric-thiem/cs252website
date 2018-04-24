import React, { Component } from 'react';
import {Row, Col, Input, Button, Form, Alert} from 'reactstrap';
import {firestore} from '../base';

class Connections extends Component {

  constructor(props){
    super(props);

    this.state = {
      connections: [],

      search_text: null,

      error_message: null,
      error_visible: false,
    }
  }

  componentWillMount(){
    this.getConnections();
  }

  addConnection = (ev) => {
    ev.preventDefault();
    let username = ev.target.connection.value;

  };

  getConnections(){
    //let userRef = firestore.collection("classes").doc(code);
  }

  addUserToConnections(){

  }

  onDismiss = () => {
    this.setState({
      error_visible: false
    });
  };

  render(){
    return (

      <div>
        <Row>
          <Col md='4'/>
          <Col md='4'>

            <div className='text-center'>

              <Form onSubmit={this.addConnection}>
                <h3>Add A Connection</h3>
                <div style={{height: '1em'}}/>
                <Input type='text' id='connection' bsSize='lg' placeholder='Add a Movie Goer Connection by Username!'/>
                <div style={{height: '1em'}}/>
                <Button type='submit'> Add Connection </Button>
              </Form>

              <div style={{height: '3em'}}/>
              <h3>My Connections</h3>

            </div>

          </Col>
          <Col md='4'/>
        </Row>
      </div>
    );
  }

}

export default Connections;