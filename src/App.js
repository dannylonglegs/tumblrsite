import React, { Component } from 'react';

import './App.css';
import PhotoFeed from './PhotoFeed.js'

const TUMBLR_API_KEY = '4c9zOZau7XjtOpYe4vYoGVkKwZwFpSCwNLhs8VsWYqIpE90Yvv';
const TUMBLR_BLOG_ID = 'missing-time.tumblr.com';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"></h1>
        </header>
        <PhotoFeed
          apiKey={TUMBLR_API_KEY}
          blogId={TUMBLR_BLOG_ID}
        >
          {this.props.children}
        </PhotoFeed>
        
      </div>
    );
  }
}

export default App;

