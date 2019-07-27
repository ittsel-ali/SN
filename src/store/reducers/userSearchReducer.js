const InitState = {
  users: []
}

const friendReducer = (state, action) => {
  switch(action.type){
    case "UPDATE_SEARCH_USER_LIST":
      console.log("Updating search user list");
      return {
        ...state,
        users: action.users
      };

    default:
      return state === undefined ? InitState : state;   
  }
}

export default friendReducer;