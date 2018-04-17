import React, { Component } from 'react';

import { fireauth, firestore } from '../base.js';
import { Form, FormGroup, Label, Input, Button, Alert, Container, Row, Col } from 'reactstrap';
import './SignIn.css'

class CreateAccount extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: props.uid,
      error_message: '',
      error_visible: '',
    }
  }

  onSubmit = (ev) => {


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

                <div style={{height: '1em'}}/>

                <Button className='signInButton'> Sign In </Button>

                <div style={{height: '1em'}}/>

                <Button className='signInButton'> Create Account </Button>

              </Form>

            </div>

          </Col>

        </Row>

      </div>
    );
  }

}

export default CreateAccount;