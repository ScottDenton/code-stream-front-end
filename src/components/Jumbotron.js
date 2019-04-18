import React from "react";
import { Link } from "react-router-dom";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import FollowButton from './FollowButton'

class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
  }

  renderFollowButton =() =>{
    const stream = this.props.stream;
    if(this.props.loggedIn){
     return <FollowButton
       stream ={stream} handleFollowClick={this.props.handleFollowClick}
       handleUnFollowClick={this.props.handleUnFollowClick}
       followedUsers={this.props.followedUsers}
       loggedIn={this.props.loggedIn}/>
     } else {
       return
     }
  }

  render() {
    const stream = this.props.stream;
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <ReactTwitchEmbedVideo channel={stream.user_name} layout="video"/>
            <div>
              <Link to={`users/${stream.user_id}`}>
                <h1 className="link">{stream.user_name}</h1>
              </Link>
              {this.renderFollowButton()}
                <h5>{stream.title}</h5>
                <h6>{stream.viewer_count} Viewers Currently Watching </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
