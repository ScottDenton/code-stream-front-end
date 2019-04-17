import React from "react";
import { Link } from "react-router-dom";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFollowClick =(stream) =>{
    const body={
        followed_name: stream.user_name
    }
    fetch(`http://localhost:3000/api/v1/users/${this.props.loggedInUser.id}/favorites`,
      {
      method: "POST",
          headers: {
            "Accept": "application/jsofn",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })

     }



  render() {
    const stream = this.props.stream;

    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <ReactTwitchEmbedVideo channel={stream.user_name} />
            <div>
              <Link to={`users/${stream.user_id}`}>
                <h1 className="link">{stream.user_name}</h1>
              </Link>
              <button id="follow-btn" onClick={() => this.handleFollowClick(stream) }> Follow this user </button>
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
