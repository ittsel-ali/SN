
export const signIn = (credentials) => {
  return (dispatch, getState, { HttpService, urls, DataUtil}) => {
    HttpService.post( urls.signin(), DataUtil.formMulti(credentials)) 
      .then( data => {
        dispatch({type: "SET_AUTH_TOKEN", token: data.user.access_token}); 
        HttpService.setAuthHeader("Bearer", data.user.access_token);
        })

      .catch( err => 
        dispatch({ type: 'SIGNUP_ERROR', err: JSON.stringify(err)}) 
        )
    }
  };


export const signUp = (newUser) => {
  return (dispatch, getState, { HttpService, urls, DataUtil}) => {
    const form =  DataUtil.formMulti(newUser)

    HttpService.post( urls.signup(), form)
      .then( data => {
        const loginForm = new FormData();
        
        loginForm.append('email', data.email);
        loginForm.append('password', form.get('user[password]'));
        loginForm.append('grant_type', 'password');

        HttpService.post( urls.signin(), loginForm) 
          .then( data => {
            dispatch({type: "SET_AUTH_TOKEN", token: data.user.access_token});
            HttpService.setAuthHeader("Bearer", data.user.access_token);
            });
        })

      .catch( err => 
        dispatch({ type: 'SIGNUP_ERROR', err: JSON.stringify(err.errors)}) 
        )
    }
  };


export const updateProfile = (newProfile) => {
  return (dispatch, getState, {getFirebase, getFirestore, HttpService, urls, DataUtil}) => {
    HttpService.put( urls.update_user(), DataUtil.formMulti(newProfile))
      .then( () => window.location.href="/" );
    }
  };


export const signOut = () => {
  return (dispatch, getState, {}) => {
    localStorage.clear();
    window.location.reload();
    }
  };
