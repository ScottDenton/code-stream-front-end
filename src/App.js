import React, { Component } from "react";
import "./Home.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserShow from "./components/UserShow.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      loggedIn: false,
      displaySignUp: false,
      followedUsers: []
    }
  }

fetchFavorites = ()=> {
  fetch(`http://localhost:3000/api/v1/users/${this.state.loggedInUser.id}/favorites`)
  .then(resp => resp.json())
  .then(followedUsers => {
    const usernames= followedUsers.map(favorite => {
      return favorite.followed_username
    })
    this.setState({followedUsers: usernames})
  })
}

  setLoggedInUser = (user) =>{
    this.setState({
      loggedInUser: user,
      loggedIn: true
    }, this.fetchFavorites)
  }

  signOut = () => {
    this.setState({
      loggedInUser: {}
    });
  };

  handleFollowClick =(stream) =>{
    const body={
        followed_name: stream.user_name
    }
    fetch(`http://localhost:3000/api/v1/users/${this.state.loggedInUser.id}/favorites`,
      {
      method: "POST",
          headers: {
            "Accept": "application/jsofn",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
        this.setState({
          followedUsers: [...this.state.followedUsers, stream.user_name]
        })
     }

  handleUnFollowClick =(stream) =>{
      fetch(`http://localhost:3000/api/v1/users/${this.state.loggedInUser.id}/favorites`)
    .then(resp => resp.json())
    .then(favorites =>{
      const favorite = favorites.find(fave => (fave.followed_username === stream.user_name))
      fetch(`http://localhost:3000/api/v1/users/${this.state.loggedInUser.id}/favorites/${favorite.id}`, {
        method: "DELETE"
      })
    })
    this.setState({
      followedUsers: this.state.followedUsers.filter(name => (
        name !== stream.user_name
      ))
    })
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            path="/"
            render={props => (
              <NavBar
                {...props}
                loggedInUser={this.state.loggedInUser}
                setLoggedInUser={this.setLoggedInUser}
                loggedIn={this.state.loggedIn}

              />
            )}
          />
          <Route exact path ='/'
          render={(props) => <Home
          {...props}
          loggedInUser={this.state.loggedInUser}
          handleFollowClick={this.handleFollowClick}
          handleUnFollowClick={this.handleUnFollowClick}
          followedUsers={this.state.followedUsers}
          />}
          />
          <Route exact path ='/signup'
            render={(props) => <SignUp
            {...props}
            loggedInUser={this.state.loggedInUser}
            setLoggedInUser={this.setLoggedInUser}/>}
          />

          <Route
            exact
            path="/users/:id"
            render={props => (
              <UserShow {...props} loggedInUser={this.state.loggedInUser} />
            )}
          />
          <Route exact path="/user/:id/edit" component={UserShow} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
