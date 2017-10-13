import React, { Component } from 'react';

import './App.css';
import PhotoFeed from './PhotoFeed.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"></h1>
        </header>
        <PhotoFeed>
          {this.props.children}
        </PhotoFeed>
        
      </div>
    );
  }
}

export default App;
