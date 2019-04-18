import React from "react";
import StreamCard from "./StreamCard";
import Jumbotron from "./Jumbotron";

class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      favoritesVideos: [],
      jumbotronStream: {
        id: "33691327920",
        user_id: "107939114",
        user_name: "DutchsinseOfficial",
        game_id: "509670"
      }
    }
  }

  componentDidMount() {
    fetch("https://code-stream.herokuapp.com/api/v1/livestreams")
      .then(resp => resp.json())
      .then(streams => {
        this.setState({
          streams: streams.data
        });
        // seed db with users
        streams.data.map(stream =>{
            const body={
              user: {
                username: stream.user_name,
                user_id: stream.user_id,
                password: 'temp'
              }
            }
            fetch('https://code-stream.herokuapp.com/api/v1/users', {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            }).then(resp => resp.json())
          })
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

  renderIndividualFave = (obj) => {
      const arr =  Object.values(obj)
      const keys =Object.keys(obj)
      let counter = 0
       return arr.map(vidarr => {
         counter ++;
        return<div>
        <h6>{keys[counter-1]} </h6>
          <div className="stream_card_container">

            {vidarr.map(stream => {
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
      })


  }




  render() {
    return (
      <div>
      <Jumbotron
        stream={this.state.jumbotronStream}
        loggedInUser={this.props.loggedInUser}
        loggedIn={this.props.loggedIn}
        handleFollowClick ={this.props.handleFollowClick}
        followedUsers={this.props.followedUsers}
        handleUnFollowClick={this.props.handleUnFollowClick}
        />
      {this.renderStreams(this.state.streams)}
      {this.renderIndividualFave(this.props.faveVids)}
      </div>
    );
  }
}

export default Stream;
