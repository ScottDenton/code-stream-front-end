import React, {Component} from 'react'

export default class FollowButton extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const name = this.props.stream.user_name
    console.log('followed users', this.props.followedUsers)
    const buttonToRender = this.props.followedUsers.includes(name) ?
       <button  className = "btn btn-outline-warning button" onClick={() => this.props.handleUnFollowClick(this.props.stream) }> Unfollow this user </button>
    :  <button className = "btn btn-outline-warning button" onClick={() => this.props.handleFollowClick(this.props.stream) }> Follow this user </button>
    return(
        buttonToRender
    )

  }
}
