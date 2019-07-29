export const getFriendList = () => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    HttpService.get( urls.friends() ).then( (data) => {
      dispatch({type: "UPDATE_FRIEND_LIST", friends: data.friends})
    } )
  }
}

export const getFriendInfo = (friend_id) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    HttpService.get( urls.friend_info(friend_id) ).then( (data) => {
      dispatch({type: "SET_USER", user: data.user})
    } )
  }
}

export const updateFriendList = (friend) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    dispatch({type: "APPEND_FRIEND_LIST", friend: friend.user});
    dispatch({type: 'DEL_POST_STATE'});

    HttpService.get( urls.posts() )
      .then( response => 
        dispatch({type: 'SET_POST_STATE', posts: response.posts}))
  }
}

export const inviteFriend = (friend_id) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    HttpService.get( urls.inviteFriend(friend_id) ).then( (data) => {
      console.log(data);
    } )
  }
}

export const confirmFriendship = (friend_id) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    HttpService.get( urls.confirmFriend(friend_id) ).then( (data) => {
      dispatch({type: "REMOVE_FRIEND_REQUEST_ITEM", id: friend_id})
      dispatch({type: 'DEL_POST_STATE'});

      HttpService.get( urls.posts() )
      .then( response => 
        dispatch({type: 'SET_POST_STATE', posts: response.posts}))
    } )
  }
}

export const getFriendRequests = () => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    HttpService.get( urls.friend_requests() ).then( (data) => {
      dispatch({type: "UPDATE_FRIEND_REQUEST_LIST", friend_requests: data.friend_requests})
    } )
  }
}

export const updateFriendRequests = (request) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
   dispatch({type: "ADD_NEW_FRIEND_REQUEST", request: request.user})
  }
}

export const searchUser = (string) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    HttpService.get( urls.user_search(string) ).then( (data) => {
      dispatch({type: "UPDATE_SEARCH_USER_LIST", users: data})
    } )
  }
}