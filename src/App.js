import React, {Component} from 'react';
import './App.css';
import Main from './Main';
import {BrowserRouter} from 'react-router-dom';
import history from './history';

class App extends Component {

  render() {
    return (
      <BrowserRouter history={history}>
        <Main />
      </BrowserRouter>
    );
  }
}

export default App;