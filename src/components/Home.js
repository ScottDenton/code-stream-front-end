import React, { Component } from "react";
import "../Home.css";
import Stream from "./Stream";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Stream loggedInUser={this.props.loggedInUser}
          handleFollowClick={this.props.handleFollowClick}
          followedUsers={this.props.followedUsers}
          handleUnFollowClick={this.props.handleUnFollowClick}
          faveVids={this.props.faveVids}/>
      </div>
    );
  }
}

export default Home;
