import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tumblr from 'tumblr.js';
import './App.css';

class PhotoFeed extends Component {

  constructor(props) {
    super(props);

    // Tumblr client.
    this.tumblr = tumblr.createClient({
      consumer_key: props.apiKey
    });

    this.state = {
      photos: []
    }
  
    // Get the first 20 photos when the component is created.
    this.fetchPhotos({limit: 20, offset: 0})
      .then(photos => this.setState({photos}))
      .catch(console.error);
  }

  /**
   * Fetch blog's photos using the Tumblr API.
   * `options` can contain any of the values listed here:
   *    https://www.tumblr.com/docs/en/api/v2#posts
   * 
   * @param {Object} [options={}] 
   * @returns {Promise}
   * @memberof PhotoFeed
   */
  fetchPhotos(options = {}) {
    return new Promise((resolve, reject) => {
      const {blogId} = this.props;
      options.type = 'photo';
      this.tumblr.blogPosts(blogId, options, (err, {posts}) => {
        if (err) {
          return reject(err);
        } else {
          // Transform `posts` array into an array of photo URLs.
          const photos = posts.map(post => post.photos[0].original_size.url);
          return resolve(photos);
        }
      });
    });
  }


  render() {
    const {photos} = this.state;
    return (
      <ul className='photo-feed'>
        {photos.map(photo => (
          <li><img src={photo} width="500" /></li>
        ))}
      </ul>
    );

  }
}

PhotoFeed.propTypes = {
  apiKey: PropTypes.string.isRequired,
  blogId: PropTypes.string.isRequired
};

export default PhotoFeed;