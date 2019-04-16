import React from 'react'
import NavBar from './NavBar'
import VideoStreams from './VideoStreams'



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
    console.log('sterasmsa', this.state.id)
    fetch(`http://localhost:3000/api/v1/users/${this.state.id}/videos`)
    .then(resp => resp.json())
    .then(resp=> {
      console.log('fetching user data', resp)
    })
  }

  render () {
    const stream = this.state.stream
    console.log(stream)
    return(
      <div className="Home">
        <VideoStreams />
      </div>
    )

  }
}

export default UserShow ;
