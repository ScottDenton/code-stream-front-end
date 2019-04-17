import React from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'




class Stream extends React.Component {


  render () {
    const stream=this.props.stream
    const url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.user_name}-220x150.jpg`
    return(
      <div>
          <div className="card" onClick={() => this.props.handleClickOnStream(stream)} >
            <img src={url} className="card-img-top" alt="..." />
            <div className="card-body">
              <a href='#' className="link">
              <p className="card-text link">{stream.user_name}</p>
              </a>
              <p className="card-text">{stream.title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stream;
