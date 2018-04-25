import React, {Component} from 'react';
import './App.css';
import Main from './Main';
import {Router} from 'react-router-dom';
import history from './history';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Main />
      </Router>
    );
  }
}

export default App;