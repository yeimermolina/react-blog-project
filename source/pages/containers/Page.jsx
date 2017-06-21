import React from 'react'
import {
	Route,
	Switch,
} from 'react-router-dom';

import Home from './Home.jsx';
import About from './About.jsx';
import Error404 from './Error404.jsx'
import Gallery from './Gallery.jsx'
import Profile from './Profile.jsx'
import Post from './Post.jsx'

import Header from '../../shared/components/Header.jsx';

function Pages(){
  return(
    <main role="application">
			<Header />
      <Switch>
      <Route
          path="/"
          exact
          component={Home}
      />
      <Route
          path="/about"
          exact
          component={About}
      />
      <Route
          path="/gallery"
          exact
          component={Gallery}
      />
      <Route
          path="/user/:id"
          exact
          component={Profile}
      />
      <Route
          path="/post/:id"
          exact
          component={Post}
      />
      <Route component={Error404} />
    </Switch>
    </main>
  );
}

export default Pages;
