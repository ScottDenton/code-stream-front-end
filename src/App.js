import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import UserShow from "./components/UserShow.js";
import "./Home.css";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {},
      loggedIn: false,
      displaySignUp: false,
      followedUsers: [],
      faveVids: []
    }
  }

  fetchFavorites = ()=> {
    if(this.state.loggedInUser !== null){
      fetch(`https://code-stream.herokuapp.com/api/v1/users/${this.state.loggedInUser.id}/favorites`)
      .then(resp => resp.json())
      .then(followedUsers => {
        const usernames= followedUsers.map(favorite => {
          return favorite.followed_username
        })
        this.setState({
          followedUsers: usernames,
          loggedIn: true
        }, this.fetchFavoriteVideos)
      })
    } else {
      alert("Invalid Credentials")
    }
  }

  fetchFavoriteVideos =() =>{
    const videos={}
    let counter = 0
    this.state.followedUsers.map(user => {
      this.findVideosByUsername(user).then(resp =>{
        videos[user] = resp
        counter ++;
        if(counter === this.state.followedUsers.length){
          this.setState({
            faveVids: videos
          })
        }
      })
    })
  }

  findVideosByUsername =(username) =>{
    let user_id;
    let id;
    return fetch('https://code-stream.herokuapp.com/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
        const foundUser =  users.find(user => {
          return user.username === username
        })
          user_id = foundUser.user_id
          id = foundUser.id
      })
    .then(users =>{
      const body={twitch_id: user_id}
      return fetch(`https://code-stream.herokuapp.com/sessions/getUserVideos`,{
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json())
      .then(json => {
         return json.data
      })
    })
  }

  setLoggedInUser = (user) =>{
    this.setState({
      loggedInUser: user
    }, this.fetchFavorites)
  }

  signOut = () => {
    this.setState({
      loggedInUser: {}
    });
  };

  handleFollowClick =(stream) =>{
    const body={followed_name: stream.user_name}
    fetch(`https://code-stream.herokuapp.com/api/v1/users/${this.state.loggedInUser.id}/favorites`, {
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
    fetch(`https://code-stream.herokuapp.com/api/v1/users/${this.state.loggedInUser.id}/favorites`)
    .then(resp => resp.json())
    .then(favorites =>{
      const favorite = favorites.find(fave => (fave.followed_username === stream.user_name))
      fetch(`https://code-stream.herokuapp.com/api/v1/users/${this.state.loggedInUser.id}/favorites/${favorite.id}`,
        { method: "DELETE"})
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
              <NavBar {...props}
                loggedInUser={this.state.loggedInUser}
                setLoggedInUser={this.setLoggedInUser}
                loggedIn={this.state.loggedIn}
              />
            )}
          />
          <Route exact path ='/'
            render={(props) => <Home {...props}
              loggedInUser={this.state.loggedInUser}
              handleFollowClick={this.handleFollowClick}
              handleUnFollowClick={this.handleUnFollowClick}
              followedUsers={this.state.followedUsers}
              faveVids={this.state.faveVids}
              loggedIn={this.state.loggedIn}
              />
            }
          />
          <Route exact path ='/signup'
            render={(props) => <SignUp {...props}
              loggedInUser={this.state.loggedInUser}
              setLoggedInUser={this.setLoggedInUser}
              />
            }
          />
          <Route
            exact path="/users/:id"
            render={(props) =>
              <UserShow {...props}
                loggedInUser={this.state.loggedInUser}
                loggedIn={this.state.loggedIn}
                handleFollowClick={this.handleFollowClick}
                handleUnFollowClick={this.handleUnFollowClick}
                followedUsers={this.state.followedUsers}
              />
            }
          />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
