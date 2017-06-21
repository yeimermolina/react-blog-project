import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import Header from '../../shared/components/Header.jsx';

import styles from './Page.css';

import api from '../../api.js';

class Home extends Component{
  constructor(props){
    super(props);

    this.state = {
      page :1 ,
      posts: [],
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }
  async componentDidMount(){
    const posts = await api.posts.getList(this.state.page);

    this.setState({
      posts:posts,
      page: this.state.page + 1,
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
      const posts = await api.posts.getList(this.state.page);
      //concat concatena los dos array, el que ya estaba mas los nuevos
      this.setState({
        posts: this.state.posts.concat(posts),
        page : this.state.page + 1,
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
        {this.state.posts
          .map(post => <Post key={post.id} {...post}/>)
        }
      </section>
    </section>
  }
}

export default Home;
