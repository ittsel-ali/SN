export const updateUserProfile = () => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => 
    HttpService.get( urls.me() ).then( data => {
      dispatch({type: "SET_USER", user: data.user});
    });
}
