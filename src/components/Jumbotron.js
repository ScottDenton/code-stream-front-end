import React from 'react'
import {Link} from 'react-router-dom'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'



class Jumbotron extends React.Component {


  render () {
    const stream = this.props.stream
    console.log('jumbotron stream', stream)

    return(

      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
              <ReactTwitchEmbedVideo channel={stream.user_name}/>
            <div>
              <Link to ={`users/${stream.user_id}`}>
                <h1 className='link'>{stream.user_name}</h1>
              </Link>
                <h5>{stream.title}</h5>
                <h6>{stream.viewer_count} Viewers Currently Watching </h6>
            </div>
          </div>
        </div>
      </div>
    )

  }
}


export default Jumbotron ;
