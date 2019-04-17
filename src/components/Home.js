import React, { Component } from 'react';
import '../Home.css';
import Stream from './Stream'


class Home extends Component {

  render() {
    return (
      <div className="Home">
        <Stream loggedInUser={this.props.loggedInUser}/>
      </div>
    );
  }
}

export default Home;
