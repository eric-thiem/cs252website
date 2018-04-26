import React, {Component} from 'react';
import {fireauth} from '../base';
import { Button, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import history from '../history';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    };
  }

  signOut = () => {
    fireauth.signOut();
    sessionStorage.setItem('user', null);
    sessionStorage.setItem('username', null);
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onProfile = () => {
    let user = sessionStorage.getItem('username');
    history.push({
      pathname: '/cs252website/profile',
      search: user,
    });
    window.location.reload();
  };

  render(){
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/cs252website/home"><h1>SliverScreen</h1></NavbarBrand>

          <Col md='3'>
            <Button href='/cs252website/movie-search'> Search Movies and TV Shows </Button>
          </Col>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

            <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink href="/cs252website/connections">
                  <h4>
                    Connections
                  </h4>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/cs252website/my-reviews">
                  <h4>
                    My Reviews
                  </h4>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/cs252website/watchlist">
                  <h4>
                    Watchlist
                  </h4>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/cs252website/my-favorites">
                  <h4>
                    My Favorites
                  </h4>
                </NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>

                <DropdownToggle nav caret>
                  <i className="fa fa-user fa-fw"/>
                </DropdownToggle>


                <DropdownMenu right>

                  <DropdownItem onClick={this.onProfile}>
                    <h5>
                      Profile
                    </h5>
                  </DropdownItem>

                  <DropdownItem onClick={this.signOut} href='/cs252website/sign-in'>
                    <h5>Sign Out</h5>
                  </DropdownItem>

                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;