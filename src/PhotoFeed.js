
import React, { Component } from 'react';
import './App.css';

 
var tumblr = require('tumblr.js');

var client = tumblr.createClient({ consumer_key: '4c9zOZau7XjtOpYe4vYoGVkKwZwFpSCwNLhs8VsWYqIpE90Yvv' });


client.blogPosts('missing-time.tumblr.com', posts);

function posts(err, data) {

        data.posts;
        console.log('here is the info', data.posts)
    };



class PhotoFeed extends Component {

constructor(props) {
        super(props); 
         this.state = {
            photos: []
        };
      }
    


render() {


return (
   
        <div >
           <p>photofeed will be here</p>

        </div>
        
    );
  
  }
}

export default PhotoFeed;