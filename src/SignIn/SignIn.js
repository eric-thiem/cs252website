import React, { Component } from 'react';

import { fireauth } from '../base.js';

import { NavLink } from 'react-router-dom';
import { Form, Label, Input, Button, Alert, Row, Col} from 'reactstrap';
import './SignIn.css';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signing_in: false,
      error_message: '',
      error_visible: '',
    };
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    let self = this;

    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value)
      .catch(function(err) {

        // Handle errors
        self.setState({
          error_message: err.message,
          error_visible: true,
        })

      });
  };

  render() {
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
                  style={{border: '1px solid #4682B4'}}/>

                <div style={{height: '1em'}}/>

                <Input type='password'
                       id='password'
                       bsSize='lg'
                       placeholder='Password'
                       style={{border: '1px solid #4682B4'}}/>

                <div className='space'/>

                <Button className='signInButton'> Sign In </Button>

                <div/>

              </Form>

            </div>

          </Col>

        </Row>

      </div>
    )

  };
}

export default SignIn;