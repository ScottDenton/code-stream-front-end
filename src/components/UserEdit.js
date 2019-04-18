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

  deleteUser = () => {
    const id = this.props.loggedInUser.id
    fetch(`https://code-stream-api.herokuapp.com/api/v1/users/${id}`, {
      method: "Delete"
    }).then(resp => {
      alert("User deleted")
      this.props.signOut()
    })
  }

  editFormToRender =() => {
    if (this.props.match.params.id != this.props.loggedInUser.id){
      return alert("What are you playing at, you may only update your own account, get out of here")
    } else {
        return <div id="edit_form">
          <form className="form-group" onSubmit={(e) => this.props.submitChangeUsername(e, this.state.username)}>
          <label className="white_label"> Please enter matching Twitch Username </label>
          <input className ="edit_btn" type="text" name="username" value={this.state.username} placeholder="Username"
          onChange={this.handleUsernameChange}/>
          <input className ="btn btn-outline-warning edit_btn" type="submit" value="Update Account" />
          </form>
          <Link to={'/'} >
            <button className ="btn btn-outline-primary edit_btn">
            Back to CodeStream </button>
          </Link>
          <Link to={'/'} >
            <button onClick={this.deleteUser} className ="btn btn-outline-danger edit_btn">
            Delete User Account </button>
            </Link>
        </div>
    }
  }
  render () {
    return (<div>
        {this.editFormToRender()}
        </div>
    )

  }
}
