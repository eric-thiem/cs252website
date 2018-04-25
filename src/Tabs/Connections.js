import React, { Component } from 'react';
import {Row, Col, Input, Button, Form, Alert} from 'reactstrap';
import {firestore} from '../base';

class Connections extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: this.props.uid,
      myUsername: sessionStorage.getItem('username'),

      connections: [],
      search_text: null,

      error_message: null,
      error_visible: false,
      doneLoading: false,
    };
  }

  componentWillMount(){
    this.getConnections();
  }

  addConnection = (ev) => {
    ev.preventDefault();
    let self = this;
    let username = ev.target.connection.value;
    if(username === sessionStorage.getItem('username')){
      self.setState({
        error_message: 'Please enter a valid username',
        error_visible: true,
      });
      return;
    }

    let index = 0;
    firestore.collection('users').get().then((snapshot) => {
      snapshot.forEach(doc => {
        if(doc.data().username === username){
          self.addToConnectionArray(doc.id, username);
        } else {
          index++;
          if(index === snapshot.size){
            self.setState({
              error_message: 'Unable to find user.',
              error_visible: true,
            });
          }
        }
      });
    }).catch((error) => {
      console.log("Error getting user collection: " + error);
    });
  };

  addToConnectionArray(doc_id, username){
    let self = this;
    let currentConnections = [];

    let userRef = firestore.collection('users').doc(doc_id);
    userRef.get().then(function (doc){
      currentConnections = doc.data().connections;
      currentConnections.push(self.state.myUsername);
      console.log(currentConnections);

      userRef.update({
        connections: currentConnections
      }).catch(function (error) {
        console.error("Error updating connections" + (error));
      });
    });

    let myConnections = [];
    let myRef = firestore.collection('users').doc(sessionStorage.getItem('user'));
    myRef.get().then(function (doc){
      myConnections = doc.data().connections;
      myConnections.push(username);
      console.log(myConnections);

      myRef.update({
        connections: myConnections
      }).catch(function (error) {
        console.error("Error updating my connections" + (error));
      });
    });
  }

  getConnections(){
    let self = this;
    let myConnections = [];
    let myRef = firestore.collection('users').doc(sessionStorage.getItem('user'));
    myRef.get().then(function (doc){
      myConnections = doc.data().connections;
      self.setState({
        connections: myConnections,
        doneLoading: true,
      });
    });
  }

  onDismiss = () => {
    this.setState({
      error_visible: false
    });
  };

  render(){

    if(!this.state.doneLoading){
      return(
        <div className='text-center'>
          <h3>Loading Connections...</h3>
        </div>
      );
    }

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

                <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
                  {this.state.error_message}
                </Alert>

                <div style={{height: '1em'}}/>

                <Button type='submit'> Add Connection </Button>
              </Form>

              <div style={{height: '3em'}}/>
              <h3>My Connections:</h3>

              {Object.keys(this.state.connections).map((key, index) => {
                return (
                  <div key={key} className='text-center'>
                    <h3>{this.state.connections[index]}</h3>
                  </div>
                );
              })}

            </div>

          </Col>
          <Col md='4'/>
        </Row>
      </div>
    );
  }

}

export default Connections;