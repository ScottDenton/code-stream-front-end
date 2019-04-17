import React from "react";
import StreamCard from "./StreamCard";
import Jumbotron from "./Jumbotron";

class Stream extends React.Component {
  constructor() {
    super();
    this.state = {
      streams: [],
      favoritesVideos: {},
      jumbotronStream: {
        id: "33691327920",
        user_id: "107939114",
        user_name: "DutchsinseOfficial",
        game_id: "509670"
      }
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/livestreams")
      .then(resp => resp.json())
      .then(streams => {
        this.setState({
          streams: streams.data
        });
        // seed db with users
        // streams.data.map(stream =>{
        //     const body={
        //       user: {
        //         username: stream.user_name,
        //         user_id: stream.user_id,
        //         password: 'temp'
        //       }
        //     }
        //     fetch('http://localhost:3000/api/v1/users', {
        //       method: "POST",
        //       headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //       },
        //       body: JSON.stringify(body)
        //     }).then(resp => resp.json())
        //   })
      })
      .then(streams => {
        const streamArray = this.state.streams.slice(0, 1);
        this.setJumbotron(streamArray[0]);
      });
  }

  setJumbotron = stream => {
    this.setState({
      jumbotronStream: stream
    });
  };

  handleClickOnStream = stream => {
    this.setJumbotron(stream);
    document.getElementById(
      "twitch-embed"
    ).children[0].src = `https://embed.twitch.tv/?channel=${stream.user_name}`;
  };


  renderStreams = (arr) => {
    return <div>
      <h6>Live Streams </h6>
        <div className="stream_card_container">
           {arr.map(stream => {
            return (
              <StreamCard
                stream={stream}
                key={stream.title}
                handleClickOnStream={this.handleClickOnStream}
                />
            );
          })};
        </div>
    </div>
  };

  fetchFavoriteVideos = () => {
      {this.props.followedUsers.map(user => {
        const videos = this.findVideosByUsername(user)
        return <div>
          <h6> {user} Favorites</h6>

        </div>
      })}

  }

  findVideosByUsername =(username) =>{
    let user_id;
    let id;
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
        const foundUser =  users.find(user => {
          return user.username === username
        })
          user_id = foundUser.user_id
          id = foundUser.id
      })
    .then(users =>{
      const body={twitch_id: user_id}
      fetch(`http://localhost:3000/sessions/getUserVideos`,{
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json())
      .then(json => {
        console.log(json.data)
        this.setState({
          favoritesVideos: {
            username:json.data
          }
        })
      })
    })
  }


  render() {
    return (
      <div>
      <Jumbotron
        stream={this.state.jumbotronStream}
        loggedInUser={this.props.loggedInUser}
        handleFollowClick ={this.props.handleFollowClick}
        followedUsers={this.props.followedUsers}
        handleUnFollowClick={this.props.handleUnFollowClick}
        />
      {this.renderStreams(this.state.streams)}
      {this.fetchFavoriteVideos()}
      </div>
    );
  }
}

export default Stream;
