import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render(){
    return (
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
        </ul>
      </nav>
    );
  };
}

export default Header;