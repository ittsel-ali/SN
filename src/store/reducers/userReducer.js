const initialState = {
  profile: {}
};

const userReducer = (state, action) => {
  switch(action.type){
    case "SET_USER":
      console.log("Setting new user...")
      return {
        ...state,
        profile: action.user,
      };
  
    default: 
      return state == undefined ? initialState : state;     
  }
};

export default userReducer;
  