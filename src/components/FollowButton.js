import React, {Component} from 'react'

export default class FollowButton extends Component {
  constructor(props){
    super(props)
  }





  render () {
    const name = this.props.stream.user_name
    const buttonToRender = this.props.followedUsers.includes(name) ?
       <button id="follow-btn" onClick={() => this.props.handleUnFollowClick(this.props.stream) }> Unfollow this user </button>
    :  <button id="follow-btn" onClick={() => this.props.handleFollowClick(this.props.stream) }> Follow this user </button>
    return(
        buttonToRender
    )

  }
}
