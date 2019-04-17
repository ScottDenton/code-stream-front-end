import React from "react";
import { Link } from "react-router-dom";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFollowClick = stream => {
    console.log("follow click", this.props.loggedInUser);
    // const body={
    //   favorite: {
    //     followed_id: stream.user_id
    //   }
    // }
    // fetch(`http://localhost:3000/api/v1/users/${this.props.loggedInUser.id}/favorites`,
    //   {
    //   method: "POST",
    //       headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(body)
    //     }).then(resp => resp.json())
    //     .then(console.log)
  };

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
              <button onClick={() => this.handleFollowClick(stream)}>
                {" "}
                Follow this user{" "}
              </button>
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
