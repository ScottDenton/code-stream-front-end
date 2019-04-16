import React from 'react'
import StreamCard from './StreamCard'
import Jumbotron from './Jumbotron'


class VideoStream extends React.Component {
  constructor(){
    super()
    this.state = {
      streams: [],
      jumbotronStream:{id: "33691327920", user_id: "107939114", user_name: "DutchsinseOfficial", game_id: "509670"}
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.state.jumbotronStream.id}/videos`)
    .then(resp => resp.json())
    .then(resp => {
      console.log('video stream data', resp)})
    // .then(streams => {
    //   this.setState({
    //     streams: streams.data
    //   })
    // })
      // .then( streams=>{
      //    const streamArray = this.state.streams.slice(0, 1)
      //   this.setJumbotron(streamArray[0])
      // })
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
      <Jumbotron stream={this.state.jumbotronStream}/>
      <h6>Live Streams </h6>
        <div className="stream_card_container">
          {this.renderStreams()}
        </div>
      </div>

    )
  }
}

export default VideoStream ;
