import React,{useEffect} from 'react'
import './Home.css'
import User from '../User/User'
import Post from '../Post/Post'
import {useDispatch, useSelector} from 'react-redux'
import { getFollowingPost,getAllUsers } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'
function Home() {
  const dispatch=useDispatch();
  
  const {loading,posts,error}= useSelector(state => state.postOffollowing)

  const {users,loading:usersLoading}=useSelector((state)=>state.allUsers);

  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUsers());
  },[dispatch])

  const {likeerror,message}=useSelector((state)=>state.like)


  useEffect(() => {
    if(likeerror){
        // alert.error(message);
        dispatch({type:"clearErrors"});
    }
    if(message){
        dispatch({type:"clearMessage"});
    }
}, [message,likeerror,dispatch,error])



  return (
    loading || usersLoading===true ? <Loader/> : <div className='home'>
    <div className="homeleft">
      { posts && posts.length > 0 ? posts.map((post)=>(
        <Post 
        postImage={"https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/hug-kiss-images.jpg"}
        key={posts._id}
        caption={post.caption}
        postId={post._id}
        // postImage={post.image}
        likes={post.likes}
        comments={post.comments}
        ownerImage={post.owner.avatar}
        ownerName={post.owner.name}
        ownerId= {post.owner._id}
        
        />

      )) : <Typography variant='h6'>No post yet</Typography>
    }
      </div>
      <div className="homeright">
        {
          users &&  users.length>0 ? users.map((user)=>(
            <User 
            key={user._id}
            userId={user._id}
            name={user.name} avatar={user.avatar}/>
          )):<Typography>No users yet</Typography>
        }
       
      </div>

  </div>
  )
}

export default Home