import {combineReducers} from 'redux';


const initialState = {
  posts: {
    page : 1,
    entities: [],
  },
  comments: [],
  users:{},
};

function postsPageReducer(state = initialState.posts.page, action = {}){
  switch (action.type) {
    case 'SET_POST':
        return state + 1;
      break;
    default:
    return state;

  }
}


function postsEntitiesReducer(state = initialState.posts.entities, action = {}){
  switch (action.type) {
    case 'SET_POST':
      return state.concat(action.payload)
      break;
    default:
      return state;
  }
}


function commentsReducer(state = initialState.comments, action ={}){
  switch (action.type) {
    case 'SET_COMMENTS':
      return state.concat(action.payload)
      break;
    default:
      return state;

}
}

function usersReducer(state = initialState.users, action ={}){
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      });
      break;
    default:
      return state;

}
}


const postsReducer = combineReducers({
  page : postsPageReducer,
  entities : postsEntitiesReducer,
});

const reducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: usersReducer,
});


// function reducer(state = initialState, action = {}){
//   switch (action.type) {
//     case 'SET_POST':
//       return Object.assign({}, state, {
//         posts: Object.assign({}, state.posts, {
//           entities: state.posts.entities.concat(action.payload),
//           page: state.posts.page + 1,
//         }),
//       });
//     default:
//       return state;
//   }
//   return state
// }


export default reducer;
