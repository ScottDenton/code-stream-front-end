import React from 'react'
import NavBar from './NavBar'
// import Key from '../.key.js'



class UserShow extends React.Component {
state={
  id: '',
  stream: []
}

  componentDidMount(){
    const handle = this.props.match.params
    this.setState({
      id: handle.id
    }, this.fetchThisUsersData)
  }

  fetchThisUsersData =() =>  {
    console.log(this.state.id)
    fetch(`http://localhost:3000/api/v1/users/${this.state.id}`)
    .then(resp => resp.json())
    .then(resp=> {
      console.log('fetching user data', resp)
    })
    // .then(stream => {
    //   this.setState({
    //     stream: stream.data
    //   })
    //   }
    // )
  }

  render () {
    const stream = this.state.stream
    console.log(stream)
    return(
      <div className="Home">
        <NavBar />
        <h1>{stream.title} </h1>
        <iframe
          src={`https://player.twitch.tv/?video=${stream.id}&autoplay=true`}
          height="400"
          width="800"
          title={stream.title}
          frameBorder="<frameborder>"
          scrolling="<scrolling>"
          allowFullScreen="<allowfullscreen>"
          >
        </iframe>
      </div>
    )

  }
}

export default UserShow ;
