import React from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import FollowButton from './FollowButton'

class VideoJumbotron extends React.Component {

  renderFollowButton =() =>{
    const stream = this.props.stream;
    if(this.props.loggedIn){
      console.log('logged in')
     return <FollowButton
       stream ={stream} handleFollowClick={this.props.handleFollowClick}
       handleUnFollowClick={this.props.handleUnFollowClick}
       followedUsers={this.props.followedUsers}/>
     } else {
       console.log('logged out')
       return
     }
  }
  render() {
    const stream = this.props.stream;

    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <ReactTwitchEmbedVideo video={stream.id} />
            <div>
            <h1 className="link">{stream.user_name}</h1>
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

export default VideoJumbotron;
