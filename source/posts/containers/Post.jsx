import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from'prop-types';
import {FormattedMessage} from 'react-intl';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


// import api from '../../api.js';

import styles from './Post.css';

import actions from '../../actions.js';

class Post extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }
  async componentDidMount(){
    if(!!this.props.user && !!this.props.comments) return this.setState({loading:false});
    // if(!!this.state.user && !!this.state.comments) return this.setState({loading:false});

    // const [
    //   user,
    //   comments,
    // ] = await Promise.all([
    //   !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
    //   !this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null),
    //
    // ]);

    await Promise.all([
      this.props.actions.loadUser(this.props.userId),
      this.props.actions.loadCommentsForPost(this.props.id),
    ]);


    this.setState({
      loading:false,
      // user: user || this.state.user,
      // comments: comments || this.state.comments,
    });
  }
  render(){
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>
      <h2  className={styles.title}>
              <Link to={`/post/${this.props.id}`} >
                {this.props.title}
              </Link>
      </h2>
        <p className={styles.body}>
          {this.props.body}
        </p>


        {!this.state.loading && (
          <div className={styles.meta}>
            <Link to={`/user/${this.props.user.id}`} className={styles.user}>
              {this.props.user.name}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage id="post.meta.comments"
                values= {{
                  amount: this.props.comments.length,
                }}
              />
            </span>
            <Link to={`/post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore"/>
            </Link>
          </div>
        )}
      </article>
    )
  }
};
//
Post.propTypes= {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
};


// Post.propTypes = {
//   id: PropTypes.number,
//   userId: PropTypes.number,
//   title: PropTypes.string,
//   body: PropTypes.string,
//   isMain: PropTypes.bool,
//   user: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     size: PropTypes.number,
//     get: PropTypes.func,
//   }),
//   comments: PropTypes.objectOf(
//     PropTypes.object,
//   ),
//   actions: PropTypes.objectOf(PropTypes.func),
// };
//
// Post.defaultProps = {
//   isMain: false,
//   user: null,
//   comments: null,
// };

function mapStateToProps(state, props){
  return {
    comments: state.comments.filter(comment => comment.postId === props.id),
    user: state.users[props.userId],
  };
}

// function mapStateToProps(state, props){
//   return {
//     comments : state
//       .get('comments')
//       .filter(comment => comment.get('postId') === props.id),
//     user : state.get('users').get(props.userId),
//   };
// }

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
