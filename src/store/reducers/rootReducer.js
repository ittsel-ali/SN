import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postReducer from './postReducer'
import callbackReducer from './callbackReducer'
import userReducer from './userReducer'
import userSearchReducer from './userSearchReducer'
import friendReducer from './friendReducer'
import friendRequestReducer from './friendRequestReducer'

import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    searchedUserstore: userSearchReducer, 
    poststore: postReducer,
    friendstore: friendReducer,
    friendrequeststore: friendRequestReducer,
    callbackstore: callbackReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
});


export default rootReducer
