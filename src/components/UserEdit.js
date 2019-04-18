import React, {Component} from 'react'
import { Link } from "react-router-dom";


export default class UserEdit extends Component {
  state={
  }

componentDidMount(){
  this.setState({
    username: this.props.loggedInUser.username
  })
}

  handleUsernameChange =(e) => {
      this.setState({username: e.target.value})
  }

  render () {
    return(<div id="edit_form">
      <form className="form-group" onSubmit={(e) => this.props.submitChangeUsername(e, this.state.username)}>
      <label className="white_label"> Please enter matching Twitch Username </label>
      <input className ="edit_btn" type="text" name="username" value={this.state.username} placeholder="Username"
      onChange={this.handleUsernameChange}/>
      <input className ="btn btn-outline-warning edit_btn" type="submit" value="Update Account" />
      </form>
      <button className ="btn btn-outline-primary edit_btn">
      Back to CodeStream </button>
      <button className ="btn btn-outline-danger edit_btn">
        Delete User Account </button>

    </div>)

  }
}
