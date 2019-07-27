export const createPost = (newPost) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    return HttpService.post( urls.posts(), DataUtil.formMulti(newPost) )
      .then( response => 
        dispatch( {type: "APPEND_POST_STATE", post: response.post}))
  }
}

export const getPosts = () => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls}) => {
    HttpService.get( urls.posts() )
      .then( response => 
        dispatch({type: 'SET_POST_STATE', posts: response.posts}))
  }
}

