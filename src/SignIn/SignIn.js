import React, { Component } from 'react';

import { fireauth } from '../base.js';

import { NavLink } from 'react-router-dom';
import { Form, Label, Input, Button, Alert } from 'reactstrap';
import './SignIn.css';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signing_in: false,
      error_message: "",
      error_visible: "",
    };
  }

  onSubmit = () => {

  };

  render() {
    return (
      <div className='centered'>

        <Form onSubmit={this.onSubmit}>

          <Label>
            Email
            <Input type='text' name='email'/>
          </Label>

          <Label>
            Password
            <Input type='text' name='password'/>
          </Label>

          <Button type='submit'> Sign In </Button>

        </Form>

      </div>
    )

  };
}

export default SignIn;