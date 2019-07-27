export const getUserTimeline = (user_id) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls}) => {
    HttpService.get( urls.timeline(user_id) )
      .then( response => 
        dispatch({type: 'SET_POST_STATE', posts: response.posts}))
  }
}

