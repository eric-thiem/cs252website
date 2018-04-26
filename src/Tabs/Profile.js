import React, { Component } from 'react';
import {Row, Col, Jumbotron, Table} from 'reactstrap';
import history from "../history";
import {firestore} from "../base";

class Profile extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: history.location.search.slice(1),
      userFavorites: null,
      userWatchlist: null,
      userReviews: null,
      doneLoading: false,
    }
  }

  componentWillMount(){
    if(!this.state.username){
      this.setState({
        username: sessionStorage.getItem('username'),
      }, function () {
        this.getUserDoc();
      });
    } else {
      this.getUserDoc();
    }
  }

  getUserDoc(){
    //TODO add check for if user doesn't exist
    let self = this;
    firestore.collection('users').get().then((snapshot) => {
      snapshot.forEach(doc => {
        if(doc.data().username === self.state.username){
          self.getUserData(doc.id);
        }
      });
    }).catch((error) => {
      console.log("Error getting user collection: " + error);
    });
  }

  getUserData(doc_id){
    let self = this;
    let userRef = firestore.collection('users').doc(doc_id);
    userRef.get().then(function(doc){
      self.setState({
        userFavorites: doc.data().favorites,
        userWatchlist: doc.data().watchlist,
        userReviews: doc.data().reviews,
      }, function(){
        self.setState({
          doneLoading: true,
        });
      });
    }).catch(function(error){
      console.log("Error getting user data", error);
    })
  }

  getMovie = (index, table) => {
    switch(table){
      case 'favorites':
        history.push({
          pathname: '/cs252website/movie-page',
          search: this.state.userFavorites[index].imdbid,
        });
        window.location.reload();
        break;
      case 'watchlist':
        history.push({
          pathname: '/cs252website/movie-page',
          search: this.state.userWatchlist[index].imdbid,
        });
        window.location.reload();
        break;
      case 'reviews':

    }
  };

  viewUsersReviews = () => {
    let self = this;
    history.push({
      pathname: '/cs252website/my-reviews',
      search: self.state.username,
    });
    window.location.reload();
  };

  render(){

    if(!this.state.doneLoading){
      return(
        <div className='text-center'>
          <h3>Loading Profile...</h3>
        </div>
      );
    }

    return (
      <Row>
        <Col xs='12' md={{ size:8, offset:2}}>

          <div className='text-center'>
            <h1>{this.state.username}'s Profile</h1>
          </div>

          <div className='space'/>

          <Jumbotron>
            <Table hover>
              <thead>
              <tr>
                <th>Favorites</th>
              </tr>
              </thead>

              {Object.keys(this.state.userFavorites).map((key, index) => {
                return (
                  <tbody key={key}>
                  <tr onClick={() => this.getMovie(index, 'favorites')}>
                    <td>{this.state.userFavorites[index].title}</td>
                    <td>{this.state.userFavorites[index].year}</td>
                  </tr>
                  </tbody>
                );
              })}
            </Table>
          </Jumbotron>

          <div className='space'/>

          <Jumbotron>
            <Table hover>
              <thead>
              <tr>
                <th>Watchlist</th>
              </tr>
              </thead>

              {Object.keys(this.state.userWatchlist).map((key, index) => {
                return (
                  <tbody key={key}>
                  <tr onClick={() => this.getMovie(index, 'watchlist')}>
                    <td>{this.state.userWatchlist[index].title}</td>
                    <td>{this.state.userWatchlist[index].year}</td>
                  </tr>
                  </tbody>
                );
              })}
            </Table>
          </Jumbotron>

          <div className='space'/>

          <Jumbotron>
            <Table hover>
              <thead>
              <tr>
                <th onClick={this.viewUsersReviews}>Click to view {this.state.username}'s Reviews</th>
              </tr>
              </thead>

              {Object.keys(this.state.userReviews).map((key, index) => {
                return (
                  <tbody key={key}>
                  <tr onClick={() => this.getMovie(index, 'watchlist')}>
                    <td>{this.state.userReviews[index].title}</td>
                    <td>{this.state.userReviews[index].year}</td>
                  </tr>
                  </tbody>
                );
              })}
            </Table>
          </Jumbotron>

        </Col>
      </Row>
    );
  }
}

export default Profile;