import React from 'react'
import StreamCard from './StreamCard'
import Jumbotron from './Jumbotron'


class Stream extends React.Component {
  constructor(){
    super()
    this.state = {
      streams: [],
      jumbotronStream:{id: "33691327920", user_id: "107939114", user_name: "DutchsinseOfficial", game_id: "509670"}
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/livestreams')
    .then(resp => resp.json())
    .then(streams => {
      this.setState({
        streams: streams.data
      })
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
      .then(streams=>{
         const streamArray = this.state.streams.slice(0, 1)
        this.setJumbotron(streamArray[0])
      })
    }


  setJumbotron =(stream) => {
    this.setState({
      jumbotronStream: stream
    })
  }

  handleClickOnStream =(stream) => {
      this.setJumbotron(stream);
      document.getElementById("twitch-embed").children[0].src= `https://embed.twitch.tv/?channel=${stream.user_name}`

  }

  renderStreams = () => {
      return this.state.streams.map(stream => {
          return  <StreamCard
          stream={stream}
          key={stream.title}
          handleClickOnStream={this.handleClickOnStream}/>

      })
  }


  render () {
    return(
      <div>
      <Jumbotron stream={this.state.jumbotronStream}
        loggedInUser={this.props.loggedInUser}
        />
      <h6>Live Streams </h6>
        <div className="stream_card_container">
          {this.renderStreams()}
        </div>
      </div>

    )
  }
}

export default Stream ;
