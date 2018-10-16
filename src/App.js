import React, { Component } from 'react';

import './App.css';
import PhotoFeed from './PhotoFeed.js'
import Info from './Info.js'
import { Link, Route } from 'react-router-dom'

const TUMBLR_API_KEY = '4c9zOZau7XjtOpYe4vYoGVkKwZwFpSCwNLhs8VsWYqIpE90Yvv';
const TUMBLR_BLOG_ID = 'missing-time.tumblr.com';

class App extends Component {
  render() {
    return (
      <Route path="/">
      <div className="App">
        <header className="App-header">
          <Link to={"/work"}><h1 className="App-title">Daniel Fernandes</h1></Link>
          <Link to={"/info"}><h1 className="info-link">Info</h1></Link>
        </header>
          <Route path={"/work"} render={(props) => <PhotoFeed apiKey={TUMBLR_API_KEY} blogId={TUMBLR_BLOG_ID} {...props}>{this.props.children}</PhotoFeed>} />
          <Route path={"/info"} render={(props) => <Info {...props}/> }/>
        </div>
      </Route>
    );
  }
}

export default App;

