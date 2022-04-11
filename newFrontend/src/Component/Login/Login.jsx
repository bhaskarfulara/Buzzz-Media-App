
import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";

// import { useAlert } from "react-alert";

const Login=()=> {
  const [email,setemail]=useState("");
  const [password,setPass]=useState();
  const dispatch =useDispatch();
  const {error}=useSelector(state=>state.user)  
  const {message}=useSelector(state=>state.user)

    const loginHandler = (e) => {
    e.preventDefault();
    console.log(email,password);
    dispatch(loginUser(email, password));
 
  };

  useEffect(() => {
    if(error){
      alert(error)
      dispatch({type:"clearErrors"})
    }
    if(message){
      alert(message)
      dispatch({type:"clearMessage"})
    }
  }, [error,dispatch,message])

  


  return (
    <div className="login">
    <form className="loginForm" onSubmit={loginHandler} >
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Social Aap
      </Typography>

      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />

      {/* <Link to="/forgot/password">
        <Typography>Forgot Password?</Typography>
      </Link> */}

      <Button type="submit">Login</Button>

      <Link to="/register">
        <Typography>New User?</Typography>
      </Link>
    </form>
  </div>
  )
}

export default Login