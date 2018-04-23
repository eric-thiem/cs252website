import React, { Component } from 'react';

import { fireauth } from '../base.js';

import { NavLink, Redirect } from 'react-router-dom';
import { Form, Input, Button, Alert, Row, Col} from 'reactstrap';
import './SignIn.css';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signed_in: false,
      error_message: '',
      error_visible: false,
    };
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    let self = this;

    let email = ev.target.email.value;
    let password = ev.target.password.value;

    fireauth.signInWithEmailAndPassword(email, password).catch(function(err) {

        // Handle errors
        self.setState({
          error_message: err.message,
          error_visible: true,
        });

      });
  };

  onDismiss = () => {
    this.setState({
      error_visible: false,
    });
  };

  render() {

    if(this.state.signed_in){
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

              <Form className='verticalCenter' onSubmit={this.onSubmit}>

                <h2>Welcome!</h2>

                <div style={{height: '1em'}}/>

                <Input
                  type='text'
                  id='email'
                  bsSize='lg'
                  placeholder='Email'
                  className='input'
                  style={{border: '1px solid #4682B4'}}/>

                <div style={{height: '1em'}}/>

                <Input type='password'
                       id='password'
                       bsSize='lg'
                       placeholder='Password'
                       className='input'
                       style={{border: '1px solid #4682B4'}}/>

                <hr/>

                <Alert color="danger" isOpen={this.state.error_visible} toggle={this.onDismiss}>
                  {this.state.error_message}
                </Alert>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Button type='submit' className='signInButton'> Sign In </Button>
                </div>

                <div style={{height: '1em'}}/>

              </Form>

              <NavLink style={{ textDecoration: 'none' }} to="/create-account">
                <Button className='signInButton'> Create Account </Button>
              </NavLink>

              <div style={{height: '1em'}}/>

              <NavLink style={{ textDecoration: 'none' }} to="/forgot-password">
                <p style={{fontSize: '1.2em', color: '#0d39ed', cursor: 'pointer'}}><u>Forgot Password</u></p>
              </NavLink>

              <div/>

            </div>

          </Col>

        </Row>

      </div>
    )

  };
}

export default SignIn;