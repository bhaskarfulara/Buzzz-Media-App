import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import "./Account.css";

function Account() {
    const dispatch = useDispatch();
    const { user, loading: userLoading } = useSelector((state) => state.user);

    const [friendsToggle,setFriendsToggle]=useState(false);

    const { loading, error, posts } = useSelector((state) => state.myPosts)
    const {
        error: likeError,
        message
    } = useSelector((state) => state.like);

    const logOutHandler=async ()=>{
       await dispatch(logoutUser())
        alert("LoggedOut Successfully")
    }

    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch])

    useEffect(() => {
        if (likeError) {
            // alert.error(message);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            dispatch({ type: "clearMessage" });
        }
    }, [message, likeError, dispatch, error])



    return (
        loading === true || userLoading === true ? <Loader /> : (<div className='account'>
            <div className="accountleft">
                {
                    posts && posts.length > 0 ? posts.map((post) => (
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
                            ownerId={post.owner._id}
                            isAccount={true}

                        />
                    )) : <Typography variant="h6">Make Your First Post</Typography>
                }
            </div>
            <div className="accountright">
                <Avatar src={user.avatar} sx={{ height: "8vmax", width: "8vmax" }} />

                <Typography variant="h5">{user.name}</Typography>
                <div>
                    <button onClick={() => setFriendsToggle(!friendsToggle)}><Typography>Friends</Typography></button>
                    <Typography>{user.friends.length}</Typography>
                </div>
                <div>
                    <Typography>Post</Typography>
                    <Typography>{user.posts.length}</Typography>
                </div>
                <Button variant="contained" onClick={logOutHandler}>Logout</Button>
                <Link to={"/update/profile"}>Edit Profile</Link>
                <Link to={"/update/password"}>Change Password</Link>
                <Button variant="text" style={{color:"red",margin:"2vmax"}}>Delete My Profile</Button>

                <Dialog open={friendsToggle} onClose={() => setFriendsToggle(!friendsToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Friends</Typography>
                    {
                        user && user.friends.length>0 ?
                        user.friends.map((friend) => (<User
                            key={friend._id}
                            userId={friend._id}
                            name={friend.name} avatar={friend.avatar} />)):<Typography style={{margin:"2vmax"}}>No Friends</Typography>
                    }
                </div>
            </Dialog>
            </div>
        </div>)
    )
}

export default Account