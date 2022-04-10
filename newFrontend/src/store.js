import {configureStore} from '@reduxjs/toolkit'
import { likeReducer, myPostsReducer } from './Reducers/Post';
import { postOfFollowingReducer, userReducer,allUsersReducer } from './Reducers/User';




const store=configureStore({
    reducer:{
        user:userReducer,
        postOffollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPosts:myPostsReducer,
    }
});

export default store;