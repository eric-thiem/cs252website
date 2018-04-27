import React, { Component } from 'react';
import {Row, Col, Input, Button, Form, Alert, Jumbotron, Table} from 'reactstrap';
import {firestore} from '../base';
import history from "../history";

class Connections extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: this.props.uid,
      myUsername: sessionStorage.getItem('username'),
      myRef: firestore.collection('users').doc(sessionStorage.getItem('user')),

      connections: [],
      search_text: '',

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
    if(username === sessionStorage.getItem('username') || username === ''){
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
    this.state.myRef.onSnapshot(function (doc){
      myConnections = doc.data().connections;
      self.setState({
        connections: myConnections,
        doneLoading: true,
      });
    });
  }

  goToUser = (index) => {
    history.push({
      pathname: '/cs252website/profile',
      search: this.state.connections[index],
    });
    window.location.reload();
  };

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
          <Col md={{size: '8', offset: '2'}}>
            <Jumbotron>
              <div className='text-center'>

                <Form onSubmit={this.addConnection}>
                  <h2><u>Add A Connection To A Fellow Movie Goer!</u></h2>
                  <div style={{height: '1em'}}/>
                  <Row>
                    <Col md={{size: '4', offset: '4'}}>
                      <Input type='text' id='connection' bsSize='lg' placeholder='Enter their username!'/>
                    </Col>
                  </Row>
                  <div style={{height: '1em'}}/>

                  <Col md={{size: '4', offset: '4'}}>
                    <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
                      {this.state.error_message}
                    </Alert>
                  </Col>

                  <div style={{height: '1em'}}/>

                  <Button type='submit'> Add Connection </Button>
                </Form>

                <div style={{height: '2em'}}/>
                <hr />
                <div style={{height: '2em'}}/>

                <h2><u>Your Connections:</u></h2>
                <div className='space'/>

                <Table hover>

                  {Object.keys(this.state.connections).map((key, index) => {
                    return (
                      <tbody key={key}>
                      <tr onClick={() => this.goToUser(index)}>
                        <td><h4>{this.state.connections[index]}</h4></td>
                      </tr>
                      </tbody>
                    );
                  })}

                </Table>

              </div>
            </Jumbotron>
          </Col>
          <Col md='2'/>
        </Row>
      </div>
    );
  }

}

export default Connections;