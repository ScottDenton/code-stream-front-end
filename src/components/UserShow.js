import React from "react";
import VideoStreams from "./VideoStreams";

class UserShow extends React.Component {
  state = {
    id: "",
    videos: [],
    jumbotronStream: {
      id: "411937859",
      user_id: "32540179",
      user_name: "...loading",
      title: "...loading"
    }
  };

  componentDidMount() {
    const handle = this.props.match.params;
    this.setState(
      {
        id: handle.id
      },
      this.fetchThisUsersData
    );
  }

  fetchThisUsersData = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.id}/videos`)
      .then(resp => resp.json())
      .then(videos => {
        this.setState({
          videos: videos.data,
          jumbotronStream: videos.data[0]
        });
      });
  };

  setJumbotron = video => {
    this.setState({
      jumbotronStream: video
    });
  };
  handleClickOnStream = video => {
    this.setJumbotron(video);
    if (video.type === "archive") {
      document.getElementById(
        "twitch-embed"
      ).children[0].src = `https://embed.twitch.tv/?video=${video.id}`;
    } else {
      document.getElementById(
        "twitch-embed"
      ).children[0].src = `https://embed.twitch.tv/?channel=${video.user_id}`;
    }
  };

  render() {
    return (
      <div className="Home">
        <VideoStreams
          loggedInUser={this.props.loggedInUser}
          loggedIn={this.props.loggedIn}
          videos={this.state.videos}
          jumbotronStream={this.state.jumbotronStream}
          handleClickOnStream={this.handleClickOnStream}
          followedUsers={this.props.followedUsers}
          handleFollowClick={this.props.handleFollowClick}
        />
      </div>
    );
  }
}

export default UserShow;
