import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import Header from '../../shared/components/Header.jsx';

import styles from './Page.css';

import api from '../../api.js';

import actions from '../../actions.js';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }
  async componentDidMount(){
    await this.props.actions.postsNextPage();
    // const posts = await api.posts.getList(this.props.page);

    // this.props.dispatch(
    //   actions.setPost(posts),
    // );

    // this.props.actions.setPost(posts);

    this.setState({
      loading: false,
    });
    // se agrega el evento scroll pero luego de que se desmonte el component hay que quitarlo con componentWillUnmount
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

handleScroll(event){
  if(this.state.loading) return null;

  const scrolled = window.scrollY; //cuanto el usuario scroleo
  const viewportHeight = window.innerHeight; //altura navegador del usuario
  const fullHeight =  document.documentElement.clientHeight; //altura entera de la pagina

  //si el usuario esta en los ultimos 300pixeles de la pagina vamos a cargar mas posts
  if (!(scrolled + viewportHeight + 300 >= fullHeight)){
    return null;
  }

  this.setState({loading: true}, async () => {
    try{
      await this.props.actions.postsNextPage();
      // const posts = await api.posts.getList(this.props.page);
      //concat concatena los dos array, el que ya estaba mas los nuevos

      // this.props.dispatch(
      //   actions.setPost(posts),
      // );
      // this.props.actions.setPost(posts);
      this.setState({
        loading: false,
      });
    }catch(error){
      console.log(error);
      this.setState({loading: false});
    }
  })

}

  render(){
    return <section name="Home" className={styles.section}>

      <section className={styles.list}>
        {this.state.loading && (
          <Loading />
        )}
        {this.props.posts
          .map(post => <Post key={post.id} {...post}/>)
        }
      </section>
    </section>
  }
}


function mapStateToProps(state){
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}


// function mapStateToProps(state){
//   return {
//     posts: state.get('posts').get('entities'),
//     page: state.get('posts').get('page'),
//   };
// }

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
