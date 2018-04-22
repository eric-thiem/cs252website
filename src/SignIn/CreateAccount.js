import React, { Component } from 'react';

import { fireauth, firestore } from '../base.js';
import { Form, Input, Button, Alert, Row, Col } from 'reactstrap';
import {Route, Switch, Redirect} from 'react-router-dom';
import './SignIn.css'

class CreateAccount extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: null,
      email: null,

      error_message: '',
      error_visible: false,

      account_created: false,
    }
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
    let username = ev.target.username.value;
    let email = ev.target.email.value;
    let password = ev.target.password.value;
    let confirm_password = ev.target.confirm_password.value;

    if (username === '') {
      this.setError('Please enter a valid username.');
      return;
    } else if (email === ''){
      this.setError('Please enter a valid email.');
      return;
    } else if (password === ''){
      this.setError('Please enter a valid password.');
      return;
    } else if (confirm_password === ''){
      this.setError('Please confirm your password.')
      return;
    } else if (password !== confirm_password){
      this.setError('Passwords do not match.');
      return;
    }

    this.setState({
      username: username,
      email: email,
    });

    this.createAccount(email, password);
  };

  createAccount(email, password){
    let self = this;
    fireauth.createUserWithEmailAndPassword(email, password).then(function () {
      self.addUserInfo(password);
    }).catch(function (error){
      self.setError(error.message);
    });
  };

  addUserInfo(password){
    let self = this;
    let docRef = firestore.collection("users").doc(this.state.username);
    docRef.set({
      username: self.state.username,
      email: self.state.email,
    }).catch(function(error) {
      console.log(error);
    });

    self.setState({
      account_created: true,
    });
  };

  setError(error){
    this.setState({
      error_message: error,
      error_visible: true,
    });
  };

  onDismiss = () => {
    this.setState({
      error_visible: false,
    });
  };

  render() {

    if(this.state.account_created){
      return (
        <Redirect to='/home'/>
      );
    }

    return (
      <div className='text-center'>

        <Row>

          <Col md='5'/>
          <Col md='2'>

            <div className='text-center'>

              <Form className='verticalCenter' onSubmit={this.onFormSubmit}>

                <h2>Create New Account!</h2>

                <div style={{height: '1em'}}/>

                <Input
                  type='text'
                  id='username'
                  bsSize='lg'
                  placeholder='Username'
                  style={{border: '1px solid #4682B4'}}/>

                <div style={{height: '1em'}}/>

                <Input type='text'
                       id='email'
                       bsSize='lg'
                       placeholder='Email'
                       style={{border: '1px solid #4682B4'}}/>

                <div style={{height: '1em'}}/>

                <Input type='password'
                       id='password'
                       bsSize='lg'
                       placeholder='Password'
                       style={{border: '1px solid #4682B4'}}/>

                <div style={{height: '1em'}}/>

                <Input type='password'
                       id='confirm_password'
                       bsSize='lg'
                       placeholder='Confirm Password'
                       style={{border: '1px solid #4682B4'}}/>

                <hr/>

                <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
                  {this.state.error_message}
                </Alert>

                <div style={{display: 'flex', justifyContent: 'center'}}>

                  <Button className='signInButton'> Create Account </Button>

                </div>

              </Form>

            </div>

          </Col>

        </Row>

      </div>
    );
  }

}

export default CreateAccount;