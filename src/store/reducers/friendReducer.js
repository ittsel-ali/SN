const InitState = {
  friends: []
}

const friendReducer = (state, action) => {
  switch(action.type){
    
    case "UPDATE_FRIEND_LIST":
      console.log("Updating friend list");
      return {
        ...state,
        friends: action.friends
      };

    case "APPEND_FRIEND_LIST":
      console.log("Adding new friend to list");
      return {
        ...state,
        friends: [action.friend, ...state.friends]
      };  

    default:
      return state === undefined ? InitState : state;   
  }
}

export default friendReducer;