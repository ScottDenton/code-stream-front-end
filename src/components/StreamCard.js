import React from 'react'

class Stream extends React.Component {

  render () {
    const stream=this.props.stream
    console.log('stream', stream)
    const user_name = stream.user_name.toLowerCase();
    const image_url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user_name}-220x150.jpg`
    const archiveUrl = stream.thumbnail_url.replace('%{width}', 220).replace('%{height}', 150)
    return(
      <div>
        <div className="card" onClick={() => this.props.handleClickOnStream(stream)} >
          {stream.type ==='live' || stream.thumbnail_url === '' ?
            <img src={image_url} className="card-img-top" alt="..." />
            : <img src={archiveUrl}
          className="card-img-top" alt="..." />
        }
          <div className="card-body">
            <a href='#' className="link">
            <p className="card-text link">{stream.user_name}</p>
            </a>
            <p className="card-text">{stream.title}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Stream;
