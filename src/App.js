import React, { Component } from 'react';
import './Home.css';
import Home from './components/Home'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserShow from './components/UserShow.js'




class App extends Component {
  constructor(props){
    super(props)
    this.state={
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
    this.setState({followedUsers})
  })
}


  setLoggedInUser = (user) =>{
    this.setState({
      loggedInUser: user,
      loggedIn: true
    }, this.fetchFavorites)
  }

  signOut =() =>{
    this.setState({
      loggedInUser: {}
    })
  }


  render() {
    return(
      <Router>
        <React.Fragment>
          <Route  path ='/'
            render={(props) => <NavBar {...props}
            loggedInUser={this.state.loggedInUser}
            setLoggedInUser={this.setLoggedInUser}
            loggedIn={this.state.loggedIn}/>}
          />
          <Route exact path ='/'
          render={(props) => <Home
          {...props}
          loggedInUser={this.state.loggedInUser}
          />}
          />
          <Route exact path ='/signup'
            render={(props) => <SignUp
            {...props}
            loggedInUser={this.state.loggedInUser}
            setLoggedInUser={this.setLoggedInUser}/>}
          />

          <Route  exact path ='/users/:id'
            render={(props) => <UserShow {...props}
            loggedInUser={this.state.loggedInUser} />}
          />
          <Route  exact path ='/user/:id/edit'
            component={UserShow}
          />
        </React.Fragment>
      </Router>


    )

  }
}


export default App;
