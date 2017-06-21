import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Gallery extends Component{
  render(){
    return <section name="Gallery">
      <h1>Gallery</h1>
      <Link to="/">
        Go to home
      </Link>

    </section>
  }
}

export default Gallery;
