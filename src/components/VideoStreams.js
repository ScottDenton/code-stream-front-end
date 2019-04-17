import React from 'react'
import StreamCard from './StreamCard'
import Jumbotron from './Jumbotron'
import VideoJumbotron from './VideoJumbotron'


class VideoStream extends React.Component {

  renderStreams = () => {
      return this.props.videos.map(video => {
          return  <StreamCard
          stream={video}
          key={video.id}
          handleClickOnStream={() => this.props.handleClickOnStream(video)}/>

      })
  }


  render () {

      const jumbotronToDisplay = this.props.jumbotronStream.type === "archive" ?
       <Jumbotron stream={this.props.jumbotronStream}
        loggedInUser={this.props.loggedInUser}/> :
       <VideoJumbotron stream={this.props.jumbotronStream}
        loggedInUser={this.props.loggedInUser}/>
    return(
      <div>
      {jumbotronToDisplay}
      <h6>Archived Videos </h6>
        <div className="stream_card_container">
          {this.renderStreams()}
        </div>
      </div>

    )
  }
}

export default VideoStream ;
