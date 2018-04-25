import React, {Component} from 'react'
import {fireauth} from "../base";
import { Button, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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

  render(){
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/home"><h1>SliverScreen</h1></NavbarBrand>

          <Col md='3'>
            <Button href='/movie-search'> Search Movies </Button>
          </Col>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

            <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink href="/connections">
                  <h4>
                    Connections
                  </h4>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/my-reviews">
                  <h4>
                    My Reviews
                  </h4>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/watchlist">
                  <h4>
                    Watchlist
                  </h4>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/my-favorites">
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

                  <DropdownItem href='/profile'>
                    <h5>
                      Profile
                    </h5>
                  </DropdownItem>

                  <DropdownItem onClick={this.signOut} href='/sign-in'>
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