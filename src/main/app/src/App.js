import React, { Component } from 'react';
import './bootstrap.min.css';

import Nav from './components/Nav'
import Main from './components/Main'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: { username: '', token: '' }
    }

  }




  render() {
    return (
      <div className="App">
        <Nav auth={this.state.loggedIn}/>
        <Main auth={this.state.loggedIn}/>
      </div>
    );
  }
}

export default App;
