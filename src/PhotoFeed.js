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
      photos: [],
      bottom: false,
      offsetNum: 0
    }
    this.scrollHandler = this.scrollHandler.bind(this);
    this.alertMe = this.alertMe.bind(this);
    this.fetchPhotosOnScroll = this.fetchPhotosOnScroll.bind(this);
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

  alertMe(){
      this.setState({
        offsetNum: this.state.offsetNum + 20
      })
      this.fetchPhotosOnScroll();
  }

  fetchPhotosOnScroll(){
    this.fetchPhotos({limit: 20, offset: this.state.offsetNum})
    .then(photos => this.setState({
            photos: this.state.photos.concat(photos)
        })
    )
    .catch(console.error);
  }

  scrollHandler(){
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
   
    if (windowBottom >= docHeight) {
      this.alertMe();  
      this.setState({
        bottom: true
      }
    );
    } else {
      this.setState({
        bottom: false
      });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }


  render() {
    const {photos} = this.state;
    return (
      <ul className='photo-feed'>
        {photos.map(photo => (
          <li className="tumblr-photos-wrapper"><img className="tumblr-photos" src={photo} height="400"/></li>
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