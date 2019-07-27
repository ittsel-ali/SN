const InitState = {
  friend_requests: []
}

const friendRequestReducer = (state, action) => {
  switch(action.type){
    
    case "UPDATE_FRIEND_REQUEST_LIST":
      console.log("Updating friend request list");
      return {
        ...state,
        friend_requests: action.friend_requests
      };

    case "ADD_NEW_FRIEND_REQUEST":
      console.log("Adding friend request list");
      return {
        ...state,
        friend_requests: [action.request, ...state.friend_requests]
      };

    case "REMOVE_FRIEND_REQUEST_ITEM":
      console.log("Removing friend request from list");
      
      state.friend_requests.forEach( (v, i) => {
        console.log(action.id);
        if (v.id == action.id)
          return state.friend_requests.splice(i, 1);
      })
      
      return {
        ...state,
        friend_requests: state.friend_requests
      };  

    default:
      return state === undefined ? InitState : state;   
  }
}

export default friendRequestReducer;